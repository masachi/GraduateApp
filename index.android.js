/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component, PropTypes} from 'react';
import {AppRegistry} from 'react-native';
import Navigation from './js/config/entry';
import Pushy from 'pushy-react-native';


export default class JueJinClient extends Component {
    render() {
        return (
            <Navigation />
        );
    }
}

// Handle push notifications
Pushy.setNotificationListener(async (data) => {
    // Print notification payload data
    console.log('Received notification: ' + JSON.stringify(data));

    // Notification title
    let notificationTitle = 'Test';

    // Attempt to extract the "message" property from the payload: {"message":"Hello World!"}
    let notificationText = data.message || 'Test notification';

    // Display basic system notification
    Pushy.notify(notificationTitle, notificationText);
});

AppRegistry.registerComponent('JueJinClient', () => JueJinClient);
