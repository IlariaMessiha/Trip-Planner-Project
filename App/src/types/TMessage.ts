import { TChatbotQuestionType } from "./TChatbot";

export type TMessage = {
    sender: TMessageUser;
    dataType: "text" | "bot-question";
    data: string | TMessageBotQuestionData;
    sentAt: string;
};
export type TMessageUser = {
    displayName: string;
    avatar: string;
    id: string;
};
export type TMessageBotQuestionData = {
    code: string;
    type: TChatbotQuestionType;
    text: string;
    answers: { code: string; text: string }[];
};
