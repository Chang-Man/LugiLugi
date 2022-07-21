import { LoginPostType, RegisterPostType } from '../../interface/interface';

//액션 타입
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGOUT = 'auth/LOGOUT';

//액션 생성 함수
export const register = (user: RegisterPostType) => {
  return {
    type: REGISTER_SUCCESS,
    payload: user,
  };
};

export const login = (user: LoginPostType) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const logout = () => ({
  type: LOGOUT,
});
//reducer
const user = JSON.parse(<string>localStorage.getItem('user'));
const initialState = user ? { isLoggedIn: true, user } : { isLoggedIn: false, user: null };
export default function (state = initialState, action: any) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
      };

    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: '',
      };

    default:
      return state;
  }
}
