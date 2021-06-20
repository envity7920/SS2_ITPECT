import React, { useEffect, useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import AppStack from './navigation/AppStack';
import AuthenticationStack from './navigation/AuthenticationStack';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, Alert, View } from 'react-native';
import { colors } from './utils/colors';
import { AuthContext } from './components/context';
import * as firebase from 'firebase';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';



var firebaseConfig = {
  apiKey: "AIzaSyDySPj_f5FY5mfVrfHSKiF0k6E8ZwVaqIs",
  authDomain: "itpec-7d8a2.firebaseapp.com",
  projectId: "itpec-7d8a2",
  storageBucket: "itpec-7d8a2.appspot.com",
  messagingSenderId: "76672959931",
  appId: "1:76672959931:web:35b4301989b6ca3dd2709e"
};
// Initialize Firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

WebBrowser.maybeCompleteAuthSession();


export default function App() {
  // declare the fonts to use
  let [fontsLoaded] = useFonts({
    'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-Black': require('./assets/fonts/Montserrat-Black.ttf'),
    'Montserrat-ExtraBold': require('./assets/fonts/Montserrat-ExtraBold.ttf'),
    'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-BoldItalic': require('./assets/fonts/Montserrat-BoldItalic.ttf'),
  });


  // FIREBASE
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);




  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);




  if (initializing) return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size='large' color={colors.primary_pink} style='' />
    </View>

  );


  // if all fonts are not loaded return apploading 
  if (!fontsLoaded) {
    return (
      <AppLoading />
    );
  } else {
    return (

      <AuthContext.Provider value={{
        user,
        setUser,
        signIn: async (email, password) => {
          try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        googleSignIn: async () => {
          const response = Google.useIdTokenAuthRequest(
            {
              clientId: '647627597329-odh8qan264fshufqqi87kneokhgl55ia.apps.googleusercontent.com',
            },
          )[1];
          try {
            if (response?.type === 'success') {
              const { id_token } = response.params;
              const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
              await firebase.auth().signInWithCredential(credential);
            }






          } catch (error) {
            console.log(error);
          }


        }

        ,
        signOut: async () => {
          try {
            await firebase.auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
        signUp: async (email, password) => {

          // try {
          await firebase.auth().createUserWithEmailAndPassword(email, password);
          // } catch (error) {
          //   console.log(error);
          //   return error;
          // }
        }

      }}>
        <NavigationContainer>
          {user != null ? <AppStack /> : <AuthenticationStack />}
        </NavigationContainer>
      </AuthContext.Provider>

    );

  }
}







