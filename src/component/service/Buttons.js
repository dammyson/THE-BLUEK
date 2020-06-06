'use strict'
import React, { Component } from 'react'
import { Text,Button } from 'react-native';
import { withNavigation } from 'react-navigation';

class Buttons extends Component {
  render() {
    return <Button title="Back" onPress={() => { this.props.navigation.goBack() }} />;
  }
}

// withNavigation returns a component that wraps MyBackButton and passes in the
// navigation prop

export default withNavigation(Buttons);