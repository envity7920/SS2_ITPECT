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
      backgroundColor:<ImageBackground source={require('../assets/images/Start.png')}/> ,
      backgroundColor: colors.primary_pink,
      image: <Image source={require('../assets/images/on1.png')} />,
      title: '',
      subTitleStyles: style.title,
      subtitle: '',
    },
    {
        backgroundColor:<ImageBackground source={require('../assets/images/On-bg.png')}/> ,
        // backgroundColor: colors.primary_yellow,
        image: <Image source={require('../assets/images/onboard2.png')} />,
        title: '',
        subTitleStyles: style.title,
        subtitle: 'Just need a mobile phone, you can practice anytime, anywhere!',
      },
      {
        backgroundColor:<ImageBackground source={require('../assets/images/onboard3-bg.png')}/> ,
        //backgroundColor: colors.primary_blue,
        image: <Image source={require('../assets/images/onboard3.png')} />,
        title: '',
        subTitleStyles: style.title,
        subtitle: '20 questions each test. One wrong answer is one new knowledge.',
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