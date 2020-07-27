import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ChatItem = ({isMe, message, date}) => {
  return (
    <View style={styles.container(isMe)}>
      <View style={styles.content(isMe)}>
        <Text style={styles.message}>{message}</Text>
        {/* <Image
          source={Checked}
          style={{position: 'absolute', top: 35, right: 10}}
        /> */}
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
};

export default ChatItem;

const styles = StyleSheet.create({
  container: (isMe) => ({
    marginBottom: 20,
    alignItems: isMe ? 'flex-end' : 'flex-start',
  }),
  content: (isMe) => ({
    backgroundColor: isMe ? 'green' : '#616060',
    maxWidth: '70%',
    minWidth: '30%',
    borderRadius: 20,
    marginHorizontal: 10,
    borderBottomRightRadius: isMe ? 0 : 20,
    borderBottomLeftRadius: isMe ? 20 : 0,
  }),
  message: {padding: 10, color: 'white', textAlign: 'justify'},
  date: {
    color: 'white',
    fontSize: 10,
    textAlign: 'right',
    paddingRight: 10,
    paddingBottom: 10,
  },
});
