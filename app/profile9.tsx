import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Dimensions} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { Link } from 'expo-router';

const { width, height } = Dimensions.get('window');
export default function Profile9() {
  return (
    <SafeAreaProvider>
        <SafeAreaView style={styles.container} edges={['left', 'right']}>
          <ImageBackground source={require('../assets/images/profile_creation_bg8.png')} resizeMode="stretch" style={styles.image}>
           <Image
                  source={require('../assets/images/profileCreationQ8.png')}
                  resizeMode="center"
                />
          <Text style={styles.buttonText}> 
            Complete!
            </Text>

            <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}> 
          <Link href="/profile7">
          Go to Checklist
          </Link> 
          </Text>
        </TouchableOpacity>
        <View style={styles.spacer} />
              <Image
                source={require('../assets/images/Group 10.png')}
                style={styles.image}
                resizeMode="center"
              />
        <Image
                  source={require('../assets/images/ReddyRaccoon.png')}
                  resizeMode="center"
                />

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
  egText: {
    color: '#00000',
    fontSize: 12,
    fontWeight: 'bold'

  },
  spacer: {
    height: 70, // Adjust the height as needed
  },
});
