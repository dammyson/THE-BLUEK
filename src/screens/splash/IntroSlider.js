
import React, { Component } from 'react';

import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, ImageBackground } from 'react-native';

import Swiper from 'react-native-swiper';
import { Actions } from 'react-native-router-flux';

export default class IntroSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
  }
  render() {
    return (
      <ImageBackground
        source={require('../../assets/bgtwo.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >

        <Swiper style={styles.wrapper} dot={<View style={{ backgroundColor: '#749ad1', width: 10, height: 10, borderRadius: 5, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />}
          activeDot={<View style={{ backgroundColor: '#2e2a79', width: 10, height: 10, borderRadius: 5, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3 }} />}
          paginationStyle={{
            bottom: Dimensions.get('window').height / 2
          }}
          loop={false}
          index={this.state.index}
          ref={(swiper) => { this.swiper = swiper; }}
          onIndexChanged={(index) => this.onIndexChanged(index)}
          bounces={true}>
          {this.renderServices()}
        </Swiper>

      </ImageBackground>
    );
  }


  renderServices() {
    let cat = [];
    for (var i = 0; i < categories.length; i++) {
      const link = categories[i]
      cat.push(

        <View style={styles.slide1}>

          <View style={styles.slidetop}>
            <Image
              style={styles.logo}
              resizeMode='contain'
              source={categories[i].image}
            />
          </View>

          <View style={styles.slidebases}>
            <Text style={styles.headText}>{categories[i].title}</Text>
            <Text style={styles.text}>{categories[i].text}</Text>

            <TouchableOpacity onPress={() => this.onBottonClick(link)} style={styles.buttonContainer}>
              <Text style={styles.buttonText}
              >{categories[i].key}</Text>

            </TouchableOpacity>
          </View>

        </View>
      );
    }
    return cat;
  }

  onBottonClick(value) {
    console.warn(value)
    if (value.key == "Next") {
      this.onSkip()
    } else {
      this.props.navigation.navigate('Authentication')
    }
    // 

  }

  onIndexChanged(ind) {

    this.setState({ index: ind })
  }
  onSkip() {

    if (this.state.index > 1) {
      return
    } else {
      this.swiper.scrollBy(1, true);

    }

  }

}




var categories = [
  {
    key: 'Next',
    title: 'Welcome to Bluekola',
    text: 'Find the Best Professional Service Providers around you in a few Clicks',
    image: require('../../assets/iconfour.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 'Next',
    title: 'Barbers, Photographers, Electrician, Make-up, Plumbers, Mechanics, etc',
    text: 'Search, browse and hire  Blue-Collar workers around you on Bluekola.',
    image: require('../../assets/icontwo.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 'Sign in',
    title: 'Showcase your skills and services',
    text: 'Upload your services and start getting jobs from interested customers around you.!',
    image: require('../../assets/iconthree.png'),
    backgroundColor: '#febe29',
  }
];
const styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  slidetop: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',

  },
  backgroundImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  slidebases: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',


  },

  text: {
    color: '#2e2a79',
    fontSize: 13,
    fontWeight: '400',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 25,
    marginRight: 25,
    textAlign: 'center',
  },
  headText: {
    color: '#2e2a79',
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 25,
    marginRight: 25,
    textAlign: 'center',
    marginBottom: 20
  },
  buttonContainer: {
    height: 50,
    backgroundColor: "#2e2a79",
    borderRadius: 30,
    alignItems: 'center',
    width: 300,
    marginLeft: 25,
    marginRight: 25,
    justifyContent: 'center',
    marginTop: 35,

  },
  buttonText: {
    textAlign: 'center',
    color: "#fff",
    fontWeight: '900'
  },
  logo: {
    width: 280,
    height: 280,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20

  }
})