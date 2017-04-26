/**
 * Created by Masachi on 2017/4/26.
 */
import React, {Component} from 'react';
import{
    View,
    WebView
} from 'react-native';

import PageComponent from './BackPageComponent'
import NavigationBar from '../component/SimpleNavigationBar';

export default class NotificationInfo extends PageComponent {
    render() {
        return (
            <View style={{flex: 1}}>
                <NavigationBar title="详情" backOnPress={this._handleBack.bind(this)}/>
                <View>
                    <WebView source={this.props.url}/>
                </View>
            </View>
        );
    }
}