import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  View,
  Modal,
  Text,
  Platform,
  TouchableOpacity,
  Button,
} from "react-native";

import GymFloor from "../assets/imgs/GymFloorMapp.png";
import ScrollBottomSheet from "react-native-scroll-bottom-sheet";
import Storage from "react-native-storage";
import AsyncStorage from "@react-native-community/async-storage";

import AuthManager from "./networking/AuthManager";
import AuthManager, { ServerManager } from "./networking/ServerManager";

const { width } = Dimensions.get("screen");
const windowHeight = Dimensions.get("window").height;

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      uid: "",
      firstName: "",
      lastName: "",
      email: "",
      machines: [],
    };
  }

  reserveMachine(event) {
    let ws = new WebSocket("wss://gym-splat-backend.ue.r.appspot.com/");
    ws.onopen = () => {
      const data = {
        id: "67dgsjfgsdsjdhxxdsjfhdfjjfdddhdd4djfhje37",
        user: {
          _id: this.state.uid,
          email: this.state.email,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
        },
        duration: 5,
        peopleCount: 1,
        allowsWorkIns: false,
        machine: event.id,
      };

      const newData = JSON.stringify({ workout: data, action: "ADD" });

      ws.send(newData);

      ws.onmessage = (message) => {};
      alert("Added to the Queue!");
      this.getMachines();
    };
  }

  removeMachine(event) {
    var ws = new WebSocket("wss://gym-splat-backend.ue.r.appspot.com/");

    ws.onopen = () => {
      const data = {
        id: event.itemId,
        machine: event.id,
      };
      const deleteAction = JSON.stringify({ workout: data, action: "DELETE" });

      ws.send(deleteAction);
      ws.onmessage = (message) => {
        console.log(JSON.parse(message.data));
      };

      alert("Removed!");

      this.getMachines();
    };
  }

  componentDidMount() {
    AuthManager.getSignedInUser().then((userData) => {
      this.setState({ firstName: userData.user.firstName });
      this.setState({ lastName: userData.user.lastName });
      this.setState({ email: userData.user.email });
      this.setState({ uid: uuserData.user._id });
    });

    ServerManager.getMachines().then((machineData) => {
      if (machineData != null) {
      }
    });
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

        <ScrollBottomSheet // If you are using TS, that'll infer the renderItem `item` type
          componentType="FlatList"
          snapPoints={[128, "50%", windowHeight - 200]}
          initialSnapIndex={1}
          animationConfig={{
            duration: 150,
            easing: Easing.inOut(Easing.linear),
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
                }}
              >
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
                }}
              >
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
                }}
              >
                Reserve equipment
              </Text>
              <View style={styles.panelHandle} />
            </View>
          )}
          data={Array.from([1]).map((i) => String(i))}
          keyExtractor={(i) => 3}
          renderItem={(item) =>
            this.state.allMachines &&
            this.state.allMachines.map((event) => {
              return (
                <View style={styles.item}>
                  <View style={{ flex: 1, flexDirection: "row" }}>
                    <Image
                      style={{
                        float: "right",
                        width: 70,
                        height: 70,
                        textAlign: "left",
                        marginRight: 5,
                      }}
                      source={event.img}
                    />

                    <View style={{ flexDirection: "column" }}>
                      {/* <Text style={{color: 'white', fontWeight: 'bold',  fontSize: 23, marginLeft: 10}}> {event.status.toString()} </Text> */}

                      <Text
                        style={{
                          color: "white",
                          fontWeight: "bold",
                          fontSize: 23,
                          marginLeft: 10,
                        }}
                      >
                        {" "}
                        {event.name}{" "}
                      </Text>
                      {event.status ? (
                        <Text
                          style={{
                            color: "white",
                            fontWeight: "lighter",
                            fontSize: 15,
                            marginLeft: 10,
                          }}
                        >
                          {"You are " + event.position + " in line "}
                        </Text>
                      ) : null}
                      <Text
                        style={{
                          color: "white",
                          fontWeight: "lighter",
                          fontSize: 15,
                          marginLeft: 10,
                        }}
                      >
                        {" "}
                        {event.queue.length == 1
                          ? "1 person in line"
                          : event.queue.length + " people in line"}
                      </Text>
                    </View>

                    <View style={{ flexDirection: "column" }}>
                      {!event.status ? (
                        <View>
                          <Button
                            title="Reserve"
                            style={{ marginLeft: 30, width: 30, height: 30 }}
                            onPress={() => this.reserveMachine(event)}
                          />
                          <Text
                            onPress={() => this.reserveMachine(event)}
                            style={{
                              color: "white",
                              fontWeight: "lighter",
                              fontSize: 10,
                              marginLeft: 23,
                              marginTop: 6,
                            }}
                          >
                            {" "}
                            Reserve
                          </Text>
                        </View>
                      ) : (
                        <Button
                          title="Remove"
                          style={{ marginLeft: 30, width: 30, height: 30 }}
                          onPress={() => this.removeMachine(event)}
                        />
                      )}
                    </View>
                  </View>
                  <View style={styles.lineSeparater} />
                </View>
              );
            })
          }
          contentContainerStyle={styles.contentContainerStyle}
        />
      </View>
    );
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
  lineSeparater: {
    justifyContent: "center",
    borderRadius: 2,
    opacity: 0.14,
    backgroundColor: "#FFFF",
    height: 1,
    marginTop: 4,
    width: 300,
  },
  item: {
    padding: 10,
    // justifyContent: 'center',
    backgroundColor: "rgb(57, 57, 57)",
    alignItems: "center",
  },
});

export default Home;
