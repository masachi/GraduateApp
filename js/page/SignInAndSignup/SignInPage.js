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
    AsyncStorage,
    ToastAndroid
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
import {initStorage} from '../../util/storage'
import Toast from 'react-native-root-toast';

export default class SignInPage extends Component {
    constructor(props) {
        super(props);
        this.handleBack = this._handleBack.bind(this);
        this.state = {
            username: '1304010330',
            password: '',
        }
    }

    _handleBack() {
        this._passInput.blur();
        this._userInput.blur();
        if(this.state.password !== '' && this.state.username !== '') {
            var url = 'http://182.254.152.66:18080/graduate/login';
            let body = 'username=' + this.state.username + '&' + 'password=' + this.state.password;
            fetch(url, {
                timeout: 10000,
                method: 'POST',
                mode: 'cors',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: body
            }).then((response) => response.json())
                .then((result) => {
                    //alert(result);
                    if (result.code === 200) {
                        Toast.show('登录成功', {
                            duration: 3000,
                            position: Toast.positions.BOTTOM,
                            shadow: true,
                            animation: true,
                            hideOnPress: true,
                            delay: 0,
                        });
                        global.username = this.state.username;
                        const navigator = this.props.navigator;
                        if (navigator) {
                            navigator.push({
                                component: MainPage,
                            });
                        }
                    }
                    else {
                        if(result.message === null){
                            Toast.show('Server Error', {
                                duration: 3000,
                                position: Toast.positions.BOTTOM,
                                shadow: true,
                                animation: true,
                                hideOnPress: true,
                                delay: 0,
                            });
                        }
                        else {
                            Toast.show(result.message, {
                                duration: 3000,
                                position: Toast.positions.BOTTOM,
                                shadow: true,
                                animation: true,
                                hideOnPress: true,
                                delay: 0,
                            });
                        }
                    }
                });
        }
        else{
            Toast.show('用户名或者密码未填写', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
            });
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
                           source={require('../../image/icon.png')}/>
                </View>
                <View style={styles.editGroup}>
                    <View style={styles.editView1}>
                        <TextInput
                            ref={(text) => this._userInput = text}
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
                            ref={(text) => this._passInput = text}
                            style={styles.edit}
                            underlineColorAndroid="transparent"
                            placeholder="密码"
                            placeholderTextColor="#c4c4c4"
                            secureTextEntry={true}
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