import { FC } from "react";
import { ChatInputText } from "./ChatInputText";
import { TChatbotAnswer, TChatbotQuestion } from "../../../types/TChatbot";
import { ChatInputSelect } from "./ChatInputSelect";
import { ChatSubmit } from "./ChatSubmit";

interface ChatInputProps {
    currentQuestion: TChatbotQuestion;
    isSubmitting: boolean;
    onTextSubmit: (value: string) => void;
    onAnswerSelect: (values: TChatbotAnswer[]) => void;
    submitAndGoToTrip: () => void;
}
export const ChatInput: FC<ChatInputProps> = ({
    currentQuestion,
    isSubmitting,
    onTextSubmit,
    onAnswerSelect,
    submitAndGoToTrip,
}) => {
    if (!currentQuestion) {
        return null;
    }
    if (
        currentQuestion.answers &&
        ["multiple-choices", "single-choice"].includes(currentQuestion.type)
    ) {
        return (
            <ChatInputSelect
                options={currentQuestion.answers}
                isMultiSelect={currentQuestion.type === "multiple-choices"}
                onSubmit={onAnswerSelect}
            />
        );
    }

    if (currentQuestion.type === "submit") {
        return <ChatSubmit isSubmitting={isSubmitting} onSubmit={submitAndGoToTrip} />;
    }

    return <ChatInputText onSubmit={onTextSubmit} />;
};
