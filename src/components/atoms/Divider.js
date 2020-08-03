import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Divider = () => {
  return <View style={styles.divider} />;
};

export default Divider;

const styles = StyleSheet.create({
  divider: {
    borderBottomColor: '#2e2e2e',
    borderBottomWidth: 1,
  },
});
