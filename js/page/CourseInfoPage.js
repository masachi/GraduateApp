/**
 * Created by sdlds on 2017/6/9.
 */
import React,{ Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image
} from 'react-native';
import PageComponent from './BackPageComponent';

export default class CourseInfoPage extends PageComponent{
    constructor(props){
        super(props);
        this.state = {

        };
    }

    render(){
        return (
            <View>
                <View>
                    <Image />
                    <Text>

                    </Text>
                </View>
                <View>
                    <Text>

                    </Text>
                </View>
                <View>
                    <Text>

                    </Text>
                </View>
                <View>
                    <Image/>
                </View>
            </View>
        );
    }
}
const style = StyleSheet.create({
    container:{

    },

    title: {

    },

    textInput: {

    },

    button: {

    },
});