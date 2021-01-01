import {createSlice} from "@reduxjs/toolkit";
import {addUrl, loadLogs, loadUrl, removeUrl} from "../actions/url";

const initialState = {
    mainUrls: [],
    mainLogs: [],
    isLoadingUrl: false,
    isErrorUrl: null,
    isLoadingLogs: false,
    isErrorLogs: null,
    isLoadingRemove: false,
    isErrorRemove: null,
};

export const urlSlice = createSlice({
    name: 'url',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadUrl.pending, (state, action) => {
                state.isLoadingUrl = true;
            })
            .addCase(loadUrl.fulfilled, (state, action) => {
                state.isLoadingUrl = false;
                state.mainUrls = action.payload.urls;
            })
            .addCase(loadUrl.rejected, (state, action) => {
                state.isLoadingUrl = false;
                state.isErrorUrl = action.error.message;
            })
            .addCase(addUrl.pending, (state, action) => {
                state.isLoadingUrl = true;
            })
            .addCase(addUrl.fulfilled, (state, action) => {
                state.isLoadingUrl = false;
                state.mainUrls.unshift(action.payload);
            })
            .addCase(addUrl.rejected, (state, action) => {
                state.isLoadingUrl = false;
                state.isErrorUrl = action.error.message;
            })
            .addCase(loadLogs.pending, (state, action) => {
                state.isLoadingLogs = true;
            })
            .addCase(loadLogs.fulfilled, (state, action) => {
                state.isLoadingLogs = false;
                state.mainLogs = action.payload.logs;
            })
            .addCase(loadLogs.rejected, (state, action) => {
                state.isLoadingLogs = false;
                state.isErrorLogs = action.error.message;
            })
            .addCase(removeUrl.pending, (state, action) => {
                state.isLoadingRemove = true;
            })
            .addCase(removeUrl.fulfilled, (state, action) => {
                state.isLoadingRemove = false;
                state.mainUrls = state.mainUrls.filter((v) => v.id !== action.payload);
            })
            .addCase(removeUrl.rejected, (state, action) => {
                state.isLoadingRemove = false;
                state.isErrorRemove = action.error.message;
            })
    }
})
