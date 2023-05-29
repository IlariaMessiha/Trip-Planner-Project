import Axios from "axios";
import { LoginBody } from "../types/dto/auth/LoginBody";
const API_BASE_URL = "http://localhost:3333";

class AuthService {
    public async login(loginBody: LoginBody) {
        return (await Axios.post(`${API_BASE_URL}/api/auth/login`, loginBody)).data;
    }

    logout() {
        localStorage.removeItem("accessToken");
    }

    register(firstname: string, lastname: string, email: string, password: string) {
        return Axios.post(API_BASE_URL + "/auth/signup", {
            firstname,
            lastname,
            email,
            password,
        }).then(response => {
            return response.data;
        });
    }

    getCurrentUser() {
        const userStr = localStorage.getItem("user");
        if (userStr) return JSON.parse(userStr);

        return null;
    }
}

export default new AuthService();
