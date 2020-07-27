/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {HeaderProflie} from '../components/atoms';
import {ListItem} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Profile = ({navigation, route}) => {
  const Content = () => {
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
          <TouchableOpacity>
            <ListItem
              titleStyle={styles.item}
              key={3}
              leftIcon={<Icon name="map-marker-alt" size={20} color="black" />}
              title="My Location"
              bottomDivider
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.replace('Login')}>
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
      <HeaderProflie navigation={navigation} />
      <Content />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
