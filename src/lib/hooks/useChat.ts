import { useState, useCallback } from 'react';
import { Transaction, SQLError, SQLiteDatabase } from 'react-native-sqlite-storage';
import { questionIA } from '../api/artificialInteligence';
import { getDatabase } from '../db/db';
import { Animal } from '../interfaces/Animal';
import { Chat, Message } from '../interfaces/chats';
import { v4 as uuidv4 } from 'uuid';

interface UseChatReturn {
  chats: Chat[];
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  createChat: (animalId: string, title: string, chatId: string) => Promise<void>;
  fetchChats: () => Promise<void>;
  fetchMessages: (chatId: string) => Promise<void>;
  sendMessage: (chatId: string, animal: Animal, content: string) => Promise<void>;
}

export const useChat = (): UseChatReturn => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createChat = useCallback(async (animalId: string, title: string, chatId: string) => {
    setIsLoading(true);
    const now = new Date().toISOString();
    const db: SQLiteDatabase = await getDatabase();

    try {
      await new Promise<void>((resolve, reject) => {
        db.transaction((tx: Transaction) => {
          tx.executeSql(
            `INSERT INTO Chats (id, animalId, title, created_at, updated_at) VALUES (?, ?, ?, ?, ?)`,
            [chatId, animalId, title, now, now],
            () => resolve(),
            (_: Transaction, error: SQLError) => {
              reject(new Error(`Failed to create chat: ${error.message}`));
              return false;
            }
          );
        });
      });

      setChats((prev) => [...prev, { id: chatId, animalId, title, created_at: now, updated_at: now }]);
    } catch (err: any) {
      setError('Error creating chat');
      console.error('[ERROR] Error creating chat:', err.message || err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchChats = useCallback(async () => {
    setIsLoading(true);
    const db: SQLiteDatabase = await getDatabase();

    try {
      const results = await new Promise<Chat[]>((resolve, reject) => {
        db.transaction((tx: Transaction) => {
          tx.executeSql(
            `
            SELECT c.*, m.id AS messageId, m.content AS messageContent, m.owner AS messageOwner, m.created_at AS messageCreatedAt
            FROM Chats c
            LEFT JOIN Messages m ON c.id = m.chatId
            AND m.created_at = (
              SELECT MAX(created_at)
              FROM Messages
              WHERE chatId = c.id
            )
            ORDER BY c.updated_at DESC
            `,
            [],
            (_: Transaction, { rows }) => {
              const chats: Chat[] = [];
              for (let i = 0; i < rows.length; i++) {
                const row = rows.item(i);
                const chat: Chat = {
                  id: row.id,
                  animalId: row.animalId,
                  title: row.title,
                  created_at: row.created_at,
                  updated_at: row.updated_at,
                };
                if (row.messageId) {
                  chat.lastMessage = {
                    id: row.messageId,
                    chatId: row.id,
                    content: row.messageContent,
                    owner: row.messageOwner,
                    created_at: row.messageCreatedAt,
                  };
                }
                chats.push(chat);
              }
              resolve(chats);
            },
            (_: Transaction, error: SQLError) => {
              reject(new Error(`Failed to fetch chats: ${error.message}`));
              return false;
            }
          );
        });
      });
      setChats(results);
    } catch (err: any) {
      setError('Error fetching chats');
      console.error('[ERROR] Error fetching chats:', err.message || err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchMessages = useCallback(async (chatId: string) => {
    setIsLoading(true);
    const db: SQLiteDatabase = await getDatabase();

    try {
      const results = await new Promise<Message[]>((resolve, reject) => {
        db.transaction((tx: Transaction) => {
          tx.executeSql(
            `SELECT * FROM Messages WHERE chatId = ? ORDER BY created_at ASC`,
            [chatId],
            (_: Transaction, { rows }) => {
              const messages: Message[] = [];
              for (let i = 0; i < rows.length; i++) {
                messages.push(rows.item(i));
              }
              resolve(messages);
            },
            (_: Transaction, error: SQLError) => {
              reject(new Error(`Failed to fetch messages: ${error.message}`));
              return false;
            }
          );
        });
      });
      setMessages(results);
    } catch (err: any) {
      setError('Error fetching messages');
      console.error('[ERROR] Error fetching messages:', err.message || err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const sendMessage = useCallback(async (chatId: string, animal: Animal, content: string) => {
    if (!content.trim()) return;

    setIsLoading(true);
    const now = new Date().toISOString();
    const messageId = uuidv4();
    const userMessage: Message = {
      id: messageId,
      chatId,
      content,
      owner: 'User',
      created_at: now,
    };
    const db: SQLiteDatabase = await getDatabase();

    try {
      // Save user message
      await new Promise<void>((resolve, reject) => {
        db.transaction((tx: Transaction) => {
          tx.executeSql(
            `INSERT INTO Messages (id, chatId, content, owner, created_at) VALUES (?, ?, ?, ?, ?)`,
            [messageId, chatId, content, 'User', now],
            () => resolve(),
            (_: Transaction, error: SQLError) => {
              reject(new Error(`Failed to save user message: ${error.message}`));
              return false;
            }
          );
        });
      });

      setMessages((prev) => [...prev, userMessage]);

      // Update chat's updated_at
      await new Promise<void>((resolve, reject) => {
        db.transaction((tx: Transaction) => {
          tx.executeSql(
            `UPDATE Chats SET updated_at = ? WHERE id = ?`,
            [now, chatId],
            () => resolve(),
            (_: Transaction, error: SQLError) => {
              reject(new Error(`Failed to update chat: ${error.message}`));
              return false;
            }
          );
        });
      });

      // Get AI response
      const response = await questionIA(animal, content);
      const aiContent = response.choices?.[0]?.message?.content;

      if (!aiContent) {
        throw new Error('No response from AI');
      }

      const aiMessageId = uuidv4();
      const aiMessage: Message = {
        id: aiMessageId,
        chatId,
        content: aiContent,
        owner: 'IA',
        created_at: new Date().toISOString(),
      };

      // Save AI message
      await new Promise<void>((resolve, reject) => {
        db.transaction((tx: Transaction) => {
          tx.executeSql(
            `INSERT INTO Messages (id, chatId, content, owner, created_at) VALUES (?, ?, ?, ?, ?)`,
            [aiMessageId, chatId, aiContent, 'IA', aiMessage.created_at],
            () => resolve(),
            (_: Transaction, error: SQLError) => {
              reject(new Error(`Failed to save AI message: ${error.message}`));
              return false;
            }
          );
        });
      });

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err: any) {
      setError('Error sending message');
      console.error('[ERROR] Error sending message:', err.message || err);
      const errorMessage: Message = {
        id: uuidv4(),
        chatId,
        content: 'Error processing your message',
        owner: 'System',
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    chats,
    messages,
    isLoading,
    error,
    createChat,
    fetchChats,
    fetchMessages,
    sendMessage,
  };
};