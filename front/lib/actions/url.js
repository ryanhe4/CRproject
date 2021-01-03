import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const delay = (time, value) => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(value);
    }, time);
});

/**
 * @param {null} data 필요없음 null
 * @return urls payload.data Array
 */
export const loadUrl = createAsyncThunk('url/loadUrls', async (data, thunkAPI) => {
    const res = await axios.get('http://localhost:4000/api/url');
    return res;
});

export const loadLogs = createAsyncThunk('url/loadLogs', async (data, thunkAPI) => {
    return await delay(500, {
            logs: [
                {title: '1차', date: new Date()},
                {title: '2차', date: new Date()},
                {title: '3차', date: new Date()}]
        }
    );
});

export const addUrl = createAsyncThunk('url/addUrl', async (data, thunkAPI) => {
    const validate = /^([\w-]+(=[\w-]*)?(&[\w-]+(=[\w-]*)?)*)?$/g
    if (!validate.test(data)) {
        throw Error('올바른 주소형식이 아닙니다.');
    }
    try {
        return await axios.post('http://localhost:4000/api/url', {url: data});
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data)
    }
});

export const removeUrl = createAsyncThunk('url/removeUrl',
    async (data, thunkAPI) => {
        return await axios.delete('http://localhost:4000/api/url/' + data);
    });

