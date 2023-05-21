import { createSlice } from '@reduxjs/toolkit'
import { Postinfoslice, UserPost, postinfoapiresponse } from '../Sliceinterface'
import { BlockUserAsync, Get_post_list_thunk, LikeDislikeasync } from '../Actions/Postinfoactions'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: Postinfoslice = {
  Postlist: [],
  loading: false,
  pageno: 1
}


export const PostinfoSlice = createSlice({
  name: 'postinfoslice',
  initialState,

  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(Get_post_list_thunk.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(Get_post_list_thunk.fulfilled, (state, action: PayloadAction<postinfoapiresponse>) => {
      state.loading = false;
      if (action.payload.page > 1) {
        // Create a new array by spreading the existing Postlist and the new data array
        state.Postlist = [...state.Postlist, ...action.payload.data];
        // Update the Postlist immutably by returning a new state object with the updated Postlist

      } else {
        // Update the Postlist immutably by returning a new state object with the updated Postlist
        state.Postlist = action.payload.data
      }
      state.pageno = action.payload.page + 1
    });
    builder.addCase(Get_post_list_thunk.rejected, (state, action) => {
      state.loading = false
    }
    )
    builder.addCase(LikeDislikeasync.fulfilled, (state, { payload }) => {
      console.log(payload)
      if (payload.status !== null) {
        let postId=payload.post_id
        const findindex_=state.Postlist.findIndex((item: UserPost) => item.id === postId)
        state.Postlist[findindex_].is_liked = payload.status ? 1 : 0
        state.Postlist[findindex_].total_likes = payload.status ? state.Postlist[findindex_].total_likes + 1 : state.Postlist[findindex_].total_likes > 0 ? state.Postlist[findindex_].total_likes - 1 : 0
      }

    })
    builder.addCase(BlockUserAsync.fulfilled, (state, { payload }) => {
      console.log(payload)
      state.Postlist = state.Postlist.filter((item: UserPost) => item.user.id != payload.user_id)

    }
    )

  }
})

// export const { updateloginstatus, updatemodalloader, updateUserinfo, updateusertoken } = UserinfoSlice.actions

export default PostinfoSlice.reducer