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
    AlertIOS,
    ListView
} from 'react-native';
import Toast from '@remobile/react-native-toast';
import px2dp from '../util/px2dp';
import theme from '../config/theme';
import computeTime from '../util/computeTime';
import SearchBar from '../component/SearchBar';
import Swiper from 'react-native-swiper';
import ImageButton from '../component/ImageButtonWithText';
//import ListView from '../component/SimpleListView';

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
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
        }
        this._fetchData = this._fetchData.bind(this);
        this._onDismissRefresh = this._onDismissRefresh.bind(this);
        this._renderRow = this._renderRow.bind(this);
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

    _onDismissRefresh() {
        this.setState({refreshing: false});
    }

    _imageButtonCallback(position) {
        this._alert();
    }

    _renderHeader() {
        return (
            <View style={styles.header}>
                <Text>成绩</Text>
            </View>
        );
    }

    _renderRow(rowData) {
        return (
            <View style={{paddingHorizontal: 5, flex: 1, backgroundColor: '#fff', flexDirection: 'row'}}>
                <View style={{flexDirection: 'column', paddingLeft: 20, paddingTop: 10, paddingBottom: 10}}>
                    <Text style={[styles.year, {justifyContent: 'flex-start'}]}>
                        {rowData.year}
                    </Text>
                    <Text style={[styles.year, {justifyContent: 'flex-start', paddingTop: 10}]}>
                        {rowData.term}
                    </Text>
                </View>
                <View style={{flex: 1,flexDirection: 'column', paddingTop: 10, paddingBottom: 10, alignItems: 'flex-end', paddingHorizontal: 20}}>
                    <View style={{flexDirection: 'row', paddingLeft: 20, alignItems: 'flex-end'}}>
                        <Text style={[styles.year, {textAlign: 'right', justifyContent: 'flex-end'}]}>
                            {rowData.course}
                        </Text>
                        <Text style={[styles.year, {textAlign: 'right', justifyContent: 'flex-end', paddingLeft: 20}]}>
                            {rowData.score}
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end', paddingLeft: 40, paddingTop: 10}}>
                        <Text style={[styles.type, {textAlign: 'right', justifyContent: 'flex-end'}]}>
                            {rowData.type}
                        </Text>
                        <Text style={[styles.type, {textAlign: 'right', justifyContent: 'flex-end', paddingLeft: 10}]}>
                            {rowData.flag}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }

    _renderListView() {
        if (!this.state.refreshing || this.state.loadedData) {
            return (
                <ListView
                    style={{flex: 1}}
                    renderRow={this._renderRow}
                    dataSource={this.state.dataSource}
                    renderHeader={this._renderHeader.bind(this)}
                    renderSeparator={() => <View style={{height: 10}}></View>}
                    renderFooter={() => <View style={{height: 40}}/>}
                />
            );
        }
    }

    _fetchData() {
        let body = 'username=' + global.username;
        fetch('http://182.254.152.66:10080/api.php?id=score&method=score_list',
            {
                method: 'POST',
                timeout: 10000,
                mode: 'cors',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: body
            })
            .then((response) => response.json())
            .then((result) => {
                let data = [];
                if (result.code === 200) {
                    result.data.forEach((value) => {
                        data.push(value);
                    });
                    this._onDismissRefresh();
                    this.setState({dataBlob: data});
                    this.setState({dataSource: this.state.dataSource.cloneWithRows(this.state.dataBlob)})
                }
            })
            .catch((err) => {
                this._onDismissRefresh();
                //ToastAndroid.show(err.toString());
                ToastAndroid.show('网络错误', 30000);
            });

    }

    componentDidMount() {
        this._fetchData();
        //this.setState({dataSource: this.state.dataSource.cloneWithRows([1,2,3,4])})
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
    year: {
        fontSize: 16,
        color: 'black'
    },
    type: {
        fontSize: 14,
        color: 'grey'
    },
    header: {
        backgroundColor: '#fff',
        height: px2dp(40),
        paddingHorizontal: 15,
        justifyContent: 'center',
        paddingBottom: 10
    },
});
