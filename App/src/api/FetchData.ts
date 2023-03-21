import Axios from "axios";

import { GetAttractionResponseDto } from "../types/dto/attractions/GetAttractionResponseDto";
import { GetCityResponseDto } from "../types/dto/cities/GetCityResponseDto";
import { AttractionDto } from "../types/dto/common/AttractionDto";
import { CityDto } from "../types/dto/common/CityDto";

const API_BASE_URL = "http://localhost:3333";

export class FetchData {
    public async getAttractions() {
        const response = await Axios.get<AttractionDto[]>(`${API_BASE_URL}/attractions`);
        return response.data;
    }
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

    public async getUsers() {
        const response = await Axios.get(`${API_BASE_URL}/users`);
        return response.data;
    }
    public async getCities() {
        const response = await Axios.get<CityDto[]>(`${API_BASE_URL}/cities`);
        return response.data;
    }

    public async getCountryForCity(id: string) {
        const response = await Axios.get(`${API_BASE_URL}/cities/${id}/country`);
        return response.data;
    }
}
export const fetchData = new FetchData();
