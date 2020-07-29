import React, {Component} from 'react';
import {Text, StyleSheet, View, ImageBackground} from 'react-native';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import {ScrollView} from 'react-native-gesture-handler';
import {Background} from '../assets';
import {connect} from 'react-redux';
import {getMessage, getMyChat, sendMessage} from '../redux/actions/chat';
import {Header, InputChat} from '../components/atoms';
import {ChatItem} from '../components/molecules';
import Date from '../utils/date';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      message: [],
      newMessage: '',
    };
  }

  renderChat = async () => {
    const {route, dispatch, auth} = this.props;

    await dispatch(getMessage(auth.data.token, route.params.id))
      .then(async (res) => {
        this.setState({message: this.props.chat.chat});
        await dispatch(getMyChat(auth.data.token));
        console.log(this.state.message);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  sendMsg = async () => {
    await this.props
      .dispatch(
        sendMessage(
          this.props.auth.data.token,
          this.props.route.params.id,
          this.state.newMessage,
        ),
      )
      .then(async (res) => {
        console.log(res);
        await this.renderChat();
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
      return val.user === this.props.route.params.id;
    });

    if (getData[0] !== undefined) {
      return await this.setState({name: getData[0]});
    }
    console.log(getChatData);
    return await this.setState({name: getChatData[0]});
  };

  componentDidMount() {
    this.renderChat();
    this.getContact();
  }
  render() {
    const {data} = this.props.auth;
    const {name, message, newMessage} = this.state;
    return (
      <ImageBackground source={Background} style={styles.container}>
        <Header
          navigation={this.props.navigation}
          name={name.friendName || name.name}
          image={name.friendImage || name.image}
          id={this.props.route.params.id}
        />
        <ScrollView showsHorizontalScrollIndicator={false}>
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
