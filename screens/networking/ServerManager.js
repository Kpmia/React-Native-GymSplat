import axios from "axios"
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
}

export default ServerManager
