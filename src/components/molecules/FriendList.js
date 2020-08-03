import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Divider} from '../atoms';

const ChatList = ({name, onPress, onLongPress, image, light}) => {
  return (
    <View>
      <TouchableOpacity onLongPress={onLongPress} onPress={onPress}>
        <ListItem
          containerStyle={styles.list(light)}
          titleStyle={styles.item(light)}
          subtitleStyle={styles.message}
          leftAvatar={{
            source: {
              uri: image,
            },
          }}
          title={name}
          chevron
        />
        <Divider />
      </TouchableOpacity>
    </View>
  );
};

export default ChatList;

const styles = StyleSheet.create({
  list: (light) => ({
    backgroundColor: light ? 'white' : '#212121',
  }),
  item: (light) => ({
    color: light ? 'black' : '#f0f0f0',
  }),
  message: {
    color: '#cfcfcf',
  },
  time: {
    color: '#cfcfcf',
    fontSize: 12,
  },
});
