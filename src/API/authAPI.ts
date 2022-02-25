import axios from 'axios';
import { LoginPostType, RegisterPostType } from '../interface/interface';
const API_URL = 'http://3.36.71.201:8080/api/v1/user';

class AuthService {
  register = async (input: RegisterPostType) => {
    try {
      const response = await axios.post(API_URL + '/signup/', input);
      return response.data;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  login = async (input: LoginPostType) => {
    try {
      const response = await axios.post(API_URL + '/signin/', input);
      localStorage.setItem('user', JSON.stringify(response.data.token));
      return response.data.token;
    } catch (e) {
      return Promise.reject(e);
    }
  };
  logout = () => {
    localStorage.removeItem('user');
  };
}

export default new AuthService();
