import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Dimensions, TextInput, Button, Alert} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { useState } from 'react';
import { useNavigation } from "@react-navigation/native";

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

  return (
    <SafeAreaProvider>
        <SafeAreaView style={styles.container} edges={['left', 'right']}>
          <ImageBackground source={require('../assets/images/profile_creation_bg.png')} resizeMode="stretch" style={styles.image}>
           <Image
                  source={require('../assets/images/profileCreationQ1.png')}
                  style={styles.progressBar}
                />
          <Text style={styles.qText}> 
            Question 1/8
            </Text>
            <Text style={styles.quesText}> 
            Tell us about yourself!
            </Text>
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
    

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}> <Link href="/profile2">
          Next
        </Link></Text>
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
  },
  text: {
    color: '#fff',
  },
  image: {
    flex:1, 
    width: width,
    height:height,
    justifyContent: 'center',
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
    alignSelf: 'center',
    justifyContent: "flex-start", 
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
});
