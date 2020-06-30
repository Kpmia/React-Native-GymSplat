import React from "react"
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  View,
  Text,
  Button,
  Easing,
} from "react-native"

import GymFloor from "../assets/imgs/GymFloorMapp.png"
import ScrollBottomSheet from "react-native-scroll-bottom-sheet"

import AuthManager from "./networking/AuthManager"
import ServerManager from "./networking/ServerManager"
import MachineCell from "../components/MachineCell"

const { width } = Dimensions.get("screen")
const windowHeight = Dimensions.get("window").height

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      uid: "",
      firstName: "",
      lastName: "",
      email: "",
      machines: [],
    }
  }

  componentDidMount() {
    AuthManager.getSignedInUser().then(userData => {
      this.setState({ firstName: userData.user.firstName })
      this.setState({ lastName: userData.user.lastName })
      this.setState({ email: userData.user.email })
      this.setState({ uid: userData.user._id })
    })

    ServerManager.getMachines().then(machineData => {
      if (machineData != null) {
        this.setState({ machines: machineData })
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView vertical>
          <ScrollView minimumZoomScale={1} maximumZoomScale={3} horizontal>
            <Image
              style={{ width: 1300, height: 1100 }}
              source={GymFloor}
              resizeMode="stretch"
            />
          </ScrollView>
        </ScrollView>

        <ScrollBottomSheet
          componentType="FlatList"
          snapPoints={[128, "50%", windowHeight - 200]}
          initialSnapIndex={1}
          animationConfig={{
            duration: 150,
            easing: Easing.linear, // Elastic would look cool
          }}
          renderHandle={() => (
            <View style={styles.header}>
              <Text
                style={{
                  marginLeft: 15,
                  marginTop: 15,
                  color: "#FFF",
                  fontWeight: "bold",
                  fontSize: 30,
                  textAlign: "left",
                }}>
                {" "}
                {"Hi " + this.state.firstName + " " + this.state.lastName + "!"}
              </Text>
              <Text
                style={{
                  marginLeft: 20,
                  marginTop: 15,
                  color: "#FFF",
                  fontWeight: "lighter",
                  fontSize: 15,
                  textAlign: "left",
                }}>
                It is not too busy.
              </Text>
              <Text
                style={{
                  marginLeft: 20,
                  marginTop: 15,
                  color: "#FFFF",
                  fontSize: 23,
                  textAlign: "left",
                  fontWeight: "bold",
                }}>
                Reserve equipment
              </Text>
              <View style={styles.panelHandle} />
            </View>
          )}
          data={this.state.machines}
          keyExtractor={i => i.id}
          renderItem={item => (
            <View style={{ margin: 8 }}>
              <MachineCell machine={item} />
              <View style={styles.lineSeparater} />
            </View>
          )}
          contentContainerStyle={styles.contentContainerStyle}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
    backgroundColor: "black",
  },
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  contentContainerStyle: {
    padding: 16,
    backgroundColor: "rgb(57, 57, 57)",
  },
  header: {
    alignItems: "flex-start",
    backgroundColor: "rgb(57, 57, 57)",
    paddingVertical: 20,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  panelHandle: {
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 4,
  },
  item: {
    padding: 10,
    backgroundColor: "rgb(57, 57, 57)",
    alignItems: "center",
  },
  lineSeparater: {
    justifyContent: "center",
    borderRadius: 2,
    opacity: 0.14,
    backgroundColor: "#FFFF",
    height: 1,
    marginTop: 4,
  },
})

export default Home
