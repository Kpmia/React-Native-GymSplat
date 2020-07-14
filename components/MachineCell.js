import React, { useState } from "react"
import { machineImages } from "../constants/Images"
import { View, Button, Text, Image, StyleSheet } from "react-native"
import ServerManager from "../screens/networking/ServerManager"

const removeFromQueue = (ws, workoutId, machineId) => {
    const data = {
        id: workoutId,
        machine: machineId,
    }
    const deleteAction = JSON.stringify({ workout: data, action: "DELETE" })

    ws.send(deleteAction)
}

const reserveMachine = (ws, machine) => {
    const data = {
        id: "67dgsjfgsdsjdhxxdsjfhdfjjfdddhdd4djfhje37",
        // user: {
        //   _id: this.state.uid,
        //   email: this.state.email,
        //   firstName: this.state.firstName,
        //   lastName: this.state.lastName,
        // },
        duration: 5,
        peopleCount: 1,
        allowsWorkIns: false,
        machine: machine.id,
    }
    const action = JSON.stringify({ workout: data, action: "ADD" })
    ws.send(action)
    alert("Reserved")
}

const MachineCell = props => {
    const [reserved, setReserved] = useState(false)
    const queue = []
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
