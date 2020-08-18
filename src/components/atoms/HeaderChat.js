import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {API_APP_URL} from '@env';
import {connect} from 'react-redux';

const HeaderChat = ({navigation, name, image, id, auth}) => {
  const [status, setStatus] = useState(false);
  const [isMe, setIsMe] = useState(false);

  const meCheck = () => {
    if (id !== auth.data.id) {
      return setIsMe(id);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setStatus(true);
    }, 500);
    meCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
            image === null || image === undefined
              ? 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'
              : `${API_APP_URL}/images/${image}`,
        }}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('Profile', {isMe: isMe})}>
        <Text style={styles.profile}>{name}</Text>
        {status && <Text style={styles.status}>Online</Text>}
      </TouchableOpacity>
    </View>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps)(HeaderChat);

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
