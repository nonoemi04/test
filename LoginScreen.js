import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { initializeApp} from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import { addDoc, query, where, collection, getDocs} from 'firebase/firestore';
import { Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const firebaseConfig = {
  apiKey: "AIzaSyC49JsZ6lfmjWtx26D09IH3sc6x5FAUyns",
  authDomain: "aldiassistant-26531.firebaseapp.com",
  projectId: "aldiassistant-26531",
  storageBucket: "aldiassistant-26531.appspot.com",
  messagingSenderId: "707610785581",
  appId: "1:707610785581:web:4b3daee060bde926d205a4"
};

const FIREBASE_APP = initializeApp(firebaseConfig);
const FIREBASE_FIRESTORE = getFirestore(FIREBASE_APP);
const FIREBASE_AUTH = getAuth(FIREBASE_APP);

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      const user = userCredential.user;
      console.log('User logged in:', user.uid);
      
      const appUsersRef = collection(FIREBASE_FIRESTORE, 'AppUsers'); //get AppUsers collection ref
      const q = query(appUsersRef, where('email', '==', email)); //create a snapshot of the docs that have the input email
      const querySnapshot = await getDocs(q); // retrieve the docs from snapshot

      const userIds = [];
      querySnapshot.forEach((doc) => {
      // Retrieve the document ID and add it to the userIds array
      userIds.push(doc.id);
  });
      navigation.navigate('Console', {firestoreData: FIREBASE_FIRESTORE, userId: userIds[0]} );
    } catch (error) {
      if (error.code === "auth/invalid-credential")
      {
        Alert.alert(
            'Email does not exist',
            'Please create an account to access the application.',
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
        );}
        else {
          // Handle other error cases
          // Display a generic error message or perform other actions as needed
          Alert.alert(
              'Sign Up Error',
              'An error occurred while signing up. Please try again later.',
              [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
          );
      }
    }
  };

  const handleSignUp = async () => {
    console.log("sign up");

    try {
        // Create a new user account with email and password
        const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
        
        // User signed up successfully
        const user = userCredential.user;
        console.log("User signed up successfully!");

        //Add user to database
        const appUsersRef = collection(FIREBASE_FIRESTORE, 'AppUsers'); //retrieve reference of AppUsers collection
        const newUserRef = await addDoc(appUsersRef, {  //addDoc - used to add a new doc to the collection referred, specify field and values. Returnes the ref to the new user
          email: email,
          password: password
        });
        const newUserId = newUserRef.id; //retrieve the id of the new user that will be logged inside the app

        // Navigate to the desired screen after successful signup
        navigation.navigate('Console', {firestoreData: FIREBASE_FIRESTORE, userId: newUserId}); //send route params: firestoreData and the userId

    } catch (error) {
        // Handle errors
        console.error("Error signing up:", error);
        
        // Check error codes and handle specific cases if needed
        if (error.code === "auth/email-already-in-use") {
            Alert.alert(
                'Email Exists',
                'The provided email already exists. Please use a different email.',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
            );
        } else {
            // Handle other error cases
            // Display a generic error message or perform other actions as needed
            Alert.alert(
                'Sign Up Error',
                'An error occurred while signing up. Please try again later.',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
            );
        }
    }
};

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <Text style={styles.logo}>Aldi Assistant</Text>
        <View style={styles.inputView}>
          <FontAwesome name="envelope" size={24} color="black" style={styles.icon} />
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            placeholderTextColor="#999"
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputView}>
          <FontAwesome name="lock" size={24} color="black" style={styles.icon} />
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="#999"
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerBtn} onPress={handleSignUp}>
          <Text style={styles.registerText}>REGISTER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0F0FF', // Light blue background color
  },
  overlay: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 32,
    color: '#2F897C',
    marginBottom: 20,
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  inputText: {
    flex: 1,
    height: 40,
  },
  loginBtn: {
    width: '100%',
    backgroundColor: '#2F897C',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  loginText: {
    color: 'white',
  },
  registerBtn: {
    width: '100%',
    backgroundColor: '#2F897C',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  registerText: {
    color: 'white',
  },

});

export default LoginScreen;
