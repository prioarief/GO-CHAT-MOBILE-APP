import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  Avatar,
  Chat,
  EditProfile,
  FriendList,
  ListChat,
  Login,
  Maps,
  Profile,
  Register,
  Search,
  Splash,
} from '../screens';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const MainApp = () => {
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>Go Chat</Text>
        <Icon
          name="comment-dots"
          color="white"
          size={30}
          style={styles.icon}
          onPress={() => console.log('oke')}
        />
      </View>
      <Tab.Navigator
        initialRouteName="Message"
        tabBarOptions={{
          labelStyle: {color: '#15e6c7'},
          indicatorStyle: {backgroundColor: '#15e6c7'},
          style: {
            backgroundColor: '#2b2b2b',
          },
        }}>
        <Tab.Screen name="Message" component={ListChat} />
        <Tab.Screen name="Contact" component={FriendList} />
        {/* <Tab.Screen name="Gifted" component={Gifted} /> */}
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </>
  );
};
const App = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Search Contact"
        component={Search}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Maps"
        component={Maps}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Edit Profile"
        component={EditProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Avatar"
        component={Avatar}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default App;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: '#2b2b2b',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 20,
    padding: 10,
  },
  icon: {paddingRight: 20},
});
