/**
 * Created by Masachi on 2017/4/26.
 */
import React, {Component} from 'react';
import{
    View,
    Dimensions,
    ListView,
    Text,
    ToastAndroid,
    StyleSheet
} from 'react-native';

import PageComponent from './BackPageComponent';
import NavigationBar from '../component/SimpleNavigationBar';
import MaterCalendarView from '../config/NativeModule/MaterCalendar/RCTMaterialCalendarView';
import theme from '../config/theme';
import ListViewForOtherTab from '../component/SimpleListView';
import ListViewForHome from "../component/ListViewForHome";
var moment = require('moment');

import {Agenda} from 'react-native-calendars';


const locale = {
    name: 'zh',
    config: {
        months : "一月 二月 三月 四月 五月 六月 七月 八月 九月 十月 十一月 十二月".split(" "),
        monthsShort : "一 二 三 四 五 六 七 八 九 十 十一 十二".split(" "),
        weekdays : "星期天 星期一 星期二 星期三 星期四 星期五 星期六".split(" "),
        weekdaysShort : "日 一 二 三 四 五 六".split(" "),
        week : {
            dow : 1, // Monday is the first day of the week.
        }
    }
};

export default class CalendarFragment extends PageComponent {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            dataBlob: [],
            date: '',
            selectDay: [],
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        };

        this.getCurrentDay = this.getCurrentDay.bind(this);
        this._renderRow = this._renderRow.bind(this);
        this._fetchData = this._fetchData.bind(this);
        this.setData = this.setData.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this._fetchDate = this._fetchDate.bind(this);
    }

    getCurrentDay() {
        let date = new Date();
        let year = date.getYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        this.setState({currentDate: year + '/' + month + '/' + day});
    }

    // componentWillMount(){
    //     this.setState({date: moment().format("YYYY-MM-DD").toString()});
    // }

    componentDidMount() {
        this._fetchData(moment().format("YYYY-MM-DD").toString());
        this._fetchDate();
        this.setState({dataSource: this.state.dataSource.cloneWithRows([1,2,3,4])})
    }

    _renderRow(rowData) {
        return (
            <View style={{flex: 1, flexDirection: 'column', marginHorizontal: 20, backgroundColor: '#fff', borderRadius: 8, borderColor: '#c0c0c0'}}>
                <View style={{flex: 1, paddingVertical: 10, flexDirection: 'row'}}>
                    <Text style={{fontSize: 16, color: 'black'}}>{rowData.course}</Text>
                    <Text style={{fontSize: 16, color: 'black', paddingLeft: 30}}>{rowData.date}</Text>
                    <Text style={{fontSize: 16, color: 'black', paddingLeft: 20}}>{rowData.type}</Text>
                </View>
                <View style={{flex: 1, paddingVertical: 10, flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <Text style={{fontSize: 14, color: 'grey', textAlign: 'right'}}>{rowData.location}</Text>
                    <Text style={{fontSize: 14, color: 'grey', paddingLeft: 40,textAlign: 'right'}}>{rowData.time}</Text>
                </View>
            </View>
        );
    }

    _fetchDate(){
        let date_data = [];
        var date_url = 'http://182.254.152.66:10080/api.php?id=calendar&method=date_list';
        //alert(body);
        let dateBody = 'username=' + global.username;

        fetch(date_url, {
            timeout: 10000,
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: dateBody
        }).then((response) => {
            return response.json();
        }).then((result) => {
            //alert(result);
            if (result.code === 200) {
                result.data.forEach((value) => {
                    date_data.push(moment(value).format("YYYY/MM/DD"));
                });
                this.setState({selectDay: date_data});
            }
        }).catch((err) => {
            ToastAndroid.show('网络错误', 30000);
        });
    }

    _fetchData(date) {
        //alert(date);
        let data = [];
        let body = 'username=' + global.username + '&' + 'date=' + date;
        var url = 'http://182.254.152.66:10080/api.php?id=calendar&method=exam_list';

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
                this.setData();
            }
        }).catch((err) => {
            ToastAndroid.show('网络错误', 30000);
        });
    }

    setData() {
        this.setState({dataSource: this.state.dataSource.cloneWithRows(this.state.dataBlob)})

    }

    onDateChange(event){
        // this.setState({date: moment(event.date).format("YYYY-MM-DD")});

        this._fetchData(moment(event.date).format("YYYY-MM-DD"));
    }

    // render() {
    //     //alert(this.state.dataBlob.length);
    //     return (
    //         <View style={{flex: 1}}>
    //             <MaterCalendarView
    //                 width={(Dimensions.get('window').width)}
    //                 height={280}
    //                 tileHeight={35}
    //                 style={{alignSelf: 'center', backgroundColor: theme.actionBar.backgroundColor}}
    //                 topbarVisible={true}
    //                 datesSelection={'single'}
    //                 firstDayOfWeek="monday"
    //                 showOtherDates="none"
    //                 selectionColor="#e82225"
    //                 weekendsColor="#ffffff"
    //                 onDateChange={this.onDateChange}
    //                 eventsDates={this.state.selectDay}
    //                 currentDate={'2016/12/27'}
    //             />
    //             <ListView
    //                 style={{marginTop: 10}}
    //                 renderRow={this._renderRow}
    //                 dataSource={this.state.dataSource}
    //                 renderSeparator={() => <View style={{height: 20, backgroundColor: '#f4f4f4'}}/>}
    //             />
    //         </View>
    //     );
    // }

    rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }

    renderEmptyDate() {
        return (
            <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
        );
    }

    renderItem(item){
        return (
            <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
        );
    }

    // loadItems(day){
    //
    // }

    render(){
        return(
            <Agenda
                items={
                    {
                        '2017-05-22': [{text: 'item 1 - any js object'}],
                        '2017-05-23': [{text: 'item 2 - any js object'}],
                        '2017-05-24': [],
                        '2017-05-25': [{text: 'item 3 - any js object'},{text: 'any js object'}],
                    }}
                selected={moment().format('YYYY/MM/DD')}
                renderItem={this.renderItem.bind(this)}
                renderEmptyDate={this.renderEmptyDate.bind(this)}
                rowHasChanged={this.rowHasChanged.bind(this)}
            />
        );
    }

}
const styles = StyleSheet.create({
    course: {
        fontSize: 16,
        color: 'black'
    },
    time: {
        fontSize: 16,
        color: 'red'
    },
    date: {
        fontSize: 16,
        color: 'grey'
    },
    location: {
        fontSize: 14,
        color: 'grey'
    },
    type: {
        fontSize: 16,
        color: 'grey'
    },
    emptyDate: {
        height: 15,
        flex:1,
        paddingTop: 30
    },
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
});