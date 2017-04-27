/**
 * Created by Masachi on 2017/4/26.
 */
import React, {Component} from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native';
import PageComponent from './BackPageComponent';
import NavigationBar from '../component/SimpleNavigationBar';

export default class SelfInfo extends PageComponent {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <NavigationBar title="个人详情" backOnPress={this._handleBack.bind(this)}/>
                <View style={{alignItems: 'center', marginTop: 10, marginBottom: 40}}>
                    <Image style={{height: 150, width: 150, borderRadius: 50}} source={require('../image/test.jpg')}/>
                </View>
                <View style={styles.separator}></View>
                <ScrollView>
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <View style={{ flex: 1, flexDirection: 'row', paddingTop: 10, paddingBottom: 10, alignItems: 'center'}}>
                        <Text style={[{fontSize: 16, color: 'black',},styles.row_left]}>学号</Text>
                        <Text style={[{fontSize: 16, color: 'black',},styles.row_right]}>233</Text>
                    </View>
                    <View style={styles.separator}></View>
                    <View style={{ flex: 1, flexDirection: 'row', paddingTop: 10, paddingBottom: 10, alignItems: 'center'}}>
                        <Text style={[{fontSize: 16, color: 'black',},styles.row_left]}>姓名</Text>
                        <Text style={[{fontSize: 16, color: 'black',},styles.row_right]}></Text>
                    </View>
                    <View style={styles.separator}></View>
                    <View style={{ flex: 1, flexDirection: 'row', paddingTop: 10, paddingBottom: 10, alignItems: 'center'}}>
                        <Text style={[{fontSize: 16, color: 'black',},styles.row_left]}>学院</Text>
                        <Text style={[{fontSize: 16, color: 'black',},styles.row_right]}></Text>
                    </View>
                    <View style={styles.separator}></View>
                    <View style={{ flex: 1, flexDirection: 'row', paddingTop: 10, paddingBottom: 10, alignItems: 'center'}}>
                        <Text style={[{fontSize: 16, color: 'black',},styles.row_left]}>院系</Text>
                        <Text style={[{fontSize: 16, color: 'black',},styles.row_right]}></Text>
                    </View>
                    <View style={styles.separator}></View>
                    <View style={{ flex: 1, flexDirection: 'row', paddingTop: 10, paddingBottom: 10, alignItems: 'center'}}>
                        <Text style={[{fontSize: 16, color: 'black',},styles.row_left]}>班级</Text>
                        <Text style={[{fontSize: 16, color: 'black',},styles.row_right]}></Text>
                    </View>
                    <View style={styles.separator}></View>
                </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    separator: {
        height: 1,
        backgroundColor: '#707070'
    },
    row_left: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        textAlign: 'left',
        paddingLeft: 10,
    },
    row_right: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        textAlign: 'right',
        paddingRight: 10,
    },
});