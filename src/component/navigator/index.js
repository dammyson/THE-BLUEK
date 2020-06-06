
import {  createSwitchNavigator, createAppContainer } from 'react-navigation';
import AppStack from './app-stack'



const MyAppNavigator = createSwitchNavigator(
  {
    App: AppStack,
  },
  {
    initialRouteName: 'App',
  }
);

export default createAppContainer(MyAppNavigator);