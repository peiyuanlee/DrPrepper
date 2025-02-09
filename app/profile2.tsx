import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Dimensions} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { Link, useRouter} from 'expo-router';

const { width, height } = Dimensions.get('window');
export default function Profile2() {
  const router = useRouter();
  const handleNextScreen = () => {
    router.push('/profile3'); // Navigate to the next screen
  };
  return (
    <SafeAreaProvider>
        <SafeAreaView style={styles.container} edges={['left', 'right']}>
          <ImageBackground source={require('../assets/images/profile_creation_bg2.png')} resizeMode="stretch" style={styles.image}>

        <View style={styles.spacer} />
          {/* Progress Bar */}
          <View style={styles.topContainer}>
            <Image
              source={require('../assets/images/profileCreationQ3.png')}
              style={styles.progressBar}
            />
            <Text style={styles.qText}>Question 2/8</Text>
          </View>

          {/* Spacer */}
          <View style={styles.spacer} />

          {/* Question Text */}
          <Text style={styles.quesText}>How old are you?</Text>

          {/* Spacer */}
          <View style={styles.spacer} />
    

        <TouchableOpacity style={styles.button} onPress={handleNextScreen}>
          <Text style={styles.buttonText}> 
          13-18
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNextScreen}>
          <Text style={styles.buttonText}> 
          18-40
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNextScreen}>
          <Text style={styles.buttonText}> 
          40-60
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNextScreen}>
          <Text style={styles.buttonText}> 
          60+
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
    flex: 1,
    width: width,
    height: height,
    justifyContent: 'flex-start', 
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
    height: 50, // Adjust the height as needed
  },
  infoText:{
    fontSize: 20,
    textAlign: 'center',
    margin: 50, 
    marginTop:10,
  }, 
  quesText:{
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00000',
  }, 
  qText:{
    flexDirection: 'row',
    alignContent: 'flex-start', 
    marginBottom: 50,
    color: '#00000',
    fontSize: 20,
    fontWeight: 'bold'

  },
  progressBar:{
    width: 300, // Adjust width as needed
    height: 50, // Adjust height as needed
    resizeMode: 'contain',
  },
  topContainer: {
    alignItems: 'center', // Center progress bar and text horizontally
    marginTop: 20, // Add some margin at the top
  },
  
});
