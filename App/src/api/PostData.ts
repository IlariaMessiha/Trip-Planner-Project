import Axios from "axios";
import { SearchQuery, SearchResult } from "../types/Search";
import { TChatbotSubmission } from "../types/TChatbot";
import { TripDto } from "../types/dto/common/TripDto";
import { LikedItem } from "../types/dto/likes/LikedItemDto";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
export class PostData {
    public async postSubmission(submissions: TChatbotSubmission[]) {
        return (await Axios.post<TripDto>(`${API_BASE_URL}/submissions`, submissions)).data;
    }
    public async search(searchQuery: SearchQuery) {
        console.log("post data : ", searchQuery);
        const res = await Axios.post<SearchResult[]>(`${API_BASE_URL}/search`, searchQuery);
        return res.data;
    }
    public async like(likedItem: LikedItem, token: string) {
        const res = await Axios.post<LikedItem>(`${API_BASE_URL}/api/users/like`, likedItem, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    }
}
export const postData = new PostData();
