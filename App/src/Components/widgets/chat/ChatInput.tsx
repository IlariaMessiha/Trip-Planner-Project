import { FC } from "react";
import { ChatInputText } from "./ChatInputText";
import { TChatbotAnswer, TChatbotQuestion } from "../../../types/TChatbot";
import { ChatInputSelect } from "./ChatInputSelect";

interface ChatInputProps {
    currentQuestion: TChatbotQuestion;
    onTextSubmit: (value: string) => void;
    onAnswerSelect: (values: TChatbotAnswer[]) => void;
}
export const ChatInput: FC<ChatInputProps> = ({
    currentQuestion,
    onTextSubmit,
    onAnswerSelect,
}) => {
    if (!currentQuestion) {
        return null;
    }
    if (currentQuestion.answers) {
        return (
            <ChatInputSelect
                options={currentQuestion.answers}
                isMultiSelect={currentQuestion.type === "multiple-choices"}
                onSubmit={onAnswerSelect}
            />
        );
    }
    return <ChatInputText onSubmit={onTextSubmit} />;
};
