import React, {Component} from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import {ChatList} from '../components/molecules';
import {connect} from 'react-redux';
import {getMyChat} from '../redux/actions/chat';
import Date from '../utils/date';
import moment from 'moment';
import io from 'socket.io-client';
import {API_URL} from '@env';
import Geolocation from '@react-native-community/geolocation';
import {editProfile} from '../redux/actions/auth';

class ListChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listChat: this.props.chat.data || null,
      isFriend: false,
    };
  }

  // getLocation = async () => {
  //   const {dispatch, auth} = this.props;
  //   await Geolocation.getCurrentPosition(async (info) => {
  //     const data = {
  //       longitude: info.coords.longitude,
  //       latitude: info.coords.latitude,
  //     };

  //     // console.log(data);
  //     await dispatch(editProfile(auth.data.token, data))
  //       .then(async (res) => {
  //         // await this.setState({location: data});
  //         console.log(res);
  //       })

  //       .catch((err) => {
  //         console.log(err.response);
  //       });
  //   });
  // };

  friendCheck = (id) => {
    const data = this.props.profile.data;
    const getData = data.filter((val) => {
      return val.idFriend === id;
    });

    if (getData[0] !== undefined) {
      return this.setState({isFriend: true});
    }
    return this.setState({isFriend: false});
  };

  getLandingScreen = async () => {
    const {auth, dispatch, chat} = this.props;
    await dispatch(getMyChat(auth.data.token))
      .then(async (res) => {
        await this.setState({listChat: chat.data});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    // this.getLocation();
    this.getLandingScreen();
    this.socket = io(API_URL);
    // this.socket.on('chat-list', (res) => {
    //   this.setState({listChat: [...this.state.listChat, res]});
    // });
  }

  componentWillUnmount() {
    this.socket.removeAllListeners();
    this.socket.disconnect();
  }
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.content}>
        <ScrollView>
          {this.state.listChat !== 'Data not found' ? (
            this.state.listChat.map((data) => {
              // this.friendCheck(data.id);
              return (
                <ChatList
                  key={data._id}
                  navigation={navigation}
                  name={data.name}
                  message={data.message}
                  time={Date(data.created_at, 'hh:ss a')}
                  image={data.image}
                  status={true}
                  onPress={() =>
                    navigation.navigate('Chat', {id: data.receiver})
                  }
                />
              );
            })
          ) : (
            <Text>Not Found</Text>
          )}
          {/* <ChatList
            name="Prio Arief Gunawan"
            message="Halo"
            time="16.00"
            status={true}
            onPress={() => navigation.navigate('Chat')}
          /> */}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  chat: state.chat,
  profile: state.profile,
});
export default connect(mapStateToProps)(ListChat);

const styles = StyleSheet.create({
  content: {flex: 1, backgroundColor: 'black'},
});
