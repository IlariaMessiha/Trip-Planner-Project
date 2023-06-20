import dayjs from "dayjs";
import { orderBy } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../api/FetchData";
import { postData } from "../api/PostData";
import { validateMap } from "../helpers/ValidateChatbotAnswers";
import { TChatbotAnswer, TChatbotQuestion, TChatbotSubmission } from "../types/TChatbot";
import { TMessage, TMessageBotQuestionData } from "../types/TMessage";
import { useAuthContext } from "../context/authContext";

export const useChatbotController = () => {
    const [messages, setMessages] = useState<TMessage[]>([]);
    const [questions, setQuestions] = useState<TChatbotQuestion[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const { loggedInUser } = useAuthContext();

    const [submissions, setSubmissions] = useState<TChatbotSubmission[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

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
                id: 0,
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
        if (!loggedInUser) return;
        const newMessage: TMessage = {
            data: value,
            dataType: "text",
            sender: {
                avatar: "",
                displayName: loggedInUser.firstName,
                id: loggedInUser.id,
            },
            sentAt: dayjs().toISOString(),
        };
        setMessages(prev => [...prev, newMessage]);

        treatTextAnswer(value);
    };
    const handleAnswerSelect = (values: TChatbotAnswer[]) => {
        if (!loggedInUser) return;
        if (values.length === 0) {
            return;
        }

        const newMessage: TMessage = {
            data: values.map(value => value.text).join(", "),
            dataType: "text",
            sender: {
                avatar: "",
                displayName: loggedInUser?.firstName,
                id: loggedInUser.id,
            },
            sentAt: dayjs().toISOString(),
        };
        setMessages(prev => [...prev, newMessage]);

        treatSelectAnswer(values);
    };
    const addResponseToSubmission = (currentQuestion: TChatbotQuestion, answerValue: string) => {
        const newSubmission: TChatbotSubmission = {
            questionCode: currentQuestion.code,
            questionType: currentQuestion.type,
            value: answerValue,
        };
        setSubmissions(prev => [...prev, newSubmission]);
    };

    const treatSelectAnswer = (values: TChatbotAnswer[]) => {
        const currentQuestion = questions[currentQuestionIndex];

        if (!currentQuestion) {
            throw new Error("index not found");
        }

        values.forEach(value => {
            addResponseToSubmission(currentQuestion, value.code);
        });
        displayQuestion(questions, currentQuestionIndex + 1);
    };

    const treatTextAnswer = async (answerValue: string) => {
        const currentQuestion = questions[currentQuestionIndex];

        const validate = validateMap[currentQuestion.validation?.type as keyof typeof validateMap];
        if (!validate) {
            addResponseToSubmission(currentQuestion, answerValue);
            return;
        }

        const isValidationOk = await validate(answerValue);

        if (isValidationOk) {
            addResponseToSubmission(currentQuestion, answerValue);
            displayQuestion(questions, currentQuestionIndex + 1);
        } else {
            const newMessage: TMessage = {
                data: currentQuestion.validation?.onError.text,
                dataType: "text",
                sender: {
                    avatar: "",
                    displayName: "bot",
                    id: 0,
                },
                sentAt: dayjs().toISOString(),
            };
            setMessages(prev => [...prev, newMessage]);
            displayQuestion(questions, currentQuestionIndex);
        }
    };

    const submitAndGoToTrip = async () => {
        try {
            setIsSubmitting(true);
            const _trip = await postData.postSubmission(submissions);
            navigate(`/profile/trip/${_trip.id}`);
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        messages,
        currentQuestion: questions[currentQuestionIndex],
        isSubmitting,
        handleChatInput,
        handleAnswerSelect,
        submitAndGoToTrip,
        loggedInUser,
    };
};
