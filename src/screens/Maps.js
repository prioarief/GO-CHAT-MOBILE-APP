import {API_APP_URL} from '@env';
import Geolocation from '@react-native-community/geolocation';
import React, {Component} from 'react';
import {
  Image,
  PermissionsAndroid,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {connect} from 'react-redux';

class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: [],
      friends: [],
      initialPosition: 'unknown',
      lastPosition: 'unknown',
    };
  }

  requestGpsPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Akses lokasi diperlukan',
          message: 'Aktifkan gps kamu sebelum lokasi dibagikan',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log('oke');
      } else {
        ToastAndroid.show('Lokasi tidak dijinkan', ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show('Terjadi gangguan, coba lagi', ToastAndroid.SHORT);
    }
  };

  watchID = null;

  async componentDidMount() {
    await this.requestGpsPermission();
  }

  componentWillUnmount() {
    this.watchID != null && Geolocation.clearWatch(this.watchID);
  }

  render() {
    const {auth, friendId} = this.props;

    return (
      <View style={friendId ? null : styles.view}>
        <MapView
          style={friendId ? styles.friend_map : styles.map}
          showsTraffic={true}
          showsCompass={true}
          initialRegion={{
            latitude: auth.data.latitude,
            longitude: auth.data.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            draggable
            coordinate={{
              longitude: auth.data.longitude,
              latitude: auth.data.latitude,
            }}
            title={auth.data.name}
            description={auth.data.username}>
            <Image
              source={{
                uri:
                  auth.data.image !== null
                    ? `${API_APP_URL}/images/${auth.data.image}`
                    : 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
              }}
              style={styles.marker}
            />
          </Marker>

          {this.props.profile.data.map((data) => {
            return (
              data.longitude !== null && (
                <Marker
                  key={data.id}
                  draggable
                  coordinate={{
                    longitude: data.longitude,
                    latitude: data.latitude,
                  }}
                  title={data.friendName}
                  description={data.friendName}>
                  <Image
                    source={{
                      uri:
                        data.friendImage === null
                          ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcShi2vPDOkXvjMhrDuNwsxqh5RB0d1f1ZADVw&usqp=CAU'
                          : `${API_APP_URL}/images/${data.friendImage}`,
                    }}
                    style={styles.marker}
                  />
                </Marker>
              )
            );
          })}
        </MapView>
      </View>
    );
  }
}

const mapStateToprops = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToprops)(Maps);
const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  friend_map: {
    height: 500,
    width: 400,
  },
  view: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  marker: {height: 50, width: 50, borderRadius: 50 / 2},
});
