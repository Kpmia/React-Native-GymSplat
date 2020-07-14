import axios from "axios"
import AuthManager from "./AuthManager"
// import UUIDGenerator from "react-native-uuid-generator"

const ws = new WebSocket("wss://gymsplat.ngrok.io/")
var onMessage = message => {}

ws.onopen = () => {
    var request = { action: "OBSERVE" }
    ws.send(JSON.stringify(request))
}

ws.onmessage = message => {
    const queueData = JSON.parse(message.data)
    onMessage(queueData)
}

const makeWorkout = async machine => {
    return {
        id: "67dgsjfgsdsjdhxxdsjfhdfjjfdddhdd4djfhje37", //await UUIDGenerator.getRandomUUID(),
        user: await AuthManager.getSignedInUser(),
        duration: 5,
        allowsWorkIns: false,
        machine: machine.id,
    }
}

const ServerManager = {
    getMachines: async () => {
        try {
            const response = await axios.get(
                "https://gym-splat-backend.ue.r.appspot.com/machines"
            )
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
