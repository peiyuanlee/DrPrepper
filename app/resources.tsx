import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Image,
  Text,
  ScrollView,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import BottomRibbon from './BottomRibbon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

const ResourcesScreen = () => {
  // Define the initial region (latitude, longitude, and zoom level)
  const initialRegion = {
    latitude: 37.7749, // San Francisco latitude
    longitude: -122.4194, // San Francisco longitude
    latitudeDelta: 0.0922, // Zoom level
    longitudeDelta: 0.0421, // Zoom level
  };

  // Define marker locations for fires
  const fireMarkers = [
    {
      id: 1,
      title: 'Location1',
      description: 'Active fire in this area',
      latitude: 37.7749,
      longitude: -122.4194,
    },
    {
      id: 2,
      title: 'Location2',
      description: 'Active fire in this area',
      latitude: 37.78425,
      longitude: -122.4344,
    },
    {
      id: 3,
      title: 'Location3',
      description: 'Active fire in this area',
      latitude: 37.78825,
      longitude: -122.4324,
    },
  ];

  // Define marker locations for earthquakes
  const earthquakeMarkers = [
    {
      id: 1,
      title: 'Location1',
      description: 'Recent earthquake in this area',
      latitude: 37.79825,
      longitude: -122.4294,
    },
    {
      id: 2,
      title: 'Location2',
      description: 'Recent earthquake in this area',
      latitude: 37.78425,
      longitude: -122.4344,
    },
  ];

  // Custom marker for fires
  const FireMarker = () => (
    <View style={styles.marker}>
      <Icon name="fire" size={30} color="red" />
    </View>
  );

  // Custom marker for earthquakes
  const EarthquakeMarker = () => (
    <View style={styles.marker}>
      <Icon name="alert-octagon" size={30} color="orange" />
    </View>
  );

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
                <Text style={styles.headerText}>Ready's Resources</Text>
              </View>
              <Image
                source={require('../assets/images/ReddyRaccoon.png')}
                style={styles.raccoon}
                resizeMode="contain"
              />
            </View>
            <View style={styles.spacer} />
            
          {/* Wrap the content in a ScrollView */}
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/* Map 1: Active Fires */}
            <View style={styles.mapContainer}>
              <Text style={styles.mapTitle}>Active Fires</Text>
              <MapView
                style={styles.map}
                initialRegion={initialRegion} // Set the initial map region
                mapType="hybrid" // Use hybrid map type
              >
                {/* Render fire markers */}
                {fireMarkers.map((marker) => (
                  <Marker
                    key={marker.id}
                    coordinate={{
                      latitude: marker.latitude,
                      longitude: marker.longitude,
                    }}
                    title={marker.title}
                    description={marker.description}
                  >
                    <FireMarker />
                  </Marker>
                ))}
              </MapView>
            </View>

            {/* Map 2: Recent Earthquakes */}
            <View style={styles.mapContainer}>
              <Text style={styles.mapTitle}>Recent Earthquakes</Text>
              <MapView
                style={styles.map}
                initialRegion={initialRegion} // Set the initial map region
                mapType="hybrid" // Use hybrid map type
              >
                {/* Render earthquake markers */}
                {earthquakeMarkers.map((marker) => (
                  <Marker
                    key={marker.id}
                    coordinate={{
                      latitude: marker.latitude,
                      longitude: marker.longitude,
                    }}
                    title={marker.title}
                    description={marker.description}
                  >
                    <EarthquakeMarker />
                  </Marker>
                ))}
              </MapView>
            </View>

            {/* Add more content here if needed */}
            <View style={styles.spacer} />
          </ScrollView>

          <BottomRibbon />
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1, // Ensures the ScrollView can scroll
    justifyContent: 'center',
    alignItems: 'center',
    //paddingVertical: 20, // Add padding for better spacing
  },
  bg_image: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
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
    bottom: -45, // Adjust to overlap the edge
    right: -12,
    height: 150, // Adjust size as needed
  },
  topContainer: {
    alignItems: 'center', // Center progress bar and text horizontally
    marginTop: 20, // Add some margin at the top
    width: '85%',
  },
  spacer: {
    height: 25,
  },
  mapContainer: {
    flex: 1, // Take up remaining space
    width: width*0.8, // Full width
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20, // Add some margin at the top
    marginBottom: 30
  },
  map: {
    width: '100%', // Full width of the container
    height: '100%', // Full height of the container
  },
  mapTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  marker: {
    // Custom marker styles
  },
});

export default ResourcesScreen;