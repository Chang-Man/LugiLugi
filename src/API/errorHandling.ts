import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export interface customError {
  error_code: number;
  error_message: string;
  detail: string;
}

export const toastErrorData = (errorData: AxiosError) => {
  console.log(errorData?.response);
  if (errorData.response) {
    if (errorData?.response.status === 401) toast.dark('로그인을 다시 시도하세요.');
    else if (errorData.response.data.error_code === 9001) toast.dark(errorData.response.data.detail);
    else if (errorData.response.status === 400) toast.dark('잘못된 요청입니다.');
    else if (errorData.response.data.error_code === 4001) toast.dark('선수 코드를 다시 확인하세요.');
    else if (errorData.response.data.error_code === 4003) toast.dark('해당 경기를 찾을 수 없습니다.');
  }
};
