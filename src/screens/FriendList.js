import {API_APP_URL} from '@env';
import React, {Component} from 'react';
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import io from 'socket.io-client';
import {connect} from 'react-redux';
import {FriendList} from '../components/molecules';
import {getContact} from '../redux/actions/profile';

class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: [],
      refresh: false,
      visible: false,
    };
  }

  onRefresh = () => {
    this.setState({refresh: true});
    setTimeout(() => {
      this.setState({refresh: false});
    }, 200);
  };

  getFriendList = async () => {
    const token = this.props.auth.data.token;
    await this.props
      .dispatch(getContact(token))
      .then(async (res) => {
        await this.setState({contact: this.props.profile.data});
      })
      .catch((err) => console.log(err.response));
  };
  componentDidMount = async () => {
    this.getFriendList();
    this.socket = io(API_APP_URL);
    this.socket.on('contact', (res) => {
      // this.setState({contact: res});
      res.map((d) => {
        if (d.user_id === this.props.auth.data.id) {
          return this.setState({contact: res});
        }
      });
    });
  };
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.content}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refresh}
              onRefresh={this.onRefresh}
            />
          }>
          {this.state.contact.map((data) => {
            return (
              <FriendList
                key={data.id}
                name={data.friendName}
                image={
                  data.friendImage === null
                    ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcShi2vPDOkXvjMhrDuNwsxqh5RB0d1f1ZADVw&usqp=CAU'
                    : `${API_APP_URL}/images/${data.friendImage}`
                }
                onPress={() =>
                  navigation.navigate('Chat', {
                    id: data.idFriend,
                    isFriend: true,
                  })
                }
              />
            );
          })}
        </ScrollView>
        <View style={styles.BtnContainer}>
          <Button
            containerStyle={{borderRadius: 70 / 2}}
            buttonStyle={styles.btn}
            icon={<Icon name="folder-plus" color="white" size={24} />}
            onPress={() => navigation.navigate('Search Contact')}
          />
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps)(Friends);

const styles = StyleSheet.create({
  content: {flex: 1, backgroundColor: '#212121'},
  btn: {height: 70, width: 70},
  BtnContainer: {
    position: 'absolute',
    top: 400,
    right: 50,
    height: 60,
  },
});
