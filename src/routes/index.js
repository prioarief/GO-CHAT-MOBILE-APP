import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import 'react-native-gesture-handler';
import {
  Avatar,
  Chat,
  EditProfile,
  FriendList,
  ListChat,
  Login,
  Profile,
  Register,
  Gifted,
  Maps,
} from '../screens';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const MainApp = () => {
  return (
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
  );
};
const App = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
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
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="Maps"
        component={Maps}
        options={{headerShown: false}}
      /> */}
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
