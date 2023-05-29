import Axios from "axios";
import { TChatbotSubmission } from "../types/TChatbot";
import { TripDto } from "../types/dto/common/TripDto";
import { SearchQuery, SearchResult } from "../types/Search";
import { LoginBody } from "../types/dto/auth/LoginBody";
const API_BASE_URL = "http://localhost:3333";
export class PostData {
    public async postSubmission(submissions: TChatbotSubmission[]) {
        return (await Axios.post<TripDto>(`${API_BASE_URL}/submissions`, submissions)).data;
    }
    public async search(searchQuery: SearchQuery) {
        console.log("post data : ", searchQuery);
        const res: any = await Axios.post<SearchResult[]>(`${API_BASE_URL}/search`, searchQuery);
        return (await Axios.post<SearchResult[]>(`${API_BASE_URL}/search`, searchQuery)).data;
    }
}
export const postData = new PostData();
