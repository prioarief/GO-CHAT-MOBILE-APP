import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {HeaderProflie} from '../components/atoms';
import {connect} from 'react-redux';
import {API_URL} from '@env';
import {Logout} from '../redux/actions/auth';

const Profile = ({navigation, route, auth, profile, dispatch, chat}) => {
  // const [user, setUser] = useState('');
  const Avatar = () => {
    if (route.params === undefined) {
      return (
        <>
          <HeaderProflie
            navigation={navigation}
            name={auth.data.name}
            image={
              auth.data.image === null
                ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcShi2vPDOkXvjMhrDuNwsxqh5RB0d1f1ZADVw&usqp=CAU'
                : `${API_URL}/images/${auth.data.image}`
            }
          />
        </>
      );
    }
    let user = {};
    const data = profile.data;
    const ChatData = chat.data;
    const getData = data.filter((val) => {
      return val.idFriend === route.params.isMe;
    });
    const getChatData = ChatData.filter((val) => {
      return val.user === route.params.isMe;
    });

    if (getData[0] !== undefined) {
      user = getData[0];
    } else {
      user = getChatData[0];
    }
    console.log(user);

    return (
      <>
        <HeaderProflie
          navigation={navigation}
          name={user.friendName || user.name}
          image={
            user.friendImage === null
              ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcShi2vPDOkXvjMhrDuNwsxqh5RB0d1f1ZADVw&usqp=CAU'
              : `${API_URL}/images/${user.friendImage || user.image}`
          }
        />
      </>
    );
  };

  const Content = () => {
    const handleLogout = async () => {
      await dispatch(Logout());
      navigation.replace('Login');
    };
    if (route.params === undefined) {
      return (
        <>
          <TouchableOpacity onPress={() => navigation.navigate('Edit Profile')}>
            <ListItem
              titleStyle={styles.item}
              key={3}
              leftIcon={<Icon name="user-cog" size={20} color="black" />}
              title="Edit Profile"
              bottomDivider
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Contact')}>
            <ListItem
              titleStyle={styles.item}
              key={3}
              leftIcon={<Icon name="users" size={20} color="black" />}
              title="Friend List"
              bottomDivider
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Maps')}>
            <ListItem
              titleStyle={styles.item}
              key={3}
              leftIcon={<Icon name="map-marker-alt" size={20} color="black" />}
              title="My Location"
              bottomDivider
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLogout()}>
            <ListItem
              titleStyle={styles.item}
              key={3}
              leftIcon={<Icon name="sign-out-alt" size={20} color="black" />}
              title="Logout"
              bottomDivider
            />
          </TouchableOpacity>
        </>
      );
    }
    return <Text>Oke</Text>;
  };
  return (
    <View>
      <Avatar />
      <Content />
    </View>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  chat: state.chat,
});
export default connect(mapStateToProps)(Profile);

const styles = StyleSheet.create({});
