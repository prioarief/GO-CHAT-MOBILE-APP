import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native-gesture-handler';

const HeaderChat = ({navigation}) => {
  return (
    <View style={styles.content}>
      <Icon
        name="angle-left"
        style={styles.icon_back}
        size={25}
        color="white"
        onPress={() => navigation.goBack()}
      />
      <Image
        style={styles.image}
        source={{
          uri:
            'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        }}
      />
      <TouchableOpacity>
        <Text style={styles.profile}>Prio Arief Gunawan</Text>
        <Text style={styles.status}>Online</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderChat;

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#212121',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profile: {
    color: 'white',
    fontSize: 17,
  },
  status: {
    color: 'white',
    fontSize: 12,
  },
  image: {width: 50, height: 50, marginHorizontal: 20, borderRadius: 50 / 2},
  icon_back: {
    paddingHorizontal: 10,
  },
});
