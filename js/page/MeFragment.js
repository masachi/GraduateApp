'use strict';

import React, {Component, PropTypes} from 'react';
import {Text, View, StyleSheet, Platform, Button, PixelRatio, TouchableNativeFeedback, TouchableOpacity, ToastAndroid, Alert, AlertIOS} from 'react-native';
import px2dp from '../util/px2dp';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../config/theme';
import Avatar from '../component/Avatar';
import TextButton from '../component/TextButton';
import SettingPage from './SettingPage';
import IndividualPage from './IndividualPage';
import SignInPage from './SignInAndSignup/SignInPage';
import CalendarPage from './CalendarFragment';
import SelfInfo from './SelfInfo';

export default class MeFragment extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            data: new Object()
        };
        this._fetchData = this._fetchData.bind(this);
    }


    componentDidMount() {
        this._fetchData();
    }

    _fetchData(){
        var url = 'http://182.254.152.66:10080/api.php?id=user&method=profile';
        let body = 'username=' + global.username;
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
                    this.setState({data: result.data[0]});
                    this.setState({username: result.data[0].name})
                }
            })
    }

    _onPressCallback(position){
       switch(position){
           case 0:  //title
               this.props.navigator.push({
                   component: SelfInfo,
                   params:{
                       data: this.state.data,
                   }
               });
               break;

           case 1:  // add occupation
               this._alert();
               break;

           case 2:  //collection
               this._alert();
               break;

           case 3:  //read articles
               this._alert();
               break;

           case 4:  //tags
               this._alert();
               break;

           case 5:  //rank
               this._alert();
               break;

           case 6: {  //setting
               this.props.navigator.push({
                   component: SettingPage
               });
               break;
           }
           case 7:{
               this.props.navigator.push({
                   component: CalendarPage
               });
               break;
           }
       }
    }

    _onSignOut(){
        this.props.navigator.pop();
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.actionBar}>
                    <Text style={{color: theme.actionBar.fontColor, fontSize: theme.actionBar.fontSize}}>我</Text>
                </View>
                {Platform.OS === 'android' ?
                    <TouchableNativeFeedback onPress={this._onPressCallback.bind(this, 0)}>
                        <View style={styles.intro}>
                            <Avatar image={require('../image/profile_default.png')} size={px2dp(55)} textSize={px2dp(20)}/>
                            <View style={{marginLeft: px2dp(12)}}>
                                <Text style={{color: theme.text.color, fontSize: px2dp(20)}}>{this.state.username}</Text>
                            </View>
                            <View style={{flex: 1, flexDirection:'row', justifyContent: 'flex-end'}}>
                                <Icon name="ios-arrow-forward" color="#ccc" size={px2dp(30)}/>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                    :
                    <TouchableOpacity onPress={this._onPressCallback.bind(this, 0)} activeOpacity={theme.btnActiveOpacity}>
                        <View style={styles.intro}>
                            <Avatar image={require('../image/logo_og.png')} size={px2dp(55)} textSize={px2dp(20)}/>
                            <View style={{marginLeft: px2dp(12)}}>
                                <Text style={{color: theme.text.color, fontSize: px2dp(20)}}>{this.state.username}</Text>
                            </View>
                            <View style={{flex: 1, flexDirection:'row', justifyContent: 'flex-end'}}>
                                <Icon name="ios-arrow-forward" color="#ccc" size={px2dp(30)}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                }
                <View style={styles.list}>
                    <Item icon="md-settings" text="设置" onPress={this._onPressCallback.bind(this, 6)}/>
                </View>
                <View style={styles.list}>
                    { Platform.OS === 'android' ?
                        <TouchableNativeFeedback onPress={this._onSignOut.bind(this)}>
                            <View style={[styles.listItem, {justifyContent: 'center'}]} >
                                <Text style={{color: 'red', fontSize: px2dp(15)}}>退出登录</Text>
                            </View>
                        </TouchableNativeFeedback>
                        :
                        <TouchableOpacity activeOpacity={theme.btnActiveOpacity} onPress={this._onSignOut.bind(this)}>
                            <View style={[styles.listItem, {justifyContent: 'center'}]} >
                                <Text style={{color: 'red', fontSize: px2dp(15)}}>退出登录</Text>
                            </View>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        );
    }

    _alert(){
        if(Platform.OS === 'android') {
            Alert.alert(
                'Message',
                "This function currently isn't available",
                [{text: 'OK', onPress: () => {}}]
            );
        }else if(Platform.OS === 'ios'){
            AlertIOS.alert(
                'Message',
                "This function currently isn't available",
                [{text: 'OK', onPress: () => {}}]
            );
        }
    }
}

class Item extends Component{
    static propTypes = {
        icon: PropTypes.string.isRequired,
        iconColor: PropTypes.string,
        text: PropTypes.string.isRequired,
        subText: PropTypes.string,
        onPress: PropTypes.func
    };

    static defaultProps = {
        iconColor: 'gray'
    };

    render(){
        const {icon, iconColor, text, subText, onPress} = this.props;

        if(Platform.OS === 'android'){
            return(
                <TouchableNativeFeedback onPress={onPress}>
                    <View style={styles.listItem}>
                        <Icon name={icon} size={px2dp(22)} color={iconColor}/>
                        <Text style={{color: 'black', fontSize: px2dp(15), marginLeft: px2dp(20)}}>{text}</Text>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <Text style={{color: "#ccc"}}>{subText}</Text>
                        </View>
                    </View>
                </TouchableNativeFeedback>
            );
        }else if(Platform.OS === 'ios'){
            return(
                <TouchableOpacity onPress={onPress} activeOpacity={theme.btnActiveOpacity}>
                    <View style={styles.listItem}>
                        <Icon name={icon} size={px2dp(22)} color={iconColor}/>
                        <Text style={{color: 'black', fontSize: px2dp(15), marginLeft: px2dp(20)}}>{text}</Text>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <Text style={{color: "#ccc"}}>{subText}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.pageBackgroundColor
    },
    actionBar: {
        height: theme.actionBar.height,
        backgroundColor: theme.actionBar.backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: (Platform.OS === 'ios') ? px2dp(20) : 0,
    },
    intro: {
        height: px2dp(100),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: px2dp(20),
        borderTopWidth: 1/PixelRatio.get(),
        borderBottomWidth: 1/PixelRatio.get(),
        borderBottomColor: '#c4c4c4',
        borderTopColor: '#e4e4e4',
        marginTop: px2dp(10)
    },
    list:{
        borderTopWidth: 1/PixelRatio.get(),
        borderTopColor: '#e4e4e4',
        marginTop: px2dp(15)
    },
    listItem: {
        flex: 1,
        height: px2dp(50),
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: px2dp(25),
        paddingRight: px2dp(25),
        borderBottomColor: '#c4c4c4',
        borderBottomWidth: 1/PixelRatio.get()
    }
});