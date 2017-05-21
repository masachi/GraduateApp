'use strict';

import React, {Component} from 'react';
import {Navigator, ToastAndroid} from 'react-native';
import MainPage from '../page/MainPage';
import SignInPage from '../page/SignInAndSignup/SignInPage';
import WebViewPage from '../page/WebViewPage';
import SplashScreen from '../native_modules/SplashScreen';
//import {initStorage, storage} from '../util/storage';
import MyNavigator from '../component/Navigator';

export default class Navigation extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isLoggedIn: false,
        };
    }

    // componentWillMount() {
    //     // AsyncStorage.getItem('loginState', (error) => {
    //     //     AsyncStorage.setItem('loginState', 'false', (error) => {
    //     //         console.log(error);
    //     //     });
    //     // }).then((value) => {
    //     //     console.log(value);
    //     // });
    //     // initStorage();
    //
    // }

    // checkLoggedInOrNot() {
    //     storage.load({
    //         key: 'loginState',
    //     }).then(ret => {
    //         console.log(ret.isLoggedIn);
    //         if (!ret.isLoggedIn) {
    //             this.setState({isLoggedIn: ret.isLoggedIn});
    //             ToastAndroid.show('请先登录', 4000);
    //         }
    //         else {
    //             this.setState({isLoggedIn: ret.isLoggedIn});
    //         }
    //     });
    //     // AsyncStorage.getItem('loginState').then((value) => {
    //     //     this.setState({isLoggedIn: value});
    //     //     console.log("value:" + value);
    //     // });
    // }

    render() {
        // initStorage();
        // this.checkLoggedInOrNot();
        return (
            <Navigator
                initialRoute={{component: SignInPage}}
                renderScene={(route, navigator) => {
                    return <route.component navigator={navigator} {...route.args}/>
                }}
            />
        );
    }

    componentDidMount() {
        SplashScreen.hide();
        // var storage = new Storage({
        //     size: 2,
        //     storageBackend: AsyncStorage,
        //     defaultExpires: 1000 * 3600 * 24 * 30,
        //     enableCache: true,
        // });
        // global.storage = storage;
        // global.storage.load({
        //     key: 'loginState',
        // }).then(ret => {
        //         console.log("ret: " + ret);
        //         if (!ret.isLoggedIn || ret === null) {
        //             global.storage.save({
        //                 key: 'loginState',
        //                 rawData: {
        //                     username: '',
        //                     isLoggedIn: 'false'
        //                 }
        //             });
        //         }
        //     }
        // ).catch(err => {
        //     global.storage.save({
        //         key: 'loginState',
        //         rawData: {
        //             username: '',
        //             isLoggedIn: 'false'
        //         }
        //     });
        // });
        // this.checkLoggedInOrNot();
    }
}