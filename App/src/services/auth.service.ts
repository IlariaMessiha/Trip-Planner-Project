import Axios from "axios";
import { LoginBody } from "../types/dto/auth/LoginBody";
import { RegisterBody } from "../types/dto/auth/RegisterBody";
const API_BASE_URL = "http://localhost:3333";

class AuthService {
    public async login(loginBody: LoginBody) {
        return (await Axios.post(`${API_BASE_URL}/api/auth/login`, loginBody)).data;
    }

    // register(firstname: string, lastname: string, email: string, password: string) {
    //     return Axios.post(API_BASE_URL + "/auth/signup", {
    //         firstname,
    //         lastname,
    //         email,
    //         password,
    //     }).then(response => {
    //         return response.data;
    //     });
    // }
    public async register(registerBody: RegisterBody) {
        return (await Axios.post(`${API_BASE_URL}/api/auth/register`, registerBody)).data;
    }
}

export default new AuthService();
