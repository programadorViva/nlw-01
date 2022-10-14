import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/pages/home';
import {Roboto_400Regular, Roboto_500Medium} from '@expo-google-fonts/roboto';
import {Ubuntu_700Bold, useFonts} from '@expo-google-fonts/ubuntu';
import * as SplashScreen from 'expo-splash-screen';
import { useState } from 'react';
import Apploading from "expo-app-loading";
import * as Font from "expo-font";

import Routes from './src/route';

const getFonts = () =>
  Font.loadAsync({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold
  });
  

export default function App() {
  const [fontsloaded, setFontsLoaded] = useState(false);

  if (fontsloaded){
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor="trasparent" translucent />
        <Routes/>
      </>
    );
   }else {
    return (
      <Apploading
        startAsync={getFonts}
        onFinish={() => {
          setFontsLoaded(true);
        }}
        onError={console.warn}
      />
    );
  }
}
