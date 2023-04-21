import { ChatbotQuestionType } from "./Chatbot";

export interface Message {
    sender: MessageUser;
    dataType: "text" | "bot-question";
    data: string | MessageBotQuestionData;
    sentAt: string;
}
export interface MessageUser {
    displayName: string;
    avatar: string;
    id: string;
}
export interface MessageBotQuestionData {
    code: string;
    type: ChatbotQuestionType;
    text: string;
    answers: { code: string; text: string }[];
}
