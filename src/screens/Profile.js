import {API_APP_URL} from '@env';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {HeaderProflie} from '../components/atoms';
import {Logout} from '../redux/actions/auth';
import Maps from './Maps';

const Profile = ({navigation, route, auth, profile, dispatch, chat}) => {
  const Avatar = () => {
    let isFriend = null;
    if (route.params === undefined) {
      isFriend = true;
      return (
        <>
          <HeaderProflie
            navigation={navigation}
            name={auth.data.name}
            isFriend={isFriend}
            image={
              auth.data.image === null
                ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcShi2vPDOkXvjMhrDuNwsxqh5RB0d1f1ZADVw&usqp=CAU'
                : `${API_APP_URL}/images/${auth.data.image}`
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
      return (
        val.user === route.params.isMe || val.receiver === route.params.isMe
      );
    });

    if (getData[0] !== undefined) {
      user = getData[0];
      isFriend = true;
    } else {
      user = getChatData[0];
      isFriend = false;
    }

    return (
      <>
        <HeaderProflie
          navigation={navigation}
          name={user.friendName || user.name}
          isFriend={isFriend}
          id={
            user.idFriend || user.user === auth.data.id
              ? user.receiver
              : user.user
          }
          image={
            user.friendImage === null
              ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcShi2vPDOkXvjMhrDuNwsxqh5RB0d1f1ZADVw&usqp=CAU'
              : `${API_APP_URL}/images/${user.friendImage || user.image}`
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
        <View>
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
          <TouchableOpacity
            onPress={async () => navigation.navigate('Maps', {isMe: true})}>
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
        </View>
      );
    }
    return <Maps friendId={route.params.isMe} />;
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
