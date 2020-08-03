// import React, {useEffect, useState} from 'react';
// import {StyleSheet, Text, View, Image} from 'react-native';
// import MapView, {Marker} from 'react-native-maps';
// import {connect} from 'react-redux';
// import GeoLocqtion from '@react-native-community/geolocation';
// import {API_URL} from '@env';
// import Geolocation from '@react-native-community/geolocation';

// const Map = ({auth, profile}) => {
//   const [myLocation, setMyLocation] = useState([]);

//   const getLocation = async () => {
//     await Geolocation.getCurrentPosition(async (info) => {
//       await setMyLocation(info);
//       console.log(myLocation);
//     });
//   };

//   useEffect(() => {
//     getLocation();
//     console.log(myLocation);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
//   return (
//     <View style={styles.view}>
//       <Text>Map</Text>
//       <MapView
//         style={styles.map}
//         showsTraffic={true}
//         showsCompass={true}
//         initialRegion={{
//           latitude: -6.2023936,
//           longitude: 106.65270989999999,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}>
//         <Marker
//           draggable
//           coordinate={{longitude: 106.65270989999999, latitude: -6.2023936}}
//           title={auth.data.name}
//           description={auth.data.username}>
//           <Image
//             source={{uri: `${API_URL}/images/${auth.data.image}`}}
//             style={{height: 50, width: 50, borderRadius: 50 / 2}}
//           />
//         </Marker>
//         {/* <Marker
//           draggable
//           coordinate={{longitude: 106.637777, latitude: -6.187171}}
//           title={auth.data.name}
//           description={auth.data.username}>
//           <Image
//             source={{uri: `${API_URL}/images/${auth.data.image}`}}
//             style={{height: 50, width: 50, borderRadius: 50 / 2}}
//           />
//         </Marker> */}
//       </MapView>
//     </View>
//   );
// };
// const mapStateToprops = (state) => ({
//   auth: state.auth,
//   profile: state.profile,
// });
// export default connect(mapStateToprops)(Map);

// const styles = StyleSheet.create({
//   map: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     bottom: 0,
//     right: 0,
//   },
//   view: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     bottom: 0,
//     right: 0,
//   },
// });
import {API_URL} from '@env';
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

  // getFriendLocation = async () => {
  //   const {auth, dispatch, profile} = this.props;
  // };

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
        console.log('oke');
      } else {
        ToastAndroid.show('Lokasi tidak dijinkan', ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show('Terjadi gangguan, coba lagi', ToastAndroid.SHORT);
    }
  };

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
  //         await this.setState({location: data});
  //         // console.log(this.state.location);
  //       })

  //       .catch((err) => {
  //         console.log(err.response);
  //       });
  //   });
  // };
  watchID = null;

  async componentDidMount() {
    await this.requestGpsPermission();
    // console.log(this.props.friendId, this.props.profile.data);

    // this.getFriendLocation();
    // Geolocation.getCurrentPosition(
    //   (position) => {
    //     const initialPosition = JSON.stringify(position);
    //     this.setState({initialPosition});
    //   },
    //   (error) => Alert.alert('Error', JSON.stringify(error)),
    //   {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    // );
    // this.watchID = Geolocation.watchPosition((position) => {
    //   const lastPosition = JSON.stringify(position);
    //   this.setState({lastPosition});
    // });
    // console.log(
    //   this.watchID,
    //   this.state.initialPosition,
    //   this.state.lastPosition,
    // );
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
              source={{uri: `${API_URL}/images/${auth.data.image}`}}
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
                          : `${API_URL}/images/${data.friendImage}`,
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
