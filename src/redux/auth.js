import authAPI from '../API/authAPI';
import { AnyAction } from 'redux';

//액션 타입
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
const REGISTER_FAIL = 'auth/REGISTER_FAIL';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'auth/LOGIN_FAIL';
const LOGOUT = 'auth/LOGOUT';

//액션 생성 함수
export const register = input => dispatch => {
  return authAPI.register(input).then(
    response => {
      dispatch({ type: REGISTER_SUCCESS });
      return Promise.resolve();
    },
    error => {
      dispatch({ type: REGISTER_FAIL });
      return Promise.reject();
    },
  );
};
export const login = input => dispatch => {
  return authAPI.login(input).then(
    response => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: response },
      });
      return Promise.resolve();
    },
    error => {
      dispatch({ type: LOGIN_FAIL });
      return Promise.reject();
    },
  );
};
export const logout = () => dispatch => {
  authAPI.logout();
  dispatch({ type: LOGOUT });
};

//reducer
const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { isLoggedIn: true, user } : { isLoggedIn: false, user: null };
export default function (state = initialState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
}
