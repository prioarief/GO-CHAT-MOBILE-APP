import React, {useEffect, useState} from 'react';
import {ImageBackground, StyleSheet, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Background} from '../assets';
import {Header, InputChat} from '../components/atoms';
import {ChatItem} from '../components/molecules';
import {connect} from 'react-redux';

const Chat = ({navigation, route, auth, profile}) => {
  const [name, setName] = useState('');

  const getContact = async () => {
    const data = profile.data;
    const getData = data.filter((val) => {
      return val.id === route.params.id;
    });

    await setName(getData[0]);
  };

  useEffect(() => {
    getContact();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ImageBackground source={Background} style={styles.container}>
      <Header
        navigation={navigation}
        name={name.friendName}
        image={name.friendImage}
        id={route.params.id}
      />
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

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps)(Chat);

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
