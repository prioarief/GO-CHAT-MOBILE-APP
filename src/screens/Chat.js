import React, {Component} from 'react';
import {Text, StyleSheet, View, ImageBackground} from 'react-native';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import {ScrollView} from 'react-native-gesture-handler';
import {Background} from '../assets';
import {connect} from 'react-redux';
import {getMessage, getMyChat, sendMessage} from '../redux/actions/chat';
import {Header, InputChat} from '../components/atoms';
import {ChatItem, Loading} from '../components/molecules';
import Date from '../utils/date';
import io from 'socket.io-client';
import {API_URL} from '@env';

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
        await dispatch(getMyChat(auth.data.token));
        await this.setState({message: this.props.chat.chat});
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  sendMsg = async () => {
    // this.socket.emit('chat message', {
    //   sender: 'Prio',
    //   receiver: 'Arief',
    //   msg: this.state.newMessage,
    // });
    await this.props
      .dispatch(
        sendMessage(
          this.props.auth.data.token,
          this.props.route.params.id,
          this.state.newMessage,
        ),
      )
      .then(async (res) => {
        // console.log(res);
        // await this.renderChat();
        await this.setState({newMessage: ''});
      });
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
    // console.log(this.state.isLoading);
    this.socket = io(API_URL);
    this.socket.on('chat', (res) => {
      const {id} = this.props.route.params;
      if (res.receiver === id || res.user === id) {
        return this.setState({message: [...this.state.message, res]});
      }
    });
  }

  // componentDidUpdate() {
  //   console.log(this.props.chat.isLoading);
  // }
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
      // <>
      //   <Header
      //     name={name.friendName || name.name}
      //     image={name.friendImage || name.image}
      //     navigation={this.props.navigation}
      //   />
      //   <GiftedChat
      //     messages={message}
      //     onSend={(val) => this.onSend(val)}
      //     // renderBubble={this.renderBubble}
      //     // renderUsernameOnMessage={true}
      //     user={{
      //       _id: data.id,
      //       name: data.name,
      //       avatar: data.image,
      //     }}
      //     // showUserAvatar
      //     scrollToBottom
      //     placeholder="Type your message here..."
      //   />
      // </>
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
