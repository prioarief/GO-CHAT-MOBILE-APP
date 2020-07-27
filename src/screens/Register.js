import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Login = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text title="" style={styles.title}>
        Welcome Back, Please Register to get your account
      </Text>
      <Input
        importantForAutofill="yes"
        placeholderTextColor="#cccccc"
        inputStyle={styles.input}
        placeholder="Name"
        // value={user.email}
        // onChangeText={(input) => setUser({...user, email: input})}
        leftIcon={<Icon name="user" size={24} color="#cccccc" />}
      />
      <Input
        importantForAutofill="yes"
        placeholderTextColor="#cccccc"
        inputStyle={styles.input}
        placeholder="Username"
        // value={user.email}
        // onChangeText={(input) => setUser({...user, email: input})}
        leftIcon={<Icon name="user-circle" size={24} color="#cccccc" />}
      />
      <Input
        style={styles.input}
        placeholderTextColor="#cccccc"
        inputStyle={styles.input}
        placeholder="Password"
        secureTextEntry
        // value={user.password}
        // onChangeText={(input) => setUser({...user, password: input})}
        leftIcon={<Icon name="lock" size={24} color="#cccccc" />}
      />

      <Button
        titleStyle={styles.button}
        buttonStyle={styles.button}
        title="Register"
        // onPress={handleLogin}
      />
      <View style={styles.register}>
        <Text style={styles.not}>Already Account?</Text>
        <Text
          style={styles.button_register}
          onPress={() => navigation.replace('Login')}>
          Login
        </Text>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  input: {
    color: '#cccccc',
  },
  button: {
    borderColor: '#cccccc',
    color: 'black',
    backgroundColor: '#cccccc',
    borderRadius: 17,
  },
  button_register: {
    fontWeight: 'bold',
    fontSize: 17,
    textDecorationLine: 'underline',
    color: '#cccccc',
  },
  container: {
    flex: 1,
    backgroundColor: '#333333',
    justifyContent: 'center',
    padding: 50,
  },
  not: {
    fontSize: 17,
    margin: 10,
    color: '#cccccc',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#cccccc',
  },
  register: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
