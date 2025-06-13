import { combineReducers } from '@reduxjs/toolkit'
import authReducer from './auth';

const allReducers = combineReducers({
    auth: authReducer,

});

export default allReducers;