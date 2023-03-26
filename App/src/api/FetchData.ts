import Axios from "axios";

import { GetAttractionResponseDto } from "../types/dto/attractions/GetAttractionResponseDto";
import { GetCityResponseDto } from "../types/dto/cities/GetCityResponseDto";
import { AttractionDto } from "../types/dto/common/AttractionDto";
import { CityDto } from "../types/dto/common/CityDto";
import { GetDashboardResponseDto } from "../types/dto/dashboard/GetDashboardResponse";

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
}
export const fetchData = new FetchData();
