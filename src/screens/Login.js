import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {Login as LoginProcess} from '../redux/actions/auth';
import {showMessage} from 'react-native-flash-message';
import {Loading} from '../components/molecules';

const Login = ({navigation, auth, dispatch}) => {
  const [user, setUser] = useState({username: '', password: ''});

  const handleLogin = async () => {
    const data = {
      username: user.username,
      password: user.password,
    };

    if (data.username.length === 0 || data.password.length === 0) {
      return showMessage({
        message: 'Username or password is empty',
        type: 'error',
        backgroundColor: 'red',
        color: 'white',
      });
    }

    await dispatch(LoginProcess(data))
      .then((res) => {
        navigation.replace('MainApp');
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

  useEffect(() => {
    if (auth.data.token) {
      return navigation.replace('MainApp');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <View style={styles.container}>
        <Text title="" style={styles.title}>
          Welcome Back
        </Text>
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
          title="Login"
          onPress={handleLogin}
        />
        <View style={styles.register}>
          <Text style={styles.not}>Not registered?</Text>
          <Text
            style={styles.button_register}
            onPress={() => navigation.navigate('Register')}>
            Register
          </Text>
        </View>
      </View>
      {auth.isLoading && <Loading />}
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(Login);

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
    fontSize: 30,
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
