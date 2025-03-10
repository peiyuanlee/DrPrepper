import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, Dimensions, Alert, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function LocationScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

  // Check and request location permission
  const checkAndRequestPermission = async (): Promise<void> => {
    const { status, canAskAgain } = await Location.getForegroundPermissionsAsync();

    // If permission is permanently denied, show an alert and return to index
    if (status !== 'granted' && !canAskAgain) {
      Alert.alert(
        'Permission Required',
        'Location permission is permanently denied. Please enable it in settings.',
        [
          {
            text: 'Okay',
            onPress: () => router.back(), // Return to index screen
            style: 'cancel',
          },
        ]
      );
      return;
    }

    // If permission is not granted, request it
    if (status !== 'granted') {
      const { status: newStatus } = await Location.requestForegroundPermissionsAsync();
      if (newStatus !== 'granted') {
        // If denied, return to index screen
        router.back();
        return;
      }
    }

    // If permission is granted, get the location and navigate to /events
    const location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    router.push('/events'); // Navigate to the next screen
  };

  // Initial permission check
  useEffect(() => {
    checkAndRequestPermission();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['left', 'right']}>
        <ImageBackground
          source={require('../assets/images/landingpage.png')}
          resizeMode="stretch"
          style={styles.bg_image}
          imageStyle={{ opacity: 0.2 }}
        >
          <View style={styles.topContainer}>
            <Image
              source={require('../assets/images/Frame 66.png')}
              style={styles.chatbox}
              resizeMode="contain"
            />
          </View>

          {/* Reddy Raccoon Image */}
          <Image
            source={require('../assets/images/ReddyRaccoon.png')}
            style={styles.raccoon}
            resizeMode="contain"
          />

          {/* Display error message if permission is denied */}
          {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
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
  bg_image: {
    flex: 1,
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topContainer: {
    position: 'absolute',
    top: 50, // Adjust this value to position the chatbox
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  chatbox: {
    width: 350,
    height: 300, // Adjust height as needed
  },
  raccoon: {
    height: 250,
    marginTop: 600, // Adjust spacing between chatbox and raccoon
  },
  error: {
    color: 'red',
    marginTop: 20,
    textAlign: 'center',
  },
});