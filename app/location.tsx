import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function LocationScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      router.push('/emergency');
    })();
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

          {/* Existing UI */}
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