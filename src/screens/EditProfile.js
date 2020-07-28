import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

const EditProfile = ({navigation}) => {
  const handleEdit = () => {
    navigation.replace('MainApp');
  };
  return (
    <View style={styles.container}>
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
        placeholder="fill to change password"
        secureTextEntry
        // value={user.password}
        // onChangeText={(input) => setUser({...user, password: input})}
        leftIcon={<Icon name="lock" size={24} color="#cccccc" />}
      />

      <Button
        titleStyle={styles.button_image}
        buttonStyle={styles.button_image}
        containerStyle={styles.containerButton}
        title="Choose Image"
        onPress={handleEdit}
      />
      <Button
        titleStyle={styles.button}
        buttonStyle={styles.button}
        title="Edit"
        onPress={handleEdit}
      />
    </View>
  );
};

export default EditProfile;

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
  button_image: {
    color: 'black',
    backgroundColor: 'orange',
    // borderBottomStartRadius: 17,
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
  containerButton: {marginBottom: 10, width: 120},
});
