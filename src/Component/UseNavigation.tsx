import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../Router';
import { useNavigation } from '@react-navigation/native'

export function useNavigation_(screenname:keyof AppStackParamList){
    type NavigationProps = NativeStackNavigationProp<AppStackParamList, keyof AppStackParamList>;

    const navigation = useNavigation<NavigationProps>();
    return navigation


}