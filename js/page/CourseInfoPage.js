/**
 * Created by sdlds on 2017/6/9.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    Image,
    RefreshControl
} from 'react-native';
import PageComponent from './BackPageComponent';
import px2dp from '../util/px2dp';
import NavigationBar from '../component/SimpleNavigationBar';
import * as theme from '../config/theme';
import Toast from 'react-native-root-toast';

export default class CourseInfoPage extends PageComponent {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: true,
            weight: '',
            week: '',
            info: ''
        };

        this._fetchData = this._fetchData.bind(this);
        this._onDismissRefresh = this._onDismissRefresh.bind(this);
    }

    componentDidMount(){
        this._fetchData();
    }

    _onDismissRefresh() {
        //Toast.showLongCenter.bind(null, '网络错误');
        this.setState({refreshing: false});
    }

    _onRefresh() {
        this.setState({refreshing: true});
        this._fetchData();
    }

    _fetchData(){
        let data = [];
        let body = 'username=' + global.username + '&' + 'course=' + this.props.data.course;
        var url = 'http://182.254.152.66:10080/api.php?id=course&method=course_info';
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
                    this.setState({
                        weight: result.data[0].weight,
                        week: result.data[0].week,
                        info: result.data[0].info
                    });
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

    render() {
        let rowData = this.props.data;
        return (
            <View style={{flex: 1}}>
                <NavigationBar title="详情" backOnPress={this._handleBack.bind(this)}/>
                <ScrollView style={styles.item}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh.bind(this)}
                                colors={['red', '#ffd500', '#0080ff', '#99e600']}
                                tintColor={theme.themeColor}
                                title="Loading..."
                                titleColor={theme.themeColor}
                            />}
                            renderFooter={() => <View/>}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        paddingLeft: 10,
                        paddingVertical: 20}}>

                        <Image source={require('../image/session_default.png')}
                               style={styles.image}/>
                        <View style={{flex: 1, paddingRight: 10,flexDirection: 'column', justifyContent: 'flex-start'}}>
                                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10}}>
                                    <Text style={[styles.row_start]}>课程：</Text>
                                    <Text style={styles.row_end}>{rowData.course}</Text>
                                </View>
                                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10}}>
                                    <Text style={styles.row_start}>老师：</Text>
                                    <Text style={styles.row_end}>{rowData.teacher}</Text>
                                </View>

                                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10}}>
                                    <Text style={styles.row_start}>学分：</Text>
                                    <Text style={styles.row_end}>{this.state.weight} 学分</Text>
                                </View>
                            </View>
                    </View>
                    <View style={{flex: 1, paddingLeft: 10, paddingTop: 20}}>
                        <Text style={styles.row_start}>上课时间:</Text>
                        <Text style={[styles.row_start,{textAlign: 'center', paddingTop: 20}]}>{this.state.week}</Text>
                    </View>
                    <View style={{flex: 1, paddingLeft: 10, paddingTop: 20}}>
                        <Text style={styles.row_start}>详情:</Text>
                        <Text style={[styles.row_start,{paddingTop: 20}]}>{this.state.info}</Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({


    item: {
        flex: 1,
        height: px2dp(80),
        backgroundColor: '#fff',
        marginHorizontal: 15,
        borderColor: '#c0c0c0',
        borderRadius: 8
    },
    image: {
        height: px2dp(110),
        width: px2dp(110),
        backgroundColor: '#f4f4f4',
        resizeMode: 'cover'
    },

    row_start: {
        flex: 1,
        fontSize: 18,
        color: 'black',
        alignItems: 'center',
        justifyContent: 'flex-start',
        textAlign: 'left'
    },
    row_end: {
        flex: 1,
        fontSize: 18,
        color: 'black',
        alignItems: 'center',
        justifyContent: 'flex-end',
        textAlign: 'right'
    },
});