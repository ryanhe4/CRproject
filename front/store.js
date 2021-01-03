import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {createWrapper} from "next-redux-wrapper";
import {reducer} from './lib/slices'

const logger = (store) => (next) => (action) => {
    console.log('로깅', action);
    next(action);
}

const makeStore = (context) => configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware({
        serializableCheck: false
    })
});

export const wrapper = createWrapper(makeStore, {
    debug: process.env.NODE_ENV !== 'production',
});

