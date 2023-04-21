export type ChatbotFlow = {
    questions: ChatbotQuestion[];
};
export type ChatbotQuestion = {
    code: string;
    sort: number;
    text: string;
    type: ChatbotQuestionType;
    answers?: ChatbotAnswer[];
    filter?: ChatbotFilter;
    filterAggregation?: "and" | "or";
    shouldAskIf?: ChatbotFilter;
    validation?: ChatbotValidation;
};

export type ChatbotQuestionType = "text" | "multiple-choices" | "single-choice";

export type ChatbotAnswer = {
    code: string;
    text: string;
    filter: ChatbotFilter;
};

export type ChatbotFilter = {
    [key: string]: {
        $eq?: string;
        $in?: string[];
        $gte?: string;
        $lte?: string;
    };
};

export type ChatbotValidation = {
    type: string;
    onError: {
        text: string;
        action: "retry" | "skip";
    };
};
