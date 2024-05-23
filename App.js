// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import your custom screens
import LoginScreen from './screens/LoginScreen';
//import HomeScreen from './screens/HomeScreen';
import Root from './screens/Root';
//import HomeScreen from './screens/HomeScreen2';
//import MoveScreen from './screens/MoveControlScreen';


const Stack = createStackNavigator();

const App = () => {
  return (
     <NavigationContainer>
       <Stack.Navigator initialRouteName="Login">
         <Stack.Screen name="Login" component={LoginScreen} />
         <Stack.Screen name="Console" component={Root} />
        
       </Stack.Navigator>
     </NavigationContainer>
  );
};

export default App;
 //<Stack.Screen name="Control" component={MoveScreen} />