import {createSlice} from "@reduxjs/toolkit";
import {addEmail, loadEmail, removeEmail} from "../actions/email";

const initialState = {
    urlId: null,
    emails: [],
    isLoadingEmail: false,
    isErrorEmail: null,
    isLoadingAdd: false,
    isErrorAdd: null,
    isLoadingRemove: false,
    isErrorRemove: null,
};

export const emailSlice = createSlice({
    name: 'email',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadEmail.pending, (state,action) => {
                state.urlId = null;
                state.isLoadingEmail = true;
            })
            .addCase(loadEmail.fulfilled, (state,action) => {
                state.emails = action.payload.emails;
                state.isLoadingEmail = false;
            })
            .addCase(loadEmail.rejected, (state,action) => {
                state.isErrorEmail = action.error.message;
                state.isLoadingEmail = false;
            })
            .addCase(addEmail.pending, (state,action) => {
                state.isLoadingAdd = true;
            })
            .addCase(addEmail.fulfilled, (state,action) => {
                state.isLoadingAdd = false;
                state.emails.unshift(action.payload);
            })
            .addCase(addEmail.rejected, (state,action) => {
                state.isErrorEmail = action.error.message;
                state.isLoadingAdd = false;
            })
            .addCase(removeEmail.pending, (state,action) => {
                state.isLoadingRemove = true;
            })
            .addCase(removeEmail.fulfilled, (state,action) => {
                state.isLoadingRemove = false;
                state.emails = state.emails.filter((v) => v.id !== action.payload);
            })
            .addCase(removeEmail.rejected, (state,action) => {
                state.isErrorEmail = action.error.message;
                state.isLoadingRemove = false;
            })
    }
})
