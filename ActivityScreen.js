import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { addDoc, getDoc, getDocs, doc, collection, deleteDoc} from 'firebase/firestore'; // Moved import statements to the top

const play_question = 'http://192.168.1.251:5001/play-question'; 
//const play_question = 'http://192.168.1.100:5000/play-question'; 

const Activity = ({ route }) => {
  const [expanded, setExpanded] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const { firestoreData, userId } = route.params.params;

  useEffect(() => {
    fetchQuestions(); // Fetch questions and answers from the database when the component mounts
  }, [firestoreData, userId]); // Only run this effect when firestoreData or userId changes

  const fetchQuestions = async () => {
    const appUsersRef = collection(firestoreData, 'AppUsers');
    const currentUserRef = doc(appUsersRef, userId);
    const questionsSubcollectionRef = collection(currentUserRef, 'Questions');
    const querySnapshot = await getDocs(questionsSubcollectionRef);

    const fetchedQuestions = querySnapshot.docs.map(doc => ({
      id: doc.id,
      question: doc.data().question,
      answer: doc.data().answer
    }));

    setQuestions(fetchedQuestions);
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const addQuestion = async () => {
    const appUsersRef = collection(firestoreData, 'AppUsers'); //take reference of AppUsers collection
    const currentUserRef =  doc(appUsersRef, userId); //take reference of currentUser document

    const questionsSubcollectionRef = collection(currentUserRef, "Questions"); // Get subcollection reference
    await addDoc(questionsSubcollectionRef, {  //addDoc - used to add a new doc to the collection referred, specify field and values. Returnes the ref to the new user
      question: newQuestion,
      answer: "No answer available at this time"
    });

    // Reload questions after adding a new question
    fetchQuestions();
    
    // Clear input field
    setNewQuestion('');
  };

  const reloadQuestions = () => {
    fetchQuestions(); // Manually trigger fetching questions and answers
  };

  const askQuestions = async () => {

    const data = { userId: userId }; //user id to be sent to RaspberryPi

    try {
      const response = await fetch(play_question, {
        method: 'POST', //POST method, creates a new resource on the server
        headers: {
          'Content-Type': 'application/json' //specify type of data in request body, here is JSON
        },
        body: JSON.stringify(data), // the data to be sent in JSON string format
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }c
  
      // Handle successful response
      const responseData = await response.json(); // Parse response data as JSON
      console.log('Server response:', responseData);
    } catch (error) {
      console.error('Error sending data to server:', error);
    }
  };

  const handleDelete = async (id) => {
    console.log("Item id", id);
    const appUsersRef = collection(firestoreData, 'AppUsers'); //take reference of AppUsers collection
    const currentUserRef =  doc(appUsersRef, userId); //take reference of currentUser document
    const questionsSubcollectionRef = collection(currentUserRef, "Questions"); // Get subcollection reference

    const docToDeleteRef = doc(questionsSubcollectionRef, id); // Construct the reference to the document to be deleted

    // Delete the document
    await deleteDoc(docToDeleteRef);
    fetchQuestions();
  }

  const renderItem = ({ item, index }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderBottomWidth: index === questions.length - 1 ? 0 : 1, borderBottomColor: '#2F897C', backgroundColor: index % 2 === 0 ? 'white' : 'white', borderRadius: 10 }}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: 'bold' }}>{item.question}</Text>
        {expanded && <Text>{item.answer}</Text>}
      </View>
      <TouchableOpacity onPress={() => handleDelete(item.id)} style={{ padding: 5 }}>
        <Text style={{ color: 'red' }}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );
  
  

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={toggleExpand} style={{ backgroundColor: '#2F897C', padding: 10, borderRadius: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}>Questions</Text>
      </TouchableOpacity>
      {expanded && (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, backgroundColor: 'white' }}>
            <TextInput
              value={newQuestion}
              onChangeText={setNewQuestion}
              placeholder="Enter new question"
              style={{ flex: 1, borderWidth: 1, borderColor: 'gray', padding: 5 }}
            />
          </View>
          <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
            <TouchableOpacity onPress={addQuestion} style={{ backgroundColor: '#CCE7FF', padding: 10, flex: 1, borderRadius: 10 }}>
              <Text style={{ fontSize: 16, textAlign: 'center', color: 'black' }}>Add Question</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={reloadQuestions} style={{ backgroundColor: '#54B6A8', padding: 10, flex: 1, marginLeft: 5, borderRadius: 10 }}>
              <Text style={{ fontSize: 16, textAlign: 'center', color: 'black' }}>Reload</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={askQuestions} style={{ backgroundColor: '#99CFFF', padding: 10, flex: 1, marginLeft: 5, borderRadius: 10 }}>
              <Text style={{ fontSize: 16, textAlign: 'center', color: 'black' }}>Ask Questions</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={questions}
            renderItem={renderItem} // Pass the renderItem function here
            keyExtractor={(item) => item.id.toString()}
            style={{ marginTop: 10 }} // Add marginTop style to FlatList
          />
        </View>
      )}
      <TouchableOpacity  style={{ backgroundColor: '#2F897C', padding: 10, borderRadius: 10, marginTop:5 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}>Test assesment</Text>
      </TouchableOpacity>
    </View>
  );
  
  
};

export default Activity;
