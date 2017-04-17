import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    PixelRatio,
    Platform,
    TouchableOpacity,
    Image,
    TextInput,
    BackAndroid,
    AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MainPage from '../MainPage';
import Button from '../../component/Button';
import TextButton from '../../component/TextButton';
import SignUpPage from './SignUpPage';
import ImageButton from '../../component/ImageButtonWithText';
import TextDivider from '../../component/TextDivider';
import px2dp from '../../util/px2dp';
import TabBar from '../../component/TabBar'

export default class SignInPage extends Component {
    constructor(props) {
        super(props);
        this.handleBack = this._handleBack.bind(this);
        this.state = {
            username: '',
            password: '',
        }
    }

    _handleBack() {
        const navigator = this.props.navigator;
        storage.save({
            key: 'loginState',
            rawData: {
                username: this.state.username,
                isLoggedIn: true,
            }
        });
        storage.load({
            key: 'loginState'
        }).then((ret) => {
            console.log("ret.log" + ret.isLoggedIn);
            console.log(ret.username);
        });
        // AsyncStorage.setItem('loginState','true', (error) => {
        //     console.log(error);
        // });
        if (navigator) {
            // navigator.push({
            //     component: MainPage,
            // });
            navigator.pop();
        }

    }

    _signupCallback() {
        this.props.navigator.push({
            component: SignUpPage
        });
    }

    _forgetPassword() {

    }

    render() {
        return (
            <View style={styles.view}>
                <View style={styles.actionBar}>
                </View>
                <View style={styles.logo}>
                    <Image style={{width: px2dp(45), height: px2dp(45)}}
                           source={require('../../image/ic_login_logo.png')}/>
                </View>
                <View style={styles.editGroup}>
                    <View style={styles.editView1}>
                        <TextInput
                            style={styles.edit}
                            underlineColorAndroid="transparent"
                            placeholder="学号"
                            placeholderTextColor="#c4c4c4"
                            onChangeText={(text) => this.setState({username: text})}
                            defaultValue={this.state.username}/>
                    </View>
                    <View style={{height: 1 / PixelRatio.get(), backgroundColor: '#c4c4c4'}}/>
                    <View style={styles.editView2}>
                        <TextInput
                            style={styles.edit}
                            underlineColorAndroid="transparent"
                            placeholder="密码"
                            placeholderTextColor="#c4c4c4"
                            onChangeText={(text) => this.setState({password: text})}
                            defaultValue={this.state.password}/>
                    </View>
                    <View style={{marginTop: px2dp(10)}}>
                        <Button text="登录" onPress={this._handleBack.bind(this)}/>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: 'rgb(22,131,251)'
    },
    actionBar: {
        marginTop: (Platform.OS === 'ios') ? px2dp(10) : 0,
    },
    logo: {
        alignItems: 'center',
        marginTop: px2dp(40)
    },
    edit: {
        height: px2dp(40),
        fontSize: px2dp(13),
        backgroundColor: '#fff',
        paddingLeft: px2dp(15),
        paddingRight: px2dp(15)
    },
    editView1: {
        height: px2dp(48),
        backgroundColor: 'white',
        justifyContent: 'center',
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3
    },
    editView2: {
        height: px2dp(48),
        backgroundColor: 'white',
        justifyContent: 'center',
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3
    },
    editGroup: {
        margin: px2dp(20)
    },
    textButtonLine: {
        marginTop: px2dp(12),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    thirdPartyView: {
        flex: 1,
        marginTop: px2dp(10),
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-around'
    }

});