import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ChatList = ({name, onPress, onLongPress, image}) => {
  return (
    <View>
      <TouchableOpacity onLongPress={onLongPress} onPress={onPress}>
        <ListItem
          containerStyle={styles.list}
          titleStyle={styles.item}
          subtitleStyle={styles.message}
          leftAvatar={{
            source: {
              uri: image,
            },
          }}
          title={name}
          bottomDivider
          chevron
        />
      </TouchableOpacity>
    </View>
  );
};

export default ChatList;

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#212121',
  },
  item: {
    color: '#f0f0f0',
  },
  message: {
    color: '#cfcfcf',
  },
  time: {
    color: '#cfcfcf',
    fontSize: 12,
  },
});
