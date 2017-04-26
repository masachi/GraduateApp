/**
 * Created by Masachi on 2017/4/26.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import NavigationBar from '../component/SimpleNavigationBar';
import PageComponent from './BackPageComponent';

export default class About extends PageComponent {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <NavigationBar title="关于" backOnPress={this._handleBack.bind(this)}/>
                <View style={styles.container}>
                    <Text style={styles.welcome}>
                        这个只是关于而已
                    </Text>
                    <Text style={styles.instructions}>
                        并没有什么东西
                    </Text>
                    <Text style={styles.instructions}>
                        返回
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    }
});

