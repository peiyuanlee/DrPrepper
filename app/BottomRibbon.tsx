import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useRouter} from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BottomRibbon = () => {
const router = useRouter();
const handleCommunity = () => {
  router.push('/community'); 
};
const handleDashboard = () => {
  router.push('/dashboard'); 
};
const handleMarket = () => {
  router.push('/marketplace'); 
};
const handleResources = () => {
  router.push('/resources'); 
};


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleCommunity}>
      <Icon name="public" size={30} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleResources}>
        <Icon name="location-on" size={30} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleMarket}>
      <Icon name="shopping-cart" size={30} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleDashboard}>
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