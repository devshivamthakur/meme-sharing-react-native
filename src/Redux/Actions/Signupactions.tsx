import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { GETUSERINTEREST, UPDATEPROFILE, UPLOADFILEAPI } from '../../Apiendpoints';
import { ErrorMessage } from '../../Component/ErrorMessage';
export const uploadfileThunk = createAsyncThunk(
    'uploadfile',
    async (data) => {
        const response = await axios({
            url: UPLOADFILEAPI,
            method: "post",
            data: data,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    }
);
export const GetInterestThunk = createAsyncThunk(
    'GetInterest',
    async (args, { rejectWithValue }) => {
        try {

            const response = await axios({
                url: GETUSERINTEREST,
                method: "get",

            })
            return response.data.data
        } catch (error: any) {
            ErrorMessage(error.response)
            return rejectWithValue(error.response.data)

        }
    }
)


export const updateUserinfothunk = createAsyncThunk(
    'updateprofile',

    async (data:any, {rejectWithValue}) => {
        try {

            const response = await axios({
                url: UPDATEPROFILE,
                method: "put",
                data: data,
                headers:{
                    "Authorization":"Token " +data.token
                }
            })

            return data
        } catch (error:any) {
            ErrorMessage(error.response)
            return rejectWithValue({
                error:error.response.data,
                status: error.response.status
            })
        }


    }

)


