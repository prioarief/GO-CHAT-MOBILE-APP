import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

const HeaderChat = () => {
  return (
    <View style={styles.content}>
      <TextInput
        placeholder="Send message"
        placeholderTextColor="white"
        style={styles.input_message}
      />
      <Button
        icon={<Icon name="paper-plane" color="white" size={22} />}
        buttonStyle={styles.button_send}
      />
    </View>
  );
};

export default HeaderChat;

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  input_message: {
    backgroundColor: '#212121',
    width: 260,
    paddingHorizontal: 10,
    borderRadius: 10,
    height: 50,
    color: 'white',
  },
  button_send: {backgroundColor: '#212121', height: 50, width: 50},
});
