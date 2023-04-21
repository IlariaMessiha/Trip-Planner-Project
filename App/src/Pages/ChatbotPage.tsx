import { Button, Card, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import styles from "./ChatbotPage.module.css";
import { Container } from "../Components/core/layout/Container";
import { useEffect, useState } from "react";
import { TMessage, TMessageBotQuestionData } from "../types/TMessage";
import { TMessageUser } from "../types/TMessage";
import { ChatMessages } from "../Components/widgets/chat/ChatMessages";
import { ChatInput } from "../Components/widgets/chat/ChatInput";

export const ChatbotPage = () => {
    const messageUser: TMessageUser = {
        avatar: "hello",
        displayName: "ilaria refaat",
        id: "1",
    };
    const chatbotQuestion: TMessageBotQuestionData = {
        code: "traveling-with",
        text: "Who are you traveling with",
        answers: [
            { code: "family", text: "Family" },
            { code: "work", text: "Work" },
        ],
        type: "single-choice",
    };
    const messages: TMessage[] = [
        {
            data: chatbotQuestion,
            dataType: "bot-question",
            sender: messageUser,
            sentAt: "4/21/2023",
        },
    ];

    return (
        <Container className={styles.container}>
            <div className={styles.chat}>
                <ChatMessages messages={messages} />
            </div>
            <div className={styles.input}>
                <ChatInput />
            </div>
        </Container>
    );
};
