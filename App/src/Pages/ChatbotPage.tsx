import { Container } from "../Components/core/layout/Container";
import { ChatInput } from "../Components/widgets/chat/ChatInput";
import { ChatMessages } from "../Components/widgets/chat/ChatMessages";
import { useChatbotController } from "../hooks/useChatbotController";
import styles from "./ChatbotPage.module.css";

export const ChatbotPage = () => {
    const { messages, currentQuestion, handleChatInput, handleAnswerSelect } =
        useChatbotController();

    return (
        <Container className={styles.container}>
            <div className={styles.chat}>
                <ChatMessages messages={messages} />
            </div>
            <div className={styles.input}>
                <ChatInput
                    currentQuestion={currentQuestion}
                    onTextSubmit={handleChatInput}
                    onAnswerSelect={handleAnswerSelect}
                />
            </div>
        </Container>
    );
};
