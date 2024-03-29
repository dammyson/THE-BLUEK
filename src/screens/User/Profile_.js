import React from 'react';
import { StyleSheet, Dimensions, Text, Alert, ScrollView, AsyncStorage, View, TouchableOpacity, StatusBar } from 'react-native';
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


import ListPanel from '../../component/utilities/ListPanel'

import { Icon as Fine, Avatar } from 'react-native-elements';
const URL = require("../../component/server");
import {
    SkypeIndicator,
} from 'react-native-indicators';

import { getToken } from '../../component/utilities/index';
export default class Profile extends React.Component {

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-person" style={{ color: tintColor }} />
        )
    }

    constructor(props) {
        super(props)
        this.state = {
            activeIndex: 0,
            loading: false,
            auth: "",
            bio: {},
            services: [],
            reviews: [],
            favourites: [],
            gallery: []
        }
    }


    componentDidMount() {
    //    this.makeRemoteRequest()  
    //     this.props.navigation.addListener(
    //         'didFocus',
    //         payload => {
    //          this.makeRemoteRequest();
    //         }
    //       ); 
    }

    makeRemoteRequest = async() => {
        const { auth } = this.state
        this.setState({ loading: true });
        fetch(URL.url + '/api/service/provider/profile', {
            method: 'GET', headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer ' +await getToken(),
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(res => {
                console.warn(res);
                this.setState({ loading: false, bio: res.data.bio, services: res.data.services, reviews: res.data.reviews, favourites: res.data.favourites, gallery: res.data.gallery })
            })
            .catch(error => {
                alert(error.message);
                this.setState({ loading: false })
            });
    };


    checkBvn = async () => {

        this.setState({ loading: true });
        fetch(URL.url + '/api/services/check_bvn', {
            method: 'GET', headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer ' + await getToken(),
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(res => {
                this.setState({ loading: false });
                if (res.status) {
                    this.props.navigation.navigate('CreateService')
                }else{
                    Alert.alert('Operation Failed', res.message, [{ text: 'Okay' }])
                }
            })
            .catch(error => {
                alert(error.message);
                this.setState({ loading: false })
            });
    };

    segmentClicked = (index) => {
        this.setState({
            activeIndex: index
        })
    }

    renderSectionOne = () => {
        return images.map((image, index) => {
            return (
                <View key={index} style={[{ width: (width) / 3 }, { height: (width) / 3 }, { marginBottom: 2 }, index % 3 !== 0 ? { paddingLeft: 2 } : { paddingLeft: 0 }]}>
                    <Image style={{ flex: 1, width: undefined, height: undefined }} source={image} />
                </View>
            )
        })

    }

    _renderGridList(data) {
        return (
            <ListPanel>

            </ListPanel>
        )
    }
    renderSection = () => {
        const { services, reviews, gallery, favourites, } = this.state
        if (this.state.activeIndex == 0) {
            return (
                <View>
                    <View style={{ justifyContent: 'flex-end', alignItems: 'center', marginTop: 10, }} >
                        <TouchableOpacity onPress={() => this.checkBvn()} style={styles.nextButtonContainer} block iconLeft>
                            <Fine
                                active
                                name="plus"
                                type='entypo'
                                color='#fff'

                            />
                            <Text style={styles.nextButtonText}>Add New Service </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        {this.renderResuts(services)}
                    </View>
                </View >
            )
        }
        else if (this.state.activeIndex == 1) {
            return (
                <View>
                    <ScrollView>
                        {this._renderGridList(gallery)}
                    </ScrollView>

                </View>
            )
        }
        else if (this.state.activeIndex == 2) {
            return (
                <View>
                    {this.renderReviews(services)}
                </View>
            )
        } else if (this.state.activeIndex == 3) {
            return (
                <View>
                    <View>
                        {this.renderResuts(services)}
                    </View>

                </View >
            )
        }
    }
    render() {
        const { bio } = this.state
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
                <StatusBar backgroundColor="red" />
                <View style={styles.container}>

                    <View style={styles.header}>
                        <View style={styles.item}>
                            <Avatar
                                rounded
                                size="large"
                                overlayContainerStyle={{ backgroundColor: 'white', borderColor: "#749AD1", borderWidth: 5 }}
                                source={bio.image_url != null || bio.image_url != '' ? { uri: bio.image_url } : { uri: "https://ipsumimage.appspot.com/640x360" }}
                            />

                        </View>
                        <View style={styles.titleContainer}>
                            <Text style={{ color: '#000', fontWeight: '700', fontSize: 20, marginLeft: 10 }}>{bio.name}</Text>
                        </View>


                        <View style={styles.row}>

                            <View style={styles.rowchild}>
                                <Fine
                                    active
                                    name="scissors"
                                    type='entypo'
                                    color='#707070'

                                />

                                <Text style={styles.performance}>{bio.unsatisfied}</Text>
                                <Text style={styles.performanceTitle}>Unsatisfied</Text>


                            </View>
                            <View style={styles.rowchild}>

                                <Fine
                                    active
                                    name="tie"
                                    type='material-community'
                                    color='#707070'

                                />

                                <Text style={styles.performance}>{bio.satisfied}</Text>
                                <Text style={styles.performanceTitle}>Satisfied</Text>



                            </View>
                            <View style={styles.rowchild}>


                                <Fine
                                    active
                                    name="briefcase"
                                    type='font-awesome'
                                    color='#707070'

                                />

                                <Text style={styles.performance}>{bio.work_experiences}</Text>
                                <Text style={styles.performanceTitle}>Experiences</Text>


                            </View>
                        </View>


                        <View style={{}}>
                            <Text style={{ color: '#000', textAlign: 'center', fontWeight: '200', fontSize: 12, marginTop: 15, marginLeft: 15, marginRight: 15 }}> The cooperative movement began in Europe in the 19th century, primarily in Britain and France as a self-help Victoria Island, Lagos</Text>
                        </View>

                        <TouchableOpacity onPress={()=>  this.props.navigation.navigate('Settings')} style={styles.buttonContainer} block iconLeft>
                            <Text style={{ color: '#fdfdfd', fontWeight: '700' }}>Edit profile</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', borderTopWidth: 1, borderTopColor: '#eae5e5', backgroundColor: "#fff", paddingBottom: 3, paddingTop: 3 }}>


                        <TouchableOpacity style={{ alignItems: 'center' }}
                            onPress={() => this.segmentClicked(0)}
                            active={this.state.activeIndex == 0}
                        >
                            <Fine
                                active
                                name="server"
                                type='font-awesome'
                                color={this.state.activeIndex == 0 ? '#394fa1' : 'gray'}

                            />
                            <Text style={[styles.tabText, this.state.activeIndex == 0 ? { color: '#394fa1' } : { color: 'gray' }]}>Services</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ alignItems: 'center' }}
                            onPress={() => this.segmentClicked(1)}
                            active={this.state.activeIndex == 1}
                        >
                            <Fine
                                name="collections"
                                type='material-icon'
                                color={this.state.activeIndex == 1 ? '#394fa1' : 'gray'}

                            />
                            <Text style={[styles.tabText, this.state.activeIndex == 1 ? { color: '#394fa1' } : { color: 'gray' }]}>Gallery</Text>
                        </TouchableOpacity>


                        <TouchableOpacity style={{ alignItems: 'center' }}
                            onPress={() => this.segmentClicked(2)}
                            active={this.state.activeIndex == 2}
                        >
                            <Fine

                                name="thumbs-up"
                                type='font-awesome'
                                color={this.state.activeIndex == 2 ? '#394fa1' : 'gray'}

                            />
                            <Text style={[styles.tabText, this.state.activeIndex == 2 ? { color: '#394fa1' } : { color: 'gray' }]}>Reviews</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ alignItems: 'center' }}
                            onPress={() => this.segmentClicked(3)}
                            active={this.state.activeIndex == 3}
                        >
                            <Fine

                                name="heart"
                                type='antdesign'
                                color={this.state.activeIndex == 3 ? '#394fa1' : 'gray'}

                            />
                            <Text style={[styles.tabText, this.state.activeIndex == 3 ? { color: '#394fa1' } : { color: 'gray' }]}>Favorite</Text>
                        </TouchableOpacity>


                    </View>

                </View>
                <Content style={styles.contentcontainer}>
                    <View>
                        {this.renderSection()}
                    </View>
                </Content>
            </Container>
        );
    }
    renderResuts(categories) {
        let cat = [];
        const { navigate } = this.props.navigation;
        for (var i = 0; i < categories.length; i++) {
            let id = categories[i].id;
            cat.push(
                <View style={styles.resultBox}>

                    <TouchableOpacity onPress={() => navigate('ServieDetails',
                        { id: id })} style={styles.loacationText}>

                        <View style={styles.resultDescription}>
                            <View style={styles.resultImage}>
                                <Avatar
                                    rounded
                                    size="medium"
                                    source={{
                                        uri: categories[i].image_url,
                                    }}
                                />
                            </View>
                            <View style={styles.resultTextDescription}>
                                <Text style={{ color: '#000', fontWeight: '700', fontSize: 14, marginLeft: 10 }}>{id}  {categories[i].short_brief}</Text>
                                <Text style={{ color: '#000', fontWeight: '200', fontSize: 12, marginLeft: 10 }}>{categories[i].description}</Text>
                            </View>

                        </View>
                    </TouchableOpacity>
                </View >
            );
        }
        return cat;
    }


    renderReviews(categories) {
        let cat = [];
        for (var i = 0; i < categories.length; i++) {
            cat.push(
                <View style={styles.resultBox}>

                    <TouchableOpacity style={styles.loacationText}>

                        <View style={styles.resultDescription}>
                            <View style={styles.resultImage}>
                                <Avatar
                                    rounded
                                    size="medium"
                                    source={{
                                        uri:
                                            'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                                    }}
                                />
                            </View>
                            <View style={styles.resultTextDescription}>
                                <Text style={{ color: '#000', fontWeight: '700', fontSize: 14, marginLeft: 10 }}>Sweet Fire</Text>
                                <Text style={{ color: '#000', fontWeight: '200', fontSize: 12, marginLeft: 10 }}>{categories[i].description}</Text>
                            </View>

                        </View>
                    </TouchableOpacity>
                </View >
            );
        }
        return cat;
    }

    _pressSeeAllProducts() {
        this.props.navigation.navigate('ServieDetails');
    }
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
    },
    header: {
        backgroundColor: '#fff',
        paddingBottom: 10,
        alignItems: 'center',
        paddingTop: 15,
    },
    item: {
        flexDirection: 'row',
        margin: 5,
        alignItems: 'center',
        paddingRight: 15
    },
    menu: {
        marginRight: 13,
        marginLeft: 13,
        fontSize: 13,
        fontWeight: '300',
        color: '#ffffff',
        textAlign: 'left',
    },
    titleContainer: {
        alignItems: 'center',
        marginBottom: 5,
        marginTop: 5,

    },
    row: {
        flexDirection: "row",
    },
    rowchild: {
        margin: 5,
        marginLeft: 20,
        alignItems: 'center',
    },
    performance: {
        color: '#000',
        fontWeight: '700',
        fontSize: 20,
        marginLeft: 10
    },

    performanceTitle: {
        color: '#000',
        fontWeight: '200',
        fontSize: 12,
        marginLeft: 10
    },

    tabText: {
        fontWeight: '800',
        fontSize: 12,
    },

    loacationText: {
        flex: 1,
    },
    locationButton: {

    },

    buttonContainer: {
        backgroundColor: "#17153d",
        marginLeft: 3,
        marginRight: 10,
        borderRadius: 25,
        paddingTop: 5,
        paddingBottom: 5,
        padding: 20,
        paddingLeft: 20,
        marginTop: 10,
        marginBottom: 10,
    },

    resultBox: {
        flex: 1,
        marginRight: 13,
        marginLeft: 13,
        borderRadius: 20,
        marginBottom: 15,
        marginTop: 15,
        backgroundColor: '#fff',
        padding: 10
    },
    resultDescription: {
        flexDirection: 'row',
        marginBottom: 5,
        marginTop: 5,
    },
    resultImage: {

    },
    resultTextDescription: {
        flex: 1
    },
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
    circle: {
        backgroundColor: '#394fa1',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 7,
        paddingBottom: 7,
        borderRadius: 25,
        marginLeft: 5,
        marginRight: 5,


    },
    segmentConatainer: {
        flex: 1,
        flexDirection: 'row',
    },
    resultButtonContainer: {
        backgroundColor: "#749AD1",
        marginLeft: 3,
        marginRight: 1,
        borderRadius: 25,
        paddingTop: 3,
        paddingBottom: 3,
        paddingRight: 10,
        paddingLeft: 10
    },
    nextButtonContainer: {
        backgroundColor: "#749AD1",
        borderRadius: 20,
        flexDirection: 'row',
        paddingLeft: 12,
        alignItems: 'center'


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

})