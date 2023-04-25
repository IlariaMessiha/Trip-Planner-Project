import { fetchData } from "../api/FetchData";
import { TChatbotAnswer, TChatbotQuestion } from "../types/TChatbot";
import { GetDestinationNameDto } from "../types/dto/destination/GetDestinationsDto";

export const validateMap = {
    "existing-destination": async (answerValue: string) => {
        const destinations = await fetchData.getDestinations();
        if (
            destinations?.citiesName.find(
                cityName => cityName.toLowerCase() === answerValue.toLowerCase()
            ) ||
            destinations?.countriesName.find(
                countryName => countryName.toLowerCase() === answerValue.toLowerCase()
            ) ||
            "any"
        ) {
            return true;
        }
    },
    "valid-age": async (answerValue: string) => {
        const age = Number(answerValue);
        if (age > 0 && age < 100) {
            return true;
        }
    },
    "valid-duration": async (answerValue: string) => {
        const duration = Number(answerValue);
        if (duration >= 1 && duration <= 20) {
            return true;
        }
    },
};

// validateMap["existing-destination"]();
