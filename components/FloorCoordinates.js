import React from 'react';
import { alertIcons } from '../constants/Images';
import { View, Image, Text, Alert } from 'react-native';
import ServerManager from '../screens/networking/ServerManager';

import LottieView from 'lottie-react-native';
import Ball from '../assets/animation/loadingball.json'

let floorCoordinates = [
    { name: "Bench Press", id: '5e51ae1bbcd9906fb10d7b1f', x: 2048, y:1697.25 },
    { name: "Bench Press", id: '5e51ae1bbcd9906fb10d7b1f', x: 1704, y: 1697.25},
    { name: "Bench Press", id: '5e51ae1bbcd9906fb10d7b1f', x: 2402, y: 1697.25 },
    { name: "Bench Press", id: '5e51ae1bbcd9906fb10d7b1f', x: 2754, y: 1697.25 },
    { name: "Squat Rack", id: '5e51cfecec8232842354e422', x: 5331, y: 999, },
    { name: "Squat Rack", id: '5e51cfecec8232842354e422', x: 5331, y: 1302, },
    { name: "Squat Rack", id: '5e51cfecec8232842354e422', x: 5330, y: 1829, },
    { name: "Squat Rack", id: '5e51cfecec8232842354e422', x: 5330, y: 2157, },
    { name: "Squat Rack", id: '5e51cfecec8232842354e422', x: 5330, y: 2627,},
    { name: "Squat Rack", id: '5e51cfecec8232842354e422', x: 5330, y: 2627, },
    { name: "Squat Rack", id: '5e51cfecec8232842354e422', x: 5323, y: 2967, },
    { name: "Deadlift", id: "5e529e4a8ecdd949f006f2f5", x: 363, y: 1766, },
    { name: "Deadlift", id: "5e529e4a8ecdd949f006f2f5", x: 507, y: 1766, },
    { name: "Deadlift", id: "5e529e4a8ecdd949f006f2f5",  x: 645, y: 1766, },
    { name: "Deadlift", id: "5e529e4a8ecdd949f006f2f5", x: 360, y: 2077,},
    { name: "Deadlift", id: "5e529e4a8ecdd949f006f2f5", x: 507, y: 2077, },
    { name: "Deadlift", id: "5e529e4a8ecdd949f006f2f5", x: 645, y: 2077, },
    { name: "Treadmill", id: "5e529e4a8ecdd949f006f2f5", x: 2099, y: 893, },
    { name: "Bike", id: "5e529e468ecdd949f006f2f4", x: 2364, y: 893, }
]

const FeedbackModal = (machineInfo) => {
    return (
        Alert.prompt('Enter your feedback', null, (text) => {
            ServerManager.addFeedback(text, machineInfo.id)
            }
        )
    )
}
  
const FloorCoordinates = (...props) => {
    return (
        floorCoordinates.map(info => {
            return (
            <View style={{position: 'absolute'}}>
                <Image 
                source={alertIcons["info"]} 
                title="Click" 
                onTouchStart={() =>  { FeedbackModal(info)} }
                style={{height: 58, width: 50, left: info.x, top: info.y, 
                position: 'absolute'}} 
                />
                </View>  
            )
        })
    )
}



export default FloorCoordinates;