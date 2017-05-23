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
        this.state = {
            number: '',
            name: '',
            academy: '',
            faculty: '',
            class: '',
        };
        this._fetchData = this._fetchData.bind(this);
    }

    componentDidMount(){
        this._fetchData();
    }

    _fetchData() {
        var url = 'http://182.254.152.66:10080/api.php?id=user&method=profile';
        let body = 'username=' + global.username;
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
                        number: result.data[0].number,
                        name: result.data[0].name,
                        academy: result.data[0].academy,
                        faculty: result.data[0].faculty,
                        class: result.data[0].class
                    })
                }
            })
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <NavigationBar title="个人详情" backOnPress={this._handleBack.bind(this)}/>
                <View style={{alignItems: 'center', marginTop: 10, marginBottom: 40}}>
                    <Image style={{height: 100, width: 100, borderRadius: 50}} source={require('../image/test.jpg')}/>
                </View>
                <View style={[styles.separator, {paddingHorizontal: 10}]}></View>
                <ScrollView style={{paddingHorizontal: 10}}>
                    <View style={{flex: 1, flexDirection: 'column'}}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            paddingTop: 10,
                            paddingBottom: 10,
                            alignItems: 'center'
                        }}>
                            <Text style={[{fontSize: 16, color: 'black',}, styles.row_left]}>学号</Text>
                            <Text style={[{fontSize: 16, color: 'black',}, styles.row_right]}>{this.state.number}</Text>
                        </View>
                        <View style={styles.separator}></View>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            paddingTop: 10,
                            paddingBottom: 10,
                            alignItems: 'center'
                        }}>
                            <Text style={[{fontSize: 16, color: 'black',}, styles.row_left]}>姓名</Text>
                            <Text style={[{fontSize: 16, color: 'black',}, styles.row_right]}>{this.state.name}</Text>
                        </View>
                        <View style={styles.separator}></View>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            paddingTop: 10,
                            paddingBottom: 10,
                            alignItems: 'center'
                        }}>
                            <Text style={[{fontSize: 16, color: 'black',}, styles.row_left]}>学院</Text>
                            <Text
                                style={[{fontSize: 16, color: 'black',}, styles.row_right]}>{this.state.academy}</Text>
                        </View>
                        <View style={styles.separator}></View>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            paddingTop: 10,
                            paddingBottom: 10,
                            alignItems: 'center'
                        }}>
                            <Text style={[{fontSize: 16, color: 'black',}, styles.row_left]}>院系</Text>
                            <Text
                                style={[{fontSize: 16, color: 'black',}, styles.row_right]}>{this.state.faculty}</Text>
                        </View>
                        <View style={styles.separator}></View>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            paddingTop: 10,
                            paddingBottom: 10,
                            alignItems: 'center'
                        }}>
                            <Text style={[{fontSize: 16, color: 'black',}, styles.row_left]}>班级</Text>
                            <Text style={[{fontSize: 16, color: 'black',}, styles.row_right]}>{this.state.class}</Text>
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
        backgroundColor: '#c0c0c0'
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