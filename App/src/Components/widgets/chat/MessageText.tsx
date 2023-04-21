import { Card, Typography } from "@mui/material";
import styles from "./MessageText.module.css";
import { TMessage } from "../../../types/TMessage";
import { FC } from "react";
interface MessageTextProps {
    message: TMessage;
}
export const MessageText: FC<MessageTextProps> = ({ message }) => {
    return (
        <Card elevation={0} sx={{ backgroundColor: "#1976d2" }} className={styles.answer}>
            <Typography sx={{ color: "white" }}>{message.data}</Typography>
        </Card>
    );
};
