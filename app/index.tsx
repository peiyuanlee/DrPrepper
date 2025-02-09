
import './gesture-handler';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Dimensions} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { Link, useRouter} from 'expo-router';

const { width, height } = Dimensions.get('window');
function HomeScreen() {
  const router = useRouter();
  const handleNextScreen = () => {
    router.push('/location'); // Navigate to the next screen
  };
  const navProfile = () => {
    router.push('/about'); // Navigate to the next screen
  };
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
      <Link href="/location">
      <TouchableOpacity style={styles.button} onPress={handleNextScreen}>
      <Text style={styles.buttonText}>Sign In</Text>
    </TouchableOpacity>
    </Link>
    <TouchableOpacity style={styles.button} onPress={navProfile}>
      <Text style={styles.buttonText}> 
        Create Profile
     </Text>
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
