import React, {Component} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {ChatList} from '../components/molecules';

export default class ListChat extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.content}>
        <ScrollView>
          <ChatList
            name="Prio Arief"
            message="Woy"
            time="16.00"
            status={false}
            onPress={() => navigation.navigate('Chat')}
          />
          <ChatList
            name="Prio Arief Gunawan"
            message="Halo"
            time="16.00"
            status={true}
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
