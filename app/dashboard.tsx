import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Dimensions, Modal,Animated } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import BottomRibbon from './BottomRibbon';
import Icon from 'react-native-vector-icons/Feather';

const { width, height } = Dimensions.get('window');
export default function DashboardScreen() {
     const [modalFireVisible, setFireModalVisible] = useState(false);
     const [modalMudVisible, setMudModalVisible] = useState(false);
     const [modalEarthVisible, setEarthModalVisible] = useState(false);
     const [modalVisible, setModalVisible] = useState(false);
     const handleCloseFireModal = () => {
        setFireModalVisible(false); 
      };
      const handleOpenFireModal = () => {
        if (progress !== 1) {
            setModalVisible(true); 
        } else {
            setFireModalVisible(true); 
        }
      };
      const handleCloseMudModal = () => {
        setMudModalVisible(false); 
      };
      const handleOpenMudModal = () => {
        if (progress !== 1) {
            setModalVisible(true); 
        } else {
            setMudModalVisible(true); 
        }
      };
      const handleCloseEarthModal = () => {
        setEarthModalVisible(false); 
      };
      const handleOpenEarthModal = () => {
        if (progress !== 1) {
            setModalVisible(true); 
        } else {
            setEarthModalVisible(true); 
        }
      };
      const handleCloseModal = () => {
        setModalVisible(false); 
      };
      const params = useLocalSearchParams();
      const progress = typeof params.progress === 'string' ? parseFloat(params.progress) : 0;

      useEffect(() => {
        const inactivityTimeout = 5000; // 5 seconds of inactivity
        let inactivityTimer: NodeJS.Timeout;
    
        const resetInactivityTimer = () => {
            clearTimeout(inactivityTimer); // Clear the existing timer
            setIsInactive(false); // Reset inactivity state
            inactivityTimer = setTimeout(() => {
                setIsInactive(true); // Set inactivity state after timeout
            }, inactivityTimeout);
        };
    
        // Start the timer when the component mounts
        resetInactivityTimer();
    
        // Add event listeners for user interaction
        const handleInteraction = () => {
            resetInactivityTimer();
        };
    
        // Attach event listeners
        const subscription = Dimensions.addEventListener('change', handleInteraction);
    
        // Clean up the timer and event listeners when the component unmounts
        return () => {
            clearTimeout(inactivityTimer);
            subscription.remove();
        };
    }, []);



    // Effect to set up and clean up the timer
    const [isInactive, setIsInactive] = useState(false);
    const fadeAnim = useState(new Animated.Value(0))[0]; // Initial opacity: 0

    useEffect(() => {
        if (isInactive) {
            console.log('User is inactive, showing overlay');
            Animated.timing(fadeAnim, {
                toValue: 1, // Fade in
                duration: 500, // 0.5 seconds
                useNativeDriver: true,
            }).start();
        } else {
            console.log('User is active, hiding overlay');
            Animated.timing(fadeAnim, {
                toValue: 0, // Fade out
                duration: 500,
                useNativeDriver: true,
            }).start();
        }
    }, [isInactive]);
    
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
                    How Ready are You?
                  </Text>
                </View>
                <Image
                        source={require('../assets/images/ReddyRaccoon.png')}
                        style={styles.raccoon}
                        resizeMode="contain"
                      />
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
          width: `${(progress+0.15)*100}%`, 
          backgroundColor: progress === 1 ? '#70C4C3' : '#C83402',
        },
      ]}
    />
    <Text style={styles.progressBarText}>{progress*100}%</Text>
  </View>
  {progress === 1 ?                   
                <Image
                    source={require('../assets/images/badge.png')} 
                    style={{width: '13%', left: 300, position: 'absolute', bottom: 27}}
                    resizeMode="contain"
                  /> : 
            <Icon
                name= 'award'
                size={40}
                color="#000"
                style= {{
                    position: 'absolute',
                    left:300,
                    
                }}
            />}
            
</View>

        <Text style={styles.buttonText}>
            Fire Safety Badge
        </Text>
        <TouchableOpacity onPress={handleOpenFireModal}>
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
                    0%
                  </Text>
                </View>
            <Icon
                name= 'award'
                size={40}
                color="#000"
                style= {{
                    position: 'absolute',
                    left:300,
                    
                }}
            />
              </View>
              </TouchableOpacity>
        <Text style={styles.buttonText}>
            Earthquake Readiness Badge
        </Text>
        <TouchableOpacity onPress={handleOpenEarthModal}>
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
                    0%
                  </Text>
                </View>
                <Icon
                name= 'award'// Plus or minus icon
                size={40}
                color="#000"
                style= {{
                    position: 'absolute',
                    left:300,
                    
                }}
            />
              </View>
              </TouchableOpacity>
        
        <Text style={styles.buttonText}>
            Mudslide Prep Badge
        </Text>
        <TouchableOpacity onPress={handleOpenMudModal}>
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
                    0%
                  </Text>
                </View>
                <Icon
                name= 'award'// Plus or minus icon
                size={40}
                color="#000"
                style= {{
                    position: 'absolute',
                    left:300,
                    
                }}
            />
              </View>
        </TouchableOpacity>
        <View style={styles.bottomContainer}>

        {progress === 1 ?                   
                <Image
                source={require('../assets/images/Group 19.png')} // Replace with your image
                style={{width: '60%', left:30}}
                resizeMode="contain"
              /> : 
              <Image
              source={require('../assets/images/Group 19 (1).png')} // Replace with your image
              style={{width: '60%', left:30}}
              resizeMode="contain" />}
        {isInactive && (
                <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
                    <Image
                        source={require('../assets/images/inactive.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </Animated.View>
            )}
        <Image
            source={require('../assets/images/ReadyRaccoonBadge.png')}
            style={styles.popupRaccoon}
            resizeMode="contain"
        />
        </View>


        <Modal
              visible={modalFireVisible}
              transparent={true}
              animationType="fade"
              onRequestClose={() => setFireModalVisible(false)}
            >
              <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                  
                  <View style = {styles.modalHeader}> 
                  <Image
                    source={require('../assets/images/badge.png')} // Replace with your image
                    style={styles.modalImage}
                    resizeMode="contain"
                  />
                    <Text style={styles.modalTitle}>Next up, your{"\n"}Fire Safety Badge</Text>
                    <Image
                    source={require('../assets/images/badge.png')} // Replace with your image
                    style={styles.modalImage}
                    resizeMode="contain"
                  />
                    </View>
                  
                  <Text style={styles.modalText}>
                    Complete this checklist to ensure you're prepared for a fire.
                  </Text>
                  <TouchableOpacity style={styles.startButton} onPress={handleCloseFireModal}>
                    <Text style={styles.modalButtonText}>Let's do it!</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.maybeLaterButton} onPress={handleCloseFireModal}>
                    <Text style={styles.maybeLaterText}>Maybe later</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <Modal
              visible={modalEarthVisible}
              transparent={true}
              animationType="fade"
              onRequestClose={() => setEarthModalVisible(false)}
            >
              <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                  
                  <View style = {styles.modalHeader}> 
                  <Image
                    source={require('../assets/images/badge.png')} // Replace with your image
                    style={styles.modalImage}
                    resizeMode="contain"
                  />
                    <Text style={styles.modalTitle}>Next up, your{"\n"}Earthquake {"\n"} Readiness Badge</Text>
                    <Image
                    source={require('../assets/images/badge.png')} // Replace with your image
                    style={styles.modalImage}
                    resizeMode="contain"
                  />
                    </View>
                  
                  <Text style={styles.modalText}>
                    Complete this checklist to ensure you're prepared for an earthquake.
                  </Text>
                  <TouchableOpacity style={styles.startButton} onPress={handleCloseEarthModal}>
                    <Text style={styles.modalButtonText}>Let's do it!</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.maybeLaterButton} onPress={handleCloseEarthModal}>
                    <Text style={styles.maybeLaterText}>Maybe later</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <Modal
              visible={modalMudVisible}
              transparent={true}
              animationType="fade"
              onRequestClose={() => setMudModalVisible(false)}
            >
              <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                  
                  <View style = {styles.modalHeader}> 
                  <Image
                    source={require('../assets/images/badge.png')} // Replace with your image
                    style={styles.modalImage}
                    resizeMode="contain"
                  />
                    <Text style={styles.modalTitle}>Next up, your{"\n"}Mudslide{"\n"} Prep Badge</Text>
                    <Image
                    source={require('../assets/images/badge.png')} // Replace with your image
                    style={styles.modalImage}
                    resizeMode="contain"
                  />
                    </View>
                  
                  <Text style={styles.modalText}>
                    Complete this checklist to ensure you're prepared for a mudslide.
                  </Text>
                  <TouchableOpacity style={styles.startButton} onPress={handleCloseMudModal}>
                    <Text style={styles.modalButtonText}>Let's do it!</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.maybeLaterButton} onPress={handleCloseMudModal}>
                    <Text style={styles.maybeLaterText}>Maybe later</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <Modal
              visible={modalVisible}
              transparent={true}
              animationType="fade"
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalBackground}>
                <View style={[styles.modalContainer, {height: '37%'}]}>
                  
                  <View style = {[styles.modalHeader, {backgroundColor: '#EB6147', height: '25%'}]}> 
                    <Text style={[styles.modalTitle, {fontSize: 18}]}>Finish your Baseline Badge{"\n"}before moving on to others</Text>
                    </View>
                  
                  <Text style={styles.modalText}>
                    This will make sure you're best prepared based on your unique individual needs!
                  </Text>
                  <TouchableOpacity style={[styles.startButton, {backgroundColor: '#EB6147', width: '90%', height: '15%'}]} onPress={handleCloseModal}>
                    <Text style={[styles.modalButtonText, {color: '#fff', fontSize: 12}]}>Get to work on my Baseline Badge!</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.maybeLaterButton} onPress={handleCloseModal}>
                    <Text style={[styles.maybeLaterText, {color: '#EB6147'}]}>Back to my profile</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <TouchableOpacity
                        style={styles.fullScreenTouchable}
                        activeOpacity={1} // Make it invisible
                        onPress={() => {
                            setIsInactive(false); // Hide the overlay on interaction
                        }}
                    >
                        {/* Empty View to capture touches */}
                        <View style={styles.fullScreenTouchable} />
                    </TouchableOpacity>


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
});