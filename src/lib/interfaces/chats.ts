export interface Chat {
    id: string;
    animalId: string;
    title: string;
    created_at: string;
    updated_at: string;
    lastMessage?: Message;
}

export interface Message {
    id: string;
    chatId: string;
    content: string;
    owner: 'User' | 'IA' | 'System';
    created_at: string;
}
