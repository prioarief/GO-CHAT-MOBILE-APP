import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {Register as RegisterProcess} from '../redux/actions/auth';
import {showMessage} from 'react-native-flash-message';

const Register = ({navigation, dispatch}) => {
  const [user, setUser] = useState({name: '', username: '', password: ''});

  const handleRegister = async () => {
    const data = {
      name: user.name,
      username: user.username,
      password: user.password,
    };

    await dispatch(RegisterProcess(data))
      .then((res) => {
        showMessage({
          message: 'Register Success, please login',
          type: 'success',
          backgroundColor: 'green',
          color: 'white',
        });
        navigation.replace('Login');
      })
      .catch((err) => {
        showMessage({
          message: err.response.data.data,
          type: 'error',
          backgroundColor: 'red',
          color: 'white',
        });
      });
  };
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
        value={user.name}
        onChangeText={(input) => setUser({...user, name: input})}
        leftIcon={<Icon name="user" size={24} color="#cccccc" />}
      />
      <Input
        importantForAutofill="yes"
        placeholderTextColor="#cccccc"
        inputStyle={styles.input}
        placeholder="Username"
        value={user.username}
        onChangeText={(input) => setUser({...user, username: input})}
        leftIcon={<Icon name="user-circle" size={24} color="#cccccc" />}
      />
      <Input
        style={styles.input}
        placeholderTextColor="#cccccc"
        inputStyle={styles.input}
        placeholder="Password"
        secureTextEntry
        value={user.password}
        onChangeText={(input) => setUser({...user, password: input})}
        leftIcon={<Icon name="lock" size={24} color="#cccccc" />}
      />

      <Button
        titleStyle={styles.button}
        buttonStyle={styles.button}
        title="Register"
        onPress={handleRegister}
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

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(Register);

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
