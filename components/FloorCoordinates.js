import React from "react"
import { alertIcons } from "../constants/Images"
import {
    View,
    Image,
    Text,
    Alert,
    ImageBackground,
    StyleSheet,
    Dimensions,
} from "react-native"
import ServerManager from "../screens/networking/ServerManager"

import LottieView from "lottie-react-native"
import Ball from "../assets/animation/loadingball.json"
import GymFloor from "../assets/imgs/GymFloorMapp.png"
import { ScrollView } from "react-native-gesture-handler"

let floorCoordinates = [
    {
        name: "Bench Press",
        id: "5e51ae1bbcd9906fb10d7b1f",
        x: 2048,
        y: 1697.25,
    },
    {
        name: "Bench Press",
        id: "5e51ae1bbcd9906fb10d7b1f",
        x: 1704,
        y: 1697.25,
    },
    {
        name: "Bench Press",
        id: "5e51ae1bbcd9906fb10d7b1f",
        x: 2402,
        y: 1697.25,
    },
    {
        name: "Bench Press",
        id: "5e51ae1bbcd9906fb10d7b1f",
        x: 2754,
        y: 1697.25,
    },
    { name: "Squat Rack", id: "5e51cfecec8232842354e422", x: 5331, y: 999 },
    { name: "Squat Rack", id: "5e51cfecec8232842354e422", x: 5331, y: 1302 },
    { name: "Squat Rack", id: "5e51cfecec8232842354e422", x: 5330, y: 1829 },
    { name: "Squat Rack", id: "5e51cfecec8232842354e422", x: 5330, y: 2157 },
    { name: "Squat Rack", id: "5e51cfecec8232842354e422", x: 5330, y: 2627 },
    { name: "Squat Rack", id: "5e51cfecec8232842354e422", x: 5330, y: 2627 },
    { name: "Squat Rack", id: "5e51cfecec8232842354e422", x: 5323, y: 2967 },
    { name: "Deadlift", id: "5e529e4a8ecdd949f006f2f5", x: 363, y: 1766 },
    { name: "Deadlift", id: "5e529e4a8ecdd949f006f2f5", x: 507, y: 1766 },
    { name: "Deadlift", id: "5e529e4a8ecdd949f006f2f5", x: 645, y: 1766 },
    { name: "Deadlift", id: "5e529e4a8ecdd949f006f2f5", x: 360, y: 2077 },
    { name: "Deadlift", id: "5e529e4a8ecdd949f006f2f5", x: 507, y: 2077 },
    { name: "Deadlift", id: "5e529e4a8ecdd949f006f2f5", x: 645, y: 2077 },
    { name: "Treadmill", id: "5e529e4a8ecdd949f006f2f5", x: 2099, y: 893 },
    { name: "Bike", id: "5e529e468ecdd949f006f2f4", x: 2364, y: 893 },
]

const FeedbackModal = machineInfo => {
    return Alert.prompt("Enter your feedback", null, text => {
        ServerManager.addFeedback(text, machineInfo.id)
    })
}

const width = 5644
const height = 4084

const CoordinateBadge = props => {
    const coordinate = props.item
    return (
        <View style={{ position: "absolute" }}>
            <Image
                source={alertIcons["info"]}
                title="Click"
                onTouchStart={() => {
                    Alert.prompt("Enter your feedback", null, text => {
                        ServerManager.addFeedback(text, coordinate.id)
                    })
                }}
                style={{
                    height: 58,
                    width: 50,
                    flex: 1,
                    left: coordinate.x,
                    top: coordinate.y,
                    position: "absolute",
                }}
            />
        </View>
    )
}

const GymMap = props => {
    return (
        <ScrollView vertical>
            <ScrollView
                minimumZoomScale={0.1}
                maximumZoomScale={0.5}
                horizontal
            >
                <ImageBackground
                    style={styles.containter}
                    source={GymFloor}
                    resizeMode="stretch"
                >
                    {floorCoordinates.map((coord, index) => (
                        <CoordinateBadge key={index} item={coord} />
                    ))}
                </ImageBackground>
            </ScrollView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    containter: {
        width: width, //for full screen
        height: height, //for full screen
    },
    fixed: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    scrollview: {
        backgroundColor: "transparent",
    },
})

export default GymMap
