import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import io from "socket.io-client";

const HomeScreen = () => {
  const [messageToSend, setMessageToSend] = useState("");
  const [recvMessages, setRecvMessages] = useState([]); //multiple strings->object로 초기화
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io("http://192.168.0.29:3001");
    socket.current.on("message", message => {
      setRecvMessages(prevState => [...prevState, message]);
      //... == spread operator
      //going to take this prevstate as it is, and then append newmessage onto it
      //["Hello", "Hello there"] "Another hello" 
      //["Hello", "Hello there", "Another hello"]
    });
  }, []);

  const sendMessage = () => {
    socket.current.emit("message", messageToSend);
    setMessageToSend("");
  };

  const textOfRecvMessages = recvMessages.map(msg => (
    <Text key={msg}>
      {msg}
    </Text>
  ));
  
  return (
    <View style={styles.container}>
      {textOfRecvMessages}
      <TextInput
        style = {styles.inputStyle}
        value={messageToSend} 
        onChangeText={text => setMessageToSend(text)}
        placeholder="Enter chat message.." 
        onSubmitEditing={sendMessage}
      />
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
  inputStyle:{
    fontSize : 18,
    alignSelf: 'stretch'
  },
  textStyle:{
    
  }
});

export default HomeScreen;
