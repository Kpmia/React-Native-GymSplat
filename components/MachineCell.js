import React, { useState } from "react"
import { machineImages } from "../constants/Images"
import { View, Button, Text, Image, StyleSheet } from "react-native"
import AuthManager from '../screens/networking/AuthManager';
import ServerManager from '../screens/networking/ServerManager'
import axios from 'axios';

const random = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

const removeFromQueue = (ws, workoutId, machineId) => {
  const data = {
    id: workoutId,
    machine: machineId,
  }
  const deleteAction = JSON.stringify({ workout: data, action: "DELETE" })
  ws.send(deleteAction)
  alert('Removed!')
}

const reserveMachine = (ws, machine) => {
  AuthManager.getSignedInUser().then(userData => {
    const data = {
      id: random,
      user: { _id: userData.user._id, email: userData.user.email, firstName: userData.user.firstName, lastName: userData.user.lastName},
      duration: 5,
      peopleCount: 1,
      allowsWorkIns: false,
      machine: machine.id,
    }
    const action = JSON.stringify({ workout: data, action: "ADD" })
    ws.send(action)
    alert("Reserved")
  })
}


const MachineCell = props => {

  const ws = new WebSocket('https://gym-splat-backend.ue.r.appspot.com/')
  
  var machine = props.machine.item

  if (machine.position == 1) {
    position = "1st"
  } else {
    position = machine.position
  }

  return (
    <View style={styles.item}>
      <Image style={styles.machineImage} source={machineImages[machine.name]} />
      <View>
        <Text style={styles.nameText}> {machine.name} </Text>
        <Text style={styles.statusText}>
          {machine.status ? "You are " + position + " in line " : ""}
        </Text>
        <Text style={styles.statusText}>
          {machine.queue.length == 1
            ? "1 person in line"
            : machine.queue.length + " people in line"}
        </Text>
      </View>

      <Button
        title={machine.status ? "Remove" : "Reserve"}
        onPress={() => {
          machine.status
            ? removeFromQueue(ws, machine.workoutId, machine.id)
            : reserveMachine(ws, machine)

        }}></Button>
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
