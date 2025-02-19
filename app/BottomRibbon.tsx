import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useRouter} from 'expo-router';

const BottomRibbon = () => {
const router = useRouter();
const handleNextScreen = () => {
    router.push('/checklist'); 
};
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleNextScreen}>
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleNextScreen}>
        <Text style={styles.buttonText}>Location</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleNextScreen}>
        <Text style={styles.buttonText}>Shop</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleNextScreen}>
        <Text style={styles.buttonText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#70C4C3',
    height: 60,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  button: {
    padding: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BottomRibbon;