/**
 * Created by wangdi on 4/11/16.
 */
'use strict';

import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Platform,
    TouchableOpacity,
    ListView,
    ToastAndroid,
    RefreshControl,
    ScrollView
} from 'react-native';
import theme from '../config/theme';
import px2dp from '../util/px2dp';
import NotificationInfo from './NotificationInfo';
import WebViewPage from './WebViewPage';
import PageComponent from './BackPageComponent';
import Toast from 'react-native-root-toast';

export default class NotificationFragment extends PageComponent {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            refreshing: true,
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            dataBlob: [],
        };
        this._fetchData = this._fetchData.bind(this);
        this._onRefresh = this._onRefresh.bind(this);
        this._onDismissRefresh = this._onDismissRefresh.bind(this);
    }

    componentDidMount() {
        this._fetchData();
    }

    _onItemClick(url) {
        this.props.navigator.push({
            component: WebViewPage,
            args: {
                url: url,
            }
        });
    }

    _onRefresh() {
        this.setState({refreshing: true});
        this._fetchData();
    }

    _onDismissRefresh() {
        //Toast.showLongCenter.bind(null, '网络错误');
        this.setState({refreshing: false});
    }

    _fetchData() {
        let data = [];
        var url = 'http://182.254.152.66:18080/graduate/notification';
        //alert(body);
        fetch(url, {
            timeout: 10000,
            method: 'GET',
            mode: 'cors',
        }).then((response) => response.json())
            .then((result) => {
                //alert(result);
                if (result.code === 200) {
                    result.body.forEach((value) => {
                        data.push(value);
                    });
                    this.setState({dataSource: this.state.dataSource.cloneWithRows(data)});
                    this._onDismissRefresh();
                }
            })
            .catch((err) => {
                this._onDismissRefresh();
                Toast.show('网络错误', {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                });
            });
    }

    _renderRow(rowData) {
        return (
            <TouchableOpacity style={{marginHorizontal: 10, borderRadius: 4, backgroundColor: '#fff', borderColor: '#fff'}} onPress={this._onItemClick.bind(this, rowData.url)}>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', paddingVertical: 20}}>
                    <View style={{flex: 1, justifyContent: 'flex-start'}}>
                        <Text style={{fontSize: 16, textAlign: 'left', paddingLeft: 10}} numberOfLines={2}>{rowData.title}</Text>
                    </View>
                    <View style={{flex: 1, justifyContent: 'flex-end'}}>
                        <Text style={{fontSize: 12, textAlign: 'right', paddingRight: 10}}>{rowData.date}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    _renderSeparator() {
        return (
            <View style={styles.separator} />
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.actionBar}>
                    <Text style={{color: theme.actionBar.fontColor, fontSize: theme.actionBar.fontSize}}>消息</Text>
                </View>
                <ScrollView
                    style={{flex: 1}}
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
                    <ListView
                        renderHeader={() => <Text style={{fontSize: 13, paddingBottom: 10}}>只显示近期10条消息</Text>}
                        renderRow={this._renderRow.bind(this)}
                        dataSource={this.state.dataSource}
                        renderSeparator={this._renderSeparator.bind(this)}
                        renderFooter={() => <View style={{ height: 40}}/>}
                        //dataSource={this.state.dataBlob}
                        //onPress={this._onItemClick.bind(this, url)}
                    />
                </ScrollView>
            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.pageBackgroundColor
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    separator: {
        height: 10,
        backgroundColor: 'transparent'
    },
    actionBar: {
        height: theme.actionBar.height,
        backgroundColor: theme.actionBar.backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: (Platform.OS === 'ios') ? px2dp(20) : 0,
    },
});