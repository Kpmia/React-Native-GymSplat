import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

const AuthManager = {
  login: async (email, password) => {
    const loginInfo = {
      method: "post",
      url: "http://gym-splat-backend.ue.r.appspot.com/login",
      data: { email: email, password: password },
      headers: { "Content-Type": "application/json" },
    };
    try {
      const response = await axios(loginInfo);
      const jsonValue = JSON.stringify(response.data);
      await AsyncStorage.setItem("@userInfo", jsonValue);
    } catch (e) {
      console.log(`Login error: ${e}`);
      return false;
    }
    return true;
  },

  getSignedInUser: async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@userInfo");
      console.log(jsonValue);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log("No currently signed in users");
      return null;
    }
  },
};

export default AuthManager;
