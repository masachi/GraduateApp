/**
 * Created by wangdi on 4/11/16.
 */
'use strict';

import React, {Component} from 'react';
import {Text, View, StyleSheet, Platform, TouchableOpacity, ListView} from 'react-native';
import theme from '../config/theme';
import px2dp from '../util/px2dp';
import NotificationInfo from './NotificationInfo';
import WebViewPage from './WebViewPage';

export default class NotificationFragment extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            dataBlob: [],
        };
    }

    componentDidMount() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(),
        });
    }

    _onItemClick(url) {
        this.props.navigator.push({
            component: WebViewPage,
            params: {
                url: url,
            }
        });
    }

    _renderRow() {
        return (
            <TouchableOpacity style={{height: 80}} onPress={this._onItemClick.bind(this, 'www.baidu.com')}>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex: 1, justifyContent: 'flex-start'}}>
                        <Text style={{fontSize: 20, textAlign: 'left', paddingLeft: 10}}>title</Text>
                    </View>
                    <View style={{flex: 1, justifyContent: 'flex-end'}}>
                        <Text style={{fontSize: 16, textAlign: 'right', paddingRight: 10}}>time</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    _renderSeparator() {
        return (
            <View style={styles.separator}></View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.actionBar}>
                    <Text style={{color: theme.actionBar.fontColor, fontSize: theme.actionBar.fontSize}}>消息</Text>
                </View>
                {
                    this.state.dataBlob.length === 0 ?
                        <Text style={{marginBottom: px2dp(10)}}>并没有什么消息</Text>
                        :
                        <View style={{flex: 1}}>
                            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{fontSize: 13}}>只显示近期10条消息</Text>
                            </View>、
                            <View style={styles.separator}></View>
                            <ListView
                                renderRow={this._renderRow.bind(this)}
                                dataSource={this.state.dataSource}
                                onPress={this._onItemClick.bind(this, url)}
                            />
                        </View>

                }
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
        height: 1,
        backgroundColor: '#707070'
    },
    actionBar: {
        height: theme.actionBar.height,
        backgroundColor: theme.actionBar.backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: (Platform.OS === 'ios') ? px2dp(20) : 0,
    },
});