import { View, Text, Platform } from "react-native";
import React from "react";
import HomeScreen from "./HomeScreen"
import ActivityScreen from "./ActivityScreen";
import Settings from "./Settings";
import Call from "./CallScreen";
import Controller from "./MoveControlScreen"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab =createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel:false,
  headerShown:false,
  tabBarStyle:{
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    background: "#fff"
  }
}

//route - used to get the parameters in navigation
const Root = ({route, navigation}) => { 
    return (
        <Tab.Navigator screenOptions={screenOptions}>
           <Tab.Screen 
             name="Home" 
             component={HomeScreen} 
             initialParams={route}
             options={{
               tabBarIcon: ({focused})=>{
                 return (
                   <View style={{alignItems: "center", justifyContent: "center"}}> 
                     <Entypo name="home" size={24} color={focused ? "#16247d": "#111"} />
                     <Text style={{fonSize: 12, color: "#16247d"}}>HOME</Text>
                   </View>
                 )
               }
             }}
           />
           <Tab.Screen 
             name="Activity" 
             component={ActivityScreen}
             initialParams={route}
             options={{
               tabBarIcon: ({focused})=>{
                 return (
                   <View style={{alignItems: "center", justifyContent: "center"}}> 
                    <Feather name="activity" size={24} color={focused ? "#16247d": "#111"} />
                     <Text style={{fonSize: 12, color: "#16247d"}}>ACTIVITIES</Text>
                   </View>
                 )
               }
             }}
           />
           <Tab.Screen 
             name="Controller" 
             component={Controller} 
              options={{
               tabBarIcon: ({focused})=>{
                 return (
                   <View
                    style={{
                     alignItems: "center",
                     justifyContent: "center",
                     backgroundColor: "#16247d",
                     width: Platform.OS == "ios" ? 50 : 60,
                     height: Platform.OS == "ios" ? 50 : 60,
                     top: Platform.OS == "ios" ? -10 : -20,
                     borderRadius: Platform.OS == "ios" ? 25 : 30
                    }}
                   >
                     <MaterialCommunityIcons name="controller-classic-outline" size={24} color="white" />
                   </View>
                 )
               }
              }}
           />
           <Tab.Screen
            name="Call" 
            component={Call}
            options={{
             tabBarIcon: ({focused})=>{
               return (
                 <View style={{alignItems: "center", justifyContent: "center"}}> 
                  <MaterialIcons name="wifi-calling-3" size={24} color={focused ? "#16247d": "#111"} />
                   <Text style={{fonSize: 12, color: "#16247d"}}>Call</Text>
             </View>
               )
             }
           }}
            />
           <Tab.Screen 
             name="Settings" 
             component={Settings} 
             options={{
               tabBarIcon: ({focused})=>{
                 return (
                   <View style={{alignItems: "center", justifyContent: "center"}}> 
                    <Ionicons name="settings" size={24}  color={focused ? "#16247d": "#111"} />
                     <Text style={{fonSize: 12, color: "#16247d"}}>SETTINGS</Text>
               </View>
                 )
               }
             }}
           />
        </Tab.Navigator>
     )
  }

   export default Root;