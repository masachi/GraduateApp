'use strict';

import React, {Component} from 'react';
import {Text, StyleSheet, View, ScrollView, RefreshControl, ToastAndroid} from 'react-native';
import HotPanel from '../../component/HotPanel';
import ListViewForHomeTab from '../../component/ListViewForHome';
import ListViewForOtherTab from '../../component/SimpleListView';
import computeTime from '../../util/computeTime';
import * as theme from '../../config/theme';
import Toast from '@remobile/react-native-toast';

export default class HomeTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: true,
            loadedData: false,
            dataBlob: []
        };
        this._fetchData = this._fetchData.bind(this);
        this._onDismissRefresh = this._onDismissRefresh.bind(this);
    }

    componentDidMount() {
        this._fetchData();
    }

    render() {
        //alert(this.props.date);
        return (
            <ScrollView
                style={{}}
                enableEmptySections={true}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                        colors={['red', '#ffd500', '#0080ff', '#99e600']}
                        tintColor={theme.themeColor}
                        title="Loading..."
                        titleColor={theme.themeColor}
                    />
                }>
                { this._renderContents() }
            </ScrollView>
        );
    }

    _renderContents() {
        var {tabTag} = this.props;
        tabTag += '课程';

        if (!this.state.refreshing || this.state.loadedData) {
            return (
                <View>
                    <HotPanel title={tabTag} contents={this.state.dataBlob}/>
                    <ListViewForOtherTab contents={this.state.dataBlob}/>
                </View>
            );
        }
    }

    _onRefresh() {
        this.setState({refreshing: true});
        this._fetchData();
    }

    _onDismissRefresh() {
        //Toast.showLongCenter.bind(null, '网络错误');
        this.setState({refreshing: false});
    }

    _getCurrentTime() {
        function convertTime(time) {
            if (time <= 9)
                return '0' + time;
            return time;
        }

        var date = new Date();
        return date.getFullYear() + '-' + convertTime(date.getMonth() + 1) + '-' + convertTime(date.getDate()) + 'T' + convertTime(date.getHours()) + ':' + convertTime(date.getMinutes()) + ':' + convertTime(date.getSeconds() + '.' + date.getMilliseconds() + 'Z');
    }

    _fetchData() {
        let data = [];
        let body = 'username=' + global.username + '&' + 'date=' + this.props.date;
        var url = 'http://182.254.152.66:10080/api.php?id=course&method=course_list';
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
                //alert(result);
                if (result.code === 200) {
                    result.data.forEach((value) => {
                        data.push(value);
                    });
                    this.setState({dataBlob: data});
                    this._onDismissRefresh();
                }
            })
            .catch((err) => {
                this._onDismissRefresh();
                ToastAndroid.show('网络错误', 30000);
            });
    }
}
