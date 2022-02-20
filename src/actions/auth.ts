import { Dispatch } from 'react';
import { text } from 'stream/consumers';
import authService from '../services/auth.service';
import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL, REGISTER_SUCCESS, SET_MESSAGE } from './types';

export const register = (input: string) => (dispatch: any) => {
  return authService.register(input).then(
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
export const login = (input: string) => (dispatch: any) => {
  return authService.login(input).then(
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
export const logout = () => (dispatch: any) => {
  authService.logout();
  dispatch({ type: LOGOUT });
};
