/**
 * Created by Masachi on 2017/4/26.
 */
import React, {Component} from 'react';
import{
    View,
    Dimensions,
    ListView,
    Text
} from 'react-native';

import PageComponent from './BackPageComponent';
import NavigationBar from '../component/SimpleNavigationBar';
import MaterCalendarView from '../config/NativeModule/MaterCalendar/RCTMaterialCalendarView';
import theme from '../config/theme';
import ListViewForOtherTab from '../component/SimpleListView';
import ListViewForHome from "../component/ListViewForHome";

export default class CalendarFragment extends PageComponent {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            dataBlob: [],
        };

        this.getCurrentDay = this.getCurrentDay.bind(this);
    }

    getCurrentDay(){
        let date = new Date();
        let year = date.getYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        this.setState({currentDate: year + '/' + month + '/' + day});
    }

    componentDidMount() {
        this.getCurrentDay();
    }

    _renderRow(){
        return (
            <View>
                <Text>

                </Text>
                <Text>

                </Text>
                <Text>

                </Text>
            </View>
        );
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <MaterCalendarView
                    width={(Dimensions.get('window').width)}
                    height={280}
                    tileHeight={35}
                    style={{alignSelf: 'center', backgroundColor: theme.actionBar.backgroundColor}}
                    topbarVisible={true}
                    datesSelection={'single'}
                    firstDayOfWeek="monday"
                    showOtherDates="none"
                    selectionColor="#e82225"
                    weekendsColor="#ffffff"
                    onDateChange={data => {

                    }}
                />
                <ListView
                    renderRow={}
                />
            </View>
        );
    }


}