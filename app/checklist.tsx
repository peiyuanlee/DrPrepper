import React, { useState } from 'react';
import * as Progress from 'react-native-progress';
import ConfettiCannon from 'react-native-confetti-cannon';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Dimensions, ScrollView} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
//import Icon from 'react-native-vector-icons/MaterialIcons'; 

export default function Checklist() {
      const [items, setItems] = useState([
        { id: 1, text: 'Download app', completed: false },
        { id: 2, text: 'Complete profile', completed: false },
        { id: 3, text: 'Pack Go-Bag', completed: false },
        { id: 4, text: 'Store food & water', completed: false },
        { id: 5, text: 'Gather important documents', completed: false },
      ]);
    
      const [showConfetti, setShowConfetti] = useState(false);
    
      const toggleItem = (id: number) => {
        const updatedItems = items.map((item) =>
          item.id === id ? { ...item, completed: !item.completed } : item
        );
        setItems(updatedItems);
    
        // Check if all items are completed
        const allCompleted = updatedItems.every((item) => item.completed);
        if (allCompleted) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 5000); // Hide confetti after 5 seconds
        }
      };
    
      const completedCount = items.filter((item) => item.completed).length;
      const totalItems = items.length;
      const progress = completedCount / totalItems;
    
      return (
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.spacer} />
            <View style={styles.headerContainer}>
            <Image
                        source={require('../assets/images/checklist_chat.png')}
                        style={styles.raccoon}
                        resizeMode="contain"
             />
            <Image
                        source={require('../assets/images/ReddyRaccoon.png')}
                        style={styles.raccoon}
                        resizeMode="contain"
             />
             </View>
             <View style={styles.spacer} />
            {items.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.item}
                onPress={() => toggleItem(item.id)}
              >
            <View style={styles.checkboxContainer}>
              <View style={[styles.checkbox, item.completed && styles.checkboxChecked]}>
                {/* {item.completed && (
                  //<Icon name="check" size={20} color="#4CAF50" /> // Green checkmark
                )} */}
                {item.completed}
              </View>
              <Text style={item.completed ? styles.completedText : styles.text}>
              {item.text}
            </Text>
            </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
    
          <View style={styles.progressContainer}>
            <Progress.Bar
              progress={progress}
              width={null} // Use full width of the container
              color="#007AFF"
              borderWidth={0}
              unfilledColor="#e0e0e0"
              borderRadius={5}
              height={20}
            />
          </View>
    
          {showConfetti && (
            <ConfettiCannon
              count={200}
              origin={{ x: -10, y: 0 }}
              fallSpeed={3000}
              fadeOut={true}
            />
          )}
        </View>
      );
    }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 16,
    marginLeft:20, 
    fontWeight: 'bold',
  },
  completedText: {
    fontSize: 16,
    //textDecorationLine: 'line-through',
    //color: '#888',
    marginLeft:20, 
    fontWeight: 'bold',
  },
  checkboxContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: '#F5F5DC', // Beige color
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#F5F5DC', // Keep the beige background when checked
    borderColor: '#4CAF50', // Green border when checked
  },
  progressContainer: {
    //marginTop: 20,
  },
  progressText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  spacer: {
    height: 50, // Adjust the height as needed
  },
  raccoon:{
    height: 100,
  },
  headerContainer:{
    //flex: 1, // Take up the entire screen
    flexDirection: 'row', // Arrange images side by side
    justifyContent: 'center', // Center images horizontally
    alignItems: 'center', // Center images vertically

  }
});
