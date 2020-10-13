import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Splash from '../../screens/splash/Splash';
import IntroSlider from '../../screens/splash/IntroSlider';
import Authentication from '../../screens/User/Aunthentication';
import Registration from '../../screens/User/Registration';
import Otp from '../../screens/User/Otp';
import Username from '../../screens/User/Username';
import ForgotPassword from '../../screens/password/ForgotPassword';

import Home from '../../screens/User/Home';
import Create from '../../screens/service/Create';
import Profile from '../../screens/User/Profile';
import Categories from '../../screens/service/Categories';
import Settings from '../../screens/settings/Settings';



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
             initialRouteName="Splash"
             >
            <Stack.Screen name="Splash" component={Splash}  />
            <Stack.Screen name="IntroSlider" component={IntroSlider}  />
            <Stack.Screen name="Authentication" component={Authentication}  />
            <Stack.Screen name="Registration" component={Registration}  />
            <Stack.Screen name="Username" component={Username}  />
            <Stack.Screen name="Otp" component={Otp}  />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword}  />
            <Stack.Screen   name="Create" component={Create}  />

            <Stack.Screen name="Home" component={Home}  />
            <Stack.Screen name="Profile" component={Profile}  />
            <Stack.Screen name="Categories" component={Categories}  />
            <Stack.Screen name="Settings" component={Settings}  />


          </Stack.Navigator>
        </NavigationContainer>
        </Root>
      );
  }

}

export default AppStack;