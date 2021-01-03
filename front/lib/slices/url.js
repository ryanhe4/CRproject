import {createSlice} from "@reduxjs/toolkit";
import {addUrl, loadLogs, loadUrl, removeUrl} from "../actions/url";

const initialState = {
    mainUrls: [],
    mainLogs: [],
    selectId: null,
    isLoadingUrl: false,
    isErrorUrl: null,
    isDoneUrl: false,
    isLoadingLogs: false,
    isErrorLogs: null,
    isLoadingRemove: false,
    isErrorRemove: null,
};

export const urlSlice = createSlice({
    name: 'url',
    initialState,
    reducers: {
        changeSelect: (state, action) => {
            state.selectId = action.payload;
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(loadUrl.pending, (state, action) => {
                state.isLoadingUrl = true;
                state.isErrorUrl = null;
                state.isDoneUrl = false;
            })
            .addCase(loadUrl.fulfilled, (state, action) => {
                state.isLoadingUrl = false;
                state.mainUrls = action.payload.data;
                if (state.selectId === null) state.selectId = action.payload.data[0].id ;
                state.isDoneUrl = true;
            })
            .addCase(loadUrl.rejected, (state, action) => {
                state.isLoadingUrl = false;
                state.isErrorUrl = action.error.message;
            })
            .addCase(addUrl.pending, (state, action) => {
                state.isLoadingUrl = true;
                state.isErrorUrl = null;
            })
            .addCase(addUrl.fulfilled, (state, action) => {
                state.isLoadingUrl = false;
                state.mainUrls.unshift(action.payload.data);
            })
            .addCase(addUrl.rejected, (state, action) => {
                state.isLoadingUrl = false;
                state.isErrorUrl = action.payload ? action.payload : action.error.message;
            })
            .addCase(loadLogs.pending, (state, action) => {
                state.isLoadingLogs = true;
                state.isErrorLogs = null;
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
                state.isErrorRemove = null;
            })
            .addCase(removeUrl.fulfilled, (state, action) => {
                state.isLoadingRemove = false;
                state.mainUrls = state.mainUrls.filter((v) => v.id !== action.payload.data.urlId);
            })
            .addCase(removeUrl.rejected, (state, action) => {
                state.isLoadingRemove = false;
                state.isErrorRemove = action.error.message;
            })
    }
})
