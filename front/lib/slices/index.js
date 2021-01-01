import {HYDRATE} from "next-redux-wrapper";
import {combineReducers} from '@reduxjs/toolkit';

import {emailSlice} from './email';
import {urlSlice} from './url';

export const reducer = (state = {}, action) => {
    if (action.type === HYDRATE) {
        console.log("HYDRATE", action);
        return {
            ...state,
            ...action.payload
        };
    }
    return combineReducers({
        [emailSlice.name]: emailSlice.reducer,
        [urlSlice.name]: urlSlice.reducer
    })(state, action);
}

