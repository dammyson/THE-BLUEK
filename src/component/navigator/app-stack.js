import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Splash from '../../component/splash/Splash';
import IntroSlider from '../splash/IntroSlider';
import Authentication from '../User/Aunthentication';
import Registration from '../User/Registration';
import Otp from '../User/Otp';
import Username from '../User/Username';
import ForgotPassword from '../password/ForgotPassword';

import Home from '../User/Home';
import Create from '../service/Create';

import { Root } from 'native-base';

class AppStack extends Component {

  render() {
    const Stack = createStackNavigator();
    return (
      <Root>
        <NavigationContainer>
          <Stack.Navigator
          screenOptions={{ 
              gestureEnabled: false,
              headerTintColor: 'white',
              headerStyle: { backgroundColor: '#7862ff' }, //tomato
              //headerLeft: null,
              headerShown: false,
             }}
             initialRouteName="Create"
             >
            <Stack.Screen name="Splash" component={Splash}  />
            <Stack.Screen name="IntroSlider" component={IntroSlider}  />
            <Stack.Screen name="Authentication" component={Authentication}  />
            <Stack.Screen name="Registration" component={Registration}  />
            <Stack.Screen name="Username" component={Username}  />
            <Stack.Screen name="Otp" component={Otp}  />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword}  />
            <Stack.Screen navigation={this.props.navigation}  name="Create" component={Create}  />

            <Stack.Screen name="Home" component={Home}  />
          </Stack.Navigator>
        </NavigationContainer>
        </Root>
      );
  }

}

export default AppStack;