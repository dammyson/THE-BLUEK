import React, { Component } from 'react';
import { View } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './HomeNavigator';
import Search from './SearchNavigator';
import Profile from './ProfileNavigator';
import Pro from './ProfileNavigator';

import { Card, Icon, SocialIcon } from 'react-native-elements'

const Tab = createBottomTabNavigator();


class AppNavigator extends Component {

  render() {

    return (
      <Tab.Navigator

        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {

            if (route.name === 'Home') {
              return (
                <View style={{}}>
                  <Icon
                    active
                    focused={focused}
                    name="home"
                    type='font-awesome'
                    color={color}
                  />
                </View>
              );
            } else if (route.name === 'Search') {

              return (
                <View style={{ height: 60, width: 60, justifyContent: 'center', alignItems: 'center', marginBottom: 20, borderRadius: 40, backgroundColor: '#749AD1', borderWidth: 3, borderColor: color }}>
                  <Icon
                    active
                    name="search"
                    type='font-awesome'
                  />
                </View>
              );
            } else if (route.name == 'Profile') {
              return (
              <View style={{ }}>
                <Icon
                  active
                  focused={focused}
                  name="user"
                  type='font-awesome'
                  color={color}
                />
              </View>
                );
            }
          },
        })}
        tabBarOptions={{

          activeTintColor: 'black', //'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen navigation={this.props.navigation} name="Home" component={Home}/>
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen navigation={this.props.navigation} name="Profile" component={Profile}/>


      </Tab.Navigator>

    );
  }

}

export default AppNavigator;