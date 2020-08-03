import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {addContact as add, getContact} from '../../redux/actions/profile';

const HeaderProfile = ({
  navigation,
  name,
  image,
  isFriend,
  auth,
  profile,
  dispatch,
  id,
}) => {
  const addContact = async () => {
    // console.log(id);
    await dispatch(add(auth.data.token, id))
      .then(async () => {
        await dispatch(getContact(auth.data.token)).then(
          async () => await console.log(profile),
        );
      })
      .catch((err) => console.log(err.response));
  };
  return (
    <View style={styles.content}>
      <View style={styles.profile_content}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Avatar', {
              image: image,
            })
          }>
          <Image style={styles.image} source={{uri: image}} />
        </TouchableOpacity>
        <Text style={styles.profile}>{name}</Text>
        <Text style={styles.bio}>Hello there, Iam using GoChat</Text>
        {!isFriend && (
          <Button
            title="Add Contact"
            buttonStyle={styles.button}
            containerStyle={styles.ButtonContainer}
            onPress={() => addContact()}
          />
        )}
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  chat: state.chat,
});
export default connect(mapStateToProps)(HeaderProfile);

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#212121',
    padding: 10,
    flexDirection: 'column',
  },
  profile: {
    color: 'white',
    fontSize: 17,
    textAlign: 'center',
    paddingVertical: 10,
  },
  bio: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
  image: {width: 100, height: 100, marginHorizontal: 20, borderRadius: 100 / 2},
  icon_back: {
    paddingHorizontal: 10,
  },
  profile_content: {
    alignItems: 'center',
    textAlign: 'center',
  },
  button: {backgroundColor: 'orange'},
  ButtonContainer: {paddingVertical: 10},
});
