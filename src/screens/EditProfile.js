import {API_URL} from '@env';
import React, {useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {showMessage} from 'react-native-flash-message';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect, useStore} from 'react-redux';
import {editProfile} from '../redux/actions/auth';
import {Loading} from '../components/molecules';

const EditProfile = ({navigation, auth, dispatch}) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: auth.data.username,
    password: null,
    name: auth.data.name,
    image: auth.data.image,
  });

  const actionEdit = async () => {
    setLoading(true);
    const data = new FormData();
    data.append('username', user.username);
    data.append('name', user.name);
    typeof user.image === 'string'
      ? null
      : data.append('image', {
          uri: user.image.uri,
          type: user.image.type,
          name: user.image.fileName,
        });
    user.password === null || user.password === ''
      ? null
      : data.append('password', user.password);

    await dispatch(editProfile(auth.data.token, data))
      .then((res) => {
        setLoading(false);
        return navigation.goBack();
      })

      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleEdit = () => {
    if (user.image.type === undefined && user.image.fileSize === undefined) {
      return actionEdit();
    }
    if (
      user.image.fileSize >= 700000 ||
      (user.image.type !== 'image/jpeg' && user.image.type !== 'image/png')
    ) {
      return showMessage({
        backgroundColor: 'red',
        color: 'white',
        message: 'File too large, max 700kb. Just support png or jpg file',
        type: 'error',
      });
    }
    actionEdit();
    return navigation.replace('MainApp');
  };

  const handleImage = () => {
    const options = {
      noData: true,
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.uri) {
        setUser({...user, image: response});
      }
    });
  };

  return (
    <>
      <View style={styles.container}>
        <View style={{alignItems: 'center', paddingBottom: 20}}>
          <Image
            source={{
              uri: user.image.uri || `${API_URL}/images/${auth.data.image}`,
            }}
            style={{width: 150, height: 150, borderRadius: 150 / 2}}
          />
        </View>
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
          placeholder="fill to change password"
          secureTextEntry
          value={user.password}
          onChangeText={(input) => setUser({...user, password: input})}
          leftIcon={<Icon name="lock" size={24} color="#cccccc" />}
        />

        <Button
          titleStyle={styles.button_image}
          buttonStyle={styles.button_image}
          containerStyle={styles.containerButton}
          title="Choose Image"
          onPress={handleImage}
        />
        <Button
          titleStyle={styles.button}
          buttonStyle={styles.button}
          title="Edit"
          onPress={handleEdit}
        />
      </View>
      {loading && <Loading />}
    </>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(EditProfile);

const styles = StyleSheet.create({
  input: {
    color: '#cccccc',
  },
  button: {
    borderColor: '#cccccc',
    color: 'black',
    backgroundColor: 'orange',
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
