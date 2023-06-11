import { Container } from "../Components/core/layout/Container";
import { ChatInput } from "../Components/widgets/chat/ChatInput";
import { ChatMessages } from "../Components/widgets/chat/ChatMessages";
import { useChatbotController } from "../hooks/useChatbotController";
import styles from "./ChatbotPage.module.css";

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
