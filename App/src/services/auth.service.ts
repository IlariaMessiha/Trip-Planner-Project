import Axios from "axios";
const API_BASE_URL = "http://localhost:3333";

class AuthService {
    login(email: string, password: string) {
        return Axios.post(API_BASE_URL + "/auth/signin", {
            email: email,
            password: password,
        }).then(response => {
            if (response.data.access_token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
    }

    logout() {
        localStorage.removeItem("user");
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
