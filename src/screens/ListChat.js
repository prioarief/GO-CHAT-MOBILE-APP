import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {ChatList} from '../components/molecules';
import {getMyChat} from '../redux/actions/chat';
import Date from '../utils/date';

class ListChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: 'Data not found',
      isFriend: false,
    };
  }
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
    const {auth, dispatch} = this.props;
    await dispatch(getMyChat(auth.data.token))
      .then(async (res) => {
        this.setState({listChat: res.value.data.data});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount = async () => {
    await this.getLandingScreen();
  };

  render() {
    return (
      <View style={styles.content}>
        <ScrollView>
          {this.state.listChat !== 'Data not found' ? (
            this.state.listChat ? (
              this.state.listChat.map((data) => {
                return (
                  <ChatList
                    key={data._id}
                    navigation={this.props.navigation}
                    name={data.name}
                    message={data.message}
                    time={Date(data.created_at, 'hh:ss a')}
                    image={data.image}
                    status={true}
                    onPress={() =>
                      this.props.navigation.navigate('Chat', {
                        id:
                          data.receiver === this.props.auth.data.id
                            ? data.user
                            : data.receiver,
                      })
                    }
                  />
                );
              })
            ) : null
          ) : (
            <Text style={styles.notfound}>Not Found</Text>
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
  content: {flex: 1, backgroundColor: '#212121'},
});
