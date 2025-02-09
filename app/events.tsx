import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function EventsScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/ReddyRaccoon.png')} // Replace with your raccoon image
        style={styles.raccoonImage}
      />
      <Text style={styles.title}>The three most likely events in your area are:</Text>
      <View style={styles.eventList}>
        <Text style={styles.event}>1. Earthquake</Text>
        <Text style={styles.event}>2. Wildfire</Text>
        <Text style={styles.event}>3. Mudslide</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Get Ready!</Text>
      </TouchableOpacity>
      <Link href="/" asChild>
        <TouchableOpacity style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </Link>
    </View>
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
  raccoonImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  eventList: {
    marginBottom: 20,
  },
  event: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  nextButton: {
    marginTop: 20,
    padding: 10,
  },
  nextButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});