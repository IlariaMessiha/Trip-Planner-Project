import { Container } from "../Components/core/layout/Container";
import { PageLayout } from "../Components/core/layout/PageLayout";
import { ChatInput } from "../Components/widgets/chat/ChatInput";
import { ChatMessages } from "../Components/widgets/chat/ChatMessages";
import { useChatbotController } from "../hooks/useChatbotController";
import styles from "./ChatbotPage.module.css";

export const ChatbotPage = () => {
    const {
        messages,
        isSubmitting,
        currentQuestion,
        handleChatInput,
        handleAnswerSelect,
        submitAndGoToTrip,
        loggedInUser,
    } = useChatbotController();

    return (
        <PageLayout className={styles.page}>
            <Container className={styles.container}>
                <div className={styles.chat}>
                    <ChatMessages messages={messages} />
                </div>
                <div className={styles.input}>
                    <ChatInput
                        isSubmitting={isSubmitting}
                        currentQuestion={currentQuestion}
                        onTextSubmit={handleChatInput}
                        onAnswerSelect={handleAnswerSelect}
                        submitAndGoToTrip={submitAndGoToTrip}
                    />
                </div>
            </Container>
        </PageLayout>
    );
};
