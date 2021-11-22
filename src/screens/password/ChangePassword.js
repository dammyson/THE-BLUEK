import React, { Component } from "react";
import { Image, Dimensions, TextInput, StyleSheet, AsyncStorage, Alert, ImageBackground, TouchableOpacity, ActivityIndicator } from "react-native";
import {
  Container,
  Content,
  Text,
  Item,
  Input,
  Button,
  View,

} from "native-base";
import { Icon } from 'react-native-elements'
const URL = require("../../component/server");
import {
  SkypeIndicator,
} from 'react-native-indicators';
import Swiper from 'react-native-swiper';


const bg = require('../../assets/bgthree.png');
const logo = require('../../assets/logo.png');
import { Actions } from 'react-native-router-flux';
import { baseUrl } from "../../utilities";


export default class ChangePassword extends Component {


  constructor(props) {
    super(props);
    this.state = {
      userDetails: {},
      password: '',
      confirm_password: '',
      buttonState: 'idle',
      phone: ''
    };

  }

  componentDidMount() {

    const { userDetails  } = this.props.route.params;
    console.warn(userDetails);
    this.setState({
      userDetails: userDetails
    })


  }




  login() {

    const { email, confirm_password, password, phone } = this.state
    if (email == "" || password == "" || confirm_password == "") {

      Alert.alert('Validation failed', ' Fields cannot be empty', [{ text: 'Okay' }])
      return

    } else {


      if (password.length > 5) {
        if (password == confirm_password) {
          this.proccessRegistration(password)
        } else {
          Alert.alert('Validation failed', 'Password are not the same please enter them again', [{ text: 'Okay' }]);
          return
        }
      } else {
        Alert.alert('Validation failed', 'Password must be morethan 5 character', [{ text: 'Okay' }]);
        return
      }
    }
  }

  proccessRegistration(password){
    const {userDetails} = this.state
      userDetails["password"] = password


      console.warn(userDetails)



      this.setState({ buttonState: 'busy' })
      fetch(baseUrl()+ '/api/Auth/Register', {
        method: 'POST', headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }, body: JSON.stringify(userDetails),
      })
        .then(res => res.json())
        .then(res => {
          if (res.success) {
              this.setState({ buttonState: 'success' })
              setTimeout(() => {
                this.props.navigation.reset({
                  index: 0,
                  routes: [{ name: 'Authentication' }],
              });
              }, 2000);
          } else {
              this.setState({ buttonState: 'error' })
             Alert.alert('Login failed', res.message, [{ text: 'Okay' }])
            setTimeout(() => {
              this.setState({ buttonState: 'idle' })
            }, 2000);
  
          }
        }).catch((error) => {
          alert(error.message);
          this.setState({ buttonState: 'error' })
          setTimeout(() => {
            this.setState({ buttonState: 'idle' })
          }, 2000);
        });

  }


  render() {
    return (
      <Container>
        <ImageBackground source={bg} style={styles.background}>
          <Content contentContainerStyle={styles.contentstyles}>

            <Swiper style={styles.wrapper}>

              <View style={styles.main}>

                <View style={styles.formArea}>
                  <View style={{ height: 30 }}></View>
                  <View style={{ height: 30, paddingLeft: 20, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack(null)} >
                      <Icon name="left" size={30} type='antdesign' color='#fff' />
                    </TouchableOpacity>
                  </View>
                  <View style={{ height: 30 }}></View>

                  <View style={styles.arrowContainer}>
                  </View>
                  <View style={styles.card} >
                    <View style={{ height: 30 }}></View>
                    <Text style={[styles.subTitle, { fontSize: 16, }]}>Create New Password</Text>
                    <Text style={{ marginRight: 13, fontSize: 14, color: '#6C7395', textAlign: 'left', marginLeft: 30, marginBottom: 20 }}>Enter and password</Text>
                    <TextInput
                      placeholder="Password"
                      placeholderTextColor='#00000050'
                      returnKeyType="next"
                      onSubmitEditing={() => this.passwordConfirmInput.focus()}
                      keyboardType='password'
                      secureTextEntry
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={styles.input}
                      inlineImageLeft='ios-call'
                      ref={(input) => this.passwordInput = input}
                      onChangeText={text => this.setState({ password: text })}
                    />



                    <TextInput
                      placeholder="Confirm Password"
                      placeholderTextColor='#00000050'
                      returnKeyType="next"
                      onSubmitEditing={() => this.login()}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      secureTextEntry
                      autoCorrect={false}
                      style={styles.input}
                      inlineImageLeft='ios-call'
                      onChangeText={text => this.setState({ confirm_password: text })}
                      ref={(input) => this.passwordConfirmInput = input}
                    />

                    {this.state.buttonState == 'busy' ?
                      <Button style={styles.buttonContainer} block iconLeft>
                        <SkypeIndicator color='white' />
                      </Button>
                      : this.state.buttonState == 'success' ?
                        <Button style={styles.successButtonContainer} block iconLeft>
                          <Icon name="check" size={30} type='antdesign' color='#fff' />
                        </Button>
                        :
                        <Button onPress={() => this.login()} style={styles.buttonContainer} block iconLeft>
                          <Text style={{ color: '#fdfdfd', fontWeight: '700' }}>ENTER</Text>
                        </Button>}

                    <View style={{ height: 10 }}></View>

                  </View>

                </View>
                <View style={{  alignItems: 'center',}}>
                    <Text style={{fontSize: 14, color: '#fff', textAlign: 'left', marginBottom: 10 }}>4 of 4</Text>
                  </View>

                <View style={styles.instructions}>
                 
                  <View style={{ marginHorizontal: 50, flexDirection: 'row' }}>
                    <View style={{ height: 6, backgroundColor: '#FFFFFF30', flex: 1, marginHorizontal: 2, borderRadius: 3 }} />
                    <View style={{ height: 6, backgroundColor: '#FFFFFF30', flex: 1, marginHorizontal: 2, borderRadius: 3 }} />
                    <View style={{ height: 6, backgroundColor: '#FFFFFF30', flex: 1, marginHorizontal: 2, borderRadius: 3 }} />
                    <View style={{ height: 6, backgroundColor: '#FFFFFF', flex: 1, marginHorizontal: 2, borderRadius: 3 }} />
                  </View>
                </View>
              </View>

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
  },
  card: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    marginLeft: 40,
    marginRight: 40,
    borderRadius: 20,
    paddingBottom: 40,
    paddingTop: 20
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
    paddingLeft: 20
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
    color: '#324152',
    textAlign: 'left',
    fontWeight: '700',
    marginLeft: 30,
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
  instructions: {
    marginBottom: 20,
  },

})