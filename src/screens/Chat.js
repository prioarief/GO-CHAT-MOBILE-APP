import {API_APP_URL} from '@env';
import React, {Component} from 'react';
import {ImageBackground, StyleSheet, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import io from 'socket.io-client';
import {Background} from '../assets';
import {Header, InputChat} from '../components/atoms';
import {ChatItem, Loading} from '../components/molecules';
import {
  getMessage,
  getMyChat,
  sendMessage,
  updateMessage,
} from '../redux/actions/chat';
import Date from '../utils/date';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      message: [],
      newMessage: '',
      isLoading: this.props.chat.isLoading,
    };
  }

  renderChat = async () => {
    const {route, dispatch, auth} = this.props;

    await dispatch(getMessage(auth.data.token, route.params.id))
      .then(async (res) => {
        await dispatch(updateMessage(auth.data.token, route.params.id)).then(
          async () => {
            await dispatch(getMyChat(auth.data.token)).then(async () => {
              this.setState({message: this.props.chat.chat});
            });
          },
        );
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  sendMsg = async () => {
    const {dispatch, auth, route} = this.props;
    await dispatch(
      sendMessage(auth.data.token, route.params.id, this.state.newMessage),
    )
      .then(async (res) => {
        await dispatch(getMyChat(auth.data.token));
        this.setState({newMessage: ''});
      })
      .catch((err) => console.log(err.response));
  };

  getContact = async () => {
    const data = this.props.profile.data;
    const ChatData = this.props.chat.data;
    const getData = data.filter((val) => {
      return val.idFriend === this.props.route.params.id;
    });
    const getChatData = ChatData.filter((val) => {
      return (
        val.user === this.props.route.params.id ||
        val.receiver === this.props.route.params.id
      );
    });

    if (getData[0] !== undefined) {
      return await this.setState({name: getData[0]});
    }
    return await this.setState({name: getChatData[0]});
  };

  componentDidMount() {
    this.renderChat();
    this.getContact();
    this.socket = io(API_APP_URL);
    this.socket.on('chat', (res) => {
      const {id} = this.props.route.params;
      if (res.receiver === id || res.user === id) {
        return this.setState({message: [...this.state.message, res]});
      }
    });
  }

  componentWillUnmount() {
    this.socket.removeAllListeners();
    this.socket.disconnect();
  }

  render() {
    const {data} = this.props.auth;
    const {name, message, newMessage} = this.state;
    return (
      <>
        <ImageBackground source={Background} style={styles.container}>
          <Header
            navigation={this.props.navigation}
            name={name.friendName || name.name}
            image={name.friendImage || name.image}
            id={this.props.route.params.id}
          />
          <ScrollView
            showsVerticalScrollIndicator={false}
            ref={(scroll) => {
              this.scroll = scroll;
            }}
            onContentSizeChange={() => this.scroll.scrollToEnd()}>
            <Text style={styles.date}>27 July 2020</Text>
            {message.map((msg) => {
              return (
                <ChatItem
                  key={msg._id}
                  isMe={msg.user === data.id ? true : false}
                  message={msg.message}
                  date={Date(msg.created_at, 'hh:ss a')}
                />
              );
            })}
          </ScrollView>
          <InputChat
            value={newMessage}
            onChangeText={(input) => this.setState({newMessage: input})}
            onPress={() => this.sendMsg()}
          />
        </ImageBackground>
        {this.props.chat.isLoading && <Loading />}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  chat: state.chat,
  profile: state.profile,
});
export default connect(mapStateToProps)(Chat);

const styles = StyleSheet.create({
  date: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 14,
    color: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
