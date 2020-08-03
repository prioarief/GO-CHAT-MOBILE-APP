import {API_URL} from '@env';
import Axios from 'axios';
import React, {Component} from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  Image,
} from 'react-native';
import {Overlay, Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {HeaderSearch} from '../components/atoms';
import {FriendList, Loading} from '../components/molecules';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      keyword: '',
      isLoading: false,
      visible: false,
      detail: [],
    };
  }

  ModalResult = () => {
    const {detail, visible} = this.state;
    return (
      <Overlay
        isVisible={visible}
        overlayStyle={styles.overlay}
        onBackdropPress={() => this.setState({visible: false})}>
        <View style={styles.overlayContent}>
          <Image
            style={styles.avatar}
            source={{
              uri:
                detail.image === null
                  ? 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'
                  : `${API_URL}/images/${detail.image}`,
            }}
          />
          <Text style={styles.name}>{detail.name}</Text>
          <Text style={styles.bio}>Hello I'm Using Go Chat'</Text>
          <Button title="Add Contact" />
        </View>
      </Overlay>
    );
  };

  handleSearch = async () => {
    this.setState({isLoading: true});
    if (this.state.keyword.length === 0) {
      this.setState({isLoading: false});
      return ToastAndroid.show('Please type some word', ToastAndroid.SHORT);
    }
    await Axios({
      method: 'POST',
      url: `${API_URL}/api/auth/contact`,
      params: {
        search: this.state.keyword,
      },
      headers: {
        Authorization: this.props.auth.data.token,
      },
    })
      .then((res) => {
        this.setState({result: res.data.data});
        this.setState({isLoading: false});
      })
      .catch((err) => {
        this.setState({isLoading: false});

        if (err.response.status === 404) {
          return this.setState({result: null});
        }
        console.log(err.response);
      });
  };

  render() {
    const {keyword, result, isLoading} = this.state;
    return (
      <>
        <View style={styles.container}>
          <HeaderSearch
            navigation={this.props.navigation}
            value={keyword}
            onChangeText={(input) => this.setState({keyword: input})}
            onBlur={() => this.handleSearch()}
            onClear={() => this.setState({result: []})}
          />
          <View style={styles.content}>
            {result.length > 0 && <Text style={styles.result}>Result</Text>}
            {result !== null
              ? result.map((data) => {
                  return (
                    <FriendList
                      key={data.id}
                      name={data.name}
                      image={
                        data.image !== null
                          ? `${API_URL}/images/${data.image}`
                          : null
                      }
                      onPress={() => {
                        this.setState({visible: true});
                        this.setState({detail: data});
                      }}
                    />
                  );
                })
              : Alert.alert('Username not found')}
            <this.ModalResult />
          </View>
        </View>
        {isLoading && <Loading />}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps)(Search);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
  },
  content: {
    padding: 20,
  },
  result: {color: 'white'},
  overlay: {
    width: Dimensions.get('screen').width - 50,
    height: 300,
    borderRadius: 30,
  },
  avatar: {width: 90, height: 90, borderRadius: 90 / 2},
  name: {paddingTop: 10, paddingBottom: 5, fontSize: 17, fontWeight: 'bold'},
  bio: {paddingBottom: 10, fontSize: 13, fontStyle: 'italic'},
  overlayContent: {alignItems: 'center'},
});
