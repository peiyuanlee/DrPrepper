import React, { useState, useEffect } from 'react';
import ConfettiCannon from 'react-native-confetti-cannon';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView, Modal, Animated, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRouter } from 'expo-router'; 
import BottomRibbon from './BottomRibbon';
import { globals } from './globals';

export default function Checklist() {
  const [items, setItems] = useState([
    { id: 1, text: 'Download app', completed: true },
    { id: 2, text: 'Complete profile', completed: true },
    { id: 3, text: 'Pack Go-Bag', completed: false,
      expanded: false,
      subtasks: [
        { id: 3.1, text: 'Flashlight and batteries', completed: false },
        { id: 3.2, text: 'Radio', completed: false },
        { id: 3.3, text: 'Portable Charger', completed: false },
        { id: 3.4, text: 'First Aid Kit', completed: false },
        { id: 3.5, text: 'Medication', completed: false },
        { id: 3.6, text: 'Cash', completed: false },
      ], },
    {
      id: 4,
      text: 'Store food & water',
      completed: false,
      expanded: false,
      subtasks: [
        { id: 4.1, text: 'Water: min. 1 gallon/person/day for 3 days', completed: false },
        { id: 4.2, text: 'Food: canned and non-perishable dry goods', completed: false },
        { id: 4.3, text: 'Can opener', completed: false },
      ],
    },
    {
      id: 5,
      text: 'Gather important documents',
      completed: false,
      expanded: false,
      subtasks: [
        { id: 5.1, text: 'ID cards', completed: false },
        { id: 5.2, text: 'Insurance documents', completed: false },
        { id: 5.3, text: 'Medical records', completed: false },
      ],
    },
  ]);

  const [showConfetti, setShowConfetti] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility
  const progressAnim = new Animated.Value(0); // Animation for progress bar
  const router = useRouter();

  const toggleItem = (id: number) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      if (item.subtasks) {
        const updatedSubtasks = item.subtasks.map((subtask) => {
          if (subtask.id === id) {
            return { ...subtask, completed: !subtask.completed };
          }
          return subtask;
        });

        // Check if all subtasks are completed
        const allSubtasksCompleted = updatedSubtasks.every((subtask) => subtask.completed);

        return {
          ...item,
          subtasks: updatedSubtasks,
          completed: allSubtasksCompleted, // Mark main task as completed if all subtasks are done
        };
      }
      return item;
    });
    setItems(updatedItems);

    // Check if all items (including subtasks) are completed
    const allCompleted = updatedItems.every((item) => {
      if (item.subtasks) {
        return item.subtasks.every((subtask) => subtask.completed);
      }
      return item.completed;
    });
    if (allCompleted) {
      setShowConfetti(true);
      setShowPopup(true); // Show popup when all tasks are completed
      animateProgressBar(); // Trigger progress bar animation
      setTimeout(() => setShowConfetti(false), 5000); // Hide confetti after 5 seconds
    }
  };

  const toggleExpanded = (id: number) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        // Show the modal only when "Pack Go-Bag" is expanded
        if (item.text === 'Pack Go-Bag' && !item.expanded) {
          setShowPackGoBagModal(true); // Show the modal
        }
        return { ...item, expanded: !item.expanded };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const completedCount = items.reduce((count, item) => {
    if (item.subtasks) {
      return count + item.subtasks.filter((subtask) => subtask.completed).length;
    }
    return count + (item.completed ? 1 : 0);
  }, 0);

  const totalItems = items.reduce((count, item) => {
    if (item.subtasks) {
      return count + item.subtasks.length;
    }
    return count + 1;
  }, 0);

  const progress = completedCount / totalItems;


  const [progressBaseline, setProgress] = useState(globals.progress);

  const handleBaselineBadge = () => {
    const newProgress = completedCount / totalItems; 
    globals.progress = newProgress; // Update global variable
    setProgress(newProgress); // Update local state to trigger re-render
  };


  // Progress bar animation
  const animateProgressBar = () => {
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 1000, // 1 second animation
      useNativeDriver: true,
    }).start();
  };

  const handleNextScreen = () => {
    setShowPopup(false); // Close the modal
    handleBaselineBadge();
    router.push({
      pathname: '/dashboard',
      params: { progress: progress }, // Pass progress as a query parameter
  });
  };

  const handleMarketScreen = () => {
    setShowPackGoBagModal(false); // Close the modal
    router.push({
      pathname: '/marketplace',
       // Pass progress as a query parameter
  });
  };
  const [modalVisible, setModalVisible] = useState(true);

  const handleStartChecklist = () => {
    setModalVisible(false); 
  };

  const handleMaybeLater = () => {
    setModalVisible(false); 
    router.push({
      pathname: '/dashboard',
      params: { progress: progress }, // Pass progress as a query parameter
  });
  };
  const [showPackGoBagModal, setShowPackGoBagModal] = useState(false);

  return (
    <SafeAreaView style= {styles.container} >
      <Modal
      visible={modalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          
          <View style = {styles.modalHeader}> 
          <Image
            source={require('../assets/images/badge.png')} // Replace with your image
            style={styles.modalImage}
            resizeMode="contain"
          />
            <Text style={styles.modalTitle}>First up, your{"\n"}Baseline Badge</Text>
            <Image
            source={require('../assets/images/badge.png')} // Replace with your image
            style={styles.modalImage}
            resizeMode="contain"
          />
            </View>
          
          <Text style={styles.modalText}>
            Completing this checklist will ensure you're baseline prepared for whatever comes your way.
          </Text>
          <TouchableOpacity style={styles.startButton} onPress={handleStartChecklist}>
            <Text style={styles.buttonText}>Let's do it!</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.maybeLaterButton} onPress={handleMaybeLater}>
            <Text style={styles.maybeLaterText}>Maybe later</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>

    
    
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 10 }}>
        <View style={styles.headerContainer}>
          <Image
            source={require('../assets/images/checklist_chat.png')}
            style={styles.chatbox}
            resizeMode="contain"
          />
          <Image
            source={require('../assets/images/ReddyRaccoon.png')}
            style={styles.raccoon}
            resizeMode="contain"
          />
        </View>

        {items.map((item) => (
          <View key={item.id}>
            {item.subtasks ? (
              <View>
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => toggleExpanded(item.id)}
                >
                  <View style={styles.checkboxContainer}>
                    <View style={[styles.checkbox, item.completed && styles.checkboxChecked]}>
                      {item.completed && (
                        <Icon name="check" size={24} color="#4CAF50" />
                      )}
                    </View>
                    <Text style={item.completed ? styles.completedText : styles.text}>
                      {item.text}
                    </Text>
                  </View>
                  {item.subtasks && (
                <Icon
                  name={item.expanded ? 'remove' : 'add'} // Plus or minus icon
                  size={24}
                  color="#000"
                />
              )}
                </TouchableOpacity>
                {item.expanded &&
                  item.subtasks.map((subtask) => (
                    <TouchableOpacity
                      key={subtask.id}
                      style={styles.subtaskItem}
                      onPress={() => toggleItem(subtask.id)}
                    >
                      <View style={styles.checkboxContainer}>
                        <View style={[styles.checkbox, subtask.completed && styles.checkboxChecked]}>
                          {subtask.completed && (
                            <Icon name="check" size={24} color="#4CAF50" />
                          )}
                        </View>
                        <Text
                          style={[
                            subtask.completed ? styles.completedText : styles.text,
                            { flexShrink: 1 },
                          ]}
                        >
                          {subtask.text}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
              </View>
            ) : (
              <TouchableOpacity
                style={styles.item}
                onPress={() => toggleItem(item.id)}
              >
                <View style={styles.checkboxContainer}>
                  <View style={[styles.checkbox, item.completed && styles.checkboxChecked]}>
                    {item.completed && (
                      <Icon name="check" size={24} color="#4CAF50" />
                    )}
                  </View>
                  <Text
                    style={[
                      item.completed ? styles.completedText : styles.text,
                      { flexShrink: 1 },
                    ]}
                  >
                    {item.text}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        ))}
        
      </ScrollView>

      <View style={styles.progressContainer}>
        <View style={styles.progressBarBackground}>
        <View
      style={[
        styles.progressBarFill,
        {
          width: `${progress * 100}%`,
          backgroundColor:
            progress < 0.33 ? '#E57373' : progress < 0.66 ? '#C89002' : '#81C784', // Red, Yellow, Green
        },
      ]}
        />
          <Text style={styles.progressBarText}>
            {progress < 0.33 ? 'Great start!' : 'Keep it up!'}
          </Text>
        </View>
      </View>
      <BottomRibbon />

      <Modal
          visible={showPackGoBagModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowPackGoBagModal(false)}
        >
          <View style={styles.modalBackground}>
            <View style={[styles.modalContainer, {height: 285}]}>
              {/* Modal Header */}
              <View style={styles.modalGoBag}>
                <Text style={[styles.modalTitle, {marginBottom: 0}]}>30% off Go-Bag</Text>
              </View>

              {/* Modal Content */}
              <Text style={[styles.modalText, {padding: 30}]}>
              Get your complete Go-Bag for up to 30% off from our retail partners
              </Text>

              {/* Close Button */}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleMarketScreen}
              >
                <Text style={[styles.buttonText, {fontSize: 14, color: '#fff'}]}>Take me to the marketplace!</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.maybeLaterButton}
                onPress={() => setShowPackGoBagModal(false)}
              >
                <Text style={styles.noMarketButton}>Nah, I'll do it myself</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      {/* Popup Screen */}
      <Modal
        visible={showPopup}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowPopup(false)}
      >
        <View style={styles.popupBackground}>
            {showConfetti && (
              <ConfettiCannon
                count={200}
                origin={{ x: Dimensions.get('window').width / 2, y: 0 }}
                fallSpeed={3000}
                fadeOut={true}
              />
            )}
            <Image
              source={require('../assets/images/Frame 65.png')}
              style={styles.popupRaccoon}
              resizeMode="contain"
            />
              <TouchableOpacity style={styles.popupButton} onPress={handleNextScreen}>
                <Text style={styles.popupButtonText}>Keep Going!</Text>
              </TouchableOpacity>
              <View style={styles.modalProgressContainer}>
                <View
              style={[
                styles.progressBarFill,
                {
                  width: `${80}%`,
                  height: '30%',
                  backgroundColor:
                  '#70C4C3',
                  marginTop: 20,
                  alignItems: 'center',
                  padding: 10,
                  marginRight:0,
                  left:30,
                },
              ]}
                />
              <Text style= {{color: 'white', alignItems: 'center'}}>
            100%
          </Text>
                <Image
                source={require('../assets/images/Burst.png')}
                style = {[styles.burst, {
                  right: 10
                }]}
                />
              </View>

              </View>
      </Modal>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  subtaskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingLeft: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  text: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold',
    flexShrink: 1,
  },
  completedText: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold',
    flexShrink: 1,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: '#D9D9D9',
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#D9D9D9',
    borderColor: '#4CAF50',
  },
  progressContainer: {
    marginBottom: 50,
    paddingHorizontal: 10,
  },
  progressText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  spacer: {
    height: 20,
  },
  raccoon: {
    width: '30%',
  },
  chatbox: {
    width:'60%'
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Space out the children
    alignItems: 'center', // Center children vertically
    width: '100%', // Take up full width
    height:'30%',
    //paddingHorizontal: 20, // Add horizontal padding
    marginBottom: -40,
    //position: 'absolute',
    top: 0,
    marginTop: -40,
  },
  progressBarBackground: {
    height: 30,
    width: '100%',
    backgroundColor: '#E0E0E0', // Light gray background
    borderRadius: 15, // Rounded corners
    overflow: 'hidden',
    justifyContent: 'center',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 15, // Rounded corners
  },
  progressBarText: {
    position: 'absolute',
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    //color: '#fff', // White text
  },
  popupBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // White translucent background
  },
  popupContainer: {
    alignItems: 'center', // Center progress bar and text horizontally
    marginTop: 20, // Add some margin at the top
    flexDirection: 'row'
  },
  popupRaccoon: {
    //height: 100,
    width: '80%',
    marginBottom: 20,
  },
  popupText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  popupButton: {
    backgroundColor: '#70C4C3',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: 250,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  popupButtonText: {
    color: '#000000', // Fixed color code (was missing a '0')
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressBar: {
    width: '80%', 
    resizeMode: 'contain',
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
    height:350,
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
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalProgress: {
    alignItems: 'center', // Center progress bar and text horizontally
    marginTop: 20, // Add some margin at the top
    flexDirection: 'row', 
    
  },
  modalProgressContainer: {
    flexDirection: 'row',
  },
  burst:{
    margin:0,

  },
  closeButton:{
    backgroundColor: '#C83402',
    padding: 15,
    borderRadius: 10,
    width: '70%',
    alignItems: 'center',
    marginBottom: 10,
  },
  noMarketButton:{
    color: '#C83402',
    fontSize: 12,
    fontWeight: 'bold',
    textDecorationLine: 'underline',

  },
  modalGoBag:{
    backgroundColor: '#C83402',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20,
    padding: 10,
    justifyContent: 'center',
    height: '25%'

  },
  goBagText:{
    color: '#fff'
  }
});