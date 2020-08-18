import {API_APP_URL} from '@env';
import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {ListItem} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Divider} from '../atoms';
import {Checked, CheckedActive} from '../../assets';

const ChatList = ({
  name,
  message,
  time,
  status,
  onPress,
  onLongPress,
  image,
  isMe,
}) => {
  // console.log(status, isMe, 'hm');
  return (
    <View>
      <TouchableOpacity onLongPress={onLongPress} onPress={onPress}>
        <ListItem
          containerStyle={styles.list}
          titleStyle={styles.item}
          subtitleStyle={styles.message(status, isMe)}
          leftAvatar={{
            source: {
              uri:
                image === null
                  ? 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'
                  : `${API_APP_URL}/images/${image}`,
            },
          }}
          subtitle={message}
          title={name}
          rightSubtitle={time}
          rightTitle={
            isMe ? (
              status === 1 ? (
                <Image source={CheckedActive} />
              ) : (
                <Image source={Checked} />
              )
            ) : status === 0 ? (
              <Icon name="exclamation-circle" color="white" size={17} />
            ) : null
          }
          rightSubtitleStyle={styles.time}
        />
        <Divider />
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
  message: (status, isMe) => ({
    color: '#cfcfcf',
    fontWeight: !isMe && status === 0 ? 'bold' : '400',
  }),
  time: {
    color: '#cfcfcf',
    fontSize: 12,
  },
});
