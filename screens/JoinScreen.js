import React,{useState}from 'react';
import {
  View, 
  Text, 
  TextInput, 
  Image, 
  Button, 
  Platform,
  KeyboardAvoidingView
  } 
  from 'react-native';

const JoinScreen = ({joinChat}) => {
  const [username, setUsername] = useState("");

  return(
    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
      <Image 
        resizeMode="contain" 
        style={{flex:1}} 
        source={require("../assets/chat-icon.png")} 
      />
      <View style={{flex:1, justifyContent:"space-around"}}>
        <TextInput 
          onChangeText={text => setUsername(text)}
          value={username}
          style={{fontSize:30,borderWidth:1, borderColor:'red',textAlign:'center',alignSelf:'stretch'}} 
          placeholder="Enter username" />
        <Button title="Join Chat" onPress={() => joinChat(username)}/>
      </View>
      {Platform.OS === "ios" && <KeyboardAvoidingView behavior="padding" />}
    </View>
  );
};

export default JoinScreen;