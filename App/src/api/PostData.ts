import Axios from "axios";
import { SearchQuery, SearchResult } from "../types/Search";
import { TChatbotSubmission } from "../types/TChatbot";
import { TripDto } from "../types/dto/common/TripDto";
const API_BASE_URL = "http://localhost:3333";
export class PostData {
    public async postSubmission(submissions: TChatbotSubmission[]) {
        return (await Axios.post<TripDto>(`${API_BASE_URL}/submissions`, submissions)).data;
    }
    public async search(searchQuery: SearchQuery) {
        console.log("post data : ", searchQuery);
        const res = await Axios.post<SearchResult[]>(`${API_BASE_URL}/search`, searchQuery);
        return res.data;
    }
}
export const postData = new PostData();
