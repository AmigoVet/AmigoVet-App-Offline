export interface Message{
    id: string;
    message: string;
    owner: "User" | "IA";
}