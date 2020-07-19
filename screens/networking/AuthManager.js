import axios from "axios"
import AsyncStorage from "@react-native-community/async-storage"

const AuthManager = {
    login: async (email, password) => {
        const loginInfo = {
            method: "post",
            url: "http://gym-splat-backend.ue.r.appspot.com/login",
            data: { email: email, password: password },
            headers: { "Content-Type": "application/json" },
        }
        try {
            const response = await axios(loginInfo)
            const jsonValue = JSON.stringify(response.data)
            await AsyncStorage.setItem("@userInfo", jsonValue)
        } catch (e) {
            console.log(`Login error: ${e}`)
            return false
        }
        return true
    },

    signUp: async (email, password, firstName, lastName) => {
        const signUp = {
            method: "POST",
            url: "http://gym-splat-backend.ue.r.appspot.com/signUp",
            data: {
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
            },
            headers: { "Content-Type": "application/json" },
        }
        try {
            const response = await axios(signUp)
            const jsonValue = JSON.stringify(response.data)
            await AsyncStorage.setItem("@userInfo", jsonValue)
        } catch (e) {
            console.log(`Login error: ${e}`)
            return false
        }
        return true
    },

    getSignedInUser: async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("@userInfo")
            // console.log(jsonValue);
            return jsonValue != null ? JSON.parse(jsonValue) : null
        } catch (e) {
            console.log("No currently signed in users")
            return null
        }
    },

    logUserOut: async () => {
        try {
            await AsyncStorage.clear()
            console.log("Logged user out")
        } catch (e) {
            console.log("Something went wrong.")
            return null
        }
    },
}

export default AuthManager
