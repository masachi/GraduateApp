'use strict';

import React, {Component} from 'react';
import {Text, View, StyleSheet, Platform, ToastAndroid ,BackAndroid, PermissionsAndroid} from 'react-native';
import theme from '../config/theme';
import px2dp from '../util/px2dp';
import ScrollableTabView, {DefaultTabBar}from 'react-native-scrollable-tab-view';
import CustomTabBar from '../component/CustomTabBar';
import HomeTab from './HomeTabPages/HomeTab';
import TabItemSwitcherPage from './TabItemSwitcherPage';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';
import {AsyncStorage} from 'react-native';
import Storage from 'react-native-storage';
import SignInPage from './SignInAndSignup/SignInPage';
var moment = require('moment');
import Pushy from 'pushy-react-native';
import Toast from 'react-native-root-toast';

export default class HomeFragment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['星期一', '星期二', '星期三', '星期四', '星期五'],
            // activeTab: 3,
            date: [],
        };
        this._handleTabNames = this._handleTabNames.bind(this);
        // this.changeActiveTab = this.changeActiveTab.bind(this);
        this.getDate();
    }

    getDate() {
        //alert(tempDate);
        global.date = [];
        switch (moment('2016-04-10').day()){
            case 0:
                date[0] = (moment('2016-04-10').add(1, 'd')).format("YYYY-MM-DD");
                date[1] = (moment('2016-04-10').add(2, 'd')).format("YYYY-MM-DD");
                date[2] = (moment('2016-04-10').add(3, 'd')).format("YYYY-MM-DD");
                date[3] = (moment('2016-04-10').add(4, 'd')).format("YYYY-MM-DD");
                date[4] = (moment('2016-04-10').add(5, 'd')).format("YYYY-MM-DD");
                break;
            case 1:
                date[0] = (moment('2016-04-10')).format("YYYY-MM-DD");
                date[1] = (moment('2016-04-10').add(1, 'd')).format("YYYY-MM-DD");
                date[2] = (moment('2016-04-10').add(2, 'd')).format("YYYY-MM-DD");
                date[3] = (moment('2016-04-10').add(3, 'd')).format("YYYY-MM-DD");
                date[4] = (moment('2016-04-10').add(4, 'd')).format("YYYY-MM-DD");
                break;
            case 2:
                date[0] = (moment('2016-04-10').subtract(1, 'd')).format("YYYY-MM-DD");
                date[1] = (moment('2016-04-10')).format("YYYY-MM-DD");
                date[2] = (moment('2016-04-10').add(1, 'd')).format("YYYY-MM-DD");
                date[3] = (moment('2016-04-10').add(2, 'd')).format("YYYY-MM-DD");
                date[4] = (moment('2016-04-10').add(3, 'd')).format("YYYY-MM-DD");
                break;
            case 3:
                date[0] = (moment('2016-04-10').subtract(2, 'd')).format("YYYY-MM-DD");
                date[1] = (moment('2016-04-10').subtract(1, 'd')).format("YYYY-MM-DD");
                date[2] = (moment('2016-04-10')).format("YYYY-MM-DD");
                date[3] = (moment('2016-04-10').add(1, 'd')).format("YYYY-MM-DD");
                date[4] = (moment('2016-04-10').add(2, 'd')).format("YYYY-MM-DD");
                break;
            case 4:
                date[0] = (moment('2016-04-10').subtract(3, 'd')).format("YYYY-MM-DD");
                date[1] = (moment('2016-04-10').subtract(2, 'd')).format("YYYY-MM-DD");
                date[2] = (moment('2016-04-10').subtract(1, 'd')).format("YYYY-MM-DD");
                date[3] = (moment('2016-04-10')).format("YYYY-MM-DD");
                date[4] = (moment('2016-04-10').add(1, 'd')).format("YYYY-MM-DD");
                break;
            case 5:
                date[0] = (moment('2016-04-10').subtract(4, 'd')).format("YYYY-MM-DD");
                date[1] = (moment('2016-04-10').subtract(3, 'd')).format("YYYY-MM-DD");
                date[2] = (moment('2016-04-10').subtract(2, 'd')).format("YYYY-MM-DD");
                date[3] = (moment('2016-04-10').subtract(1, 'd')).format("YYYY-MM-DD");
                date[4] = (moment('2016-04-10')).format("YYYY-MM-DD");
                break;
            case 6:
                date[0] = (moment('2016-04-10').add(2, 'd')).format("YYYY-MM-DD");
                date[1] = (moment('2016-04-10').add(3, 'd')).format("YYYY-MM-DD");
                date[2] = (moment('2016-04-10').add(4, 'd')).format("YYYY-MM-DD");
                date[3] = (moment('2016-04-10').add(5, 'd')).format("YYYY-MM-DD");
                date[4] = (moment('2016-04-10').add(6, 'd')).format("YYYY-MM-DD");
                break;
        }
        //alert((moment('2016-04-10').add(2, 'd')).format("YYYY-MM-DD"))

        //alert(date[0]  + " " + date[1]  + " " + date[2]  + " " + date[3]  + " " + date[4]);
    }

    render() {
        return (
                <View style={styles.container}>
                    <ScrollableTabView
                        ref={(tabView) => {
                            this.tabView = tabView;
                        }}
                        renderTabBar={() => <CustomTabBar />}
                        tabBarBackgroundColor="rgb(22,131,251)"
                        initialPage={this.props.activeTab}
                        tabBarActiveTextColor="white"
                        tabBarInactiveTextColor="rgba(255,255,255,0.5)"
                        tabBarTextStyle={{fontSize: theme.scrollView.fontSize}}
                        tabBarUnderlineStyle={theme.scrollView.underlineStyle}>
                        {
                            this.state.tabNames.map((item, i) => {
                                return (
                                    <HomeTab tabLabel={item} key={i} tabTag={item} navigator = {this.props.navigator} date = {global.date[i]} />
                                );
                            })
                        }
                    </ScrollableTabView>
                </View>
        );
    }

    _pullDownCallback() {
        this.props.navigator.push({
            component: TabItemSwitcherPage,
            args: {tabNames: this.state.tabNames}
        });
    }

    componentDidMount() {
        RCTDeviceEventEmitter.addListener('valueChange', this._handleTabNames);

        Pushy.listen();
        // Check whether the user has granted the app the WRITE_EXTERNAL_STORAGE permission
        // PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE).then((granted) => {
        //     if (!granted) {
        //         // Request the WRITE_EXTERNAL_STORAGE permission so that the Pushy SDK will be able to persist the device token in the external storage
        //         PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE).then((result) => {
        //             // User denied permission?
        //             if (result !== PermissionsAndroid.RESULTS.GRANTED) {
        //                 // Possibly ask the user to grant the permission
        //             }
        //         });
        //     }
        // });

        // Register the device for push notifications
        Pushy.register().then(async (deviceToken) => {
            // Print device token to console
            console.log('Pushy device token: ' + deviceToken);

            // Send the token to your backend server via an HTTP GET request
            //await fetch('https://your.api.hostname/register/device?token=' + deviceToken);

            // Succeeded, do something to alert the user
            let data = [];
            let body = 'username=' + global.username + '&' + 'token=' + deviceToken;
            var url = 'http://182.254.152.66:10080/api.php?id=user&method=device';
            //alert(body);
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
                    if (result.code === 200) {
                        //DeviceEventEmitter.emit('refresh');
                        Toast.show('Pushy Register Success', {
                            duration: 1000,
                            position: Toast.positions.BOTTOM,
                            shadow: true,
                            animation: true,
                            hideOnPress: true,
                            delay: 0,
                        });
                    }
                    else {
                        Toast.show('Pushy Register Failed', {
                            duration: 3000,
                            position: Toast.positions.BOTTOM,
                            shadow: true,
                            animation: true,
                            hideOnPress: true,
                            delay: 0,
                        });
                    }
                })
                .catch((err) => {
                    Toast.show(err, {
                        duration: Toast.durations.LONG,
                        position: Toast.positions.BOTTOM,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                        delay: 0,
                    });
                });

            let data2 = [];
            let body2 = 'username=' + global.username;
            var url2 = 'http://182.254.152.66:10080/api.php?id=course&method=push';
            //alert(body);
            fetch(url2, {
                timeout: 10000,
                method: 'POST',
                mode: 'cors',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: body2
            }).then((response) => response.json())
                .then((result) => {
                    //alert(result);
                    // if (result.code === 200) {
                    //     //DeviceEventEmitter.emit('refresh');
                    //     Toast.show('Pushy Register Success', {
                    //         duration: 1000,
                    //         position: Toast.positions.BOTTOM,
                    //         shadow: true,
                    //         animation: true,
                    //         hideOnPress: true,
                    //         delay: 0,
                    //     });
                    // }
                    // else {
                    //     Toast.show('Pushy Register Failed', {
                    //         duration: 3000,
                    //         position: Toast.positions.BOTTOM,
                    //         shadow: true,
                    //         animation: true,
                    //         hideOnPress: true,
                    //         delay: 0,
                    //     });
                    // }
                })
                .catch((err) => {
                    Toast.show(err, {
                        duration: Toast.durations.LONG,
                        position: Toast.positions.BOTTOM,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                        delay: 0,
                    });
                });
        }).catch((err) => {
            // Handle registration errors
            console.error(err);
        });
    }

    componentWillUnmount() {
        RCTDeviceEventEmitter.removeListener('value', this._handleTabNames);
    }


    _handleTabNames(tabNames) {
        this.setState({tabNames: tabNames});
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.pageBackgroundColor
    },
    text: {
        color: theme.text.color,
        fontSize: theme.text.fontSize
    }
});