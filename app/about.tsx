import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Dimensions, TextInput, Button, Alert} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { Link, useRouter} from 'expo-router';
import { useState } from 'react';

const { width, height } = Dimensions.get('window');

export default function AboutScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});

  const validateForm = () => {
    let newErrors: { name?: string; email?: string; phone?: string } = {};
    
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Invalid email format";
    
    if (!phone) newErrors.phone = "Phone number is required";
    else if (!/^[0-9]{10,15}$/.test(phone)) newErrors.phone = "Enter a valid phone number";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const router = useRouter();
  const handleNextScreen = () => {
    router.push('/profile2'); // Navigate to the next screen
  };

  return (
    <SafeAreaProvider>
        <SafeAreaView style={styles.container} edges={['left', 'right']}>
          <ImageBackground source={require('../assets/images/profile_creation_bg.png')} resizeMode="stretch" style={styles.image}>
          <View style={styles.spacer} />
                      {/* Progress Bar */}
                      <View style={styles.topContainer}>
                        <Image
                          source={require('../assets/images/profileCreationQ1.png')}
                          style={styles.progressBar}
                        />
                        <Text style={styles.qText}>Question 1/8</Text>
                      </View>
            
                      {/* Question Text */}
                      <Text style={styles.quesText}>Tell us about yourself!</Text>
            
                      {/* Spacer */}
                      <View style={styles.spacer} />
            <Text style={styles.infoText}> 
            This information helps us get you as ready as possible for any natural disaster.
            </Text>
            <Text style={styles.fieldText}> 
            Name
            </Text>
            <TextInput
        style={[styles.input, errors.name && styles.errorInput]}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

      {/* Email */}
      <Text style={styles.fieldText}> 
            Email
      </Text>
      <TextInput
        style={[styles.input, errors.email && styles.errorInput]}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      {/* Phone */}
      <Text style={[styles.fieldText, {textAlign: 'auto'}]}> 
            Phone Number
            </Text>
      <TextInput
        style={[styles.input, errors.phone && styles.errorInput]}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
    

      <TouchableOpacity style={styles.button} onPress={handleNextScreen}>
        <Text style={styles.buttonText}> 
          Next
       </Text>
      </TouchableOpacity>

          </ImageBackground>
        </SafeAreaView>
      </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
  image: {
    flex: 1,
    width: width,
    height: height,
    justifyContent: 'flex-start', 
    alignItems: 'center', 
  },
  button: {
    backgroundColor: '#70C4C3',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: 169,
    height: 48,
    alignItems: 'center',
  },
  buttonText: {
    color: '#00000',
    fontSize: 16,
    fontWeight: 'bold'
  },
  infoText:{
    fontSize: 20,
    textAlign: 'center',
    margin: 50, 
    marginTop:10,
  }, 
  quesText:{
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00000',
  }, 
  qText:{
    flexDirection: 'row',
    alignContent: 'flex-start', 
    marginBottom: 50,
    color: '#00000',
    fontSize: 20,
    fontWeight: 'bold'

  },
  progressBar:{
    width: 300, // Adjust width as needed
    height: 50, // Adjust height as needed
    resizeMode: 'contain',
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    fontSize: 16,
    marginBottom: 10,
    width: 300
  },
  fieldText: {
    textAlign: 'right',
    color: '#00000',
    fontSize: 16,
    fontWeight: 'bold'
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  topContainer: {
    alignItems: 'center', // Center progress bar and text horizontally
    marginTop: 20, // Add some margin at the top
  },
  spacer: {
    height: 50, // Adjust the height as needed
  },
});
