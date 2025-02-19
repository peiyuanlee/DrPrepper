import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import BottomRibbon from './BottomRibbon';

const { width, height } = Dimensions.get('window');
export default function DashboardScreen() {
  return (
<SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['left', 'right']}>
        <ImageBackground
                      source={require('../assets/images/landingpage.png')}
                      resizeMode="stretch"
                      style={styles.bg_image}
                      imageStyle={{ opacity: 0.2 }}
                    >
        <View style={styles.topContainer}>
                <View style={styles.headerBackground}>

                  <Text style={styles.headerText}>
                    Welcome back, Hal!
                  </Text>
                </View>
         </View>

         <View style={styles.spacer} />

        <Text style={styles.buttonText}>
            Baseline Badge
        </Text>
        <View style={styles.progressContainer}>
  <View style={styles.progressBarBackground}>
    <View
      style={[
        styles.progressBarFill,
        {
          width: '100%', // Full progress
          backgroundColor: '#70C4C3',
        },
      ]}
    />
    <Text style={styles.progressBarText}>100%</Text>
  </View>
</View>

        <Text style={styles.buttonText}>
            Fire Safety Badge
        </Text>
        <View style={styles.progressContainer}>
                <View style={styles.progressBarBackground}>
                <View
              style={[
                styles.progressBarFill,
                {
                  width: '15%',
                  backgroundColor:
                    '#C83402'
                },
              ]}
                />
                  <Text style={styles.progressBarText}>
                    15%
                  </Text>
                </View>
              </View>
        <Text style={styles.buttonText}>
            Earthquake Readiness Badge
        </Text>
        <View style={styles.progressContainer}>
                <View style={styles.progressBarBackground}>
                <View
              style={[
                styles.progressBarFill,
                {
                  width: '25%',
                  backgroundColor:
                    '#C89002'
                },
              ]}
                />
                  <Text style={styles.progressBarText}>
                    25%
                  </Text>
                </View>
              </View>
        <Image
            source={require('../assets/images/ReadyRaccoonBadge.png')}
            style={styles.popupRaccoon}
            resizeMode="contain"
        />
        <BottomRibbon />
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
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
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bg_image: {
    width: width,
    height:height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000000', // Fixed color code (was missing a '0')
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  progressContainer: {
    width: '90%', // Set a fixed width
    marginBottom: 20,
    paddingHorizontal: 10,
    height: 90
  },
  progressBarBackground: {
    height: 30,
    width: '100%',
    backgroundColor: '#EFEDE1', 
    borderRadius: 15, 
    overflow: 'hidden',
    position: 'relative', // Important
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 15,
    position: 'absolute', // Layering
    top: 0,
    left: 0,
  },
  progressBarText: {
    position: 'absolute',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff', // Visible text
  },
  topContainer: {
    alignItems: 'center', // Center progress bar and text horizontally
    marginTop: 20, // Add some margin at the top
    width: '80%'
  },
  spacer: {
    height: 50,
  },
  buttonContainer: {
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
  ribbonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  popupRaccoon: {
    //height: 100,
    width: '50%',
    alignItems: 'flex-end',
  },
  headerBackground: {
    height: 50,
    width: '100%',
    backgroundColor: '#EFEDE1', 
    borderRadius: 50, 
    overflow: 'hidden',
    position: 'relative', 
    justifyContent: 'center',
    alignItems: 'center',

  },
  headerText:{
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
  }
});