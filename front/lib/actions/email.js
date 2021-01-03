import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const loadEmail = createAsyncThunk('email/loadEmails',
    async (data, thunkAPI) => {
        const emails = await axios.get('http://localhost:4000/api/email/' + data);
        return emails;
    })

export const addEmail = createAsyncThunk('email/addEmail',
    async (data, thunkAPI) => {
        const validateEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        if (!validateEmail.test(data.email)) {
            throw Error('올바른 형식의 이메일이 아닙니다.');
        }
        return await axios.post('http://localhost:4000/api/email', data);
    })
/**
 * @param emailId 삭제할 이메일 ID
 * @return emailId 삭제된 이메일 ID
 */

export const removeEmail = createAsyncThunk('email/removeEmail',
    async (data, thunkAPI) => {
        //email 삭제 요청
        return await axios.patch('http://localhost:4000/api/email/', data);
    });

