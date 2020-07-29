// import React from 'react';
// import {StyleSheet, Text, View, Image} from 'react-native';
// import MapView, {Marker} from 'react-native-maps';
// import {connect} from 'react-redux';
// import {API_URL} from '@env';

// const Map = ({auth, profile}) => {
//   // const data = navigator.geolocation.getCurrentPosition();
//   console.log(profile.data);
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
//         <Marker
//           draggable
//           coordinate={{longitude: 106.637777, latitude: -6.187171}}
//           title={auth.data.name}
//           description={auth.data.username}>
//           <Image
//             source={{uri: `${API_URL}/images/${auth.data.image}`}}
//             style={{height: 50, width: 50, borderRadius: 50 / 2}}
//           />
//         </Marker>
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
