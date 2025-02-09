import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { ColorProperties } from 'react-native-reanimated/lib/typescript/Colors';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');
export default function LocationScreen() {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })();
    }, []);
  
  return (
    <SafeAreaProvider>
        <SafeAreaView style={styles.container} edges={['left', 'right']}>
          <ImageBackground source={require('../assets/images/landingpage.png')} resizeMode="stretch" style={styles.bg_image} imageStyle= 
          {{opacity:0.2}}>
    
          {/* Reddy Raccoon Image */}
          <Image
            source={require('../assets/images/ReddyRaccoon.png')}
            style={styles.raccoon}
            resizeMode="contain"
          />

      <Link href="/emergency" asChild>
        <TouchableOpacity style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </Link>
       {/* Existing UI */}
       {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
      {location && (
        <Text style={styles.coordinates}>
          Latitude: {location.coords.latitude}, Longitude: {location.coords.longitude}
        </Text>
      )}

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
    padding: 20,
    backgroundColor: '#fff',
  },
  raccoonImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  note: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  nextButton: {
    marginTop: 20,
    padding: 10,
  },
  nextButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error:{

  },
  coordinates:{
    
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