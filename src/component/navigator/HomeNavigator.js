import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Feed from '../../screens/User/Feed';
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
             initialRouteName="Feed"
             >
            <Stack.Screen name="Feed" component={Feed}  />
            <Stack.Screen name="ServieDetails" component={ServieDetails}  />
          </Stack.Navigator>
      );
  }

}

export default AppStack;

