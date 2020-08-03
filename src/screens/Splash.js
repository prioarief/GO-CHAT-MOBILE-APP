import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {Logo} from '../assets';

class Splash extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => {
      if (this.props.auth.data.token) {
        return this.props.navigation.replace('MainApp');
      }
      this.props.navigation.replace('Login');
    }, 1500);
  }
  render() {
    return (
      <View style={styles.logo}>
        <Logo />
        <Text style={styles.title}>Go Chat</Text>
        <Text style={styles.tagline}>Connect with your friends</Text>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  book: state.book,
  auth: state.auth,
});

export default connect(mapStateToProps)(Splash);

const styles = StyleSheet.create({
  logo: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {fontSize: 30, color: 'black'},
  tagline: {fontSize: 16, color: 'black'},
});
