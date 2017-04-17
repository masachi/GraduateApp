// /**
//  * Created by Masachi on 2017/4/14.
//  */
// import React, {Component} from 'react';
// import {AsyncStorage} from 'react-native';
// import Storage from 'react-native-storage';
// export var storage = new Storage({
//     size: 2,
//     storageBackend: AsyncStorage,
//     defaultExpires: 1000 * 3600 * 24 * 30,
//     enableCache: true,
// });
// export function initStorage() {
//     global.storage = storage;
//     storage.load({
//         key: 'loginState',
//     }).then((ret) => {
//             console.log("ret: " + ret);
//             if (!ret.isLoggedIn || ret === null) {
//                 storage.save({
//                     key: 'loginState',
//                     rawData: {
//                         username: '',
//                         isLoggedIn: 'false'
//                     }
//                 });
//             }
//         }
//     ).catch((err) => {
//         storage.save({
//             key: 'loginState',
//             rawData: {
//                 username: '',
//                 isLoggedIn: 'false'
//             }
//         });
//     });
//     // try{
//     //     AsyncStorage.getItem('loginState').then((value) => {
//     //         console.log(value);
//     //     })
//     // }catch (error){
//     //     AsyncStorage.setItem('loginState', 'false',(error) => {
//     //         console.log(error);
//     //     });
//     // }
// }