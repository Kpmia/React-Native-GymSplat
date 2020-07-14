import axios from "axios"
<<<<<<< HEAD
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
=======
import AuthManager from './AuthManager';


// ('wss://gym-splat-backend.ue.r.appspot.com/feedback/add')
// ('wss://gym-splat-backend.ue.r.appspot.com/feedback/add')

const ServerManager = {

  addFeedback: async(comment, machineId) => {
    try {
      const feedback = {
        method: "post",
        url: "http://gym-splat-backend.ue.r.appspot.com/feedback/add",
        data: { machineId: machineId, text: comment },
        headers: { "Content-Type": "application/json" },
      };
      const response = await axios(feedback);
      console.log(response.data)
      
    } catch (e) {
      console.log(e)
      return null
    }
  },
  
  getMachines: async () => {
      var joined = []
      try {
        const response = await axios.get(
          "https://gym-splat-backend.ue.r.appspot.com/machines"
        )
        AuthManager.getSignedInUser().then(userInfo => {
          for (let i in response.data) {
            var position = 0
            const data = response.data[i]
            const machineData = {
              name: data.name,
              id: data._id,
              queue: data.queue,
              status: false,
            }
            joined.push(machineData)
            for (let j in response.data[i].queue) {
              position += 1
              if (response.data[i].queue[j].user._id == userInfo.user._id) {
                machineData["position"] = position
                machineData["status"] = true
                machineData["workoutId"] = response.data[i].queue[j].id
              }
            }
          }
        })
        return joined
      } catch (e) {
        console.log(e)
        return null
    }
  },
>>>>>>> 42f800ef7a8ac7e14dad0381c79732069d65b81a
}

export default ServerManager
