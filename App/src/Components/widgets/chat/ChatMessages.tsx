import { FC } from "react";
import { TMessage } from "../../../types/TMessage";
import { Message } from "./Message";

interface ChatMessagesProps {
    messages: TMessage[];
}
export const ChatMessages: FC<ChatMessagesProps> = ({ messages }) => {
    return (
        <div>
            {messages.map((message, i) => {
                return <Message message={message} key={i} />;
            })}
        </div>
    );
};
