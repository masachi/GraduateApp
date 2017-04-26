/**
 * Created by wangdi on 16/11/16.
 */
import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, Text, ScrollView, Switch, TouchableNativeFeedback, TouchableOpacity, Platform, PixelRatio, BackAndroid} from 'react-native';
import px2dp from '../util/px2dp';
import theme from '../config/theme';
import NavigationBar from '../component/SimpleNavigationBar';
import PageComponent from './BackPageComponent';
import About from './About';

export default class SettingPage extends PageComponent{
    constructor(props){
        super(props);
        this.state = {

        };
    }

    onPressAbout(){
        this.props.navigator.push({
            component: About,
        });
    }

    render(){
        return(
            <View style={{flex: 1, backgroundColor: theme.pageBackgroundColor}}>
                <NavigationBar title="设置" backOnPress={this._handleBack.bind(this)}/>
                <ScrollView>
                    <View style={styles.list}>
                        <Item text="关于" onPress={this.onPressAbout.bind(this)}/>
                    </View>
                    {/*--------------------------------------------------------------------------*/}
                </ScrollView>
            </View>
        );
    }
}

class Item extends Component{
    constructor(props){
        super(props);
        this.state = {
            switchIsOn: this.props.switcherValue
        };
    }

    static propTypes = {
        text: PropTypes.string.isRequired,
        textColor: PropTypes.string,
        subText: PropTypes.string,
        onPress: PropTypes.func,
        isHasSwitcher: PropTypes.bool,
        switcherValue: PropTypes.bool
    }

    static defaultProps = {
        textColor: '#000',
        switcherValue: false
    }

    render(){
        const {text, textColor, subText, onPress, isHasSwitcher, switcherValue} = this.props;

        if(Platform.OS === 'android'){
            return(
                <TouchableNativeFeedback onPress={onPress}>
                    <View style={styles.listItem}>
                        <Text style={{color: textColor, fontSize: px2dp(15)}}>{text}</Text>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text style={{color: "#ccc"}}>{subText}</Text>
                            { isHasSwitcher ?
                                <Switch
                                    onValueChange={(value) => this.setState({switchIsOn: value})}
                                    style={{marginLeft: px2dp(5)}}
                                    value={this.state.switchIsOn}/>
                                :
                                null
                            }
                        </View>
                    </View>
                </TouchableNativeFeedback>
            );
        }else if(Platform.OS === 'ios'){
            return(
                <TouchableOpacity onPress={onPress} activeOpacity={theme.btnActiveOpacity}>
                    <View style={styles.listItem}>
                        <Text style={{color: textColor, fontSize: px2dp(15)}}>{text}</Text>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems:'center'}}>
                            <Text style={{color: "#ccc"}}>{subText}</Text>
                            { isHasSwitcher ?
                                <Switch
                                    onValueChange={(value) => this.setState({switchIsOn: value})}
                                    style={{marginLeft: px2dp(5)}}
                                    value={this.state.switchIsOn}/>
                                :
                                null
                            }
                        </View>
                    </View>
                </TouchableOpacity>
            );
        }
    }
}

const styles = StyleSheet.create({
    list:{
        borderTopWidth: 1/PixelRatio.get(),
        borderTopColor: '#e4e4e4',
        marginTop: px2dp(12)
    },
    listItem: {
        flex: 1,
        height: px2dp(47),
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: px2dp(25),
        paddingRight: px2dp(25),
        borderBottomColor: '#c4c4c4',
        borderBottomWidth: 1/PixelRatio.get()
    },
});