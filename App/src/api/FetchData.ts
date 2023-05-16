import Axios from "axios";

import { GetAttractionResponseDto } from "../types/dto/attractions/GetAttractionResponseDto";
import { GetCityResponseDto } from "../types/dto/cities/GetCityResponseDto";
import { AttractionDto } from "../types/dto/common/AttractionDto";
import { CityDto } from "../types/dto/common/CityDto";
import { GetDashboardResponseDto } from "../types/dto/dashboard/GetDashboardResponse";
import { GetDestinationNameDto } from "../types/dto/destination/GetDestinationsDto";
import { TChatbotFlow } from "../types/TChatbot";

const API_BASE_URL = "http://localhost:3333";

export class FetchData {
    public async getAttraction(id: string) {
        const response = await Axios.get<GetAttractionResponseDto>(
            `${API_BASE_URL}/attractions/${id}`
        );
        return response.data;
    }
    public async getCity(id: string) {
        const response = await Axios.get<GetCityResponseDto>(`${API_BASE_URL}/cities/${id}`);
        return response.data;
    }
    public async getDashboard() {
        const response = await Axios.get<GetDashboardResponseDto>(`${API_BASE_URL}/dashboard`);
        return response.data;
    }
    public async getDestinations() {
        const response = await Axios.get<GetDestinationNameDto>(`${API_BASE_URL}/destinations`);
        return response.data;
    }
    public async getChatbotFlow() {
        const response = await Axios.get<TChatbotFlow>(`${API_BASE_URL}/chatbotFlow`);
        return response.data;
    }
}
export const fetchData = new FetchData();
