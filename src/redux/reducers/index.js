import {combineReducers} from 'redux';

import auth from './auth';
import profile from './profile';
import chat from './chat';

export default combineReducers({auth, profile, chat});
