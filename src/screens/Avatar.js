import React from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';

const Avatar = ({route}) => {
  console.log(route.params.image);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
      }}>
      <Image source={route.params.image} style={styles.image} />
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  image: {width: Dimensions.get('window').width, height: 300},
});
