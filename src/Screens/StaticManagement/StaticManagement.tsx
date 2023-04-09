import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { images } from '../../Theme';
import LinerGradiantView from '../../Component/LinerGradiantView';
import MyHeader from '../../Component/MyHeader';
import { normalize } from '../../../Normalize';
import { RouteProp } from '@react-navigation/native';
import { AppStackParamList } from '../../Router'
import UserNavigationProp from '../../Component/UserNavigationProp';
type ScreenRouteProp = RouteProp<AppStackParamList, 'StaticManagement'>;
type Props = {
    navigation: UserNavigationProp<'StaticManagement'>;
    route: ScreenRouteProp
  };
const StaticManagement: React.FC<Props> = (props) => {
  return (
    <LinerGradiantView style={styles.container}>
        <MyHeader
        title={props.route.params?.type}
        titlestyle={styles.titlestyle}
        leftPress={() => {
            props.navigation.goBack()

        }}
        style={{
            marginTop:-10,
            marginLeft:-20,
        }}
      />
      <Image source={images.applogo} style={styles.logo} />
      <Text style={styles.title}>About Us</Text>
      <Text style={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at tellus
        eget velit bibendum placerat. Quisque auctor massa in magna rutrum, a
        tincidunt arcu tempor. Duis ut sodales eros, non facilisis nulla.
      </Text>
      <Text style={styles.description}>
        Nullam sodales ipsum non sem bibendum, sit amet imperdiet enim bibendum.
        Fusce vestibulum mi eget augue eleifend viverra. Sed ullamcorper arcu at
        orci vulputate consequat.
      </Text>
      <Text style={styles.description}>
        Proin vehicula, mauris vel hendrerit mattis, elit elit hendrerit nisi,
        quis posuere felis enim eget nisi. Curabitur eleifend massa et orci
        bibendum ultrices.
      </Text>
    </LinerGradiantView>
  );
};

const styles = StyleSheet.create({
    titlestyle: {
        fontSize: normalize(18),
        fontWeight: "600"
      },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default StaticManagement;
