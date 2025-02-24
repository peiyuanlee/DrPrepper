import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, ImageBackground, Image, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import BottomRibbon from './BottomRibbon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');
const ResourcesScreen = () => {
    // Define the initial region (latitude, longitude, and zoom level)
    const initialRegion = {
        latitude: 37.78825, // Replace with your desired latitude
        longitude: -122.4324, // Replace with your desired longitude
        latitudeDelta: 0.0922, // Zoom level
        longitudeDelta: 0.0421, // Zoom level
    };

    // Define marker locations
    const markers = [
        {
            id: 1,
            title: 'Location 1',
            description: 'This is Location 1',
            latitude: 37.78825,
            longitude: -122.4324,
        },
        {
            id: 2,
            title: 'Location 2',
            description: 'This is Location 2',
            latitude: 37.78425,
            longitude: -122.4344,
        },
        {
            id: 3,
            title: 'Location 3',
            description: 'This is Location 3',
            latitude: 38.78425,
            longitude: -122.4344,
        },
        {
            id: 4,
            title: 'Location 4',
            description: 'This is Location 4',
            latitude: 38.78425,
            longitude: -132.4344,
        },
        // Add more markers as needed
    ];

    const CustomMarker = () => (
        <View style= {styles.marker}>
            <Icon name="fire-circle" size={30} color="red" />
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

            {/* MapView Container */}
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    initialRegion={initialRegion} // Set the initial map region
                >
                    {/* Render markers */}
                    {markers.map((marker) => (
                        <Marker
                            key={marker.id}
                            coordinate={{
                                latitude: marker.latitude,
                                longitude: marker.longitude,
                            }}
                            title={marker.title}
                            description={marker.description}>
                                <CustomMarker />
                            </Marker>
                        
                    ))}
                </MapView>
            </View>
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    initialRegion={initialRegion} // Set the initial map region
                    mapType="hybrid"
                >
                    {/* Render markers */}
                    {markers.map((marker) => (
                        <Marker
                            key={marker.id}
                            coordinate={{
                                latitude: marker.latitude,
                                longitude: marker.longitude,
                            }}
                            title={marker.title}
                            description={marker.description}>
                                <CustomMarker />
                            </Marker>
                        
                    ))}
                </MapView>
            </View>

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
    map: {
        width: '80%', // Full width
        height: '80%',
        marginBottom: 60,
        
    },
    bg_image: {
        width: width,
        height:height,
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
        flexDirection: 'row'
    
      },
      headerText:{
        fontWeight: '700',
        fontSize: 22,
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        color: 'white',
        padding:12
      },
      raccoon:{
        width: '15%',
        position: 'absolute',
        bottom: -45, // Adjust to overlap the edge
        right: -12, 
        height: 150, // Adjust size as needed
      },
      topContainer: {
        alignItems: 'center', // Center progress bar and text horizontally
        marginTop: 20, // Add some margin at the top
        width: '85%'
      },
      spacer: {
        height: 50,
      },
      mapContainer: {
        flex: 1, // Take up remaining space
        width: '100%', // Full width
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20, // Add some margin at the top
        
    },
    marker: {

    },

});

export default ResourcesScreen;