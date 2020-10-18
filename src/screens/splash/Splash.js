
import React, {Component} from 'react';
import {ImageBackground, StyleSheet, Text, View, Image, Dimensions, AsyncStorage} from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase'


export default class Splash extends Component{
  constructor(props) 
  {
      super(props);
      this.emailRef = React.createRef();
      this.state = {
        token: "", 
 }

  }


  async componentDidMount(){
    this.checkPermission(); 
    setTimeout(() => {
    this.initPage();
     //this.props.navigation.navigate('Authentication');
    }, 2000);
   }

  initPage = () => {
    AsyncStorage.getItem('rem').then((value) => {
      console.warn(value);
      if(value=='login'){
        this.props.navigation.navigate('Home');
      }else if(value==null){
        this.props.navigation.navigate('IntroSlider');
      }
      else{
        this.props.navigation.navigate('IntroSlider');
      } 
    })
   
  }



     //1
async checkPermission() {
  const enabled = await firebase.messaging().hasPermission();
  if (enabled) {
      this.getToken();
  } else {
      this.requestPermission();
  }
 // firebase.messaging().subscribeToTopic("global");
}
async getToken() {
  let fcmToken = await AsyncStorage.getItem('blfcmToken');
  console.warn(fcmToken);
  this.setState({token: fcmToken})
  if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      console.warn(fcmToken);
      if (fcmToken) {
          // user has a device token
          await AsyncStorage.setItem('blfcmToken', fcmToken);
          this.setState({token: fcmToken})
      }
  }
}

  //2
async requestPermission() {
  try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
  } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
  }
}


  render() {
    return (
      <ImageBackground
      source={require('../../assets/bgtwo.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
      >
      <View style={styles.container}>
              <Image 
                style={styles.logo}
                resizeMode='contain'
                source = {require('../../assets/logo.png')}
               />
      </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  backgroundImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  logo:{
    width:160,
    height:160,
    alignItems: 'center',
    justifyContent: 'center',
    
    
}
,
});
