import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Alert, ImageBackground, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function EmergencyScreen() {
  const router = useRouter();
  const handleNextScreen = () => {
    router.push('/events'); 
  };
  useEffect(() => {
    Alert.alert(
      "⚠️Alert⚠️", // Title of the alert
      "We have detected an emergency situation in your area. Would you like to learn more?", // Message of the alert
      [
        {
          text: "Cancel", // Button text
          onPress: () => console.log("Cancel Pressed"), // Action on press
          style: "cancel" // Button style (optional)
        },
        {
          text: "OK",
          onPress: () => handleNextScreen(),

        }
      ],
      { cancelable: false } // Prevents tapping outside to dismiss (optional)
    );
  }, []); // Empty dependency array ensures this runs only once on mount

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
              source={require('../assets/images/chatbox_2.png')}
              style={styles.chatbox}
              resizeMode="contain"
                />
             </View>
                <Image
                    source={require('../assets/images/ReddyRaccoon.png')}
                    style={styles.raccoon}
                    resizeMode="contain"
                />
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
top: -100, // Adjust this value to position the chatbox
justifyContent: 'center',
alignItems: 'center',
width: '100%',
},
chatbox: {
width: 350,
height: 900, // Adjust height as needed
},
raccoon: {
height: 250,
marginTop: 500, // Adjust spacing between chatbox and raccoon
},

});