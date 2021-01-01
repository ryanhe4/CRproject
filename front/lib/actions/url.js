import {createAsyncThunk} from "@reduxjs/toolkit";

const delay = (time, value) => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(value);
    }, time);
});

/**
 * @param {null} data requset 데이터 load시에는 null
 * @return {emails: Array}
 */
export const loadUrl = createAsyncThunk('url/loadUrls', async (data, thunkAPI) => {
    return await delay(500, {
        urls: [
            {id: 1, url: 'https://xploitdev.com'},
            {id: 2, url: 'http://naver.com'},
            {id: 3, url: 'http://daum.net'},
        ]
    });
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
    const url = {
        id: Math.ceil(Math.random() * 45),
        url: data
    }
    return await delay(500, url);
});

export const removeUrl = createAsyncThunk('url/removeUrl',
    async (data, thunkAPI) => {

    return await delay(500, data);
});

