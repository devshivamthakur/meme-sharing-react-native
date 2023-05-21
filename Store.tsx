import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './src/Redux/Reducers/Mytestreducer'
import UserinfoSlice from './src/Redux/Reducers/UserinfoSlice'
import  PostinfoSlice  from './src/Redux/Reducers/Postinfoslice'
import BlockedAccountsSlice from './src/Redux/Reducers/BlockedAccountsSlice'

export const store = configureStore({
    reducer:{
    counter:counterSlice.reducer,
    userinfo:UserinfoSlice,
    postinfo:PostinfoSlice,
    blockedAccounts:BlockedAccountsSlice
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch