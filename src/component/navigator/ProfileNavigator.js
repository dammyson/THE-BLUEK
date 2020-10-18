import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Profile from '../../screens/User/Profile';
import CreateService from '../../screens/service/Create';

import ServieDetails from '../../screens/service/ServieDetails';





class AppStack extends Component {

  render() {
    const Stack = createStackNavigator();
    return (
          <Stack.Navigator
          screenOptions={{ 
              gestureEnabled: false,
              headerTintColor: 'white',
              headerStyle: { backgroundColor: '#7862ff' }, //tomato
              //headerLeft: null,
              headerShown: false,
             }}
             initialRouteName="Profile"
             >
            <Stack.Screen navigation={this.props.navigation}  name="Profile" component={Profile}  />
            <Stack.Screen   name="CreateService" component={CreateService}  />
            <Stack.Screen navigation={this.props.navigation}  name="ServieDetails" component={ServieDetails}  />
          </Stack.Navigator>
      );
  }

}

export default AppStack;
