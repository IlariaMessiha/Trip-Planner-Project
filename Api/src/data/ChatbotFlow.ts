import { TChatbotFlow } from "src/types/TChatbot";

export const flow: TChatbotFlow = {
    questions: [
        {
            code: "travelingWith",
            sort: 1,
            text: "Who are you traveling with?",
            type: "single-choice",
            searchTargets: ["attractions"],
            answers: [
                {
                    code: "myself",
                    text: "Myself",
                    filter: {
                        tags: { in: ["solo", "myself"] },
                    },
                },
                {
                    code: "family",
                    text: "My family",
                    filter: {
                        tags: { in: ["family", "kids", "baby"] },
                    },
                },
                {
                    code: "friends",
                    text: "My friends",
                    filter: {
                        tags: { in: ["friends"] },
                    },
                },
                {
                    code: "colleagues",
                    text: "My colleagues",
                    filter: {
                        tags: { in: ["colleagues", "business", "work", "formal"] },
                    },
                },
                {
                    code: "couple",
                    text: "As a couple",
                    filter: {
                        tags: { in: ["couple", "romantic"] },
                    },
                },
            ],
        },
        {
            code: "minAge",
            sort: 2,
            text: "What is the minimum age of your group ?If traveling alone how old are you?",
            type: "text",
            searchTargets: ["attractions", "restaurants"],
            validation: {
                type: "valid-age",
                onError: {
                    text: "Age is not valid",
                    action: "retry",
                },
            },
            shouldAskIf: {
                travelingWith: { in: ["family", "friends"] },
            },
            filter: {
                minAge: { lte: "$value" },
            },
        },

        {
            code: "tripDuration",
            sort: 4,
            text: "How long are you planning to stay ?",
            type: "text",
            searchTargets: ["global"],
            filter: {
                tripDuration: { equals: "$value" },
            },
            validation: {
                type: "valid-duration",
                onError: {
                    text: "Duration is not valid",
                    action: "retry",
                },
            },
        },
        {
            code: "preferredDestination",
            sort: 5,
            text: "What is your preferred destination (country, city) ? type 'any' if you don't have a preference",
            type: "text",
            searchTargets: ["attractions", "restaurants"],
            validation: {
                type: "existing-destination",
                onError: {
                    text: "We do not support this destination yet. Please try another one.",
                    action: "retry",
                },
            },
            filter: {
                preferredDestination: { equals: "$value" },
            },
        },
        {
            code: "preferredThemes",
            sort: 6,
            text: "What kind of experiences are you seeking during your trip?",
            type: "multiple-choices",
            filterAggregation: "or",
            searchTargets: ["attractions"],
            answers: [
                {
                    code: "physicalActivity",
                    text: "Physical activity",
                    filter: {
                        tags: {
                            in: [
                                "adventure",
                                "adrenaline",
                                "extreme",
                                "sports",
                                "physical-activity",
                            ],
                        },
                    },
                },
                {
                    code: "culture",
                    text: "Culture",
                    filter: {
                        tags: { in: ["culture", "history", "heritage", "architecture"] },
                    },
                },
                {
                    code: "nature",
                    text: "Nature",
                    filter: {
                        tags: {
                            in: ["nature", "wildlife", "animals", "beach", "camping", "landscape"],
                        },
                    },
                },
                {
                    code: "relaxation",
                    text: "Relaxation and wellness",
                    filter: {
                        tags: { in: ["relaxation", "spa", "massage"] },
                    },
                },
                {
                    code: "shopping",
                    text: "Shopping",
                    filter: {
                        tags: { in: ["shopping", "boutiques"] },
                    },
                },
                {
                    code: "hiking",
                    text: "Hiking",
                    filter: {
                        tags: { in: ["hiking", "trekking"] },
                    },
                },
                {
                    code: "cycling",
                    text: "Cycling",
                    filter: {
                        tags: { in: ["cycling", "biking"] },
                    },
                },
                {
                    code: "waterSports",
                    text: "Water sports",
                    filter: {
                        tags: { in: ["water-sports", "surfing", "kayaking", "snorkeling"] },
                    },
                },
                {
                    code: "skiing",
                    text: "Skiing",
                    filter: {
                        tags: { in: ["skiing", "snowboarding"] },
                    },
                },
            ],
        },

        {
            code: "foodPreferences",
            sort: 8,
            text: "What are your food preferences ?",
            type: "multiple-choices",
            searchTargets: ["restaurants"],
            filterAggregation: "and",
            answers: [
                {
                    code: "vegan",
                    text: "Vegan",
                    filter: {
                        tags: { in: ["food-category:vegan"] },
                    },
                },
                {
                    code: "vegetarian",
                    text: "Vegetarian",
                    filter: {
                        tags: { in: ["food-category:vegetarian"] },
                    },
                },
                {
                    code: "halal",
                    text: "Halal",
                    filter: {
                        tags: { in: ["food-category:halal"] },
                    },
                },
                {
                    code: "healthy",
                    text: "Healthy",
                    filter: {
                        tags: { in: ["food-category:healthy"] },
                    },
                },
                {
                    code: "mediterranean",
                    text: "Mediterranean",
                    filter: {
                        tags: { in: ["food-category:mediterranean "] },
                    },
                },
                {
                    code: "asian",
                    text: "Asian",
                    filter: {
                        tags: { in: ["food-category:asian"] },
                    },
                },
                {
                    code: "pescatarian",
                    text: "Pescatarian",
                    filter: {
                        tags: { in: ["food-category:pescatarian"] },
                    },
                },
                {
                    code: "italian",
                    text: "Italian",
                    filter: {
                        tags: { in: ["food-category:Italian"] },
                    },
                },
                {
                    code: "nothingSpecific",
                    text: "Nothing specific",
                    filter: {},
                },
            ],
        },
        {
            code: "submitQuestion",
            sort: 9,
            text: "You are all set ! We will now search for the best options for your trip.",
            type: "submit",
            searchTargets: [],
        },
    ],
};
