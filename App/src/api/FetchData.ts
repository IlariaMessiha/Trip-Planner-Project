import Axios from "axios";
import { Attraction } from "../models/Attraction";
import { City } from "../models/City";
import { GetAttractionResponseDto } from "../types/dto/attractions/GetAttractionResponseDto";

const API_BASE_URL = "http://localhost:3333";

export class FetchData {
    public async getAttractions() {
        const response = await Axios.get<Attraction[]>(`${API_BASE_URL}/attractions`);
        return response.data;
    }
    public async getAttraction(id: string) {
        const response = await Axios.get<GetAttractionResponseDto>(
            `${API_BASE_URL}/attractions/${id}`
        );
        return response.data;
    }
    public async getCityForAttraction(id: string) {
        const response = await Axios.get<City>(`${API_BASE_URL}/attractions/${id}/city`);
        return response.data;
    }
    public async getCityAttractions(id: string) {
        const response = await Axios.get<Attraction[]>(`${API_BASE_URL}/cities/${id}/attractions`);
        return response.data;
    }

    public async getUsers() {
        const response = await Axios.get(`${API_BASE_URL}/users`);
        return response.data;
    }
    public async getCities() {
        const response = await Axios.get(`${API_BASE_URL}/cities`);
        return response.data;
    }
    public async getCityById(id: string) {
        const response = await Axios.get(`${API_BASE_URL}/cities/${id}`);
        return response.data;
    }
    public async getCountryForCity(id: string) {
        const response = await Axios.get(`${API_BASE_URL}/cities/${id}/country`);
        return response.data;
    }
    public async getReviewsForAttraction(id: string) {
        const response = await Axios.get(`${API_BASE_URL}/attractions/${id}/reviews`);
        return response.data;
    }
    public async getUserForReview(id: string) {
        const response = await Axios.get(`${API_BASE_URL}/reviews/${id}/user`);
        return response.data;
    }
}
export const fetchData = new FetchData();
