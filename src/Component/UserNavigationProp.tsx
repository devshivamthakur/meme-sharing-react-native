import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../Router';

type UserNavigationProp<T extends keyof AppStackParamList> = NativeStackNavigationProp<
  AppStackParamList,
  T
>;

export default UserNavigationProp;
