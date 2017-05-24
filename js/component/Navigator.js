/**
 * Created by Masachi on 2017/4/15.
 */
import React, {Component} from 'react';
import {
    Navigator
} from 'react-native';
import SignInPage from '../page/SignInAndSignup/SignInPage';
import MainPage from '../page/MainPage';

export default class MyNavigator extends Component {
    constructor(props) {
        super(props);
        var routes = {
            signin:{
                component: SignInPage,
            },
            main: {
                component: MainPage,
            }

        };
        // 初始状态
        this.state = {
            route: routes,
        };
    }

    renderFirstView(){
        if(this.props.init){
            return this.state.route.main;
        }
        else{
            return this.state.route.signin;
        }
    }

    render() {
        return (
            <Navigator
                initialRoute={this.renderFirstView()}
                renderScene={(route, navigator) => {
                    return <route.component navigator={navigator} {...route.args}/>
                }}
            />
        );
    }
}