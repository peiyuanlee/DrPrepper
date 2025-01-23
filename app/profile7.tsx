import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Dimensions} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { Link } from 'expo-router';

const { width, height } = Dimensions.get('window');
export default function Profile7() {
  return (
    <SafeAreaProvider>
        <SafeAreaView style={styles.container} edges={['left', 'right']}>
          <ImageBackground source={require('../assets/images/profile_creation_bg7.png')} resizeMode="stretch" style={styles.image}>
           <Image
                  source={require('../assets/images/profileCreationQ7.png')}
                  resizeMode="center"
                />
          <Text style={styles.buttonText}> 
            Question 7/8
            </Text>
            <View style={styles.spacer} /> 
            <Text style={styles.buttonText}> 
            Does your household have a car?
            </Text>
            <View style={styles.spacer} /> 

    
<TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}> 
          <Link href="/profile8">
          Yes
          </Link> 
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}> 
          <Link href="/profile8">
          No
          </Link> 
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
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
  image: {
    flex:1, 
    width: width,
    height:height,
    justifyContent: 'center',
    alignItems: 'center',
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
  spacer: {
    height: 30, // Adjust the height as needed
  },
});
