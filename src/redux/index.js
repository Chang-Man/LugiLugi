import { combineReducers } from 'redux';
import auth from './module/auth';
import match from './module/match';

const rootReducer = combineReducers({ auth, match });

export default rootReducer;
