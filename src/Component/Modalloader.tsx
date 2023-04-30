import { View, Text, Modal } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { useAppDispatch, useAppSelector } from '../Redux/Hooks'
import { updatemodalloader } from '../Redux/Reducers/UserinfoSlice'

const Modalloader = () => {
    const Modalloader = useAppSelector(state => state.userinfo.showModalLoader)
    const dispatch=useAppDispatch()
    return (
        <View>
            <Modal
                visible={Modalloader}
                animationType='slide'
                transparent={true}

                onRequestClose={()=>{
                    dispatch(updatemodalloader(false))
                }}
            >
                <ActivityIndicator
                    color='blue'
                    size={"large"}
                />

            </Modal>
        </View>
    )
}

export default Modalloader