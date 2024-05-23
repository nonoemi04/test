import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const FamilyComponent = () => {
  return (
    <View  style={{ backgroundColor: '#CCE7FF', padding: 20, marginHorizontal: 10, borderRadius: 5, marginTop:20, marginBottom:100}}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Family</Text>
      <Text style={{ margin: 10 }}>Marital status</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1.5, marginHorizontal: 5, paddingHorizontal: 10 }}
        placeholder="Enter your Marital status..."
      />
      <Text style={{ margin: 10 }}>Husband/Wife</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1.5, marginHorizontal: 5, paddingHorizontal: 10 }}
        placeholder="Enter your Husband/Wife..."
      />
      <Text style={{ margin: 10 }}>Children</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1.5, marginHorizontal: 5, paddingHorizontal: 10 }}
        placeholder="Enter your Husband/Wife..."
      />
      <Text style={{ margin: 10 }}>Parent's names</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1.5, marginHorizontal: 5, paddingHorizontal: 10 }}
        placeholder="Enter your Husband/Wife..."
      />
    </View>
    
    
  );
};

const HomeScreen = ({ navigation }) => {
  const [avatar, setAvatar] = useState(require('../assets/icon.png')); // State to hold the avatar image
  const [name, setName] = useState('Input name'); // State to hold the name
  const [age, setAge] = useState('Input age'); // State to hold the name
  const [editingName, setEditingName] = useState(false); // State to determine if name is being edited
  const [editingAge, setEditingAge] = useState(false); // State to determine if name is being edited

  const changeAvatar = () => {
    // Code to change the avatar image goes here
    // For now, let's just set a placeholder image
    setAvatar(require('../assets/new_avatar.png'));
  };

  const handleNamePress = () => {
    setEditingName(true); // Set editing mode to true when name is pressed
  };

  const handleNameChange = (text) => {
    setName(text); // Update the name
  };
  
  const handleAgePress = () => {
    setEditingAge(true); // Set editing mode to true when name is pressed
  };

  const handleAgeChange = (text) => {
    setAge(text); // Update age
  };

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: 'center', marginTop: 100 }}>
          <TouchableOpacity onPress={changeAvatar}>
            <View style={{ borderRadius: 70, overflow: 'hidden', marginTop: -70 }}>
              <ImageBackground
                source={avatar}
                style={{ width: 140, height: 140 }}
              />
            </View>
          </TouchableOpacity>
          {/* Editable name field */}
          {editingName ? (
            <TextInput
              style={{ fontSize: 25, fontWeight: 'bold', padding: 10 }}
              value={name}
              onChangeText={handleNameChange}
              autoFocus={true}
              onBlur={() => setEditingName(false)}
            />
          ) : (
            <TouchableOpacity onPress={handleNamePress}>
              <Text style={{ fontSize: 25, fontWeight: 'bold', padding: 10 }}>{name}</Text>
            </TouchableOpacity>
          )}
         
          {/* Editable age field */}
          {editingAge ? (
            <TextInput
              style={{ fontSize: 20, padding: 5 }}
              value={age}
              onChangeText={handleAgeChange}
              autoFocus={true}
              onBlur={() => setEditingAge(false)}
            />
          ) : (
            <TouchableOpacity onPress={handleAgePress}>
              <Text style={{ fontSize: 20, padding: 5 }}>{age} years</Text>
            </TouchableOpacity>
          )}

        </View>
        {/* Add editable text inputs below */}
        <Text style={{ margin: 10 }}>Location/Residence</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginHorizontal: 10, paddingHorizontal: 10 }}
          placeholder="Enter your location/residence..."
        />
        <Text style={{ margin: 10 }}>Date of Birth</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginHorizontal: 10, paddingHorizontal: 10 }}
          placeholder="Enter your date of birth..."
        />
        <Text style={{ margin: 10 }}>Gender</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginHorizontal: 10, paddingHorizontal: 10 }}
          placeholder="Enter your gender..."
        />
        <Text style={{ margin: 10 }}>Date of Birth</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginHorizontal: 10, paddingHorizontal: 10 }}
          placeholder="Enter your date of birth..."
        />
        <Text style={{ margin: 10 }}>Phone number</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginHorizontal: 10, paddingHorizontal: 10 }}
          placeholder="Enter your phone number..."
        />
        {/* Family component */}
        <FamilyComponent />
      </ScrollView>
    </View>
  );
}

export default HomeScreen;
