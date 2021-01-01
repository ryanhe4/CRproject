import {createAsyncThunk} from "@reduxjs/toolkit";

const delay = (time, value) => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(value);
    }, time);
});

export const loadEmail = createAsyncThunk('email/loadEmails',
    async (data, thunkAPI) => {
        return await delay(500, {
            emails: [
                {id: 1, email: 'ryanhe4@gmail.com'},
                {id: 2, email: 'ryanhe4@naver.com'},
                {id: 3, email: 'ryanhe4@nsu.ac.kr'},
            ]
        });
    })

export const addEmail = createAsyncThunk('email/addEmail',
    async (data, thunkAPI) => {
        const email = {
            id: Math.ceil(Math.random() * 45),
            email: data
        }

        const validateEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        if (!validateEmail.test(data)) {
            throw Error('올바른 형식의 이메일이 아닙니다.');
        }
        return await delay(500, email);
    })

export const removeEmail = createAsyncThunk('email/removeEmail',
    async (data, thunkAPI) => {
        return await delay(500, data);
    });

