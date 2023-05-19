import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../Router';
import { useNavigation } from '@react-navigation/native'
import { BottomTabParamslist } from '../Tabs';

export function useNavigation_(screenname:keyof AppStackParamList){
    type NavigationProps = NativeStackNavigationProp<AppStackParamList, keyof AppStackParamList>;

    const navigation = useNavigation<NavigationProps>();
    return navigation


}

export function useNavigation_Tab(screenname: keyof BottomTabParamslist){
    type NavigationProps = NativeStackNavigationProp<BottomTabParamslist, keyof BottomTabParamslist>;

    const navigation = useNavigation<NavigationProps>();
    return navigation
}