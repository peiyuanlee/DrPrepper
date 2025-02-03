import React, { useState } from 'react';
import * as Progress from 'react-native-progress';
import ConfettiCannon from 'react-native-confetti-cannon';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router'; // For navigation

export default function Checklist() {
  const [items, setItems] = useState([
    { id: 1, text: 'Download app', completed: true },
    { id: 2, text: 'Complete profile', completed: true },
    { id: 3, text: 'Pack Go-Bag', completed: false },
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 10 }}>
        <View style={styles.spacer} />
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
        <View style={styles.spacer} />
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
        <Text style={styles.progressText}>
          Progress: {completedCount}/{totalItems}
        </Text>
        <View style={styles.progressBarBackground}>
          <LinearGradient
            colors={getGradientColors()}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.progressBarFill, { width: `${progress * 100}%` }]}
          />
        </View>
      </View>

      {showConfetti && (
        <ConfettiCannon
          count={200}
          origin={{ x: Dimensions.get('window').width / 2, y: 0 }}
          fallSpeed={3000}
          fadeOut={true}
        />
      )}

      {/* Popup Screen */}
      <Modal
        visible={showPopup}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowPopup(false)}
      >
        <View style={styles.popupBackground}>
          <View style={styles.popupContainer}>
            <Image
              source={require('../assets/images/ReddyRaccoon.png')}
              style={styles.popupRaccoon}
              resizeMode="contain"
            />
            <Text style={styles.popupText}>All tasks completed! 🎉</Text>
            <Link href="/next-screen" asChild>
              <TouchableOpacity style={styles.popupButton}>
                <Text style={styles.popupButtonText}>Go to Next Screen</Text>
              </TouchableOpacity>
            </Link>
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
    height: 50,
    width: 50,
  },
  chatbox: {
    height: 100,
    width: 100,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  progressBarBackground: {
    height: 10,
    width: '100%',
    backgroundColor: '#F5F5DC',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 5,
  },
  popupBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Translucent background
  },
  popupContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  popupRaccoon: {
    height: 100,
    width: 100,
    marginBottom: 20,
  },
  popupText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  popupButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  popupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});