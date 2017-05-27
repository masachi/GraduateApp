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
var moment = require('moment');

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