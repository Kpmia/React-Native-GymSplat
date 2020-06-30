import { AsyncStorage } from "react-native";

import BenchPress from "../assets/machines/bench-press.png";
import Deadlift from "../assets/machines/deadlift.png";
import Bike from "../assets/machines/bike.png";
import Treadmill from "../assets/machines/treadmill.png";
import { Easing } from "react-native-reanimated";

const imageUrls = {
  "Bench Press": "../assets/machines/bench-press.png",
  Treadmill: "../assets/machines/treadmill.png",
  Deadlift: "../assets/machines/deadlift.png",
  Bike: "../assets/machines/bike.png",
};

export const ServerManager = {
  getMachines: async () => {
    try {
      const response = await axios.get(
        "https://gym-splat-backend.ue.r.appspot.com/machines"
      );
      var joined = [];
      for (let i in res.data) {
        const name = res.data[i].name;
        const imageUrl = imageUrls[name];
        const machineData = {
          position: "",
          img: img,
          name: name,
          id: res.data[i]._id,
          queue: res.data[i].queue,
          status: false,
        };
        joined.push(machineData);
      }

      return joined;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
};
