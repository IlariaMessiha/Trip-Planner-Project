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
};

export type TChatbotQuestionType = "text" | "multiple-choices" | "single-choice";

export type TChatbotAnswer = {
    code: string;
    text: string;
    filter?: TChatbotFilter;
};
export type TChatbotFilterKey =
    | "globalBudget"
    | "globalPreferredDestination"
    | "globalTripDuration"
    | string;

export type TChatbotFilter = {
    [key: TChatbotFilterKey]: {
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
