import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BLOCK_USER_API, CREATEPOSTAPI, LikeDislike_API, POST_LIST_API } from '../../Apiendpoints';
import { ErrorMessage } from '../../Component/ErrorMessage';
import { Postinfoslice, UserPost } from '../Sliceinterface';
import { showMessage } from 'react-native-flash-message';
import { updatemodalloader } from '../Reducers/UserinfoSlice';
export const CreatePost_thunk = createAsyncThunk(
    'GetInterest',
    async (args, { rejectWithValue, getState }) => {
        try {

            const response = await axios({
                url: CREATEPOSTAPI,
                method: "post",
                data: args,
                headers: {
                    Authorization: `Token ${getState().userinfo.userToken}`
                },
            })
            return response.data
        } catch (error: any) {
            ErrorMessage(error.response)
            return rejectWithValue(error.response.data)

        }
    }
)


export const Get_post_list_thunk = createAsyncThunk(
    'getPostlist',
    async (pageno: number, { rejectWithValue, getState }) => {
        try {

            const response = await axios({
                url: POST_LIST_API + `?page=${pageno}`,
                method: "get",
                headers: {
                    Authorization: `Token ${getState().userinfo.userToken}`
                },
            })

            return { data: response.data.data as UserPost[], page: Number(response.data.page) }
        } catch (error: any) {
            ErrorMessage(error.response)
            return rejectWithValue(error.response.data)

        }
    }
)

interface LikeDislike_ {
    status: boolean,
    postid: number,
}

export const LikeDislikeasync = createAsyncThunk(
    'likeDislike',
    async ({ status, postid }: LikeDislike_, { rejectWithValue, getState }) => {
        try {

            const response = await axios({
                url: LikeDislike_API,
                method: "post",
                data: {
                    "post_id": postid,
                    "status": status
                },

                headers: {
                    Authorization: `Token ${getState().userinfo.userToken}`
                },
            })

            if (response.status === 200) {
                return {
                    status: status,
                    post_id: postid,
                }
            } else {
                return {
                    status: null,
                    post_id: -1,

                }
            }

        } catch (error: any) {
            ErrorMessage(error.response)
            return rejectWithValue(error.response.data)

        }
    }
)

interface BlockUser_ {
    blocked_user: number
}
export const BlockUserAsync = createAsyncThunk(
    'BlockUserAsync',
    async (args: BlockUser_, { rejectWithValue, getState, dispatch }) => {
        try {
            dispatch(updatemodalloader(true))


            const response = await axios({
                url: BLOCK_USER_API,
                method: "post",
                data: args,
                headers: {
                    Authorization: `Token ${getState().userinfo.userToken}`
                },
            })
            dispatch(updatemodalloader(false))
            showMessage({
                message: "User Blocked Successfully.",
                type: "success",
                icon: "success",
                duration: 3000,

            })

            return {
                user_id: args.blocked_user
            }
        } catch (error: any) {
            dispatch(updatemodalloader(false))

            ErrorMessage(error.response)
            return rejectWithValue(error.response.data)

        }
    }
)


