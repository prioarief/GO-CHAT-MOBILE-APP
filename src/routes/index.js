import 'react-native-gesture-handler';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Login, Register, ListChat, Chat} from '../screens';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: {color: '#15e6c7'},
        indicatorStyle: {backgroundColor: '#15e6c7'},
        style: {
          backgroundColor: '#2b2b2b',
        },
      }}>
      <Tab.Screen name="Message" component={ListChat} />
      <Tab.Screen name="Contact" component={Register} />
      <Tab.Screen name="Profile" component={Register} />
    </Tab.Navigator>
  );
};
const App = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
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
    </Stack.Navigator>
  );
};

export default App;

const styles = StyleSheet.create({});
