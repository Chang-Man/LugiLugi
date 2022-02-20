import axios from 'axios';
const API_URL = 'https://';

class AuthService {
  register = async (input: string) => {
    try {
      const response = await axios.post(API_URL + 'register', input);
      return response.data.token;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  login = async (input: string) => {
    try {
      const response = await axios.post(API_URL + 'signin', input);
      localStorage.setItem('user', JSON.stringify(response.data));
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
