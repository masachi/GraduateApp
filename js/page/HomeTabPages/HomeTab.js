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

    componentWillMount() {
        this._fetchData();
    }

    render() {
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
        Toast.showLongCenter.bind(null, '网络错误');
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
        var url = 'http://gold.xitu.io/api/v1/timeline/57fa525a0e3dd90057c1e04d/' + this._getCurrentTime();
        fetch(url, {timeout: 10000})
            .then((response) => response.json())
            .then((responseData) => {
                let data = responseData.data;
                var dataBlob = [];

                for (let i in data) {
                    let info = {
                        tags: data[i].tagsTitleArray,
                        category: data[i].category,
                        content: data[i].content,
                        collectionCount: data[i].collectionCount,
                        title: data[i].title,
                        user: data[i].user,
                        url: data[i].url,
                        time: computeTime(data[i].createdAtString),
                        commentsCount: data[i].commentsCount,
                        viewsCount: data[i].viewsCount,
                        screenshot: data[i].screenshot ? data[i].screenshot : null
                    }
                    dataBlob.push(info);
                }

                if (dataBlob.length !== 0) {
                    this.setState({
                        dataBlob: dataBlob,
                        loadedData: true,
                        refreshing: false
                    });
                }
            })
            .catch((err) => {
                this._onDismissRefresh();
                ToastAndroid.show('网络错误',30000);
            });
    }
}
