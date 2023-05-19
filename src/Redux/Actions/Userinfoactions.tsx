import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { GETUSERINFO, GET_USER_POSTAPI, OTHERUSERINFO } from '../../Apiendpoints';
import { updatemodalloader } from '../Reducers/UserinfoSlice';

  
  export const getuserinfothunk = createAsyncThunk(
    'fetchuserinfo',  
    async (arg,{getState,dispatch}) => {
      dispatch(updatemodalloader(true))
      
      const response = await axios.get(GETUSERINFO, {
        headers: { Authorization: `Token ${getState().userinfo.userToken}` },
      });
      return response.data.data;
    }
  );


  export const getUserPost_thunk = createAsyncThunk(
    'fetchuserpost',  
    async (userid,{getState}) => {
      
      
      const response = await axios.get(GET_USER_POSTAPI+userid, {
        headers: { Authorization: `Token ${getState().userinfo.userToken}` },
      });
      return response.data.data;
    }
  );

  type userid=number

  export const getOtherUserinfoAsync = createAsyncThunk(
    'fetchotheruserinfo',  
    async (userid:userid,{getState,dispatch}) => {
      dispatch(updatemodalloader(true))
      const response = await axios.get(OTHERUSERINFO+userid, {
        headers: { Authorization: `Token ${getState().userinfo.userToken}` },
      });
      return response.data.data;
    }
  );