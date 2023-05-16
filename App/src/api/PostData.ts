import Axios from "axios";
import { TChatbotSubmission } from "../types/TChatbot";
import { TripDto } from "../types/dto/common/TripDto";
const API_BASE_URL = "http://localhost:3333";
export class PostData {
    public async postSubmission(submissions: TChatbotSubmission[]) {
        return (await Axios.post<TripDto>(`${API_BASE_URL}/submissions`, submissions)).data;
    }
}
export const postData = new PostData();
