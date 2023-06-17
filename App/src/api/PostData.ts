import Axios from "axios";
import { SearchQuery, SearchResult } from "../types/Search";
import { TChatbotSubmission } from "../types/TChatbot";
import { TripDto } from "../types/dto/common/TripDto";
import { LikedItem } from "../types/dto/likes/LikedItemDto";
import { ReviewDto } from "../types/dto/reviews/ReviewDto";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
export class PostData {
    public async postSubmission(submissions: TChatbotSubmission[], token: string) {
        const res = await Axios.post<TripDto>(`${API_BASE_URL}/trip/submissions`, submissions, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
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
    public async writeReview(review: ReviewDto, token: string) {
        const res = await Axios.post<ReviewDto>(`${API_BASE_URL}/api/users/review`, review, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    }
}
export const postData = new PostData();
