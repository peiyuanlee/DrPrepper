import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useRouter} from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BottomRibbon = () => {
const router = useRouter();
const handleNextScreen = () => {
    router.push('/checklist'); 
};
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleNextScreen}>
      <Icon name="public" size={30} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleNextScreen}>
        <Icon name="location-on" size={30} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleNextScreen}>
      <Icon name="shopping-cart" size={30} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleNextScreen}>
      <Icon name="person" size={33} color="#fff" />
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
    height: 80,
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