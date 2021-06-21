import React from 'react';
import { Image, StyleSheet, Text, Touchable, TouchableOpacity } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import ImageBackground from 'react-native/Libraries/Image/ImageBackground';
import {colors} from '../utils/colors';

const Onboard = ({navigation}) => {



const Done = ({...props}) => (
    <TouchableOpacity style={{marginHorizontal: 10}} {...props}>
        <Text>Done</Text>
    </TouchableOpacity>
)

    return (
        <Onboarding
        onSkip = {()=>navigation.replace("Signin")}
        onDone = {()=>navigation.navigate("Signin")}
        DoneButtonComponent = {Done}
  pages={[
    {
      // backgroundColor:<ImageBackground source={require('../assets/images/On-bg.png')}/> ,
      backgroundColor: colors.primary_pink,
      image: <Image source={require('../assets/images/on1.png')} />,
      title: 'Welcome to ITPEC App!',
      subTitleStyles: style.title,
      subtitle: 'It is health that is the real wealth, and not pieces of gold and silver',
    },
    {
      // backgroundColor:<ImageBackground source={require('../assets/images/On-bg.png')}/> ,
        // backgroundColor: colors.primary_yellow,
        image: <Image source={require('../assets/images/onboard2.png')} />,
        title: '',
        subTitleStyles: style.title,
        subtitle: 'Dun blame body shaming blame your ugly body',
      },
      {
        backgroundColor: colors.primary_blue,
        image: <Image source={require('../assets/images/onboard3.png')} />,
        title: '',
        subTitleStyles: style.title,
        subtitle: 'Your mouth is watering go get it',
      }
    
  ]}
/>
    )
}

export default Onboard;


const style = StyleSheet.create({


  title: {
    fontFamily: 'Montserrat-Medium'
  }
});