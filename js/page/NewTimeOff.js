/**
 * Created by Masachi on 2017/6/19.
 */
import React, { Component } from 'react'
import{
    View,
    TextInput,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    DeviceEventEmitter
} from 'react-native';

import PageComponent from './BackPageComponent';
import px2dp from '../util/px2dp';
import NavigationBar from '../component/SimpleNavigationBar';
import * as theme from '../config/theme';
import Toast from 'react-native-root-toast';

export default class NewTimeOff extends PageComponent{
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            text: '',
            type: '',
            loading: false
        };
      }

      _fetchData(){
          if(this.state.type.length > 0 && this.state.text.length > 0) {
              let data = [];
              let body = 'username=' + global.username + '&' + 'date=' + this.props.date + '&' + 'course=' + this.props.data.course + '&' + 'type=' + this.state.type + '&' + 'timeoff=' + this.state.text;
              var url = 'http://182.254.152.66:10080/api.php?id=user&method=timeoff';
              //alert(body);
              this.setState({loading: true});
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
                      this.setState({loading: false});
                      if (result.code === 200) {
                          this.props.callback();
                          this.props.navigator.pop();
                      }
                      else {
                          Toast.show('字数超出限制', {
                              duration: 3000,
                              position: Toast.positions.BOTTOM,
                              shadow: true,
                              animation: true,
                              hideOnPress: true,
                              delay: 0,
                          });
                      }
                  })
                  .catch((err) => {
                      this.setState({loading: false});
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
          else{
              Toast.show('请填写内容', {
                  duration: 3000,
                  position: Toast.positions.BOTTOM,
                  shadow: true,
                  animation: true,
                  hideOnPress: true,
                  delay: 0,
              });
          }
      }

    render(){
        let rowData = this.props.data;
          return (
              <View style={{flex: 1}}>
                  <NavigationBar title="请假" backOnPress={this._handleBack.bind(this)}/>
                  <ScrollView style={{paddingHorizontal: 10, paddingVertical: 10}}>
                      <View style={{flex: 1, flexDirection: 'column'}}>
                          <View style={{
                              flex: 1,
                              flexDirection: 'row',
                              paddingTop: 10,
                              paddingBottom: 10,
                              borderRadius: 8,
                              borderColor: '#c0c0c0',
                              backgroundColor: '#fff'
                          }}>
                              <Text style={[{fontSize: 16, color: 'black',}, styles.row_left]}>课程：</Text>
                              <Text style={[{fontSize: 16, color: 'black',}, styles.row_right]}>{rowData.course}</Text>
                          </View>
                          <View style={styles.separator}></View>
                          <View style={{
                              flex: 1,
                              flexDirection: 'row',
                              paddingTop: 10,
                              paddingBottom: 10,
                              alignItems: 'center',
                              borderRadius: 8,
                              borderColor: '#c0c0c0',
                              backgroundColor: '#fff'
                          }}>
                              <Text style={[{fontSize: 16, color: 'black',}, styles.row_left]}>老师：</Text>
                              <Text style={[{fontSize: 16, color: 'black',}, styles.row_right]}>{rowData.teacher}</Text>
                          </View>
                          <View style={styles.separator}></View>
                          <View style={{
                              flex: 1,
                              flexDirection: 'row',
                              paddingTop: 10,
                              paddingBottom: 10,
                              borderRadius: 8,
                              borderColor: '#c0c0c0',
                              backgroundColor: '#fff'
                          }}>
                              <Text style={[{fontSize: 16, color: 'black',}, styles.row_left]}>时间：</Text>
                              <Text style={[{fontSize: 16, color: 'black',}, styles.row_right]}>{this.props.date}</Text>
                          </View>
                          <View style={styles.separator}></View>
                          <View style={{
                              flex: 1,
                              flexDirection: 'row',
                              paddingTop: 10,
                              paddingBottom: 10,
                              borderRadius: 8,
                              borderColor: '#c0c0c0',
                              backgroundColor: '#fff',
                              justifyContent: 'center',
                              alignItems: 'center'
                          }}>
                              <Text style={[{fontSize: 16, color: 'black',textAlign: 'center'}, styles.row_left]}>请假事项：</Text>
                              <TextInput style={[styles.row_right, {textAlignVertical: 'top', flex: 1, width: 100}]}
                                         underlineColorAndroid="transparent"
                                         multiline = {true}
                                         onChangeText={(type) => this.setState({type})}
                                         placeholder={'请输入事项'}>
                              </TextInput>
                          </View>
                          <View style={styles.separator}></View>
                      </View>
                      <View style={{
                          flex: 1,
                          flexDirection: 'row',
                          paddingTop: 10,
                          paddingBottom: 10,
                          borderRadius: 8,
                          borderColor: '#c0c0c0',
                          backgroundColor: '#fff'
                      }}>
                          <Text style={[{fontSize: 16, color: 'black',}, styles.row_left]}>原因：</Text>
                      </View>
                      <View style={{
                          flex: 1,
                          flexDirection: 'row',
                          paddingTop: 10,
                          paddingBottom: 10,
                          borderRadius: 8,
                          borderColor: '#c0c0c0',
                          backgroundColor: '#fff'
                      }}>
                          <TextInput style={{flex: 1,textAlignVertical: 'top', height: 200}}
                                     underlineColorAndroid="transparent"
                                     multiline = {true}
                                     onChangeText={(text) => this.setState({text})}
                                     placeholder={'请输入原因'}>
                          </TextInput>
                      </View>
                      <View style={styles.separator}></View>
                      {/*<View style={{height: 50, alignItems: 'center', flexDirection: 'row', marginBottom: 10}}*/}
                            {/*visible={false}>*/}
                          {/*<TouchableOpacity style={{width: 100, borderRadius: 4,marginLeft: 20,marginRight: 20, justifyContent: 'center', borderColor: 'rgb(22,131,251)', borderWidth: 2}}>*/}
                              {/*<Text style={{color: 'grey', fontSize: 20, textAlign: 'center'}}>上传照片</Text>*/}
                          {/*</TouchableOpacity>*/}
                      {/*</View>*/}
                  </ScrollView>
                  <View style={{height: 50, alignItems: 'stretch', flexDirection: 'row', marginBottom: 10}}>
                      <TouchableOpacity style={{flex: 1, backgroundColor: 'rgb(22,131,251)', borderRadius: 4,marginLeft: 20,marginRight: 20, justifyContent: 'center'}}
                                        onPress={this._fetchData.bind(this)}>
                          {
                              !this.state.loading ?
                              <Text style={{color: 'white', fontSize: 20, textAlign: 'center'}}>提交</Text> :
                              <ActivityIndicator color='white'/>
                          }
                      </TouchableOpacity>
                  </View>
              </View>
          );
    }
}
const styles  =StyleSheet.create({
    item: {
        flex: 1,
        height: px2dp(80),
        backgroundColor: '#fff',
        marginHorizontal: 15,
        borderColor: '#c0c0c0',
        borderRadius: 8
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
    separator: {
        height: 10,
        backgroundColor: 'transparent'
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