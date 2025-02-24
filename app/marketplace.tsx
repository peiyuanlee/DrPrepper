import React, { useState} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Dimensions, Modal, FlatList, ScrollView} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import BottomRibbon from './BottomRibbon';

const { width, height } = Dimensions.get('window');
export default function MarketplaceScreen() {
     const [modalVisible, setModalVisible] = useState(true);
      const handleCloseModal = () => {
        setModalVisible(false); 
      };
      const marketplaceItems = [
        {
            id: 1,
            name: 'Hand Crank Radios',
            images: [
                require('../assets/images/hand-crank-radio-1.png'), // Replace with your image paths
                require('../assets/images/hand-crank-radio-2.png'),
                require('../assets/images/hand-crank-radio-3.png'),
                require('../assets/images/hand-crank-radio-4.png'),
            ],
        },
        {
            id: 2,
            name: 'Batteries',
            images: [
                require('../assets/images/batteries-1.png'), // Replace with your image paths
                require('../assets/images/batteries-2.png'),
                require('../assets/images/batteries-3.png'),
                require('../assets/images/batteries-4.png'),
            ],
        },
        {
            id: 3,
            name: 'Flashlights',
            images: [
                require('../assets/images/flashlight-1.png'), // Replace with your image paths
                require('../assets/images/flashlight-2.png'),
                require('../assets/images/flashlight-3.png'),
                require('../assets/images/flashlight-4.png'),
            ],
        },
        {
            id: 4,
            name: 'Go-Bags',
            images: [
                require('../assets/images/go-bag-1.png'), // Replace with your image paths
                require('../assets/images/go-bag-2.png'),
                require('../assets/images/go-bag-3.png'),
                require('../assets/images/go-bag-4.png'),
            ],
        }
        // Add more items as needed
    ];
    const MarketplaceItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
    
            {/* Horizontal Image Gallery */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {item.images.map((image, index) => (
                    <Image key={index} source={image} style={styles.itemImage} />
                ))}
            </ScrollView>
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
                  <Text style={styles.headerText}>
                    Ready's Marketplace
                  </Text>
                </View>
                <Image
                        source={require('../assets/images/ReddyRaccoon.png')}
                        style={styles.raccoon}
                        resizeMode="contain"
                      />
         </View>

         

         <View style={styles.marketContainer}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {marketplaceItems.map((item) => (
                    <MarketplaceItem key={item.id} item={item} />
                ))}
            </ScrollView>
        </View>


        <Modal
              visible={modalVisible}
              transparent={true}
              animationType="fade"
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                  
                  <View style = {styles.modalHeader}> 

                    <Text style={styles.modalTitle}>Welcome to {"\n"}Ready's Marketplace</Text>
                    </View>
                  
                  <Text style={styles.modalText}>
                  Shop with confidence from our pre-vetted retail partners and score some major discounts
                  </Text>
                  <TouchableOpacity style={styles.startButton} onPress={handleCloseModal}>
                    <Text style={styles.modalButtonText}>Show me the deals!</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.maybeLaterButton} onPress={handleCloseModal}>
                    <Text style={styles.maybeLaterText}>I don't like deals</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

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
    color: '#000000', 
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'left',
    width: '80%'
  },
  progressContainer: {
    width: '85%', // Set a fixed width
    //marginBottom: 20,
    paddingHorizontal: 10,
    height: 90,
    flexDirection: 'row'
  },
  progressBarBackground: {
    height: 35,
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
    //position: 'absolute',
   //left: 90,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '800',
    color: '#000', // Visible text
    padding: 8
  },
  topContainer: {
    alignItems: 'center', // Center progress bar and text horizontally
    marginTop: 20, // Add some margin at the top
    width: '85%'
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
  popupRaccoon: {
    width: '40%',
    alignItems: 'flex-end',
    //position: 'absolute',
    // left: 110,
     bottom: 30
    //padding: 60,
    
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
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    overflow: 'hidden',
    height:'38%'
  },
  modalImage: {
    width: '15%'

  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#fff'
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000',
    padding: 30,
    fontWeight: 'bold'
  },
  modalHeader:{
    backgroundColor: '#70C4C3',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20,
    padding: 10,
    justifyContent: 'center'

  },
  startButton: {
    backgroundColor: '#70C4C3',
    padding: 15,
    borderRadius: 10,
    width: '70%',
    alignItems: 'center',
    marginBottom: 10,
  },
  maybeLaterButton: {
    padding: 10,
  },
  maybeLaterText: {
    color: '#70C4C3',
    fontSize: 12,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  modalButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomContainer:{
    flexDirection: 'row'
  },
  overlay: {
    position: 'absolute', // Position the overlay absolutely
    top: -200,
    left: 100,
    right: 0,
    bottom: 900,
    // justifyContent: 'center',
    // alignItems: 'center',
    //backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
},
image: {
    width: '90%'
},
fullScreenTouchable: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent', // Make it invisible
},
scrollContainer: {
    paddingBottom: 20, // Add padding at the bottom for better scrolling
},
itemContainer: {
    marginBottom: 20,
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
},
itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
},
itemImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 5,
    resizeMode:"contain"
},
marketContainer: {
    flex: 1,
    padding: 20,
    //backgroundColor: '#fff',
},
});