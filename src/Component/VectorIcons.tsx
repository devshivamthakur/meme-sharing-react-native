import  FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import  MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import  EntypoIcons from 'react-native-vector-icons/Entypo';
import  IonIcons from 'react-native-vector-icons/Ionicons';
import  AntDesign from 'react-native-vector-icons/AntDesign';
import React from 'react';
interface IconProps {
  name: string;
  family: "AntDesign"|"FontAwesomeIcons";
  size?: number;
  color?: string;
}

const iconFamilies = {
  FontAwesome: FontAwesomeIcons,
  MaterialIcons: MaterialIcons,
  Entypo: EntypoIcons,
  Ionicons: IonIcons,
  AntDesign: AntDesign
};

const VectorIcon: React.FC<IconProps> = ({ name, family, size = 30, color = '#000' }) => {
  const IconFamily = iconFamilies[family];
  return <IconFamily size={size} color={color} name={name} />;
};

export default VectorIcon;
