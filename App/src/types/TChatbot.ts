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

export type TChatbotQuestionType = "text" | "multiple-choices" | "single-choice" | "submit";

export type TChatbotAnswer = {
    code: string;
    text: string;
    filter?: TChatbotFilter;
};

export type TChatbotFilter = {
    [key: string]: {
        $eq?: string;
        $in?: string[];
        $gte?: string;
        $lte?: string;
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
