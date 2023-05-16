import { Button, Card, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import styles from "./ChatbotPage.module.css";
import { Container } from "../Components/core/layout/Container";
import { useEffect, useState } from "react";
import { TMessage, TMessageBotQuestionData } from "../types/TMessage";
import { TMessageUser } from "../types/TMessage";
import { ChatMessages } from "../Components/widgets/chat/ChatMessages";
import { ChatInput } from "../Components/widgets/chat/ChatInput";
import { useChatbotController } from "../hooks/useChatbotController";

export const ChatbotPage = () => {
    const { messages, handleChatInput, handleAnswerSelect } = useChatbotController();
    return (
        <Container className={styles.container}>
            <div className={styles.chat}>
                <ChatMessages messages={messages} onAnswerSelect={handleAnswerSelect} />
            </div>
            <div className={styles.input}>
                <ChatInput onSubmit={handleChatInput} />
            </div>
        </Container>
    );
};
