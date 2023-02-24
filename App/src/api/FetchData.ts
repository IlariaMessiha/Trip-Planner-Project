import Axios from "axios";
import { Activity } from "../models/Activity";
import { Attraction } from "../models/Attractions";
import { City } from "../models/City";
import { Location } from "../models/Location";

const API_BASE_URL = "http://localhost:3333";

export class FetchData {
    public async getAttraction() {
        const response = await Axios.get<Attraction[]>(`${API_BASE_URL}/attractions`);
        return response.data

    }
    public async getCityForAttraction(id: string) {
        const response = await Axios.get<City>(`${API_BASE_URL}/attractions/${id}/city`);
        return response.data;
    }

    public async getLocation() {
        const response = await Axios.get<Location[]>(`${API_BASE_URL}/locations`);
        return response.data
    }
    public async getLocationById(id: string) {
        const response = await Axios.get<Location>(`${API_BASE_URL}/locations/${id}`);
        return response.data

    }
    public async getActivities() {
        const response = await Axios.get<Activity[]>(`${API_BASE_URL}/activities`);
        return response.data;
    }
    public async getActivityById(id: string) {
        const response = await Axios.get<Activity>(`${API_BASE_URL}/activities/${id}`);
        return response.data;
    }
    public async getActivitiesForLocation(id: string) {
        const response = await Axios.get<Activity[]>(`${API_BASE_URL}/locations/${id}/activities`);
        return response.data;
    }
    public async getReviews() {
        const response = await Axios.get(`${API_BASE_URL}/reviews`)
        return response.data
    }
    public async getUsers() {
        const response = await Axios.get(`${API_BASE_URL}/users`)
        return response.data
    }
}
export const fetchData = new FetchData();
