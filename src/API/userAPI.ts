import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'https://lugiserver.com/api/v1/user';

interface editNamesType {
  username: string;
  nickname: string;
}
class userService {
  getUser = async () => {
    try {
      const response = await axios.get(API_URL + '/me/', { headers: authHeader() });
      return response.data;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  editNames = async (input: editNamesType) => {
    try {
      const response = await axios.put(API_URL + '/me/profile/', input, { headers: authHeader() });
      return response.data;
    } catch (e) {
      return Promise.reject(e);
    }
  };
}

export default new userService();
