import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function EmergencyScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/ReddyRaccoon.png')} // Replace with your raccoon image
        style={styles.raccoonImage}
      />
      <Text style={styles.title}>Alert</Text>
      <Text style={styles.subtitle}>
        We have detected an emergency situation in your area. Would you like to learn more?
      </Text>
      <Text style={styles.note}>
        Something's going on in your area - let's get ready!
      </Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Yes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>No</Text>
      </TouchableOpacity>
      <Link href="/events" asChild>
        <TouchableOpacity style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Next</Text>
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  note: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
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