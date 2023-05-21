import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { GetInterestThunk, updateUserinfothunk } from '../Actions/Signupactions'
import { getOtherUserinfoAsync, getUserPost_thunk, getuserinfothunk } from '../Actions/Userinfoactions'
import { UserPost, Userinfo } from '../Sliceinterface'
import { LikeDislikeasync } from '../Actions/Postinfoactions'
export interface CounterState {
  islogin: boolean,
  InterestList: any,
  showModalLoader: boolean,
  userinfo: Userinfo,
  otherUserinfo: Userinfo,
  userToken: string,
  userpost:UserPost[]
}


const initialState: CounterState = {
  islogin: false,
  InterestList: [],
  showModalLoader: false,
  userinfo: {
    id: 0,
    name: '',
    email: '',
    google_id: '',
    username: '',
    profileurl: '',
    is_logged_in: false,
    device_id: '',
    created_at: '',
    updated_at: '',
    user: 0,
    total_likes: 0,
    total_post: 0
  },
  otherUserinfo: {
    id: 0,
    name: '',
    email: '',
    google_id: '',
    username: '',
    profileurl: '',
    is_logged_in: false,
    device_id: '',
    created_at: '',
    updated_at: '',
    user: 0,
    total_likes: 0,
    total_post: 0
  },
  userToken: '',
  userpost:[]
}

export const UserinfoSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    updateloginstatus: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        islogin: action.payload
      }
    },
    updatemodalloader: (state, action: PayloadAction<boolean>) => {
      state.showModalLoader = action.payload
    },
    updateUserinfo: (state, action: PayloadAction<Userinfo>) => {
      state.userinfo = action.payload
    },
    updateusertoken: (state, action: PayloadAction<string>) => {
      state.userToken = action.payload
    },
    resetOtheruserinfoand_Userpost:(state)=>{
      state.userpost=[]
      state.otherUserinfo={...initialState.otherUserinfo}
      
    }
  },
  extraReducers: (builder) => {
    builder.addCase(GetInterestThunk.fulfilled, (state, action: PayloadAction<any>) => {
      state.InterestList = action.payload || []
      state.showModalLoader=false
    })
    builder.addCase(updateUserinfothunk.fulfilled, (state, action: PayloadAction<Userinfo>) => {
      state.userinfo = action.payload
      state.showModalLoader=false

    })
    builder.addCase(getuserinfothunk.fulfilled, (state, action: PayloadAction<Userinfo>) => {
      state.showModalLoader=false
      state.userinfo = action.payload

    })
    builder.addCase(getUserPost_thunk.fulfilled, (state, action: PayloadAction<UserPost[]>) => {
      state.userpost = action.payload
      state.showModalLoader=false

    })
    builder.addCase(getOtherUserinfoAsync.fulfilled, (state, action: PayloadAction<Userinfo>) => {
      state.otherUserinfo = action.payload
      state.showModalLoader=false

    })
    builder.addCase(LikeDislikeasync.fulfilled, (state, {payload}) => {
      if (payload.status !== null) {
        state.userpost = state.userpost.map((post) => {
          if (post.id === payload.post_id) {
            post.is_liked = payload.status?1:0
            if (payload.status) {
              post.total_likes += 1
            } else if (!payload.status&&post.total_likes>0) {
              post.total_likes -= 1
            }
          }
          return post
        })
      } 
    })
  }


})

// Action creators are generated for each case reducer function
export const { updateloginstatus, updatemodalloader, updateUserinfo, updateusertoken,resetOtheruserinfoand_Userpost } = UserinfoSlice.actions

export default UserinfoSlice.reducer