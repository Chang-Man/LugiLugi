import axios from 'axios';
import { getAttendanceMonthType, postAttendanceType } from '../interface/interface';
import authHeader from './auth-header';
const API_URL = 'https://lugiserver.com/api/v1/attendance';
class attendance {
  getAttendanceMonth = async ({ year, month }: getAttendanceMonthType) => {
    try {
      const response = await axios.get(API_URL + `/me/?year=${year}&month=${month}`, { headers: authHeader() });
      return response.data;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  postAttendance = async (date: postAttendanceType) => {
    try {
      const response = await axios.post(API_URL + '/', date, { headers: authHeader() });
      return response.data;
    } catch (e) {
      return Promise.reject(e);
    }
  };
}

export default new attendance();
