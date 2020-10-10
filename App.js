import React, {Component, AppRegistry} from 'react';
import { SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import Main from './src/component/navigator/app-stack';

export default class App extends Component{
 
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" />
        <Main/>
      </SafeAreaView>
    
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
