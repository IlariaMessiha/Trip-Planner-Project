import Axios from "axios";
import { Activity } from "../models/Activity";
import { Location } from "../models/Location";

const API_BASE_URL = "http://localhost:3333";

export class FetchData {
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
