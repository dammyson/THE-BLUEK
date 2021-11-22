import React, { Component } from "react";
import { Image, Dimensions, TextInput, StyleSheet, AsyncStorage, Alert, ImageBackground, StatusBar, ActivityIndicator } from "react-native";
import {
  Container,
  Content,
  Text,
  Item,
  Input,
  Button,
  View,
  Left,
  Right,
  Toast
} from "native-base";
import { SocialIcon } from 'react-native-elements'
import { Icon } from 'react-native-elements'
const URL = require("../../component/server");
import {
  SkypeIndicator,
} from 'react-native-indicators';
import Swiper from 'react-native-swiper';

const bgone = require('../../assets/bgthree.png');
const bgtwo = require('../../assets/signupbgtwo.png');

import { getFmc } from '../../component/utilities/index';
import { baseUrl } from "../../utilities";

export default class Authentication extends Component {


  async componentDidMount() {
    this.setState({ token: await getFmc() })
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '', //"password": "123456", "phone": "08163333333"
      password: '',
      error: '',
      login_loading: true,
      demail: "",
      phone: '',
      regButtonState: 'idle',
      loginButtonState: 'idle',
      phone: '08163333333',
      password: '123456',
      token: '',
    };

  }



  processRegistration() {

    const { phonenumber } = this.state

    if (phonenumber == "") {
      Alert.alert('Validation failed', 'Phone field cannot be empty', [{ text: 'Okay' }])
      return
    } else {
      if (phonenumber.length == 11) {

      } else {
        Alert.alert('Validation failed', 'Phone number is invalid', [{ text: 'Okay' }])
      }

    }

    this.setState({ regButtonState: 'busy' })
    var phone = "+234" + phonenumber.substr(phonenumber.length - 10);

    const userDetails = { phonenumber: phone }
    // this.props.navigation.navigate('Otp',
    //           {
    //             userDetails: userDetails,
    //           })

    // console.warn(userDetails);


    fetch(baseUrl() + '/api/UserOtp/Send', {
      method: 'POST', headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }, body: JSON.stringify({
        phone: phone,
      }),
    })
      .then(res => res.json())
      .then(res => {
        console.warn(res);
        if (res.success) {
          this.setState({ regButtonState: 'success' })
          setTimeout(() => {
            this.props.navigation.navigate('Otp',
              {
                userDetails: userDetails,
              })

          }, 2000);
        } else {

          Alert.alert('Operation failed', "Pleas check you details and try again", [{ text: 'Okay' }])
          this.setState({ regButtonState: 'error' })
          setTimeout(() => {
            this.setState({ regButtonState: 'idle' })
          }, 2000);
        }
      }).catch((error) => {
        alert(error.message);
        this.setState({ regButtonState: 'error' })
        setTimeout(() => {
          this.setState({ regButtonState: 'idle' })
        }, 2000);
      });

  }


  processLogin() {

    const { phone, password, token } = this.state

    if (phone == "" || password == "") {
      Alert.alert('Validation failed', 'Userdetails field cannot be empty', [{ text: 'Okay' }])
      return
    }

    if (phone.length == 11) {

    } else {
      Alert.alert('Validation failed', 'Phone number is invalid', [{ text: 'Okay' }])
      return
    }

    var phone_main = "234" + phone.substr(phone.length - 10);

var req= {
  phone: phone_main,
  password: password,
  //mobile_token: token
}
    console.warn(req)
    this.setState({ loginButtonState: 'busy' })

    fetch(baseUrl() + '/api/Auth/Authenticate', {
      method: 'POST', headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }, body: JSON.stringify(req),
    })
      .then(res => res.json())
      .then(res => {
        console.warn(res)
        // if (res.status) {
        //   AsyncStorage.setItem('auth', res.token);
        //   AsyncStorage.setItem('rem', "login");
        //   this.setState({ loginButtonState: 'success' })
        //   this.props.navigation.navigate('Home')
        // } else {
        //   Alert.alert('Operation failed', "Pleas check you details and try again", [{ text: 'Okay' }])
        //   this.setState({ loginButtonState: 'error' })
        //   setTimeout(() => {
        //     this.setState({ loginButtonState: 'idle' })
        //   }, 2000);
        // }
      }).catch((error) => {
        alert(error.message);
        this.setState({ loginButtonState: 'error' })
        setTimeout(() => {
          this.setState({ loginButtonState: 'idle' })
        }, 2000);
      });
  }

  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content" translucent hidden={false} backgroundColor="transparent" />
        <Content contentContainerStyle={styles.contentstyles}>

          <Swiper style={styles.wrapper}
            showsPagination={false}
            loop={false}
          >



            <ImageBackground source={bgtwo} style={styles.background}>
              <View style={styles.main}>

                <View style={styles.formArea}>
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={styles.image}
                      source={require('../../assets/iconfive.png')}
                      resizeMode='contain'
                    />
                  </View>

                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>Sign In</Text>
                  </View>
                  <View style={styles.card} >
                    <Text style={styles.subTitle}>Enter log in details</Text>
                    <TextInput
                      placeholder="phone"
                      placeholderTextColor='#00000050'
                      returnKeyType="next"
                      maxLength={11}
                      onSubmitEditing={() => this.passwordInput.focus()}
                      keyboardType="numeric"
                      autoCapitalize="none"
                      style={styles.input}
                      inlineImageLeft='ios-call'
                      onChangeText={text => this.setState({ phone: text })}
                    />

                    <TextInput
                      placeholder="password"
                      placeholderTextColor='#00000050'
                      returnKeyType="next"
                      onSubmitEditing={() => this.passwordInput.focus()}
                      keyboardType='password'
                      secureTextEntry
                      autoCapitalize="none"
                      style={styles.passinput}
                      inlineImageLeft='ios-call'
                      onChangeText={text => this.setState({ password: text })}
                    />

                    {this.state.loginButtonState == 'busy' ?
                      <Button style={styles.buttonContainer} block iconLeft>
                        <SkypeIndicator color='white' />
                      </Button>
                      : this.state.loginButtonState == 'success' ?
                        <Button style={styles.successButtonContainer} block iconLeft>
                          <Icon name="check" size={30} type='antdesign' color='#fff' />
                        </Button>
                        :
                        this.state.loginButtonState == 'error' ?
                          <Button style={styles.errorButtonContainer} block iconLeft>
                            <Icon name="check" size={30} type='antdesign' color='#fff' />
                          </Button>
                          :
                          <Button onPress={() => this.processLogin()} style={styles.buttonContainer} block iconLeft>
                            <Text style={{ color: '#fdfdfd', fontWeight: '700' }}>ENTER</Text>
                          </Button>}




                    <View style={{ flexDirection: 'row', marginTop: 10, marginHorizontal: 30 }}>
                      <View style={{ flexDirection: 'row', flex: 1 }}>
                        <View style={{
                          height: 20,
                          width: 20,
                          borderColor: '#E6E6E6',
                          borderWidth: 1,
                          marginRight: 10,
                          borderRadius: 1,
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}>
                          <Icon name="ios-checkbox" size={22} type='ionicon' color='#394FA1' />
                        </View>
                        <Text style={{ fontSize: 12 }}>Remember password </Text>
                      </View>
                      <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
                        <Text style={{ fontSize: 12 }}> Forgot password </Text>
                      </View>
                    </View>
                  



                  </View>

                  <Text style={{ fontSize: 14, color:'#fff', marginBottom:15, marginLeft: 20 }}>Swipe Left to Register</Text>

                </View>


              </View>


            </ImageBackground>

            <ImageBackground source={bgone} style={styles.background}>
              <View style={{ flex: 1, justifyContent: 'center', }}>

                <View style={{ flex: 1, }}>
                  <View style={{ height: 30 }}></View>
                  <View style={{ height: 30, paddingLeft: 20, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <Icon name="left" size={30} type='antdesign' color='#fff' />
                  </View>
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>Register</Text>
                  </View>
                  <View style={styles.card} >

                    <View style={{ height: 30 }}></View>
                    <Text style={[styles.subTitle, { fontSize: 16, }]}>Enter your Number</Text>
                    <Text style={{ marginRight: 13, fontSize: 14, color: '#6C7395', textAlign: 'left', marginLeft: 30, marginBottom: 20 }}>Enter phone number</Text>
                    <TextInput
                      placeholder="081123456789"
                      maxLength={11}
                      placeholderTextColor='#00000050'
                      returnKeyType="next"
                      onSubmitEditing={() => this.processRegistration()}
                      keyboardType="numeric"
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={styles.input}
                      inlineImageLeft='ios-call'
                      onChangeText={text => this.setState({ phonenumber: text })}
                    />

                    {this.state.regButtonState == 'busy' ?
                      <Button style={styles.buttonContainer} block iconLeft>
                        <SkypeIndicator color='white' />
                      </Button>
                      : this.state.regButtonState == 'success' ?
                        <Button style={styles.successButtonContainer} block iconLeft>
                          <Icon name="check" size={30} type='antdesign' color='#fff' />
                        </Button>
                        : this.state.regButtonState == 'error' ?
                          <Button style={styles.errorButtonContainer} block iconLeft>
                            <Icon name="close" size={30} type='antdesign' color='#fff' />
                          </Button>
                          :
                          <Button onPress={() => this.processRegistration()} style={styles.buttonContainer} block iconLeft>
                            <Text style={{ color: '#fdfdfd', fontWeight: '700' }}>ENTER</Text>
                          </Button>}

                    <View style={{ height: 10 }}></View>

                  </View>

                </View>
                <View style={{ alignItems: 'center', }}>
                  <Text style={{ fontSize: 14, color: '#fff', textAlign: 'left', marginBottom: 10 }}>1 of 4</Text>
                </View>
                <View style={styles.instructions}>
                  <View style={{ marginHorizontal: 50, flexDirection: 'row' }}>
                    <View style={{ height: 6, backgroundColor: '#FFFFFF', flex: 1, marginHorizontal: 2, borderRadius: 3 }} />
                    <View style={{ height: 6, backgroundColor: '#FFFFFF30', flex: 1, marginHorizontal: 2, borderRadius: 3 }} />
                    <View style={{ height: 6, backgroundColor: '#FFFFFF30', flex: 1, marginHorizontal: 2, borderRadius: 3 }} />
                    <View style={{ height: 6, backgroundColor: '#FFFFFF30', flex: 1, marginHorizontal: 2, borderRadius: 3 }} />
                  </View>
                </View>
              </View>
            </ImageBackground>


          </Swiper>
        </Content>

      </Container>

    );
  }


}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  wrapper: {

  },
  background: {
    flex: 1,
    height: Dimensions.get("window").height,
    backgroundColor: "rgba(0,0,0,0.1)",
    justifyContent: 'center',

  },
  contentstyles: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  formArea: {
    flex: 1,
    justifyContent: 'center',
  },
  slideArea: {
    justifyContent: 'center',
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  card: {
    width: Dimensions.get("window").width - 40,
    justifyContent: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 20,
    paddingBottom: 20,
    paddingTop: 20,
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#3E3E3E',
    color: '#3E3E3E',
    marginTop: 10,
    borderRadius: 20,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
    paddingLeft: 20,
    borderColor: '#E6E6E6',
    borderWidth: 1
  },
  passinput: {
    height: 50,
    borderColor: '#3E3E3E',
    color: '#3E3E3E',
    marginTop: 19,
    borderRadius: 20,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
    paddingLeft: 20,
    borderColor: '#E6E6E6',
    borderWidth: 1
  },
  titleContainer: {
    marginLeft: 40,
    marginBottom: 10,
    marginTop: 1,
  },
  title: {
    marginTop: 27,
    marginBottom: 10,
    fontSize: 20,
    color: '#FFF',
    textAlign: 'left',
    fontWeight: '800'
  },
  subTitle: {
    marginRight: 13,
    fontSize: 14,
    color: '#324152',
    textAlign: 'left',
    fontWeight: '700',
    marginLeft: 30,
  },
  buttonContainer: {
    backgroundColor: "#1A4093",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30,
    borderRadius: 20,
  },
  loginButtonContainer: {
    backgroundColor: "#1A4093",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30,
    marginBottom: 30,
    borderRadius: 20,
  },
  successButtonContainer: {
    backgroundColor: "#5889c7",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 40,
    borderRadius: 20,
  },
  errorButtonContainer: {
    backgroundColor: "#e60a13",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 40,
    borderRadius: 20,
  },
  inputContainer: {
    flexDirection: "row",
    marginTop: 3,
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  lineStyle: {
    height: 0.5,
    flex: 1,
    marginTop: 20,
    backgroundColor: '#000000',
  },
  socialContainer: {
    flexDirection: "row",
    marginTop: 1,
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  image: {
    height: 170,
    width: Dimensions.get('window').width,
    justifyContent: 'center'
  },
  instructions: {
    marginBottom: 20,
  },
  instructionTitle: {
    marginTop: 27,
    marginBottom: 2,
    fontSize: 15,
    color: '#FFF',
    textAlign: 'left',
    fontWeight: '800',
    marginLeft: 40,
    marginRight: 40,
  },
  instructionSubTitle: {
    marginRight: 13,
    fontSize: 12,
    color: '#FFF',
    textAlign: 'left',
    fontWeight: '300',
    marginLeft: 30,
    marginLeft: 40,
    marginRight: 40,
  },

})



