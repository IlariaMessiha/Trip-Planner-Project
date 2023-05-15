import Axios from 'axios';
import authHeader from './auth-header';



const API_BASE_URL = "http://localhost:3333";

class UserService {
  getPublicContent() {
    return Axios.get(API_BASE_URL + 'all');
  }

  getUserBoard() {
    return Axios.get(API_BASE_URL + 'user', { headers: authHeader() });
  }

  
}

export default new UserService();