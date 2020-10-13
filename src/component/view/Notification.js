// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, SafeAreaView, AsyncStorage, FlatList, Dimensions, Image, StyleSheet, TouchableOpacity, StatusBar, ImageBackground } from 'react-native';
import { Container, Content, View, Text, Button, Left, Right, Body, Title, List, Item, Thumbnail, Grid, Col } from 'native-base';
import { Avatar, Icon, SocialIcon } from 'react-native-elements'
import Navbar from '../utilities/Navbar';
import { SkypeIndicator, } from 'react-native-indicators';
const URL = require("../../component/server");
import color from '../utilities/color';
import { getToken } from '../utilities/index';

export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [7, 8],
      loading: true,
      auth: '',
      bank_id: '',
      selected_category: 0,
    };
  }


  async componentDidMount() {
      this.loadRequest()

  }

  loadRequest = async () => {
    this.setState({ loading: true });
    fetch(URL.url + '/api/requests', {
      method: 'GET', headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + await getToken(),
        'Content-Type': 'application/json',
      }
    })

      .then(res => res.json())
      .then(res => {
        console.warn(res)
        if (!res.data) {
          Alert.alert('Operation failed', res.message, [{ text: 'Okay' }])
        }

        this.setState({
          items: res.data,
          loading: false,

        });
        this.arrayholder = res.data;
      })
      .catch(error => {
        alert(error.message);
        this.setState({ loading: false })
      });

  };

  render() {
    const { onClose, items } = this.props;
    var left = (
      <Left style={{ flex: 1 }}>
        <Button transparent onPress={() => { onClose() }}>
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
        <TouchableOpacity onPress={this.nextStep} style={styles.nextButtonContainer}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
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

    return (
      <View style={styles.backgroundImage}>
        <Navbar left={left} title='My Activities' bg='#fff' />
        <View style={styles.body}>
          <View style={styles.mainbody}>
            <FlatList
              style={{ paddingBottom: 5 }}
              data={this.state.items}
              renderItem={this.renderItem}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={this.renderSeparator}
              ListHeaderComponent={this.renderHeader}
            />

          </View>
        </View>

      </View>

    );
  }


  _selectBank = (index) => {
    const { onSelect, } = this.props;
    onSelect(index);
  }
  renderItem = ({ item, }) => {
    return (
      <View style={styles.resultBox}>

        <TouchableOpacity onPress={() => navigate('ServieDetails',
          { id: id })} style={styles.loacationText}>
          <View style={styles.resultDescription}>
            <View style={styles.resultImage}>
              <Avatar
                rounded
                size="medium"
                source={{
                  uri: item.image_url,
                }}
              />
            </View>
            <View style={styles.resultTextDescription}>
              <Text style={{ color: color.secondary_color, fontFamily: "Poppins-Bold", fontSize: 12, marginLeft: 10 }}>{item.description}</Text>
              <Text style={{ color: color.secondary_color, fontFamily: "Poppins-Regular", fontSize: 12, marginLeft: 10 }}>{item.short_brief}</Text>
            </View>

            <View style={styles.resultActiom}>
              <Text style={{ color: '#000', fontSize: 10, fontFamily: "Poppins-Light", textAlign: 'right' }}>18/08/2020</Text>
              <TouchableOpacity onPress={this.nextStep} style={styles.resultButtonContainer}>
                <Text style={{ color: '#fff', fontSize: 10, fontFamily: "Poppins-Light" }}>Next</Text>
              </TouchableOpacity>

            </View>

          </View>
        </TouchableOpacity>
      </View >
    )

  }
}


Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: Dimensions.get('window').width,
    position: "absolute",
    height: Dimensions.get('window').height,
  },
  body: {
    flex: 1,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8FF'
  },
  mainbody: {
    width: Dimensions.get('window').width,
    flex: 1,
  },
  resultBox: {
    flex: 1,
    marginRight: 13,
    marginLeft: 13,
    marginBottom: 5,
    marginTop: 5,
    padding: 5,
    borderBottomColor: color.secondary_color,
    borderBottomWidth: 0.5
  },
  resultDescription: {
    flexDirection: 'row',
    marginBottom: 5,
    marginTop: 5,
  },
  resultTextDescription: {
    flex: 2,
    marginLeft: 15
  },
  resultActiom: {
    flex: 1,
    margin: 5,
  },

  resultButtonContainer: {
    backgroundColor: "#749AD1",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    borderRadius: 25,
    paddingRight: 15,
    paddingLeft: 15
  },


});

