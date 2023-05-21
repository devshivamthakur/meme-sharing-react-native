import { createAsyncThunk } from "@reduxjs/toolkit"
import { blockaccount } from "../Sliceinterface"
import { ErrorMessage } from "../../Component/ErrorMessage"
import { updatemodalloader } from "../Reducers/UserinfoSlice"
import axios from "axios"
import { BLOCKED_USER_LIST_API, UNBLOCK_USER_API } from "../../Apiendpoints"
import { showMessage } from "react-native-flash-message"
export const BlockedListAsync = createAsyncThunk(
    'BlockedListAsync',
   async (args,{ rejectWithValue, getState, dispatch }) => {
    try {
        dispatch(updatemodalloader(true))


        const response = await axios({
            url: BLOCKED_USER_LIST_API,
            method: "get",
            data: args,
            headers: {
                Authorization: `Token ${getState().userinfo.userToken}`
            },
        })
        dispatch(updatemodalloader(false))
        return response.data as blockaccount[]
    } catch (error: any) {
        dispatch(updatemodalloader(false))

        ErrorMessage(error.response)
        return rejectWithValue(error.response.data)

    }
}
)

interface unblockuser{
    blocked_user_id: number
}
export const unBlockUserAsync = createAsyncThunk(
    'unBlockUserAsync',
   async (args:unblockuser,{ rejectWithValue, getState, dispatch }) => {
    try {
        dispatch(updatemodalloader(true))


        const response = await axios({
            url: UNBLOCK_USER_API,
            method: "put",
            data: args,
            headers: {
                Authorization: `Token ${getState().userinfo.userToken}`
            },
        })
        dispatch(updatemodalloader(false))

        showMessage({
            message: "User Unblocked Successfully.",
            type: "success",
            icon: "success",
            duration: 3000,
        })
        return args
    } catch (error: any) {
        dispatch(updatemodalloader(false))

        ErrorMessage(error.response)
        return rejectWithValue(error.response.data)

    }
}
)
