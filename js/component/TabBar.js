'use strict';

import React, {Component} from 'react';
import {Text, StyleSheet, Image, ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import TabNavigator from 'react-native-tab-navigator';
import HomeFragment from '../page/HomeFragment';
import CompassFragment from '../page/CompassFragment';
import MeFragment from '../page/MeFragment';
import CalendarFragment from '../page/CalendarFragment';
import NotifyFragment from '../page/NotificationFragment';
import px2dp from '../util/px2dp';


export default class TabBar extends Component {
    static defaultProps = {
        selectedColor: 'rgb(22,131,251)',
        normalColor: '#a9a9a9'
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home',
            tabName: ['首页', '成绩', '日历', '消息', '我'],
            activeTab: 4,
        };
        this.changeActiveTab();
    }

    changeActiveTab() {
        let show_day = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        let time = new Date();
        let month = time.getMonth() + 1;
        let date = time.getDate();
        let day = time.getDay();
        switch (day) {
            case 0:
                //this.setState({activeTab: 4});
                this.state.activeTab = 4;
                break;
            case 1:
                // this.setState({activeTab: 0});
                this.state.activeTab = 0;
                break;
            case 2:
                // this.setState({activeTab: 1});
                this.state.activeTab = 1;
                break;
            case 3:
                // this.setState({activeTab: 2});
                this.state.activeTab = 2;
                break;
            case 4:
                // this.setState({activeTab: 3});
                this.state.activeTab = 3;
                break;
            case 5:
                // this.setState({activeTab: 4});
                this.state.activeTab = 4;
                break;
            case 6:
                // this.setState({activeTab: 4});
                this.state.activeTab = 4;
                break;
            default:
                break;
        }
    }

    render() {
        const {selectedColor} = this.props;
        const {tabName} = this.state;
        return (
            <TabNavigator
                hidesTabTouch={true}
                tabBarStyle={styles.tabbar}
                sceneStyle={{paddingBottom: styles.tabbar.height}}>
                <TabNavigator.Item
                    tabStyle={styles.tabStyle}
                    title={tabName[0]}
                    selected={this.state.selectedTab === 'home'}
                    selectedTitleStyle={{color: selectedColor}}
                    renderIcon={() => <Image style={styles.tab} source={this.state.homeNormal}/>}
                    renderSelectedIcon={() => <Image style={styles.tab} source={this.state.homeSelected}/>}
                    onPress={() => this.setState({selectedTab: 'home'})}>
                    {<HomeFragment navigator={this.props.navigator} activeTab = {this.state.activeTab}/>}
                </TabNavigator.Item>
                <TabNavigator.Item
                    tabStyle={styles.tabStyle}
                    title={tabName[1]}
                    selected={this.state.selectedTab === 'compass'}
                    selectedTitleStyle={{color: selectedColor}}
                    renderIcon={() => <Image style={styles.tab} source={this.state.compassNormal}/>}
                    renderSelectedIcon={() => <Image style={styles.tab} source={this.state.compassSelected}/>}
                    onPress={() => this.setState({selectedTab: 'compass'})}>
                    {<CompassFragment />}
                </TabNavigator.Item>
                <TabNavigator.Item
                    tabStyle={styles.tabStyle}
                    title={tabName[2]}
                    selected={this.state.selectedTab === 'calendar'}
                    selectedTitleStyle={{color: selectedColor}}
                    renderIcon={() => <Image style={styles.tab} source={this.state.compassNormal}/>}
                    renderSelectedIcon={() => <Image style={styles.tab} source={this.state.compassSelected}/>}
                    onPress={() => this.setState({selectedTab: 'calendar'})}>
                    {<CalendarFragment />}
                </TabNavigator.Item>
                <TabNavigator.Item
                    tabStyle={styles.tabStyle}
                    title={tabName[3]}
                    selected={this.state.selectedTab === 'notification'}
                    selectedTitleStyle={{color: selectedColor}}
                    renderIcon={() => <Image style={styles.tab} source={this.state.notificationNormal}/>}
                    renderSelectedIcon={() => <Image style={styles.tab} source={this.state.notificationSelected}/>}
                    onPress={() => this.setState({selectedTab: 'notification'})}>
                    {<NotifyFragment navigator={this.props.navigator}/>}
                </TabNavigator.Item>
                <TabNavigator.Item
                    tabStyle={styles.tabStyle}
                    title={tabName[4]}
                    selected={this.state.selectedTab === 'me'}
                    selectedTitleStyle={{color: selectedColor}}
                    renderIcon={() => <Image style={styles.tab} source={this.state.meNormal}/>}
                    renderSelectedIcon={() => <Image style={styles.tab} source={this.state.meSelected}/>}
                    onPress={() => this.setState({selectedTab: 'me'})}>
                    {<MeFragment navigator={this.props.navigator}/>}
                </TabNavigator.Item>
            </TabNavigator>
        );
    }

    componentWillMount() {
        const {selectedColor, normalColor} = this.props;
        Icon.getImageSource('md-notifications', 50, normalColor).then((source) => this.setState({notificationNormal: source}));
        Icon.getImageSource('md-notifications', 50, selectedColor).then((source) => this.setState({notificationSelected: source}));
        Icon.getImageSource('md-home', 50, normalColor).then((source) => this.setState({homeNormal: source}));
        Icon.getImageSource('md-home', 50, selectedColor).then((source) => this.setState({homeSelected: source}));
        Icon.getImageSource('md-person', 50, normalColor).then((source) => this.setState({meNormal: source}));
        Icon.getImageSource('md-person', 50, selectedColor).then((source) => this.setState({meSelected: source}));
        Icon.getImageSource('md-compass', 50, normalColor).then((source) => this.setState({compassNormal: source}));
        Icon.getImageSource('md-compass', 50, selectedColor).then((source) => this.setState({compassSelected: source}));
    }
}

const styles = StyleSheet.create({
    tabbar: {
        height: px2dp(49),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    tabStyle: {
        padding: px2dp(8)
    },
    tab: {
        width: px2dp(22),
        height: px2dp(22)
    }
});