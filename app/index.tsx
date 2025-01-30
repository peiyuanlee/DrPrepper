
import './gesture-handler';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Dimensions} from 'react-native';
// import { createStackNavigator } from '@react-navigation/stack';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
// import { NavigationContainer } from '@react-navigation/native';
import { Link } from 'expo-router';

const { width, height } = Dimensions.get('window');
function HomeScreen() {
  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <ImageBackground source={require('../assets/images/landingpage.png')} resizeMode="stretch" style={styles.bg_image} imageStyle= 
      {{opacity:0.2}}>
      <Image
        source={require('../assets/images/Group 9.png')}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Reddy Raccoon Image */}
      <Image
        source={require('../assets/images/ReddyRaccoon.png')}
        style={styles.raccoon}
        resizeMode="contain"
      />

      {/* Buttons */}
      <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Sign In</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}> <Link href="/about">
        Create Profile
      </Link></Text>
    </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  </SafeAreaProvider>
    
  );
}


export default function App() {
  return (
    HomeScreen()
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
    opacity:1
  },
  image: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
  },
  button: {
    backgroundColor: '#70C4C3',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: 169,
    height: 48,
    alignItems: 'center',
  },
  buttonText: {
    color: '#00000',
    fontSize: 16,
    fontWeight: 'bold'

  },
  bg_image: {
    flex:1, 
    width: width,
    height:height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  raccoon: {
    height: 300
  }
});
