import dayjs from "dayjs";
import { orderBy } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../api/FetchData";
import { postData } from "../api/PostData";
import { validateMap } from "../helpers/ValidateChatbotAnswers";
import { TChatbotQuestion, TChatbotSubmission } from "../types/TChatbot";
import { TMessage, TMessageBotQuestionData } from "../types/TMessage";
import { TripDto } from "../types/dto/common/TripDto";

export const useChatbotController = () => {
    const [messages, setMessages] = useState<TMessage[]>([]);
    const [questions, setQuestions] = useState<TChatbotQuestion[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const [submissions, setSubmissions] = useState<TChatbotSubmission[]>([]);
    const navigate = useNavigate();

    const displayQuestion = useCallback((questions: TChatbotQuestion[], index: number) => {
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
                displayName: "bot",
                id: "0",
            },
            sentAt: dayjs().toISOString(),
        };
        setMessages(prev => [...prev, newMessage]);
    }, []);

    useEffect(() => {
        const onMount = async () => {
            const response = await fetchData.getChatbotFlow();
            const sortedQuestions = orderBy(response.questions, "sort");
            setQuestions(sortedQuestions);
            displayQuestion(sortedQuestions, 0);
        };

        onMount();
    }, [displayQuestion]);

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
                checkIfLastQuestion(currentQuestion, answerValue);
            } else {
                const newMessage: TMessage = {
                    data: "choose from the provided options",
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
        } else if (currentQuestion.type === "multiple-choices") {
            if (answerValue === "submit") {
                displayQuestion(questions, currentQuestionIndex + 1);
            } else if (answerCode || answerLabel) {
                addResponseToSubmission(currentQuestion, answerValue);
            } else {
                const newMessage: TMessage = {
                    data: "choose from the provided options",
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
        } else if (currentQuestion.type === "text") {
            if (currentQuestion.validation) {
                textQuestionValidation(answerValue, currentQuestion);
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
    const checkIfLastQuestion = (currentQuestion: TChatbotQuestion, answerValue: string) => {
        if (currentQuestionIndex === questions.length - 1) {
            submitAnswers();
        } else {
            addResponseToSubmission(currentQuestion, answerValue);
            displayQuestion(questions, currentQuestionIndex + 1);
        }
    };
    const submitAnswers = async () => {
        const _trip = await postData.postSubmission(submissions);
        setValue("trip", _trip);
        navigate("/trip");
        // console.log(localStorage.getItem("trip"));
    };
    const setValue = (key: string, value: TripDto) => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.log(error);
        }
    };

    return {
        messages,
        handleChatInput,
        handleAnswerSelect,
    };
};
