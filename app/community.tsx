import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  ScrollView,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import BottomRibbon from './BottomRibbon';
import Icon from 'react-native-vector-icons/AntDesign';

const { width, height } = Dimensions.get('window');

// Mock data for the social feed
const socialFeedData = [
  {
    id: 1,
    user: 'Hal',
    action: 'got his Baseline Badge',
    message: '  Say congrats!',
    image: require('../assets/images/person1.png'),
  },
  {
    id: 2,
    user: 'Megan',
    action: 'just signed up',
    message: '  Say hi!',
    image: require('../assets/images/person2.png'),
  },
  {
    id: 3,
    user: 'Phil',
    action: 'is 50% done with his Baseline Badge',
    message: '  Nudge him to keep going!',
    image: require('../assets/images/person3.png'),
  },
  {
    id: 4,
    user: 'Dani',
    action: 'started her Fire Safety Badge',
    message: '  Cheer her on!',
    image: require('../assets/images/person4.png'),
  },
  {
    id: 5,
    user: 'Josh',
    action: 'marked himself safe from the Palisades Fire',
    message: '  Check on him!',
    image: require('../assets/images/person5.png'),
  },
];

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
            <View style={styles.spacer} />
            <View style={styles.spacer} />
          <View style={styles.topContainer}>
            <View style={styles.headerBackground}>
              <Text style={styles.headerText}>Ready's Community</Text>
            </View>
            <Image
              source={require('../assets/images/ReddyRaccoon.png')}
              style={styles.raccoon}
              resizeMode="contain"
            />
          </View>

          <View style={styles.spacer} />

          {/* Social Feed Section */}
          <ScrollView style={styles.feedContainer}>
            {socialFeedData.map((item) => (
              <View key={item.id} style={styles.feedItem}>
                <View style={styles.feedHeader}>
                  <Image source={item.image} style={styles.feedImage} />
                  <View style= {styles.feedInfo}> 
                    
                  <Text style={styles.feedText}>
                    <Text style={styles.feedUser}>{item.user}</Text>{' '}
                    {item.action}
                  </Text>
                  <Text> 👍   🎉  😄  ❤️</Text>
                  <TouchableOpacity style={styles.feedButton}>
                    <Icon
                                    name= 'pluscircleo'
                                    size={15}
                                    color="#79747E"
                                />
                  <Text style={styles.feedButtonText}>{item.message}</Text>
                </TouchableOpacity>

                  </View>
                </View>
               
              </View>
            ))}
          </ScrollView>

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
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topContainer: {
    alignItems: 'center',
    marginTop: 20,
    width: '85%',
  },
  spacer: {
    height: 25,
  },
  headerBackground: {
    height: 50,
    width: '100%',
    backgroundColor: '#70C4C3',
    borderRadius: 50,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerText: {
    fontWeight: '700',
    fontSize: 22,
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    color: 'white',
    padding: 12,
  },
  raccoon: {
    width: '15%',
    position: 'absolute',
    bottom: -45,
    right: -12,
    height: 150,
  },
  feedContainer: {
    flex: 1,
    width: '85%',
    marginBottom: 20,
  },
  feedItem: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  feedText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  feedUser: {
    fontWeight: 'bold',
    color: '#000',
  },
  feedButton: {
    // backgroundColor: '#70C4C3',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignItems: 'center',
    flexDirection: 'row'
  },
  feedButtonText: {
    color: '#79747E',
    fontWeight: '600',
    fontSize: 14,
  },
  feedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginRight: 10
  },
  feedImage: {
    width: 60,
    height: 60,
    borderRadius: 20,
    marginRight: 10,
  },
  feedInfo:{
    flex: 1, 
    flexShrink: 1, 
  }
});