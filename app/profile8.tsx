import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Dimensions} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { Link } from 'expo-router';

const { width, height } = Dimensions.get('window');
export default function Profile8() {
  return (
    <SafeAreaProvider>
        <SafeAreaView style={styles.container} edges={['left', 'right']}>
          <ImageBackground source={require('../assets/images/profile_creation_bg8.png')} resizeMode="stretch" style={styles.image}>
           <Image
                  source={require('../assets/images/profileCreationQ8.png')}
                  resizeMode="center"
                />
          <Text style={styles.buttonText}> 
            Question 8/8
            </Text>
            <View style={styles.spacer} /> 
            <Text style={styles.buttonText}> 
            Do you have the necessary mobility aids for your household?
            </Text>
            <View style={styles.spacer} /> 
            <Text style={styles.egText}> 
            Examples include walkers, handicap vehicles, etc.
            </Text>
            <View style={styles.spacer} /> 

    
<TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}> 
          <Link href="/profile9">
          Yes
          </Link> 
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}> 
          <Link href="/profile9">
          No
          </Link> 
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}> 
          <Link href="/profile9">
          Not Needed
          </Link> 
          </Text>
        </TouchableOpacity>
        <Image
                  source={require('../assets/images/ReddyRaccoon.png')}
                  resizeMode="center" style = {styles.raccoon}
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
    height: 30, // Adjust the height as needed
  },
  raccoon: {
    flex:1, 
    width: 200,
    height:200,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
