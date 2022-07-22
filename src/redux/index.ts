import { combineReducers } from 'redux';
import auth from './module/auth';
import match from './module/match';
import user from './module/user';

const rootReducer = combineReducers({ auth, match, user });

export default rootReducer;
