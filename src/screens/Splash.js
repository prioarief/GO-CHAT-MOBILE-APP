import React, {Component} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {connect} from 'react-redux';
import {Logo, LogoWhite} from '../assets';

class Splash extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   getStarted: null,
    // };
  }

  componentDidMount() {
    setTimeout(() => {
      if (this.props.auth.data.token) {
        return this.props.navigation.replace('MainApp');
      }
      this.props.navigation.replace('Login');
    }, 2000);
  }
  render() {
    return (
      <View style={styles.logo}>
        <Image source={Logo} style={{width: 200, height: 200}} />
        <Text style={{fontSize: 40, color: 'black'}}>Go Chat</Text>
        <Text style={{fontSize: 16, color: 'black'}}>
          Connect with your friends
        </Text>
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
});
