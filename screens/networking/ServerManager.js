import axios from "axios"

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
}

export default ServerManager
