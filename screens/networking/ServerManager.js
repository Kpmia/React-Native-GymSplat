import axios from "axios"
import AuthManager from "./AuthManager"

const baseUrl = __DEV__
    ? "http://gymsplat.ngrok.io"
    : "http://gym-splat-backend.ue.r.appspot.com"

const socketUrl = __DEV__
    ? "wss://gymsplat.ngrok.io"
    : "wss://gym-splat-backend.ue.r.appspot.com/"

const ws = new WebSocket(socketUrl)

var onMessage = message => {}

ws.onopen = () => {
    console.log("Observe")
    var request = { action: "OBSERVE" }
    ws.send(JSON.stringify(request))
}

ws.onmessage = message => {
    const queueData = JSON.parse(message.data)
    onMessage(queueData)
}

const makeWorkout = async machine => {
    const userData = await AuthManager.getSignedInUser()
    return {
        id: "67dgsjfgsdsjdhxxdsjfhdfjjfdddhdd4djfhje37", //await UUIDGenerator.getRandomUUID(),
        user: userData.user,
        duration: 5,
        allowsWorkIns: false,
        machine: machine.id,
    }
}

const removeFromQueue = (ws, workoutId, machineId) => {
    const data = {
        id: workoutId,
        machine: machineId,
    }
    const deleteAction = JSON.stringify({ workout: data, action: "DELETE" })
    ws.send(deleteAction)
    alert("Removed!")
}

const ServerManager = {
    addFeedback: async (comment, machineId) => {
        try {
            const feedback = {
                method: "post",
                url: `${baseUrl}/feedback/add`,
                data: { machineId: machineId, text: comment },
                headers: { "Content-Type": "application/json" },
            }
            const response = await axios(feedback)
            // console.log(response.data)
        } catch (e) {
            console.log(e)
            return null
        }
    },

    getMachines: async () => {
        try {
            const response = await axios.get(`${baseUrl}/machines`)
            var joined = []
            for (let i in response.data) {
                const data = response.data[i]
                const machineData = {
                    name: data.name,
                    id: data._id,
                    queue: data.queue,
                    status: false,
                }
                joined.push(machineData)
            }

            return joined
        } catch (e) {
            console.log(e)
            return null
        }
    },

    setOnMessage: callback => {
        onMessage = callback
    },

    addWorkout: async machine => {
        const workout = await makeWorkout(machine)
        const request = { workout: workout, action: "ADD" }
        ws.send(JSON.stringify(request))
    },

    removeWorkout: () => {},
}

export default ServerManager
