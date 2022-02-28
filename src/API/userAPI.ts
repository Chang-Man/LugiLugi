import axios from 'axios';
import { config } from 'process';
import authHeader from './auth-header';
const API_URL = 'http://3.36.71.201:8080/api/v1/user';
class userService {
  getUser = async () => {
    try {
      const response = await axios.get(API_URL + '/me/', { headers: authHeader() });
      return response.data;
    } catch (e) {
      return Promise.reject(e);
    }
  };
}

export default new userService();
