import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function Profile9() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['left', 'right']}>
        <ImageBackground
          source={require('../assets/images/profile_creation_bg8.png')}
          resizeMode="stretch"
          style={styles.image}
        >
          <View style={styles.spacer} />

          {/* Progress Bar and Completion Text */}
          <View style={styles.topContainer}>
            <Image
              source={require('../assets/images/profileCreationQ8.png')}
              style={styles.progressBar}
            />
            <Image
              source={require('../assets/images/Burst.png')}
              style={styles.burst}
            />
            
          </View>
          <Text style={styles.qText}>Profile Complete!</Text>

          {/* Button */}
         
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>
            <Link href="/checklist">
              Get My Baseline Badge!
              </Link>
            </Text>
          </TouchableOpacity>

          {/* Spacer */}
          <View style={styles.spacer} />

          {/* Group 10 Image */}
          <Image
            source={require('../assets/images/Group 11.png')}
            style={styles.groupImage}
            resizeMode="contain"
          />

          {/* Reddy Raccoon Image */}
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
    flexDirection: 'row'
  },
  progressBar: {
    width: 300, // Adjust width as needed
    height: 50, // Adjust height as needed
    resizeMode: 'contain',
  },
  qText: {
    color: '#000000', // Fixed color code (was missing a '0')
    fontSize: 16,
    fontWeight: 'bold',
    //marginTop: 10, // Add some space between progress bar and text
  },
  button: {
    backgroundColor: '#70C4C3',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: 250,
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
  groupImage: {
    width: 350, // Adjust width as needed
    //height: 350, // Adjust height as needed
    //marginTop: 20, // Add some margin at the top
  },
  raccoon: {
    width: 200, // Adjust width as needed
    height: 200, // Adjust height as needed
    //marginTop: 20, // Add some margin at the top
  },
  burst:{
    margin:0
  }
});