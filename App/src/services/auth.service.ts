import Axios from "axios";
import { LoginBody } from "../types/dto/auth/LoginBody";
import { RegisterBody } from "../types/dto/auth/RegisterBody";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

class AuthService {
    public async login(loginBody: LoginBody) {
        return (await Axios.post(`${API_BASE_URL}/api/auth/login`, loginBody)).data;
    }

    public async register(registerBody: RegisterBody) {
        return (await Axios.post(`${API_BASE_URL}/api/auth/register`, registerBody)).data;
    }
}

export default new AuthService();
