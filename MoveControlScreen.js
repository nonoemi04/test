import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import {WebView} from 'react-native-webview';
import { Alert } from 'react-native';
import { set } from 'firebase/database';

const video_feed = 'http://192.168.1.107:5001/video_feed'; 
//const video_feed = 'http://192.168.1.100:5000/video_feed';
const ESP32_SERVER_URL = 'http://192.168.1.109:80';
//const ESP32_SERVER_URL = 'http://192.168.1.109:80';

const MoveControl = ({ navigation }) => {
  const [isSending, setIsSending] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [retry, setRetry] = useState(false);
  const [url, setUrl] = useState(video_feed); // Initialize the URL state with video_feed
  // state of retry is set to true -> state changes -> rerender -> use effect is called -> setRetry is called -> state of retry is set to false
  
  useEffect(() => {
    setRetry(false);
  }, [retry]);
  

  const sendRequest = async (endpoint) => {
    try {
      const response = await fetch(`${ESP32_SERVER_URL}/${endpoint}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log(`Request to ${endpoint} sent successfully`);
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  const handlePressIn = (endpoint) => {
    setIsSending(true);
    console.log(isSending);
    // Send the initial request immediately
    sendRequest(endpoint);
    // Start sending requests continuously
  };

  const handleLongPress = (endpoint) => {
    setIsSending(true);
    // Send the initial request immediately
    sendRequest(endpoint);
    // Start sending requests continuously
    const id = setInterval(() => {
      sendRequest(endpoint);
    }, 200); // Send a request every second
    setIntervalId(id);
  };

 
  const handlePressOut = () => {
    setIsSending(false);
    console.log(isSending);
    clearInterval(intervalId);
    setIntervalId(null);
  };

  const handleWebViewError = (error) => {
    console.log(error);
    Alert.alert(
      'Could not connect to robot',
      'Make sure it is turned on.',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'Retry', onPress: () => {setUrl(video_feed); console.log("retry")}},// Reload the WebView},
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
    <View style={styles.webViewContainer}>
      <WebView
        key = {url}
        style={styles.webView}
        source={{ uri: url }}
        onLoad={() => console.log('loaded')} 
        onError={handleWebViewError}
      /> 
    </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.buttonWrapper, styles.topButton, isSending && styles.buttonPressed]}
          onPressIn={() => handlePressIn('up')}
          onPressOut={handlePressOut}
          onLongPress={() => handleLongPress('up')}
        >
          <Text style={styles.buttonText}>↑</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonWrapper, styles.bottomButton, isSending && styles.buttonPressed]}
          onPressIn={() => handlePressIn('down')}
          onPressOut={handlePressOut}
          onLongPress={() => handleLongPress('down')}
        >
          <Text style={styles.buttonText}>↓</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonWrapper, styles.leftButton, isSending && styles.buttonPressed]}
          onPressIn={() => handlePressIn('left')}
          onPressOut={handlePressOut}
          onLongPress={() => handleLongPress('left')}
        >
          <Text style={styles.buttonText}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonWrapper, styles.rightButton, isSending && styles.buttonPressed]}
          onPressIn={() => handlePressIn('right')}
          onPressOut={handlePressOut}
          onLongPress={() => handleLongPress('right')}
        >
          <Text style={styles.buttonText}>→</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  webViewContainer: {
    flex: 1, // Take up the available space
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  webView: {
    width: 300,
    height: 300,
  },
  buttonContainer: {
    position: 'absolute',
    top: 500, // Adjust the value to move the buttons higher
    left: 170,
    width: 100,
    height: 100,
    marginTop: 20,
  },
  buttonWrapper: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 24,
  },
  topButton: {
    top: 0,
    left: 10,
  },
  bottomButton: {
    bottom: -50,
    left: 10,
  },
  leftButton: {
    top: 50,
    left: -40,
  },
  rightButton: {
    top: 50,
    right: -10,
  },
  buttonPressed: {
    backgroundColor: 'lightgray',
  },
});

export default MoveControl;