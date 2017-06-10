'use strict';

import React, {Component, PropTypes} from 'react';
import {Text, View, StyleSheet, Platform, PixelRatio, ListView, TouchableOpacity, TouchableNativeFeedback, Image} from 'react-native';
import px2dp from '../util/px2dp';
import * as theme from '../config/theme';
import MainPage from '../page/MainPage';
import CourseInfoPage from '../page/CourseInfoPage'

export default class SimpleListView extends Component{
    static propTypes = {
        isRenderHeader: PropTypes.bool
    };

    static defaultProps = {
        isRenderHeader: false
    };

    constructor(props){
        super(props);
        const ds = new ListView.DataSource({
           rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            dataSource: ds.cloneWithRows(this.props.contents)
            //dataSource: ds.cloneWithRows([1,2,3,4])
        }
    }

    _itemClickCallback(rowData){
        this.props.navigator.push({
            component: CourseInfoPage,
            args: {
                data: rowData,
            }
        });
    }

    _renderItem(rowData, sectionID, rowID, highlightRow){
        if(Platform.OS === 'ios') {
            return (
                <TouchableOpacity
                    onPress={this._itemClickCallback.bind(this, rowData)}
                    activeOpacity={theme.btnActiveOpacity}>
                    {this._renderItemContent(rowData)}
                </TouchableOpacity>
            )
        }else if(Platform.OS === 'android'){
            return (
                <TouchableNativeFeedback onPress={this._itemClickCallback.bind(this, rowData)}>
                    {this._renderItemContent(rowData)}
                </TouchableNativeFeedback>
            )
        }
    }

    _renderItemContent(rowData){
        //alert(2333);
        return(
            <View style={styles.item}>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    paddingLeft: 10,
                    paddingVertical: 20,
                    alignItems: 'center'}}>
                    <Image source={require('../image/session_default.png')}
                           style={styles.image}/>
                </View>
                <View style={{flex: 1, paddingLeft: 20, paddingRight: 10, paddingVertical: 20}}>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-end'}}>
                        <Text style={{fontSize: 16, color: 'black', textAlign: 'right'}}>{rowData.course}</Text>
                        <Text style={{fontSize: 16, color: 'black', paddingLeft: 30, textAlign: 'right'}}>{rowData.teacher}</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                        <Text style={{fontSize: 14, color: 'grey', textAlign: 'right'}}>{rowData.time}</Text>
                        <Text style={{fontSize: 14, color: 'grey', textAlign: 'right', paddingLeft: 10}}>{rowData.num}</Text>
                        <Text style={{fontSize: 14, color: 'grey', textAlign: 'right', paddingLeft: 10}}>{rowData.location}</Text>
                    </View>
                </View>
            </View>
        );
    }

    _renderHeader(){
        if(this.props.isRenderHeader) {
            return (
                <View style={styles.header}>
                    <Text>成绩</Text>
                </View>
            );
        }
    }

    render(){
        return(
            <ListView
                style={styles.listView}
                enableEmptySections={true}
                dataSource={this.state.dataSource}
                renderRow={this._renderItem.bind(this)}
                renderHeader={this._renderHeader.bind(this)}
                renderSeparator={() => <View style={{height: 20}}/>}
            />
        );
    }
}

const styles = StyleSheet.create({
    listView: {
        marginTop: px2dp(15)
    },
    header: {
        backgroundColor: '#fff',
        height: px2dp(40),
        paddingLeft: px2dp(15),
        justifyContent: 'center'
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        height: px2dp(80),
        backgroundColor: '#fff',
        marginHorizontal: 15,
        borderColor: '#c0c0c0',
        borderRadius: 8
    },
    content: {
        color: '#000',
        fontSize: px2dp(15),
    },
    image: {
        height: px2dp(55),
        width: px2dp(55),
        backgroundColor: '#f4f4f4',
        resizeMode: 'cover'
    },
    infoBar: {
        flexDirection: 'row',
        marginTop: px2dp(3)
    },
    infoBarText: {
        fontSize: px2dp(11),
        color: theme.grayColor
    }
});