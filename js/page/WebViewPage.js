import React, {PropTypes} from 'react';
import ReactNative, {Text, View, StyleSheet, Platform, PixelRatio, WebView, ToastAndroid, BackAndroid, ActivityIndicator} from 'react-native';
import px2dp from '../util/px2dp';
import theme from '../config/theme';
import NavigationBar from '../component/WebViewNavigationBar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PageComponent from './BackPageComponent';

export default class WebViewPage extends PageComponent{
    constructor(props){
        super(props);
        this.state = {

        };
    }

    render(){
        //alert(this.props.url);
        return(
            <View style={{flex: 1}}>
                <NavigationBar title={'详情'} onPress={this._handleBack.bind(this)}/>
                <WebView
                    source={{uri: this.props.url}}
                    style={styles.webView}
                    renderLoading={this._renderLoading.bind(this)}
                    startInLoadingState={true}
                    scalesPageToFit={true}
                />
            </View>
        );
    }

    _showTips(msg){
        //ToastAndroid.show(msg, ToastAndroid.SHORT);
    }

    _renderLoading(){
        return(
            <View style={{justifyContent: 'center', paddingTop: px2dp(20)}}>
                <ActivityIndicator color={theme.themeColor} size="large"/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    webView: {
        flex: 1,
        backgroundColor: theme.pageBackgroundColor
    },
    bottom: {
        width: theme.screenWidth,
        height: px2dp(49),
        backgroundColor: '#fff',
        borderTopWidth: 1/PixelRatio.get(),
        borderTopColor: '#c4c4c4',
        flexDirection: 'row',
        paddingLeft: px2dp(20),
        paddingRight: px2dp(20),
        alignItems: 'center'
    },
    info:{
        flex: 1,
        flexDirection: 'row-reverse',
        alignItems:'center',
    }
});