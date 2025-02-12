import React, { useState, useEffect } from 'react';
import * as Progress from 'react-native-progress';
import ConfettiCannon from 'react-native-confetti-cannon';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView, Modal, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router'; // For navigation

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
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, expanded: !item.expanded } : item
    );
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

  const getGradientColors = () => {
    if (progress < 0.5) {
      return ['#FF0000', '#FFA500'];
    } else if (progress < 1) {
      return ['#FFA500', '#FFFF00'];
    } else {
      return ['#FFFF00', '#00FF00'];
    }
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
    router.push('/'); // Navigate to the next screen
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
              <View style={styles.progressContainer}>
          <View style={styles.progressBarBackground}>
                <View
              style={[
                styles.progressBarFill,
                {
                  width: `${100}%`,
                  backgroundColor:
                  progress < 0.33 ? '#E57373' : progress < 0.66 ? '#C89002' : '#81C784', // Red, Yellow, Green
                },
              ]}
                />
                  <Text style={[styles.progressBarText, 
                    {
                      color: progress < 0.33 ? '#E57373' : progress < 0.66 ? '#C89002' : '#81C784',
                    }
                  ]}>
                    {progress === 1 ? 'Great start!' : 'Keep it up!'}
                  </Text>
                </View>
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
    backgroundColor: '#F5F5DC',
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#F5F5DC',
    borderColor: '#4CAF50',
  },
  progressContainer: {
    marginBottom: 20,
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
    width:'70%'
  },
  headerContainer: {
    flexDirection: 'row',
    //justifyContent: 'space-between',
    alignItems: 'center',
    //padding: 10,
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
    width: '80%', // Adjust width as needed
    //height: 50, // Adjust height as needed
    resizeMode: 'contain',
  },
  burst:{
    margin:0
  }
});