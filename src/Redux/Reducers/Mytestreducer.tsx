import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      return {
        ...state,
        value: state.value + 1,
      }
    },
    decrement: (state) => {
      return {
        ...state,
        value: state.value - 1,
      }
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        value: state.value+action.payload,
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer