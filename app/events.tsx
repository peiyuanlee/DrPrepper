
import './gesture-handler';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Dimensions} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { Link, useRouter} from 'expo-router';

const { width, height } = Dimensions.get('window');
export default function EventsScreen() {
  const router = useRouter();
  const navProfile = () => {
    router.push('/about'); 
  };
  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <ImageBackground source={require('../assets/images/landingpage.png')} resizeMode="stretch" style={styles.bg_image} imageStyle= 
      {{opacity:0.2}}>
      <Image
        source={require('../assets/images/events_checkbox.png')}
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
    <TouchableOpacity style={styles.button} onPress={navProfile}>
      <Text style={styles.buttonText}> 
        Get Ready!
     </Text>
    </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  </SafeAreaProvider>
    
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
    width: 650,
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
    fontWeight: '700'

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
