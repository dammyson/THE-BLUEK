import React, { Component } from 'react';
import { View, StatusBar } from "react-native";
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
      <>
       <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {

            if (route.name === 'Profile') {
              return (
                <View style={{ marginTop:5}}>
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
            else if (route.name == 'Orders') {
              return (
              <View style={{  marginTop:5}}>
                <Icon
                  active
                  focused={focused}
                  name="chat"
                  type='material'
                  color={color}
                />
              </View>
                );
            }
            else if (route.name === 'Home') {

              return (
                <View style={{ height: 60, width: 60, justifyContent: 'center', alignItems: 'center', marginBottom: 20, borderRadius: 40, backgroundColor: '#394FA1', }}>
                  <Icon
                    active
                    name="home"
                    type='font-awesome'
                    color={'#fff'}
                  />
                </View>
              );
            } else if (route.name == 'Favourite') {
              return (
              <View style={{  marginTop:5}}>
                <Icon
                  active
                  focused={focused}
                  name="heart"
                  type='font-awesome'
                  color={color}
                />
              </View>
                );
            }

            else if (route.name == 'Notification') {
              return (
              <View style={{  marginTop:5}}>
                <Icon
                  active
                  focused={focused}
                  name="notifications"
                  type='ionicons'
                  color={color}
                />
              </View>
                );
            }
          },
        })}
        tabBarOptions={{
          initialRoute: 'Home',
          activeTintColor: '#394FA1', //'tomato',
          inactiveTintColor: '#AEB1BE',
          height:40
        }}
      >
        <Tab.Screen navigation={this.props.navigation} name="Profile" component={Profile}/>
        <Tab.Screen navigation={this.props.navigation} name="Orders" component={Home}/>
        <Tab.Screen name="Home" component={Search} />
        <Tab.Screen navigation={this.props.navigation} name="Favourite" component={Profile}/>
        <Tab.Screen navigation={this.props.navigation} name="Notification" component={Profile}/>


      </Tab.Navigator>
      </>

    );
  }

}

export default AppNavigator;