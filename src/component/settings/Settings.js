import React, { Component } from "react";
import { View, Alert, StyleSheet, AsyncStorage, Dimensions, TextInput, TouchableOpacity } from "react-native";
import { Container, Content, Text, Button, Left, Right, Body, Title, List, Item, Thumbnail, Grid, Col } from 'native-base';
import { Card, Icon, Avatar } from 'react-native-elements'
import { SkypeIndicator, } from 'react-native-indicators';
import { getToken } from '../utilities/index';
const URL = require("../../component/server");
import Navbar from '../utilities/Navbar';
import color from '../utilities/color';


export default class Settings extends Component {

  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 0,
      loading: false,
      auth: "",
      username:'',
      website:'',
      phone:'',
      email:'',
      social:'',
      bio:'',
      image:''
     
    }
  }


  componentDidMount() {
      this.makeRemoteRequest()   
  }

  makeRemoteRequest = async () => {
    const { auth } = this.state
    this.setState({ loading: true });
    fetch(URL.url + '/api/user', {
      method: 'GET', headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + await getToken(),
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(res => {
        console.warn(res);
        this.setState({ loading: false, 
          bio: res.user, 
          username: res.user.username, 
          website: res.user.username, 
          phone: res.user.phone,
          email: res.user.email,
          social: res.user.username, 
          image: res.user.username, })
      })
      .catch(error => {
        alert(error.message);
        this.setState({ loading: false })
      });
  };


  async processCreateServices() {

    const { username, phone, email, image,  bio, website, social} = this.state
    console.warn(  name,  description, location, subsection_data)
  
  
    this.setState({ buttonState: 'busy' })
      fetch(URL.url + '/api/service/create', {
          method: 'POST', headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              'Authorization': 'Bearer ' + auth,
          }, body: JSON.stringify({
            short_brief: name,
            description: description,
            category_id:"1",
            image_url: img_url,
            location: location,
            sub_section: subsection_data,
          }),
      })
          .then(res => res.json())
          .then(res => {
              console.warn("kaikkk", res);
              if (res.status) {
                  this.setState({ buttonState: 'success' })
                  setTimeout(() => {
                    this.props.navigation.navigate('Profile');
                  }, 2000);
                
              } else {
                this.setState({ buttonState: 'error' })
                  Alert.alert('Registration failed', res.message, [{ text: 'Okay' }])
                
              }
          }).catch((error) => {
              console.warn(error);
             this.setState({ buttonState: 'error' })
          setTimeout(() => {
            this.setState({ buttonState: 'idle' })
          }, 2000);
              alert(error.message);
          });
  
  }
  
  

  nextStep = () => {
    if (this.state.name == "" || this.state.description == "" | this.state.location == "") {
      Alert.alert('Validation failed', "All fields are requried", [{ text: 'Okay' }])
      return
    }
    this.props.navigation.navigate('Step2', {
      otherParam: { name: this.state.name, description: this.state.description, location: this.state.location },
    });
  };


  addSection() {
    const { section_name, min, max } = this.state
    if (section_name == "" || min == "" || max == "") {
      Alert.alert('Validation failed', "All fields are requried", [{ text: 'Okay' }])
      return
    }
    var instant_array = []
    instant_array = this.state.subsection_data
    new_subsection = { name: section_name, min_price: min, max_price: max, }
    instant_array.push(new_subsection);
    this.setState({ subsection_data: instant_array, section_name: '', min: '', max: '' })
  }

  render() {

    const { state, goBack } = this.props.navigation;

    var left = (
      <Left style={{ flex: 1 }}>
        <Button transparent onPress={() => { goBack(null) }}>
          <Icon
            active
            name="arrowleft"
            type='antdesign'
            color={color.black}
          />
        </Button>
      </Left>
    );

    var right = (
      <Right style={{ flex: 1, flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.nextStep} style={styles.nextButtonContainer} block iconLeft>
          <Text style={styles.nextButtonText}>Save</Text>
        </TouchableOpacity>
      </Right>
    );


    const { image } = this.state
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
          <View style={{ height: 90, alignItems: 'center', justifyContent: 'center', }}>
            <SkypeIndicator count={5} color='#1A4093' />
            <Text style={{ fontSize: 13, fontWeight: '500', flex: 1, color: '#1A4093' }}>Please wait...</Text>
          </View>

        </View>
      );
    }

    return (
      <Container style={{ backgroundColor: '#f5f5f5' }}>
        <Navbar left={left} right={right} title='Profile' bg='#fff' />
        <Content>
          <View style={styles.backgroundImage}>

            <View style={{ flex: 1 }}>
              <View style={styles.pageHeading}>
                <View style={styles.item}>
                  <Avatar
                    rounded
                    size="large"
                    overlayContainerStyle={{ backgroundColor: 'black', }}
                    source={this.state.image!= null || this.state.image != '' ? { uri: this.state.image } : { uri: "https://ipsumimage.appspot.com/640x360" }}
                  />

                </View>
                <View style={styles.titleContainer}>
                  <Text style={{ color: '#000', fontFamily: "Poppins-Medium", fontSize: 10, marginLeft: 10 }}>Change profile Picture </Text>
                </View>
              </View>
              <View style={styles.form}>
                <Text style={styles.label}>User Name</Text>
                <View style={styles.inputView}>
                  <TextInput
                    placeholder="Username"
                    defaultValue={this.state.username}
                    placeholderTextColor={color.dark_blue}
                    returnKeyType="next"
                    onSubmitEditing={() => this.decriptionInput.focus()}
                    keyboardType='email-address'
                    autoCapitalize="none"
                    autoCorrect={false}
                    inlineImageLeft='ios-call'
                    style={{ flex: 1, fontFamily: 'Poppins-Light' }}
                    onChangeText={text => this.setState({ username: text })}

                  />
                </View>



                <Text style={styles.label}>Website  </Text>
                <View style={styles.inputView}>
                  <TextInput
                    placeholder="Service location"
                    defaultValue={this.state.website}
                    placeholderTextColor={color.dark_blue}
                    returnKeyType="next"
                    onSubmitEditing={() => this.decriptionInput.focus()}
                    keyboardType='email-address'
                    autoCapitalize="none"
                    autoCorrect={false}
                    inlineImageLeft='ios-call'
                    style={{ flex: 1, fontFamily: 'Poppins-Light' }}
                    onChangeText={text => this.setState({ website: text })}

                  />


                </View>
                <Text style={styles.label}>Social Media Link  </Text>
                <View style={styles.inputView}>
                  <TextInput
                    placeholder="Social Media Link "
                    defaultValue={this.state.social}
                    placeholderTextColor={color.dark_blue}
                    returnKeyType="next"
                    onSubmitEditing={() => this.decriptionInput.focus()}
                    keyboardType='email-address'
                    autoCapitalize="none"
                    autoCorrect={false}
                    inlineImageLeft='ios-call'
                    style={{ flex: 1, fontFamily: 'Poppins-Light' }}
                    onChangeText={text => this.setState({ social: text })}

                  />
                </View>

                <Text style={styles.label}> Phone number  </Text>
                <View style={styles.inputView}>
                  <TextInput
                    placeholder="phone"
                    defaultValue={this.state.phone}
                    placeholderTextColor={color.dark_blue}
                    returnKeyType="next"
                    onSubmitEditing={() => this.decriptionInput.focus()}
                    keyboardType='email-address'
                    autoCapitalize="none"
                    autoCorrect={false}
                    inlineImageLeft='ios-call'
                    style={{ flex: 1, fontFamily: 'Poppins-Light' }}
                    onChangeText={text => this.setState({ phone: text })}

                  />

                </View>
                <Text style={styles.label}>E-mail Address </Text>
                <View style={styles.inputView}>
                  <TextInput
                    placeholder="email"
                    defaultValue={this.state.email}
                    placeholderTextColor={color.dark_blue}
                    returnKeyType="next"
                    onSubmitEditing={() => this.decriptionInput.focus()}
                    keyboardType='email-address'
                    autoCapitalize="none"
                    autoCorrect={false}
                    inlineImageLeft='ios-call'
                    style={{ flex: 1, fontFamily: 'Poppins-Light' }}
                    onChangeText={text => this.setState({ email: text })}

                  />


                </View>


                <Text style={styles.label}>Enter Service  Description  </Text>
                <View style={styles.textAreaContainer} >
                  <TextInput
                    style={styles.textArea}
                    underlineColorAndroid="transparent"
                    defaultValue={this.state.bio}
                    placeholder="Input Notes"
                    placeholderTextColor="black"
                    onSubmitEditing={() => this.SectionnameInput.focus()}
                    numberOfLines={13}
                    multiline={true}
                    onChangeText={text => this.setState({ bio: text })}
                    ref={(input) => this.decriptionInput = input}
                  />

                </View>



                {this.state.buttonState == 'busy' ?
                <Button onPress={()=>  navigate('ServieDetails' , 
                {
                  id: item.id,
                })}  style={styles.buttonContainer} block iconLeft>
                  <SkypeIndicator color='white' />
                </Button>
                : this.state.buttonState == 'success' ?
                  <Button style={styles.successButtonContainer} onPress={()=> this.onEventPress()}  block iconLeft>
                    <Icon name="check" size={30} type='antdesign' color='#fff' />
                  </Button>
                  :
                  <Button style={styles.buttonContainer} block iconLeft onPress={() => this.processCreateServices()}>
                    <Text style={{ color: '#fdfdfd', fontWeight: '700' }}>ENTER</Text>
                  </Button>}



              </View>




            </View>
          </View>
        </Content>
      </Container>

    );
  }
  renderSections(data) {
    let cat = [];
    for (var i = 0; i < data.length; i++) {
      cat.push(
        <View style={styles.subSectionList} >
          <View style={{ flex: 1, justifyContent: 'center', }}>
            <Text style={styles.suSectionName}> {data[i].name} </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
            <Text style={styles.price}>N{data[i].min_price} - </Text>
            <Text style={styles.price}>N{data[i].max_price} </Text>
          </View>
          <TouchableOpacity onPress={() => this.setState({ view_create: false })} style={{ marginLeft: 10, justifyContent: 'center', alignItems: 'center', }}>
            <Icon
              name="close"
              size={20}
              type='antdesign'
              color="red"
            />
          </TouchableOpacity>
        </View>
      );
    }
    return cat;
  }
}

const styles = StyleSheet.create({
  welcome: {
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  },
  pageHeading: {
    flex: 1,
    marginTop: 20,
    marginLeft: 25,
    marginRight: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: color.dark_blue,
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
  },
  description: {
    color: color.dark_blue,
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    marginTop: 10,
  },
  form: {
    flex: 1,
    marginTop: 5,
    marginLeft: 30,
    marginRight: 30
  },
  label: {
    color: color.dark_blue,
    fontFamily: "Poppins-Medium",
    fontSize: 13,
    marginTop: 15,
  },
  inputView: {
    height: 45,
    flexDirection: 'row',
    color: color.primary_color,
    backgroundColor: "#d1d1d1",
    fontSize: 14,
    marginTop: 5,
    marginBottom: 10,
    paddingLeft: 10,
    justifyContent: 'center',
    borderRadius: 25

  },
  textAreaContainer: {
    padding: 5,
    paddingLeft: 12,
    marginBottom: 20,
    marginTop: 5,
    backgroundColor: '#d1d1d1',
    borderRadius: 25,
  },
  textArea: {
    height: 100,
    fontFamily: 'Poppins-Light',
    justifyContent: "flex-start",
   
  },
  subContainer: {
    padding: 5,
    paddingLeft: 12,
    marginBottom: 30,
    marginTop: 5,
    backgroundColor: '#d1d1d1',
    borderRadius: 25
  },
  whiteInputView: {
    height: 45,
    paddingLeft: 12,
    flexDirection: 'row',
    color: color.primary_color,
    backgroundColor: "#fff",
    fontSize: 14,
    marginTop: 5,
    marginBottom: 10,
    paddingLeft: 10,
    justifyContent: 'center',
    borderRadius: 25,
    marginRight: 20,
    marginLeft: 20

  },
  subLabel: {
    color: "#333333",
    fontFamily: "Poppins-Medium",
    fontSize: 13,
    marginTop: 15,
    marginRight: 20,
    marginLeft: 20
  },
  buttonContainer: {
    backgroundColor: "#1A4093",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
  successButtonContainer: {
    backgroundColor: "#5889c7",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
  subSectionList: {
    height: 50,
    flexDirection: 'row',
    borderColor: '#394FA1',
    marginTop: 5,
    marginBottom: 10,
    paddingLeft: 10,
    justifyContent: 'center',
    borderRadius: 25,
    paddingRight: 10,
    borderWidth: 0.6


  },
  suSectionName: {
    color: "#333333",
    fontFamily: "Poppins-Medium",
    fontSize: 13,

  },
  price: {
    color: "#394FA1",
    fontFamily: "Poppins-Medium",
    fontSize: 12,

  },
  nextButtonContainer: {
    backgroundColor: "#749AD1",
    borderRadius: 20,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 13,
    marginTop: 5,
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 5,
    fontFamily: "Poppins-Bold",

  },
  item: {
    flexDirection: 'row',
    margin: 5,
    alignItems: 'center',
    paddingRight: 15
  },


});