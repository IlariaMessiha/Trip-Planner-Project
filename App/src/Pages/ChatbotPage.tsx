import { Button, Card, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import styles from "./ChatbotPage.module.css";
import { Container } from "../Components/core/layout/Container";
import { useEffect, useState } from "react";

export const ChatbotPage = () => {
    const [userInput, setUserInput] = useState<string>("");
    const [answers, setAnswers] = useState<string[]>([]);
    const question1 = "Are you traveling with";
    const choices1 = ["family", "friends", "work", "alone"];

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (userInput) setAnswers(answers => [...answers, userInput]);
        setUserInput("");
    };
    const handleInputChange = (e: any) => {
        setUserInput(e.target.value);
    };

    return (
        <Container className={styles.container}>
            <div className={styles.chat}>
                <div className={styles.conversation}>
                    <div className={styles.chatbotMessage}>
                        <Card elevation={0} className={styles.chatbotQuestion}>
                            <Typography>{question1}</Typography>
                        </Card>
                        <div className={styles.choices}>
                            {choices1.map((choice, i) => {
                                return (
                                    <Button
                                        variant="contained"
                                        key={i}
                                        onClick={() => {
                                            setAnswers(answers => [...answers, choice]);
                                        }}
                                    >
                                        <Typography>{choice}</Typography>
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                    <div className={styles.userMessage}>
                        {answers &&
                            answers.map((answer, i) => (
                                <Card
                                    key={i}
                                    elevation={0}
                                    sx={{ backgroundColor: "#1976d2" }}
                                    className={styles.answer}
                                >
                                    <Typography sx={{ color: "white" }}>{answer}</Typography>
                                </Card>
                            ))}
                    </div>
                </div>
                <div className={styles.conversation}>
                    <div className={styles.chatbotMessage}>
                        <Card elevation={0} className={styles.chatbotQuestion}>
                            <Typography>{question1}</Typography>
                        </Card>
                        <div className={styles.choices}>
                            {choices1.map((choice, i) => {
                                return (
                                    <Button
                                        variant="contained"
                                        key={i}
                                        onClick={() => {
                                            setAnswers(answers => [...answers, choice]);
                                        }}
                                    >
                                        <Typography>{choice}</Typography>
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                    <div className={styles.userMessage}>
                        {answers &&
                            answers.map((answer, i) => (
                                <Card
                                    key={i}
                                    elevation={0}
                                    sx={{ backgroundColor: "#1976d2" }}
                                    className={styles.answer}
                                >
                                    <Typography sx={{ color: "white" }}>{answer}</Typography>
                                </Card>
                            ))}
                    </div>
                </div>
                <div className={styles.conversation}>
                    <div className={styles.chatbotMessage}>
                        <Card elevation={0} className={styles.chatbotQuestion}>
                            <Typography>{question1}</Typography>
                        </Card>
                        <div className={styles.choices}>
                            {choices1.map((choice, i) => {
                                return (
                                    <Button
                                        variant="contained"
                                        key={i}
                                        onClick={() => {
                                            setAnswers(answers => [...answers, choice]);
                                        }}
                                    >
                                        <Typography>{choice}</Typography>
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                    <div className={styles.userMessage}>
                        {answers &&
                            answers.map((answer, i) => (
                                <Card
                                    key={i}
                                    elevation={0}
                                    sx={{ backgroundColor: "#1976d2" }}
                                    className={styles.answer}
                                >
                                    <Typography sx={{ color: "white" }}>{answer}</Typography>
                                </Card>
                            ))}
                    </div>
                </div>
            </div>
            <form className={styles.input} onSubmit={handleSubmit}>
                <TextField
                    label="Response"
                    variant="outlined"
                    onChange={handleInputChange}
                    value={userInput}
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton edge="end" type="submit" onClick={handleSubmit}>
                                    <SendIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </form>
        </Container>
    );
};
