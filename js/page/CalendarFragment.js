/**
 * Created by Masachi on 2017/4/26.
 */
import React, {Component} from 'react';
import{
    View,
    Dimensions,
    ListView,
    Text,
    ToastAndroid
} from 'react-native';

import PageComponent from './BackPageComponent';
import NavigationBar from '../component/SimpleNavigationBar';
import MaterCalendarView from '../config/NativeModule/MaterCalendar/RCTMaterialCalendarView';
import theme from '../config/theme';
import ListViewForOtherTab from '../component/SimpleListView';
import ListViewForHome from "../component/ListViewForHome";
var moment = require('moment');

export default class CalendarFragment extends PageComponent {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            dataBlob: [],
            date: moment().format("YYYY-MM-DD"),
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        };

        this.getCurrentDay = this.getCurrentDay.bind(this);
        this._renderRow = this._renderRow.bind(this);
        this._changeDate = this._changeDate.bind(this);
        this._fetchData = this._fetchData.bind(this);
    }

    getCurrentDay(){
        let date = new Date();
        let year = date.getYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        this.setState({currentDate: year + '/' + month + '/' + day});
    }

    componentDidMount() {
        this._fetchData();
        //this.setState({dataSource: this.state.dataSource.cloneWithRows([1,2,3,4])});
    }

    _renderRow(){
        return (
            <View>

            </View>
        );
    }
    _changeDate(data){
        //alert(moment(data.date).format('YYYY-MM-DD'));
        this.setState({date: moment(data.date).format('YYYY-MM-DD')});
        this._fetchData();
    }

    _fetchData(){
        let data = [];
        let body = 'username=' + global.username + '&' + 'date=' + this.state.date;
        var url = 'http://182.254.152.66:10080/api.php?id=calendar&method=exam_list';
        //alert(body);
        fetch(url, {
            timeout: 10000,
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: body
        }).then((response) => {
            return response.json();
        }).then((result) => {
                //alert(result);
                if (result.code === 200) {
                    result.data.forEach((value) => {
                        data.push(value);
                    });
                    this.setState({dataBlob: data});
                    this.setState({dataSource: this.state.dataSource.cloneWithRows(this.state.dataBlob)})
                }
            })
            .catch((err) => {
                ToastAndroid.show('网络错误', 30000);
            });
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
                    renderRow={this._renderRow}
                    dataSource={this.state.dataSource}
                />
            </View>
        );
    }


}