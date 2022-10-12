import Axios from "axios";
import { Activity } from "../models/Activity";

const API_BASE_URL = "http://localhost:3333";

export class FetchData {
    public getLocation() {
        Axios.get(`${API_BASE_URL}/locations`).then(response => {
            console.log(response);
        });
    }
    public async getActivities() {
        const response = await Axios.get<Activity[]>(`${API_BASE_URL}/activities`);
        return response.data;
    }
    public getReviews() {
        Axios.get(`${API_BASE_URL}/reviews`).then(response => {
            console.log(response);
        });
        console.log("Data Fetched");
    }
    public getUsers() {
        Axios.get(`${API_BASE_URL}/users`).then(response => {
            console.log(response);
        });
    }
}
export const fetchData = new FetchData();
