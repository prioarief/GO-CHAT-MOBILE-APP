import React, {Component} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {FriendList} from '../components/molecules';
import {connect} from 'react-redux';
import {getContact} from '../redux/actions/profile';
import {API_URL} from '@env';

class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: [],
    };
  }

  getFriendList = async () => {
    await this.props
      .dispatch(getContact(this.props.auth.data.token))
      .then(async (res) => {
        await this.setState({contact: this.props.profile.data});
      })
      .catch((err) => console.log(err.response));
  };
  async componentDidMount() {
    await this.getFriendList();
  }
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.content}>
        <ScrollView>
          {this.state.contact.map((data) => {
            // console.log(data);
            return (
              <FriendList
                key={data.id}
                name={data.friendName}
                image={
                  data.friendImage === null
                    ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcShi2vPDOkXvjMhrDuNwsxqh5RB0d1f1ZADVw&usqp=CAU'
                    : `${API_URL}/images/${data.friendImage}`
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
});
