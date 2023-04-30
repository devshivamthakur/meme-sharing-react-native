import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import { useAppDispatch, useAppSelector } from './src/Redux/Hooks'
import { increment, incrementByAmount } from './src/Redux/Reducers/Mytestreducer'

const MyTest = () => {
  const states=useAppSelector(state=>state.counter)
  const dispatch=useAppDispatch()
  return (
    <TouchableOpacity
    style={{
      width:150,
      height:150,
      backgroundColor:"red"
    }}
    onPress={()=>{
      // dispatch(increment())
      dispatch(incrementByAmount(500))
    }}
    >
      <Text
     
      >

        {states.value}
      </Text>
    </TouchableOpacity>
  )
}

export default MyTest