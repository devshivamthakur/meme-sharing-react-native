import { createSlice } from "@reduxjs/toolkit"
import { BlockedAccount } from "../Sliceinterface"
import { BlockedListAsync, unBlockUserAsync } from "../Actions/BlockaccountActions"

const initialState: BlockedAccount={
    blockedAccounts:[],
    
}

const BlockedAccountsSlice=createSlice({
    name:"BlockedAccountsSlice",
    initialState,
    reducers:{
        updateBlockedAccounts:(state,action)=>{
            state.blockedAccounts=action.payload
        }
    },
    extraReducers: (builder) => {
       
        builder.addCase(BlockedListAsync.fulfilled, (state, action) => {
            state.blockedAccounts = action.payload
        })
        builder.addCase(unBlockUserAsync.fulfilled, (state,{payload}) => {
            state.blockedAccounts = state.blockedAccounts.filter((item)=>item.blocked_user.id!=payload.blocked_user_id)

        })


        
    }
})

export const {updateBlockedAccounts}=BlockedAccountsSlice.actions

export default BlockedAccountsSlice.reducer