import { useEffect, useState } from "react";
import { TMessage, TMessageBotQuestionData } from "../types/TMessage";
import { flow } from "../data/chatbot-flow";
import dayjs from "dayjs";
import { orderBy } from "lodash";

export const useChatbotController = () => {
    const [messages, setMessages] = useState<TMessage[]>([]);

    useEffect(() => {
        const question = orderBy(flow.questions, "sort")[0];
        if (!question) {
            throw new Error("no questions");
        }

        const botQuestion: TMessageBotQuestionData = {
            code: question.code,
            text: question.text,
            type: question.type,
            answers: question.answers?.map(answer => ({
                code: answer.code,
                text: answer.text,
            })),
        };
        const newMessage: TMessage = {
            data: botQuestion,
            dataType: "bot-question",
            sender: {
                avatar: "",
                displayName: "ilaria",
                id: "1",
            },
            sentAt: dayjs().toISOString(),
        };
        setMessages([newMessage]);
    }, []);
    const handleChatInput = (value: string) => {
        const newMessage: TMessage = {
            data: value,
            dataType: "text",
            sender: {
                avatar: "",
                displayName: "ilaria",
                id: "1",
            },
            sentAt: dayjs().toISOString(),
        };
        setMessages(prev => [...prev, newMessage]);
        treatAnswer();
    };
    const handleAnswerSelect = (code: string) => {
        const newMessage: TMessage = {
            // TODO display label not code
            data: code,
            dataType: "text",
            sender: {
                avatar: "",
                displayName: "ilaria",
                id: "1",
            },
            sentAt: dayjs().toISOString(),
        };
        setMessages(prev => [...prev, newMessage]);
        treatAnswer();
    };

    const treatAnswer = () => {
        // TODO action treat answer
    };

    return {
        messages,
        handleChatInput,
        handleAnswerSelect,
    };
};
