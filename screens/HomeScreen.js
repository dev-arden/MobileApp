import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet,View, Platform, KeyboardAvoidingView } from 'react-native';
import io from "socket.io-client";
import { GiftedChat } from 'react-native-gifted-chat'

const HomeScreen = () => {
  const [messageToSend, setMessageToSend] = useState("");
  const [recvMessages, setRecvMessages] = useState([]); //multiple strings->object로 초기화
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io("http://119.192.254.2:3001");
    socket.current.on("message", message => {
      const testMessage = {
        _id: 3,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        }
      };
      testMessage.text = message;
      setRecvMessages(prevState => [...prevState, testMessage]);
    });
    setRecvMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        }
      },
      {
        _id: 2,
        text: 'Hello from myself',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        }
      }
    ])
  }, []);

  const onSend = (messages) => {
    console.log(messages);
    socket.current.emit("message", messages[0].text);
  };
  
  return (
    <View style={{flex:1}}>
      <GiftedChat
        messages={recvMessages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
      {
        Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />
      }
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
