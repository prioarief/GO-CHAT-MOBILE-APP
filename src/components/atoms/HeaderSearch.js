import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SearchBar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';

const HeaderSearch = ({navigation, value, onChangeText, onBlur, onClear}) => {
  return (
    <View style={styles.content}>
      <Icon
        name="angle-left"
        style={styles.icon_back}
        size={25}
        color="white"
        onPress={() => navigation.goBack()}
      />
      <SearchBar
        inputContainerStyle={styles.search_input}
        containerStyle={styles.search}
        round={true}
        placeholder="Your Friend's Username"
        onChangeText={onChangeText}
        value={value}
        onBlur={onBlur}
        onClear={onClear}
      />
    </View>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps)(HeaderSearch);

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#212121',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon_back: {
    paddingHorizontal: 10,
  },
  search: {
    width: 300,
    backgroundColor: 'transparent',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  search_input: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
});
