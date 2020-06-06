import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Profile from '../User/Profile';
import CreateService from '../service/Create';

import ServieDetails from '../service/ServieDetails';

import Step1 from "../service/step1";
import Step2 from "../service/step2";
import Step3 from "../service/step3";



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
