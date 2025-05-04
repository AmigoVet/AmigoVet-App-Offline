import { useState, useCallback } from 'react';
import { Transaction, SQLError } from 'react-native-sqlite-storage';
import { questionIA } from '../api/artificialInteligence';
import { db } from '../db/db';
import { Animal } from '../interfaces/Animal';
import { Chat, Message } from '../interfaces/chats';

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

    try {
      await new Promise<void>((resolve, reject) => {
        db.transaction((tx: Transaction) => {
          tx.executeSql(
            `INSERT INTO Chats (id, animalId, title, created_at, updated_at) VALUES (?, ?, ?, ?, ?)`,
            [chatId, animalId, title, now, now],
            () => resolve(),
            (_: Transaction, error: SQLError) => {
              reject(error);
              return false;
            }
          );
        });
      });

      setChats((prev) => [...prev, { id: chatId, animalId, title, created_at: now, updated_at: now }]);
    } catch (err) {
      setError('Error creating chat');
      console.error('[ERROR] Error creating chat:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchChats = useCallback(async () => {
    setIsLoading(true);
    try {
      const results = await new Promise<Chat[]>((resolve, reject) => {
        db.transaction((tx: Transaction) => {
          tx.executeSql(
            `SELECT * FROM Chats ORDER BY updated_at DESC`,
            [],
            (_: Transaction, { rows }: { rows: any }) => {
              const chats: Chat[] = [];
              for (let i = 0; i < rows.length; i++) {
                chats.push(rows.item(i));
              }
              resolve(chats);
            },
            (_: Transaction, error: SQLError) => {
              reject(error);
              return false;
            }
          );
        });
      });
      setChats(results);
    } catch (err) {
      setError('Error fetching chats');
      console.error('[ERROR] Error fetching chats:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchMessages = useCallback(async (chatId: string) => {
    setIsLoading(true);
    try {
      const results = await new Promise<Message[]>((resolve, reject) => {
        db.transaction((tx: Transaction) => {
          tx.executeSql(
            `SELECT * FROM Messages WHERE chatId = ? ORDER BY created_at ASC`,
            [chatId],
            (_: Transaction, { rows }: { rows: any }) => {
              const messages: Message[] = [];
              for (let i = 0; i < rows.length; i++) {
                messages.push(rows.item(i));
              }
              resolve(messages);
            },
            (_: Transaction, error: SQLError) => {
              reject(error);
              return false;
            }
          );
        });
      });
      setMessages(results);
    } catch (err) {
      setError('Error fetching messages');
      console.error('[ERROR] Error fetching messages:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const sendMessage = useCallback(async (chatId: string, animal: Animal, content: string) => {
    if (!content.trim()) return;

    setIsLoading(true);
    const now = new Date().toISOString();
    const messageId = Math.random().toString(36).substr(2, 9);
    const userMessage: Message = {
      id: messageId,
      chatId,
      content,
      owner: 'User',
      created_at: now,
    };

    try {
      // Save user message
      await new Promise<void>((resolve, reject) => {
        db.transaction((tx: Transaction) => {
          tx.executeSql(
            `INSERT INTO Messages (id, chatId, content, owner, created_at) VALUES (?, ?, ?, ?, ?)`,
            [messageId, chatId, content, 'User', now],
            () => resolve(),
            (_: Transaction, error: SQLError) => {
              reject(error);
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
              reject(error);
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

      const aiMessageId = Math.random().toString(36).substr(2, 9);
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
              reject(error);
              return false;
            }
          );
        });
      });

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setError('Error sending message');
      console.error('[ERROR] Error sending message:', err);
      const errorMessage: Message = {
        id: Math.random().toString(36).substr(2, 9),
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