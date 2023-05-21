import { AppStackParamList } from "../Router";
import { RouteProp } from '@react-navigation/native';

 


export function CommonRoutesScreenStack(screenname:keyof AppStackParamList) {
    type CreateScreenRouteProp = RouteProp<AppStackParamList, keyof AppStackParamList>;

  return  CommonRoutesScreenStack
}