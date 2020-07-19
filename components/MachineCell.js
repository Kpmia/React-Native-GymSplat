import React, { useState } from "react"
import { machineImages } from "../constants/Images"
import { View, Button, Text, Image, StyleSheet } from "react-native"
import AuthManager from "../screens/networking/AuthManager"
import ServerManager from "../screens/networking/ServerManager"

const MachineCell = props => {
    const [reserved, setReserved] = useState(false)
    const [queue, setQueue] = useState([])

    const machine = props.machine.item

    return (
        <View style={styles.item}>
            <Image
                style={styles.machineImage}
                source={machineImages[machine.name]}
            />

            <View>
                <Text style={styles.nameText}>{machine.name} </Text>
                <Text style={styles.statusText}>
                    {reserved
                        ? "You are " + machine.position + " in line "
                        : ""}
                </Text>
                <Text style={styles.statusText}>
                    {queue.length == 1
                        ? "1 person in line"
                        : queue.length + " people in line"}
                </Text>
            </View>

            <Button
                title={reserved ? "Remove" : "Reserve"}
                onPress={() => {
                    reserved
                        ? ServerManager.removeWorkout()
                        : ServerManager.addWorkout(machine)

                    setReserved(old => !old)
                }}
            ></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        // backgroundColor: "blue", //"rgb(57, 57, 57)",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    machineImage: {
        width: 70,
        height: 70,
    },
    nameText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 23,
    },
    statusText: {
        color: "white",
        fontWeight: "normal",
        fontSize: 15,
    },
})

export default MachineCell
