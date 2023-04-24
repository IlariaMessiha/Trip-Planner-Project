import { useEffect, useState } from "react";
import { TMessage, TMessageBotQuestionData } from "../types/TMessage";
import { flow } from "../data/chatbot-flow";
import dayjs from "dayjs";
import { orderBy } from "lodash";
import { TChatbotQuestion, TChatbotSubmission } from "../types/TChatbot";
import { GetDestinationNameDto } from "../types/dto/destination/GetDestinationsDto";
import { fetchData } from "../api/FetchData";
import { validateMap } from "../helpers/ValidateChatbotAnswers";

export const useChatbotController = () => {
    const [messages, setMessages] = useState<TMessage[]>([]);
    const [questions, setQuestions] = useState<TChatbotQuestion[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [destinations, setDestinations] = useState<GetDestinationNameDto>();

    const [submissions, setSubmissions] = useState<TChatbotSubmission[]>([]);

    useEffect(() => {
        const sortedQuestions = orderBy(flow.questions, "sort");
        setQuestions(sortedQuestions);
        displayQuestion(sortedQuestions, currentQuestionIndex);
    }, []);

    const displayQuestion = (questions: TChatbotQuestion[], index: number) => {
        setCurrentQuestionIndex(index);

        const currentQuestion = questions[index];
        if (!currentQuestion) {
            throw new Error("index not found");
        }

        const botQuestion: TMessageBotQuestionData = {
            code: currentQuestion.code,
            text: currentQuestion.text,
            type: currentQuestion.type,
            answers: currentQuestion.answers?.map(answer => ({
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
        if (messages.length === 0) {
            setMessages([newMessage]);
        } else {
            setMessages(prev => [...prev, newMessage]);
        }
    };
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
        treatAnswer(value);
    };
    const handleAnswerSelect = (code: string, label: string) => {
        const newMessage: TMessage = {
            data: label,
            dataType: "text",
            sender: {
                avatar: "",
                displayName: "ilaria",
                id: "1",
            },
            sentAt: dayjs().toISOString(),
        };
        if (!(code === "submit")) {
            setMessages(prev => [...prev, newMessage]);
        }

        treatAnswer(code);
    };
    const addResponseToSubmission = (currentQuestion: TChatbotQuestion, answerValue: string) => {
        const newSubmission: TChatbotSubmission = {
            questionCode: currentQuestion.code,
            questionType: currentQuestion.type,
            value: answerValue,
        };
        setSubmissions(prev => [...prev, newSubmission]);
    };

    const treatAnswer = (answerValue: string) => {
        const currentQuestion = questions[currentQuestionIndex];

        const answerCode = currentQuestion.answers?.find(
            answer => answer.code.toLowerCase() === answerValue.toLowerCase()
        );
        const answerLabel = currentQuestion.answers?.find(
            answer => answer.text.toLowerCase() === answerValue.toLowerCase()
        );
        if (!currentQuestion) {
            throw new Error("index not found");
        }
        if (currentQuestion.type === "single-choice") {
            if (answerCode || answerLabel) {
                addResponseToSubmission(currentQuestion, answerValue);
                displayQuestion(questions, currentQuestionIndex + 1);
            }
        } else if (currentQuestion.type === "multiple-choices") {
            if (answerValue === "submit") {
                displayQuestion(questions, currentQuestionIndex + 1);
            } else if (answerCode || answerLabel) {
                addResponseToSubmission(currentQuestion, answerValue);
            }
        } else if (currentQuestion.type == "text") {
            if (currentQuestion.validation) {
                textQuestionValidation(answerValue, currentQuestion);
            } else {
                addResponseToSubmission(currentQuestion, answerValue);
                displayQuestion(questions, currentQuestionIndex + 1);
            }
        }
    };
    const textQuestionValidation = async (
        answerValue: string,
        currentQuestion: TChatbotQuestion
    ) => {
        const validate = validateMap[currentQuestion.validation?.type as keyof typeof validateMap];
        if (await validate(answerValue)) {
            addResponseToSubmission(currentQuestion, answerValue);
            displayQuestion(questions, currentQuestionIndex + 1);
        } else {
            const newMessage: TMessage = {
                data: currentQuestion.validation?.onError.text,
                dataType: "text",
                sender: {
                    avatar: "",
                    displayName: "bot",
                    id: "0",
                },
                sentAt: dayjs().toISOString(),
            };
            setMessages(prev => [...prev, newMessage]);
            displayQuestion(questions, currentQuestionIndex);
        }
    };

    return {
        messages,
        handleChatInput,
        handleAnswerSelect,
    };
};
