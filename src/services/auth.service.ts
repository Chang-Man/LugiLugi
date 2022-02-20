import { plainRequest } from './API';

class authAPI {
  register = async (input: string) => {
    try {
      const response = await plainRequest.post('/', input);
      return response.data.token;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  login = async (input: string) => {
    try {
      const response = await plainRequest.post('/', input);
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

export default new authAPI();
