import { useState } from "react";
import { TMessage } from "../types/TMessage";
import dayjs from "dayjs";

export const useChatbotController = () => {
    const [messages, setMessages] = useState<TMessage[]>([]);

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
    };
    const handleAnswerSelect = (code: string) => {};
    return {
        messages,
        handleChatInput,
        handleAnswerSelect,
    };
};
