import { UserGetType } from '../../interface/interface';

const SET_USER = 'user/SET_USER';
const REMOVE_USER = 'user/REMOVE_USER';

export const setUser = (user_info: UserGetType) => {
  return {
    type: SET_USER,
    payload: user_info,
  };
};

export const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

const initialState = {
  user_info: null,
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user_info: action.payload,
      };
    case REMOVE_USER:
      return {
        ...state,
        user_info: null,
      };
    default:
      return state;
  }
}
