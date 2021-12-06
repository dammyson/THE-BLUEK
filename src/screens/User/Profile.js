import React from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  Alert,
  Image,
  AsyncStorage,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {
  Icon,
  Container,
  Content,
  Thumbnail,
  Header,
  Left,
  Right,
  Body,
  Button,
  Col,
} from 'native-base';

import ListPanel from '../../component/utilities/ListPanel';

import {Icon as Fine, Avatar} from 'react-native-elements';
const URL = require('../../component/server');
import {SkypeIndicator} from 'react-native-indicators';

import {getToken} from '../../component/utilities/index';
import Navbar from '../../component/view/Navbar';
import {getUser} from '../../utilities';
export default class Profile extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon name="ios-person" style={{color: tintColor}} />
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      loading: false,
      auth: '',
      bio: {},
      services: [],
      reviews: [],
      favourites: [],
      gallery: [],
    };
  }

  async componentDidMount() {
    console.warn(JSON.parse(await getUser()));
    this.setState({bio: JSON.parse(await getUser())});
    //    this.makeRemoteRequest()
    //     this.props.navigation.addListener(
    //         'didFocus',
    //         payload => {
    //          this.makeRemoteRequest();
    //         }
    //       );
  }

  makeRemoteRequest = async () => {
    const {auth} = this.state;
    this.setState({loading: true});
    fetch(URL.url + '/api/service/provider/profile', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + (await getToken()),
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.warn(res);
        this.setState({
          loading: false,
          bio: res.data.bio,
          services: res.data.services,
          reviews: res.data.reviews,
          favourites: res.data.favourites,
          gallery: res.data.gallery,
        });
      })
      .catch((error) => {
        alert(error.message);
        this.setState({loading: false});
      });
  };

  checkBvn = async () => {
    this.setState({loading: true});
    fetch(URL.url + '/api/services/check_bvn', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + (await getToken()),
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({loading: false});
        if (res.status) {
          this.props.navigation.navigate('CreateService');
        } else {
          Alert.alert('Operation Failed', res.message, [{text: 'Okay'}]);
        }
      })
      .catch((error) => {
        alert(error.message);
        this.setState({loading: false});
      });
  };

  segmentClicked = (index) => {
    this.setState({
      activeIndex: index,
    });
  };


  logOut() {
    this.setState({ visible_log_merchant: false })
    try {
        AsyncStorage.clear();
        setTimeout(() => {
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'Splash' }],
            });
        }, 1000);

        return true;
    }
    catch (exception) {
        return false;
    }

}

  renderSectionOne = () => {
    return images.map((image, index) => {
      return (
        <View
          key={index}
          style={[
            {width: width / 3},
            {height: width / 3},
            {marginBottom: 2},
            index % 3 !== 0 ? {paddingLeft: 2} : {paddingLeft: 0},
          ]}>
          <Image
            style={{flex: 1, width: undefined, height: undefined}}
            source={image}
          />
        </View>
      );
    });
  };

  render() {
    const {bio} = this.state;
    var right = (
       
            <TouchableOpacity onPress={()=> this.logOut()} transparent>
                 <Text style={[{color:"#5889C7",   fontFamily: 'Poppins-Bold',}]}>{'Log out'}</Text>
            </TouchableOpacity>
       
    );
    if (this.state.loading) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
          }}>
          <View
            style={{
              height: 90,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <SkypeIndicator count={5} color="#1A4093" />
            <Text
              style={{
                fontSize: 13,
                fontWeight: '500',
                flex: 1,
                color: '#1A4093',
              }}>
              Please wait...
            </Text>
          </View>
        </View>
      );
    }
    return (
      <Container style={{backgroundColor: '#F9FAFC'}}>
        <Navbar right={right}  title="Profile" bg="#fff" />

        <Content style={styles.contentcontainer}>
          <View style={styles.container}>
            <View style={styles.header}>
              <View style={styles.row}>
                <Image
                  source={{
                    uri:
                      'https://c1.staticflickr.com/8/7014/6712827125_4e1e474737_b.jpg',
                  }}
                  style={styles.cardImage}
                />

                <View style={styles.rowchild}>
                  <Text style={styles.performance}>{'80'}</Text>
                  <Text style={styles.performanceTitle}>Jobs done</Text>
                </View>
                <View style={styles.rowchild}>
                  <Text style={styles.performance}>{'98'}</Text>
                  <Text style={styles.performanceTitle}>Favorites</Text>
                </View>
              </View>
            </View>

            <View style={{marginTop: 20}}>
              <View style={styles.item}>
                <Text style={styles.placeholder}>{'Full Name '}</Text>
                <Text style={styles.inputText}>
                  {bio.firstName} {bio.lastName}
                </Text>
              </View>

              <View style={styles.item}>
                <Text style={styles.placeholder}>{'Phone number  '}</Text>
                <Text style={styles.inputText}>
                   {bio.phone}
                </Text>
              </View>


              <View style={styles.item}>
                <Text style={styles.placeholder}>{'E-mail Address'}</Text>
                <Text style={styles.inputText}>
                  {'@yahoo.com'}
                </Text>
              </View>

              <View style={styles.item}>
                <Text style={styles.placeholder}>{'Address  '}</Text>
                <Text style={styles.inputText}>
                {'50 ologbosere street, Ikeja, Maryland.'}
                </Text>
              </View>



              <View style={styles.altitem}>
                  <View>
                <Text style={styles.placeholder}>{'Address  '}</Text>
                <Text style={styles.inputText}>
                {'********'}
                </Text>
                </View>
                <View style={{flex:1, justifyContent:'center', alignItems:'flex-end'}}>
                <Text style={[styles.placeholder, {color:"#5889C7",   fontFamily: 'Poppins-Bold',}]}>{'Change Password'}</Text>
                </View>
              </View>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
  },

  header: {
    paddingBottom: 10,

    paddingTop: 15,
  },
  item: {
    margin: 5,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#AEB1BE',
    paddingLeft: 15,
    marginTop:15
  },
  placeholder: {
    marginTop: 5,
    marginRight: 13,
    marginLeft: 13,
    fontSize: 13,
    fontWeight: '300',
    color: '#AEB1BE',
    textAlign: 'left',
  },
  inputText: {
    marginRight: 13,
    marginLeft: 13,
    fontSize: 13,
    fontWeight: '300',
    color: '#324152',
    textAlign: 'left',
    fontFamily: 'Poppins-Medium',
    marginBottom: 5,
  },
  altitem: {
    margin: 5,
    backgroundColor: '#EDEEF0',
    marginHorizontal: 20,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#AEB1BE',
    paddingLeft: 15,
    marginTop:15,
    flexDirection: 'row',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 5,

  },
  row: {
    marginHorizontal: 20,
    flexDirection: 'row',
  },
  rowchild: {
    margin: 5,
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  performance: {
    color: '#324152',
    fontWeight: '700',
    fontSize: 20,
    marginLeft: 10,
  },

  performanceTitle: {
    color: '#AEB1BE',
    fontWeight: '200',
    fontSize: 12,
    marginLeft: 10,
  },

  tabText: {
    fontWeight: '800',
    fontSize: 12,
  },

  loacationText: {
    flex: 1,
  },
  locationButton: {},

  resultActiom: {
    alignItems: 'center',
    flexDirection: 'row',
    margin: 5,
  },
  iconText: {
    flexDirection: 'row',
    marginLeft: 5,
    marginRight: 5,
  },

  segmentConatainer: {
    flex: 1,
    flexDirection: 'row',
  },

  cardImage: {
    height: '100%',
    borderWidth: 1,
    height: 100,
    width: 100,
    borderRadius: 90,
  },
});
