import React, { Component } from "react";
import { Image, Dimensions, TextInput, StyleSheet, AsyncStorage, Alert, ImageBackground, Platform, ActivityIndicator, TouchableOpacity } from "react-native";
import {
  Container,
  Content,
  Text,
  Item,
  Input,
  Button,
  View,
 
} from "native-base";
import {  Icon} from 'react-native-elements'
const URL = require("../../component/server");
import {
  SkypeIndicator,
} from 'react-native-indicators';
import Swiper from 'react-native-swiper';


const bg = require('../../assets/bgthree.png');
const logo = require('../../assets/logo.png');
import { Actions } from 'react-native-router-flux';
import { getFmc } from '../../component/utilities/index';

export default class Username extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userDetails: {},
      username: '',
      name: '',
      buttonState: 'idle',
      token: ''
    };

  }



 async componentDidMount() {

    const { userDetails  } = this.props.route.params;
    this.setState({
      userDetails: userDetails
    })

    this.setState({ token: await getFmc() })

    }

    replaceScreen = () => {
      const { userDetails } = this.state
      this.props.navigation.navigate('Home');
   /*   this.props.navigation.dispatch({
        key: 'Home',
        type: 'ReplaceCurrentScreen',
        routeName: 'Home',
        params: { },
      });  */
    };


  processRegistration() {
    const { username,token, name,userDetails} = this.state
  console.warn(username, name,userDetails)
    if (username == "" || name == "") {
      Alert.alert('Validation failed', ' Fields cannot be empty', [{ text: 'Okay' }])
      return
    }

     this.setState({ buttonState: 'busy' })
    fetch(URL.url + '/api/register', {
      method: 'POST', headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }, body: JSON.stringify({
        name: name,
        email: userDetails.email,
        password: userDetails.password,
        phone:userDetails.phone,
        username:username,
        mobile_token: token
      }),
    })
      .then(res => res.json())
      .then(res => {
        if (res.status) {
            AsyncStorage.setItem('auth', res.token);
            AsyncStorage.setItem('rem', "login");
            this.setState({ buttonState: 'success' })
            this.replaceScreen() 
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

              <TouchableOpacity onPress={() => this.props.navigation.goBack(null)} style={styles.arrowContainer}>
              <Icon
                name="arrowleft"
                size={30}
                type='antdesign'
                color= '#fff'
              />
              </TouchableOpacity>
                <View style={styles.card} >
                <View style={styles.titleContainer}>
                    <Text style={styles.title}> Create Username and Fullname </Text>
                  </View>
                    <Text style={styles.subTitle}> Enter username and fullname</Text>
                  <TextInput
                    placeholder="Username"
                    placeholderTextColor='#00000050'
                    returnKeyType="next"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                    inlineImageLeft='ios-call'
                    onChangeText={text => this.setState({ username: text })}
                  />

                   <TextInput
                    placeholder="Full name"
                    placeholderTextColor='#00000050'
                    returnKeyType="next"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                    inlineImageLeft='ios-call'
                    onChangeText={text => this.setState({ name: text })}
                   />

                  {this.state.buttonState =='busy' ?  
                  <Button style={styles.buttonContainer} block iconLeft>
                   <SkypeIndicator color='white' />  
                  </Button>               
                  : this.state.buttonState =='success' ?    
                   <Button style={styles.successButtonContainer} block iconLeft>
                  <Icon  name="check" size={30}  type='antdesign'  color= '#fff' />
                  </Button> 
                  : this.state.buttonState =='error' ?    
                  <Button style={styles.errorButtonContainer} block iconLeft>
                 <Icon  name="close" size={30}  type='antdesign'  color= '#fff' />
                 </Button> 
                 : 
                  <Button onPress={() => this.processRegistration()} style={styles.buttonContainer} block iconLeft>
                 <Text style={{ color: '#fdfdfd', fontWeight: '700' }}>ENTER</Text>
                 </Button>     }

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
    justifyContent: 'center',
  },
  slideArea: {
    justifyContent: 'center',
  },
  main: {
    flex: 1,
    justifyContent: 'center',
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
    paddingLeft:20
  },
  titleContainer: {
    marginLeft: 30,
    marginBottom: 10,
    marginTop: 1,
  },
  title: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 16,
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
  errorButtonContainer: {
    backgroundColor: "#e60a13",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 40,
    borderRadius: 20,
  },
  arrowContainer: {
    flexDirection: "row",
    marginBottom: 15,
    justifyContent:'flex-start',
    marginLeft: 40,
    marginRight: 20,
  },
 
})