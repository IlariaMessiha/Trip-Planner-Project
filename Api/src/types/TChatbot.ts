export type TChatbotFlow = {
    questions: TChatbotQuestion[];
};
export type TChatbotQuestion = {
    code: string;
    sort: number;
    text: string;
    type: TChatbotQuestionType;
    answers?: TChatbotAnswer[];
    filter?: TChatbotFilter;
    filterAggregation?: "and" | "or";
    shouldAskIf?: TChatbotFilter;
    validation?: TChatbotValidation;
    searchTargets: TChatbotQuestionSearchTarget[];
};

export type TChatbotQuestionSearchTarget = "attractions" | "restaurants" | "global";
export type TChatbotQuestionType = "text" | "multiple-choices" | "single-choice" | "submit";

export type TChatbotAnswer = {
    code: string;
    text: string;
    filter?: TChatbotFilter;
};

export type TChatbotFilter = {
    [key: string]: {
        equals?: string;
        not?: string;
        in?: string[];
        notIn?: string[];
        gte?: string;
        gt?: string;
        lte?: string;
        lt?: string;
        contains?: string;
        startsWith?: string;
        endsWith?: string;
    };
};

export type TChatbotValidation = {
    type: string;
    onError: {
        text: string;
        action: "retry" | "skip";
    };
};

export type TChatbotSubmission = {
    questionCode: string;
    questionType: TChatbotQuestionType;
    value: string;
};
