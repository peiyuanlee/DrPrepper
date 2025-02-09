import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Link, useRouter} from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function Profile6() {
  const router = useRouter();
  const handleNextScreen = () => {
    router.push('/profile7'); // Navigate to the next screen
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['left', 'right']}>
        <ImageBackground
          source={require('../assets/images/profile_creation_bg6.png')}
          resizeMode="stretch"
          style={styles.image}
        >
          {/* Progress Bar and Question Text */}
          <View style={styles.spacer} />
          <View style={styles.topContainer}>
            <Image
              source={require('../assets/images/profileCreationQ6.png')}
              style={styles.progressBar}
            />
            <Text style={styles.qText}>Question 6/8</Text>
          </View>

          {/* Spacer */}
          <View style={styles.spacer} />

          {/* Question Text */}
          <Text style={styles.quesText}>Do you have pets?</Text>

          {/* Spacer */}
          <View style={styles.spacer} />
          <View style={styles.spacer} />

          {/* Buttons */}
          <TouchableOpacity style={styles.button} onPress={handleNextScreen}>
            <Text style={styles.buttonText}>
              Yes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleNextScreen}>
            <Text style={styles.buttonText}>
              No
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
  },
  image: {
    flex: 1,
    width: width,
    height: height,
    justifyContent: 'flex-start', // Align content to the top
    alignItems: 'center', // Center content horizontally
  },
  topContainer: {
    alignItems: 'center', // Center progress bar and text horizontally
    marginTop: 20, // Add some margin at the top
  },
  progressBar: {
    width: 300, // Adjust width as needed
    height: 50, // Adjust height as needed
    resizeMode: 'contain',
  },
  qText: {
    color: '#000000', // Fixed color code (was missing a '0')
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10, // Add some space between progress bar and text
  },
  quesText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000', // Fixed color code (was missing a '0')
    textAlign: 'center', // Center the text
  },
  button: {
    backgroundColor: '#70C4C3',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: 169,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#000000', // Fixed color code (was missing a '0')
    fontSize: 16,
    fontWeight: 'bold',
  },
  spacer: {
    height: 50, // Adjust the height as needed
  },
});