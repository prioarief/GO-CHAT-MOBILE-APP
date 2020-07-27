import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Checked, CheckedActive} from '../../assets';

const ChatList = ({name, message, time, status, onPress, onLongPress}) => {
  return (
    <View>
      <TouchableOpacity onLongPress={onLongPress} onPress={onPress}>
        <ListItem
          containerStyle={styles.list}
          titleStyle={styles.item}
          subtitleStyle={styles.message}
          leftAvatar={{
            source: {
              uri:
                'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            },
          }}
          subtitle={message}
          title={name}
          rightSubtitle={time}
          rightTitle={<Image source={status ? CheckedActive : Checked} />}
          rightSubtitleStyle={styles.time}
          bottomDivider
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
