import React from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';

const Avatar = ({route}) => {
  console.log(route.params.image);
  return (
    <View style={styles.container}>
      <Image source={{uri: route.params.image}} style={styles.image} />
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  image: {width: Dimensions.get('window').width, height: 300},
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
});
