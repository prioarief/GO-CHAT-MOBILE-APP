import React, {Component} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {FriendList} from '../components/molecules';

export default class ListChat extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.content}>
        <ScrollView>
          <FriendList
            name="Prio Arief"
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcShi2vPDOkXvjMhrDuNwsxqh5RB0d1f1ZADVw&usqp=CAU"
            onPress={() => navigation.navigate('Chat')}
          />
          <FriendList
            name="Prio Arief Gunawan"
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcShi2vPDOkXvjMhrDuNwsxqh5RB0d1f1ZADVw&usqp=CAU"
            onPress={() => navigation.navigate('Chat')}
          />
          <FriendList
            name="Lionel Messi"
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcShi2vPDOkXvjMhrDuNwsxqh5RB0d1f1ZADVw&usqp=CAU"
            onPress={() => navigation.navigate('Chat')}
          />
          <FriendList
            name="Kylian Mbappe"
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcShi2vPDOkXvjMhrDuNwsxqh5RB0d1f1ZADVw&usqp=CAU"
            onPress={() => navigation.navigate('Chat')}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {flex: 1, backgroundColor: 'black'},
});
