import React from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import {Header, InputChat} from '../components/atoms';
import {ScrollView} from 'react-native-gesture-handler';
import {Background} from '../assets';
import {ChatItem} from '../components/molecules';

const Chat = ({navigation}) => {
  return (
    <ImageBackground source={Background} style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView showsHorizontalScrollIndicator={false}>
        <Text style={styles.date}>27 July 2020</Text>
        <ChatItem
          isMe={true}
          message="Selamat Malam, saya Prio Arief Gunawan. Senang bertemu anda"
          date="4.20 AM"
        />
        <ChatItem isMe={false} message="Selamat Malam" date="4.20 AM" />
        <ChatItem isMe={true} message="Apa kabar?" date="4.20 AM" />
        <ChatItem isMe={false} message="Baik" date="4.20 AM" />
        <ChatItem isMe={true} message="Oh oke" date="4.20 AM" />
      </ScrollView>
      <InputChat />
    </ImageBackground>
  );
};

export default Chat;

const styles = StyleSheet.create({
  date: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 14,
    color: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
