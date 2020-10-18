import React, { Component } from "react";
import { View, Alert, StyleSheet, NativeModules, Image, AsyncStorage, Dimensions, ImageBackground, TextInput, TouchableOpacity } from "react-native";
import { Container, Content, Text, Button, Left, Right, Toast, Title, List, Item, Thumbnail, Grid, Col } from 'native-base';
import { Card, Icon, SocialIcon } from 'react-native-elements'
const URL = require("../../component/server");
var ImagePicker = NativeModules.ImageCropPicker;
import Navbar from '../../component/utilities/Navbar';
import color from '../../component/utilities/color';

import {
  SkypeIndicator,
} from 'react-native-indicators';
import { object } from "prop-types";


class Step4 extends Component {

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
      cat_id:''
    };
  }




  componentDidMount() {
    AsyncStorage.getItem('auth').then((value) => {
      if (value == '') {

      } else {
        this.setState({ auth: value })
      }

    })
   
   const { Step1, Step2, Step3  } = this.props.route.params;
   console.warn(Step1, Step2, Step3 );
    this.setState({
        name: Step1.name,
        description: Step1.description,
        location: Step1.location,
        subsection_data: Step2,
        cat_id: Step3
    })

  }

  onEventPress() {
    console.warn('dkdndkdkdkddkdkd')
   
}


  pickSingle(cropit, circular = false, mediaType) {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
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
    datab.append('type', 'sp');
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
          img_url: 'http://api.bluekola.com/' + responseJson.image_url,
      });

      console.warn('responseJson',  'http://api.bluekola.com/' + responseJson.image_url);
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


  const { auth, image, cat_id, name,img_url,  description, location, subsection_data} = this.state
  console.warn(  name,  description, location, subsection_data)
 
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
          category_id: cat_id,
          image_url: img_url,
          location: location,
          sub_section: subsection_data,
        }),
    })
        .then(res => res.json())
        .then(res => {
          this.setState({ loading: false })
            console.warn("kaikkk", res);
            if (res.status) {
                this.setState({ buttonState: 'success' })
                setTimeout(() => {
                  this.setState({ done: true })
                  //this.props.navigation.navigate('Profile');
                }, 1000);
              
            } else {
              this.setState({ buttonState: 'idle' })
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


  render() {
    const { state, goBack } = this.props.navigation; 
    var left = (
      <Left style={{ flex: 1 }}>
         <Button transparent  onPress={()=>{ goBack(null)}}>
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
            <Button onPress={()=> this.props.navigation.navigate('Profile') } style={styles.doneButtonContainer} block iconLeft>
              <Text style={{ color: '#fdfdfd', fontWeight: '700' }}>ENTER</Text>
            </Button>
          </View>
        </View>
      );
    }
   
    return (
      <Container style={{ backgroundColor: '#f5f5f5' }}>
        <Navbar left={left} right={right} title={this.state.name} bg='#fff' />
        <Content>
          <View style={styles.backgroundImage}>
            <View style={{ flex: 1 }}>
              <View style={styles.pageHeading}>
                <Text style={styles.title}>Upload Image </Text>
                <Text style={styles.description}>Put up an image that best describes the service
you are willing to offer  </Text>
              </View>
              <View style={styles.form}>
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
                    style={[styles.pictureContainer, { backgroundColor: "#8d96a6" }]}>
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
    height: Dimensions.get('window').width - 120,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8d96a6',
    margin: 20,
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


export default Step4 
