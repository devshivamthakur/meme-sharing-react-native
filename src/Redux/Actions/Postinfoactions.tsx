import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CREATEPOSTAPI } from '../../Apiendpoints';
import { ErrorMessage } from '../../Component/ErrorMessage';
export const CreatePost_thunk = createAsyncThunk(
    'GetInterest',
    async (args, { rejectWithValue,getState }) => {
        try {

            const response = await axios({
                url: CREATEPOSTAPI,
                method: "post",
                data: args,
                headers: {
                     Authorization: `Token ${getState().userinfo.userToken}` },
            })
            return response.data
        } catch (error: any) {
            console.log(error.response)
            ErrorMessage(error.response)
            return rejectWithValue(error.response.data)

        }
    }
)