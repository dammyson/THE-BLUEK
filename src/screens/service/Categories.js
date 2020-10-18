import React, { Component } from "react";
import { View, Alert, StyleSheet, AsyncStorage, Dimensions, TextInput, TouchableOpacity } from "react-native";
import { Container, Content, Text, Button, Left, Right, Body, Title, List, Item, Thumbnail, Grid, Col } from 'native-base';
import { Card, Icon, SocialIcon } from 'react-native-elements'
import {
    SelectMultipleButton,
    SelectMultipleGroupButton
} from "react-native-selectmultiple-button";
import _ from "lodash";
const URL = require("../../component/server");
import Navbar from '../../component/utilities/Navbar';
import color from '../../component/utilities/color';
import {
    SkypeIndicator,
} from 'react-native-indicators';

import { getToken } from '../../component/utilities/index';


export default class CreateService extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            location: '',
            multipleSelectedData: [],
            multipleSelectedDataLimited: [],
            multipleData: [],

        };
    }




    async componentDidMount() {
        this.loadCategories();
    }

    loadCategories = async () => {

        this.setState({ loading: true });
        fetch(URL.url + '/api/categories', {
            method: 'GET', headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer ' + await getToken(),
                'Content-Type': 'application/json',
            }
        })

            .then(res => res.json())
            .then(res => {
                console.warn(res)
                if (res.status) {
                    this.setState({
                        multipleData: this.pluck(res.data, 'name'),
                        dataone: res.data,
                        loading: false
                    })
                } else {
                    this.setState({
                        nodate: true,
                        loading: false
                    })
                }
            })
            .catch(error => {
                alert(error.message);
                this.setState({ loading: false })
            });
    };

    pluck(arr, key) {
        return arr.reduce(function (p, v) {
            return p.concat(v[key]);
        }, []);
    }



    async processAddCategory() {

        this.setState({ loading: true })
        const { data, dataone,description, multipleSelectedData} = this.state
       var serverarray=[];

        for (let i = 0; i < multipleSelectedData.length; i++) {
            serverarray.push(
                dataone[this.state.dataone.map(function(e) { 
                    return e.name; 
                }).indexOf(multipleSelectedData[i])].id

            )
        }
          fetch(URL.url + '/api/categories/user/add', {
              method: 'POST', headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                  'Authorization': 'Bearer ' + await getToken(),
              }, body: JSON.stringify({
                 categories: serverarray,
                 others: description,
              }),
          })
              .then(res => res.json())
              .then(res => {
                this.setState({ loading: false })
                  if (res.status) {
                    this.props.navigation.navigate('Profile');
                  } else {
                    this.setState({ buttonState: 'error' })
                      Alert.alert('Registration failed', res.message, [{ text: 'Okay' }])
                    
                  }
              }).catch((error) => {
                  console.warn(error);
                  this.setState({ loading: false })
                  
              });
    
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
                <TouchableOpacity onPress={()=> this.processAddCategory()} style={styles.nextButtonContainer} block iconLeft>
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
            <Container style={{ backgroundColor: '#fff' }}>
                <Navbar left={left} right={right} title='Profile' bg='#fff' />
                <Content>
                    <View style={styles.backgroundImage}>
                        <View style={{ flex: 1 }}>
                            <View style={styles.pageHeading}>
                                <Text style={styles.title}>Choose Your Professions </Text>
                            </View>
                            <View style={styles.form}>
                                <View style={styles.multipleContainer}>
                                    {this.state.multipleData.map(interest => (
                                        <SelectMultipleButton
                                            key={interest}
                                            buttonViewStyle={{
                                                borderRadius: 25,
                                                height: 40,
                                            }}
                                            textStyle={{
                                                fontSize: 14,
                                                margin: 20
                                            }}
                                            highLightStyle={{
                                                borderColor: color.light_blue,
                                                backgroundColor: "transparent",
                                                textColor: color.light_blue,
                                                borderTintColor: color.light_blue,
                                                backgroundTintColor: color.light_blue,
                                                textTintColor: color.white
                                            }}
                                            value={interest}
                                            selected={this.state.multipleSelectedData.includes(interest)}
                                            singleTap={valueTap =>
                                                this._singleTapMultipleSelectedButtons(interest)
                                            }
                                        />
                                    ))}
                                </View>


                                <View style={styles.inputView}>
                                    <TextInput
                                        placeholder="Enter yours"
                                        placeholderTextColor={color.light_blue}
                                        returnKeyType="next"
                                        onSubmitEditing={() => this.decriptionInput.focus()}
                                        keyboardType='email-address'
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        inlineImageLeft='ios-call'
                                        style={{ flex: 1, fontFamily: 'Poppins-Light' }}
                                        onChangeText={text => this.setState({ description: text })}

                                    />


                                </View>
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

    _singleTapMultipleSelectedButtons(interest) {

        if (this.state.multipleSelectedData.includes(interest)) {
            _.remove(this.state.multipleSelectedData, ele => {
                return ele === interest;
            });

        } else {
            this.state.multipleSelectedData.push(interest);
        }
        this.setState({
            multipleSelectedData: this.state.multipleSelectedData
        });
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
        fontWeight: '700'
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
    inputView: {
        height: 45,
        flexDirection: 'row',
        color: color.primary_color,
        backgroundColor: "#d1d1d1",
        fontSize: 14,
        marginTop: 15,
        marginBottom: 10,
        paddingLeft: 10,
        justifyContent: 'center',
        borderRadius: 25

    },
    textAreaContainer: {
        padding: 5,
        paddingLeft: 12,
        marginBottom: 3,
        marginTop: 5,
        backgroundColor: '#d1d1d1',
        borderRadius: 25
    },
    textArea: {
        height: 100,
        fontFamily: 'Poppins-Light',
        justifyContent: "flex-start"
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
    multipleContainer: {
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "center",
        flex: 6,
    },
    multipleContainer: {
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "center",
        flex: 6,
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

    }


});