'use strict';

import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Platform,
    RefreshControl,
    ScrollView,
    ToastAndroid,
    Image,
    Dimensions,
    PixelRatio,
    Alert,
    AlertIOS
} from 'react-native';
import Toast from '@remobile/react-native-toast';
import px2dp from '../util/px2dp';
import theme from '../config/theme';
import computeTime from '../util/computeTime';
import SearchBar from '../component/SearchBar';
import Swiper from 'react-native-swiper';
import ImageButton from '../component/ImageButtonWithText';
import ListView from '../component/SimpleListView';

const bannerImages = [
    require('../image/banner1.jpg'),
    require('../image/banner2.png')
];

const imgBtnImages = [
    require('../image/trend.png'),
    require('../image/rank.png'),
    require('../image/hot.png')
];

export default class CompassFragment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: true,
            loadedData: false,
            dataBlob: [],
        }
        this._fetchData = this._fetchData.bind(this);
        this._onDismissRefresh = this._onDismissRefresh.bind(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.actionBar}>
                    <Text style={{color: theme.actionBar.fontColor, fontSize: theme.actionBar.fontSize}}>成绩</Text>
                </View>
                <ScrollView
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
                    { this._renderListView() }
                </ScrollView>
            </View>
        );
    }

    _onRefresh() {
        this.setState({refreshing: true});
        this._fetchData();
    }

    _searchButtonCallback() {

    }

    _onDismissRefresh(){
        this.setState({refreshing: false});
    }

    _imageButtonCallback(position) {
        this._alert();
    }

    _renderListView() {
        if (!this.state.refreshing || this.state.loadedData) {
            return (
                <ListView isRenderHeader={true} contents={this.state.dataBlob}/>
            );
        }
    }

    _fetchData() {
        fetch('http://gold.xitu.io/api/v1/hot/57fa525a0e3dd90057c1e04d/android', {timeout: 10000})
            .then((response) => response.json())
            .then((responseData) => {
                let data = responseData.data;
                let entry = data.entry;
                var dataBlob = [];

                for (let i in entry) {
                    let itemInfo = {
                        title: entry[i].title,
                        collectionCount: entry[i].collectionCount,
                        user: entry[i].user,
                        time: computeTime(entry[i].createdAtString),
                        url: entry[i].url,
                        commentsCount: entry[i].commentsCount,
                        viewsCount: entry[i].viewsCount,
                        screenshot: entry[i].screenshot ? entry[i].screenshot : null
                    }
                    dataBlob.push(itemInfo);
                }

                this.setState({
                    dataBlob: dataBlob,
                    loadedData: true,
                    refreshing: false
                });
            })
            .catch((err) => {
                this._onDismissRefresh();
                ToastAndroid.show('网络错误',30000);
            });

    }

    componentDidMount() {
        this._fetchData();
    }

    _alert() {
        if (Platform.OS === 'android') {
            Alert.alert(
                'Message',
                "This function currently isn't available",
                [{
                    text: 'OK', onPress: () => {
                    }
                }]
            );
        } else if (Platform.OS === 'ios') {
            AlertIOS.alert(
                'Message',
                "This function currently isn't available",
                [{
                    text: 'OK', onPress: () => {
                    }
                }]
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.pageBackgroundColor
    },
    slide: {},
    image: {
        height: px2dp(130),
        width: Dimensions.get('window').width
    },
    imageBtnLine: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: '#c4c4c4'
    },
    imgBtn: {
        height: px2dp(80),
        width: Dimensions.get('window').width / 3,
    },
    actionBar: {
        height: theme.actionBar.height,
        backgroundColor: theme.actionBar.backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: (Platform.OS === 'ios') ? px2dp(20) : 0,
    },
});
