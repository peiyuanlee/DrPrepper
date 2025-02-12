import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function EmergencyScreen() {
  // Automatically show the alert when the screen loads
  const router = useRouter();
  const handleNextScreen = () => {
    router.push('/events'); // Navigate to the next screen
  };
  useEffect(() => {
    Alert.alert(
      "Alert", // Title of the alert
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
    <View style={styles.container}>
      <Image
        source={require('../assets/images/ReddyRaccoon.png')} // Replace with your raccoon image
        style={styles.raccoonImage}
      />
      {/* Add additional UI components here if needed */}
    </View>
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
});