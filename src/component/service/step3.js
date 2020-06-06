import React, { Component } from "react";
import { View, Alert, StyleSheet, NativeModules, Image, AsyncStorage, Dimensions, ImageBackground, TextInput, TouchableOpacity } from "react-native";
import { Container, Content, Text, Button, Left, Right, Toast, Title, List, Item, Thumbnail, Grid, Col } from 'native-base';
import { Card, Icon, SocialIcon } from 'react-native-elements'
const URL = require("../../component/server");
var ImagePicker = NativeModules.ImageCropPicker;
import Navbar from '../utilities/Navbar';
import color from '../utilities/color';

import {
  SkypeIndicator,
} from 'react-native-indicators';
import { object } from "prop-types";


class Step3 extends Component {

  constructor(props) {
    super(props);
    this.onEventPress = this.onEventPress.bind(this)

    this.state = {
      loading: false,
      data: '',
      auth: '',
      img_url: null,
      image: null,
      done: false,
      buttonState: 'idle',
      name: '',
      description: '',
      location: '',
    };
  }




  componentDidMount() {
    AsyncStorage.getItem('auth').then((value) => {
      if (value == '') {

      } else {
        this.setState({ auth: value })
      }

    })
   
    const { getState } = this.props;
    const state = getState();

    this.setState({
        name: state.name,
        description: state.description,
        location: state.location,
        subsection_data: state.subsection_data,
       

    })

  }

  onEventPress() {
    console.warn('dkdndkdkdkddkdkd')
   
}


  pickSingle(cropit, circular = false, mediaType) {
    ImagePicker.openPicker({
      width: 500,
      height: 300,
      cropping: cropit,
      cropperCircleOverlay: circular,
      sortOrder: 'none',
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      includeExif: true,
    }).then(image => {
      console.log('received image', image);
      this.setState({
        image: { uri: image.path, width: image.width, height: image.height, mime: image.mime, size: image.size },
      });

     this.uploadPhoto();
    }).catch(e => {
      console.log(e);
      Alert.alert(e.message ? e.message : e);
    });
  }


  uploadPhoto = () => {


    const { image, auth } = this.state


    if (image == null) {
      Alert.alert('Validation failed', 'Select atleast a picture and enter name', [{ text: 'Okay' }])
      return
    }

    Toast.show({
      text: 'uploading picture... !',
      position: 'bottom',
      type: 'warning',
      buttonText: 'Dismiss',
      duration: 2500
  });
    const datab = new FormData();

    datab.append('name', {
      uri: image.uri,
      type: image.mime,
      name: 'ayo.jpg',
      size: image.size,
    });
    datab.append('type', 'pp');
    datab.append('Content-Type', image.mime);

    //build payload packet
    var postData = {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + auth,
      },
      body: datab,
    }

console.warn(postData);

    return fetch(URL.url + '/api/upload_image', postData)
      .then((response) => response.json())
      .then((responseJson) => {
        if (!responseJson.status) {
        this.setState({
          img_url: 'http://api.bluekola.com' + responseJson.image_url,
      });

      console.warn('responseJson',  'http://api.bluekola.com' + responseJson.image_url);
      Toast.show({
          text: 'Picture uploaded sucessfully !',
          position: 'bottom',
          type: 'success',
          buttonText: 'Dismiss',
          duration: 2500
      });
    }else{
      Alert.alert('Upload failed', "Upload failed please try again later" [{ text: 'Okay' }])
    }
      })
      .catch((error) => {
        alert(error.message);
        console.warn(error);

      });

  }


  async processCreateServices() {


  /*  const { auth, image, name,img_url,  description, location, subsection_data} = this.state
  

    if (image == null ) {
      Alert.alert('Validation failed', 'Please select and image for the organizer', [{ text: 'Okay' }])
      return;
    }else{
      if (img_url == null ) {
        Toast.show({
          text: 'Please wait forimage to upload !',
          position: 'bottom',
          type: 'error',
          buttonText: 'Dismiss',
          duration: 2500
      });
        return;
      }
    }


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
                  this.props.navigation.navigate('Home');
                }, 2000);
              
            } else {
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

*/
}


  render() {
    const { navigate } = this.props;
    var left = (
      <Left style={{ flex: 1 }}>
        <Button transparent onPress={this.props.back}>
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
      </Right>
    );


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

    if (this.state.done) {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center' }}
        >
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image
              style={styles.logo}
              resizeMode='contain'
              source={require('../../assets/checked.png')}
            />
            <Text style={styles.title}>Congratulations</Text>
            <Text style={styles.description}>You have successfully created a new service </Text>
            <Button style={styles.doneButtonContainer} block iconLeft>
              <Text style={{ color: '#fdfdfd', fontWeight: '700' }}>ENTER</Text>
            </Button>
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
            <Button  block iconLeft>
               <Text>LOL</Text>
                </Button>
              <View style={styles.pageHeading}>
                <Text style={styles.title}>Upload Image </Text>
                <Text style={styles.description}>Put up an image that best describes the service
you are willing to offer  </Text>
              </View>
              <View style={styles.form}>
                <Text style={styles.label}>Enter Service name </Text>

                {this.state.image == null ?
                  <ImageBackground
                    style={styles.pictureContainer}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                      <Button style={{ alignItems: 'center' }} transparent onPress={() => this.pickSingle(true)}>
                        <Icon
                          active
                          name="camera"
                          type='feather'
                          color='#000'
                          size={40}
                        />
                      </Button>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                      <Text style={{ fontSize: 14, color: '#000', textAlign: 'center' }}>Add Event Poster/Image </Text>

                    </View>
                  </ImageBackground>
                  :
                  <ImageBackground
                    opacity={this.state.img_url != null ? 1 : 0.5}
                    source={this.state.img_url != null ? { uri: this.state.img_url } : this.state.image}
                    style={[styles.pictureContainer, { backgroundColor: "#000" }]}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                      <Button style={{ alignItems: 'center' }} transparent onPress={() => this.pickSingle(true)}>
                        <Icon
                          active
                          name="camera"
                          type='feather'
                          color='#000'
                          size={40}
                        />
                      </Button>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                      <Text style={{ fontSize: 14, color: '#000', textAlign: 'center' }}>Add Event Poster/Image </Text>

                    </View>
                  </ImageBackground>
                }

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
        </Content>
      </Container>

    );
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
    marginRight: 25
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
    marginTop: 20,
    marginLeft: 25,
    marginRight: 25
  },
  label: {
    color: color.dark_blue,
    fontFamily: "Poppins-Medium",
    fontSize: 13,
    marginTop: 15,
  },


  buttonContainer: {
    backgroundColor: "#749AD1",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
  doneButtonContainer: {
    backgroundColor: "#17153D",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    borderRadius: 20,
    marginBottom: 20,
    marginTop: 20
  },
  successButtonContainer: {
    backgroundColor: "#0be61a",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    borderRadius: 20,
    marginBottom: 20,
  },

  pictureContainer: {
    height: Dimensions.get('window').height / 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8d96a6',
    margin: 10,
    borderRadius: 15
  },
  logo: {
    width: 160,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30


  }



});


export default Step3 
