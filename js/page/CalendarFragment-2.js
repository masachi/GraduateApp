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

var moment = require('moment');

import {Agenda} from 'react-native-calendars';


const locale = {
    name: 'zh',
    config: {
        months: "一月 二月 三月 四月 五月 六月 七月 八月 九月 十月 十一月 十二月".split(" "),
        monthsShort: "一 二 三 四 五 六 七 八 九 十 十一 十二".split(" "),
        weekdays: "星期天 星期一 星期二 星期三 星期四 星期五 星期六".split(" "),
        weekdaysShort: "日 一 二 三 四 五 六".split(" "),
        week: {
            dow: 1, // Monday is the first day of the week.
        }
    }
};

export default class CalendarFragment extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            dataBlob: [],
            date: '',
            selectDay: [],
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            items: {}
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
        this.setState({dataSource: this.state.dataSource.cloneWithRows([1, 2, 3, 4])})
    }

    _renderRow(rowData) {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                marginHorizontal: 20,
                backgroundColor: '#fff',
                borderRadius: 8,
                borderColor: '#c0c0c0'
            }}>
                <View style={{flex: 1, paddingVertical: 10, flexDirection: 'row'}}>
                    <Text style={{fontSize: 16, color: 'black'}}>{rowData.course}</Text>
                    <Text style={{fontSize: 16, color: 'black', paddingLeft: 30}}>{rowData.date}</Text>
                    <Text style={{fontSize: 16, color: 'black', paddingLeft: 20}}>{rowData.type}</Text>
                </View>
                <View style={{flex: 1, paddingVertical: 10, flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <Text style={{fontSize: 14, color: 'grey', textAlign: 'right'}}>{rowData.location}</Text>
                    <Text
                        style={{fontSize: 14, color: 'grey', paddingLeft: 40, textAlign: 'right'}}>{rowData.time}</Text>
                </View>
            </View>
        );
    }

    _fetchDate() {
        let date_data = [];
        var date_url = 'http://182.254.152.66:10080/api.php?id=calendar&method=date_list';
        //alert(body);
        let dateBody = 'username=' + '1304010330';

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
                // result.data.forEach((value) => {
                //     date_data.push({
                //         "date": moment(value).format("YYYY-MM-DD"),
                //         "text": 'this time has a message',
                //     });
                // });
                // this.setState({selectDay: date_data});
                this.setState({selectDay: result.data});
            }
        }).catch((err) => {
            console.error(err);
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

    onDateChange(event) {
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

    renderItem(item) {
        return (
            <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
        );
    }

    loadItems(day) {
        setTimeout(() => {
            for (let i = -15; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = this.timeToString(time);
                if (!this.state.items[strTime]) {
                    this.state.items[strTime] = [];
                    const numItems = Math.floor(Math.random() * 5);

                    for (let j = 0; j < numItems; j++) {
                        this.state.items[strTime].push({
                            name: 'Item for ' + strTime,
                            height: Math.max(50, Math.floor(Math.random() * 150))
                        });
                    }
                }
            }
            //console.log(this.state.items);
            const newItems = {};
            Object.keys(this.state.items).forEach(key => {
                newItems[key] = this.state.items[key];
            });
            this.setState({
                items: newItems
            });
        }, 1000);
        // console.log(`Load Items for ${day.year}-${day.month}`);


        // const newItems = {};
        //
        // this.state.selectDay.forEach((value) => {
        //     newItems[value.date] = [{
        //         "text": value.text,
        //     }]
        // });
        //
        // this.setState({
        //     items: newItems
        // });
        // console.log(day);
    }

    timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }

    render() {
        return (
            <Agenda
                items={this.state.items}
                selected={moment().format('YYYY/MM/DD')}
                loadItemsForMonth={this.loadItems.bind(this)}
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
        flex: 1,
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
