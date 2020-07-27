import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Profile} from '../../assets';

const HeaderProfile = ({navigation}) => {
  return (
    <View style={styles.content}>
      <View style={styles.profile_content}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Avatar', {
              image:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcShi2vPDOkXvjMhrDuNwsxqh5RB0d1f1ZADVw&usqp=CAU',
            })
          }>
          <Image style={styles.image} source={Profile} />
        </TouchableOpacity>
        <Text style={styles.profile}>Prio Arief Gunawan</Text>
        <Text style={styles.bio}>Hello there, Iam using GoChat</Text>
      </View>
    </View>
  );
};

export default HeaderProfile;

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
});
