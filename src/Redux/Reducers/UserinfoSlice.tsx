import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { GetInterestThunk, updateUserinfothunk } from '../Actions/Signupactions'
import { getuserinfothunk } from '../Actions/Userinfoactions'
export interface CounterState {
    islogin: boolean,
    InterestList:any,
    showModalLoader:boolean,
    userinfo:any|object,
    userToken:string
}


const initialState: CounterState = {
  islogin:false,
  InterestList:[],
  showModalLoader:false,
  userinfo:{},
  userToken:''
}

export const UserinfoSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    updateloginstatus:(state,action:PayloadAction<boolean>) => {
        return{
            ...state,
            islogin: action.payload
        }
    },
    updatemodalloader:(state,action:PayloadAction<boolean>) => {
      state.showModalLoader=action.payload
    },
    updateUserinfo:(state,action:PayloadAction<object>) => {
      state.userinfo=action.payload
    },
    updateusertoken:(state,action:PayloadAction<string>) => {
      state.userToken=action.payload
    }
  },
  extraReducers:(builder)=>{
    builder.addCase(GetInterestThunk.fulfilled,(state, action:PayloadAction<any>) => {
      state.InterestList=action.payload||[]
    })
    builder.addCase(updateUserinfothunk.fulfilled,(state, action:PayloadAction<object>) => {
      state.userinfo=action.payload||[]
    })
    builder.addCase(getuserinfothunk.fulfilled,(state, action:PayloadAction<object>) => {
      state.userinfo=action.payload||[]
    })
    
     
  }

  
})

// Action creators are generated for each case reducer function
export const { updateloginstatus,updatemodalloader,updateUserinfo,updateusertoken } = UserinfoSlice.actions

export default UserinfoSlice.reducer