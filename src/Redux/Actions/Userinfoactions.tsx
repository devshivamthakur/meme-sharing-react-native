import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { GETUSERINFO } from '../../Apiendpoints';

  
  export const getuserinfothunk = createAsyncThunk(
    'fetchuserinfo',  
    async (arg,{getState}) => {
      
      const response = await axios.get(GETUSERINFO, {
        headers: { Authorization: `Token ${getState().userinfo.userToken}` },
      });
      return response.data.data;
    }
  );