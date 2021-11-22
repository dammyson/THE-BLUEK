import React, { Component } from "react";
import { Image, Dimensions, TextInput, StyleSheet, TouchableOpacity, Alert, ImageBackground, Platform, ActivityIndicator } from "react-native";
import {
  Container,
  Content,
  Text,
  Item,
  Input,
  Button,
  View,
} from "native-base";
import {
  SkypeIndicator,
} from 'react-native-indicators';
import Swiper from 'react-native-swiper';
import { Icon } from 'react-native-elements'

const bg = require('../../assets/bgthree.png');
const logo = require('../../assets/logo.png');
import { Actions } from 'react-native-router-flux';
import OTPInputView from '@twotalltotems/react-native-otp-input'

export default class ChangePassOtp extends Component {




  constructor(props) {
    super(props);
    this.state = {
      otp: '',
      userDetails: {},
      loading: true,
      buttonState: 'idle'
    };

  }

  componentDidMount() {

    const { userDetails } = this.props.route.params;
    this.setState({
      userDetails: userDetails
    })



  }


  proccessVerification() {

    const { userDetails, otp } = this.state

    if (otp != 4) {
      Alert.alert('Validation failed', 'Phone number is invalid', [{ text: 'Okay' }])
      return
    } 

    this.setState({ buttonState: 'busy' })
    fetch(baseUrl() + '/api/UserOtp/Validate', {
      method: 'POST', headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }, body: JSON.stringify({
        phone: userDetails.phonenumber,
        otp: otp,
      }),
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          this.setState({ buttonState: 'success' })
          setTimeout(() => {
            this.props.navigation.navigate('Username',
              {
                userDetails: userDetails,
              })
          }, 2000);
        } else {

          Alert.alert('Login failed', "Check your email and password and try again", [{ text: 'Okay' }])

          this.setState({ regButtonState: 'error' })
          setTimeout(() => {
            this.setState({ regButtonState: 'idle' })
          }, 2000);
        }
      }).catch((error) => {
        console.log("Api call error");
        alert(error.message);
        this.setState({ regButtonState: 'error' })
        setTimeout(() => {
          this.setState({ regButtonState: 'idle' })
        }, 2000);
      });

  }

  render() {
    const { userDetails } = this.state
    return (
      <Container>
        <ImageBackground source={bg} style={styles.background}>
          <Content contentContainerStyle={styles.contentstyles}>

            <Swiper style={styles.wrapper}>

              <ImageBackground source={bg} style={styles.background}>

                <View style={{ flex: 1, justifyContent: 'center', }}>

                  <View style={{ flex: 1, }}>

                    <View style={{ height: 30 }}></View>
                    <View style={{ height: 30, paddingLeft: 20, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack(null)} >
                      <Icon name="left" size={30} type='antdesign' color='#fff' />
                      </TouchableOpacity>
                    </View>

                    <View style={{ height: 60 }}></View>

                    <View style={{ flex: 1, }}>


                      <View style={styles.card} >
                        <View style={styles.titleContainer}>
                          <Text style={styles.title}>Verify your Number</Text>
                        </View>


                        <Text style={styles.subTitle}>A one time password has been sent to your mobile device ( {userDetails.phonenumber} ). Enter the code to verify your number</Text>
                        <View style={styles.otpContainer}>

                          <OTPInputView
                            style={{ width: '80%', height: 60 }}
                            pinCount={4}

                            autoFocusOnLoad
                            codeInputFieldStyle={styles.underlineStyleBase}
                            codeInputHighlightStyle={styles.underlineStyleHighLighted}
                            onCodeFilled={(code => {
                              this.setState({ otp: code })
                            })}
                          />
                        </View>


                        {this.state.buttonState == 'busy' ?
                          <Button style={styles.buttonContainer} block iconLeft>
                            <SkypeIndicator color='white' />
                          </Button>
                          : this.state.buttonState == 'success' ?
                            <Button onPress={() => this.logIn()} style={styles.successButtonContainer} block iconLeft>
                              <Icon name="check" size={30} type='antdesign' color='#fff' />
                            </Button>
                            : this.state.buttonState == 'error' ?
                            <Button style={styles.errorButtonContainer} block iconLeft>
                              <Icon name="close" size={30} type='antdesign' color='#fff' />
                            </Button>
                            :
                            <Button onPress={() => this.proccessVerification()} style={styles.buttonContainer} block iconLeft>
                              <Text style={{ color: '#fdfdfd', fontWeight: '700' }}>ENTER</Text>
                            </Button>}

                      </View>

                    </View>
                    <View style={{  alignItems: 'center',}}>
                    <Text style={{fontSize: 14, color: '#fff', textAlign: 'left', marginBottom: 10 }}>2 of 4</Text>
                  </View>
                    <View style={styles.instructions}>
                      <View style={{ marginHorizontal: 50, flexDirection: 'row' }}>
                        <View style={{ height: 6, backgroundColor: '#FFFFFF30', flex: 1, marginHorizontal: 2, borderRadius: 3 }} />
                        <View style={{ height: 6, backgroundColor: '#FFFFFF', flex: 1, marginHorizontal: 2, borderRadius: 3 }} />
                        <View style={{ height: 6, backgroundColor: '#FFFFFF30', flex: 1, marginHorizontal: 2, borderRadius: 3 }} />
                       
                      </View>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </Swiper>
          </Content>
        </ImageBackground>
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

  },
  slideArea: {
    justifyContent: 'center',
  },
  main: {
    flex: 1,
    justifyContent: 'center',
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
    height: 45,
    borderColor: '#3E3E3E',
    color: '#3E3E3E',
    marginTop: 20,
    borderRadius: 20,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#f1f1f1',
    borderColor: '#ffffff',
  },
  titleContainer: {
    marginLeft: 30,
    marginBottom: 10,
    marginTop: 1,
  },
  title: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 20,
    color: '#000',
    textAlign: 'left',
    fontWeight: '800'
  },
  subTitle: {
    marginRight: 13,
    fontSize: 14,
    color: '#000',
    textAlign: 'left',
    fontWeight: '700',
    marginLeft: 30,
    marginBottom: 20,
  },
  buttonContainer: {
    backgroundColor: "#1A4093",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 40,
    borderRadius: 20,
  },
  successButtonContainer: {
    backgroundColor: "#5889c7",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 40,
    borderRadius: 20,
  },
  arrowContainer: {
    flexDirection: "row",
    marginBottom: 15,
    justifyContent: 'flex-start',
    marginLeft: 40,
    marginRight: 20,
  },
  instructions: {
    marginBottom: 20,
  },
  borderStyleHighLighted: {
    borderColor: "#000",
  },
  underlineStyleBase: {
    width: 45,
    height: 45,
    borderWidth: 1,
    justifyContent: 'center',
    alignContent: 'center',
    margin: 3,
    borderRadius: 30,
    backgroundColor: '#f1f1f1',
    borderColor: "white",
    color: 'black'

  },
  underlineStyleHighLighted: {
    borderColor: "#000",
  },
  otpContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})