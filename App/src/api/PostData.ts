import Axios from "axios";
import { TChatbotSubmission } from "../types/TChatbot";
const API_BASE_URL = "http://localhost:3333";
export class PostData {
    public async postSubmission(submissions: TChatbotSubmission[]) {
        await Axios.post(`${API_BASE_URL}/submissions`, submissions).then(response => {
            console.log(response.data);
        });
    }
}
export const postData = new PostData();
