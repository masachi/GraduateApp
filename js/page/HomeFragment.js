'use strict';

import React, {Component} from 'react';
import {Text, View, StyleSheet, Platform, ToastAndroid ,BackAndroid} from 'react-native';
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

export default class HomeFragment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['星期一', '星期二', '星期三', '星期四', '星期五'],
            // activeTab: 3,
        };
        this._handleTabNames = this._handleTabNames.bind(this);
        // this.changeActiveTab = this.changeActiveTab.bind(this);
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
                                    <HomeTab tabLabel={item} key={i} tabTag={item} navigator = {this.props.navigator}/>
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

    initStorage() {
        var storage = new Storage({
            size: 2,
            storageBackend: AsyncStorage,
            defaultExpires: 1000 * 3600 * 24 * 30,
            enableCache: true,
        });
        global.storage = storage;
        global.storage.load({
            key: 'loginState',
        }).then(ret => {
                console.log("ret: " + ret);
                if (!ret.isLoggedIn || ret === null) {
                    global.storage.save({
                        key: 'loginState',
                        rawData: {
                            username: '',
                            isLoggedIn: 'false'
                        }
                    });
                }
            }
        ).catch(err => {
            global.storage.save({
                key: 'loginState',
                rawData: {
                    username: '',
                    isLoggedIn: 'false'
                }
            });
        });
        storage.load({
            key: 'loginState',
        }).then(ret => {
            console.log(ret.isLoggedIn);
            if (ret.isLoggedIn === true) {
                console.log("233333333");
            }
            else{
                ToastAndroid.show("尚未登录",3000);
                this.props.navigator.push({
                    component: SignInPage,
                })
            }
        });
    }

    componentDidMount() {
        RCTDeviceEventEmitter.addListener('valueChange', this._handleTabNames);
    }

    componentWillUnmount() {
        RCTDeviceEventEmitter.removeListener('value', this._handleTabNames);
    }

    componentWillMount() {
        this.initStorage();
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