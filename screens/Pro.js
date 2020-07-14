import React from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  Platform,
  Linking,
  View,
  TextInput,
  ActionSheetIOS,
  TouchableOpacity,
} from "react-native";
import { Block, Text, theme, Button, Card, Input } from "galio-framework";

const { height, width } = Dimensions.get("screen");
import SignUpPage from "../assets/imgs/SignUpPage.jpg";
import Storage from "react-native-storage";
import AsyncStorage from "@react-native-community/async-storage";
import AuthManager from '../screens/networking/AuthManager';

const axios = require("axios");

const storage = new Storage({
  size: 1000,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  storageBackend: AsyncStorage,
  sync: {},
});

export default class Pro extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    };
  }
  signUpButton = async(event) => {
    if (
      this.state.email == "" ||
      this.state.password == "" ||
      this.state.firstName == "" ||
      this.state.lastName == ""
      ) {
      alert("All fields are not filled.");
      return;
      }
      const success = await AuthManager.signUp(
        this.state.email,
        this.state.password,
        this.state.firstName,
        this.state.lastName,
      );
      if (success) {
        console.log("login success");
        this.props.navigation.navigate("Tutorial");
      } else {
        alert("Error logging in, try again!");
      }
  };

  render() {
    const { navigation } = this.props;
    return (
      <Block flex style={styles.container}>
        <StatusBar hidden />
        <Block flex center>
          <ImageBackground
            source={SignUpPage}
            style={{
              position: "absolute",
              width: width,
              height: height,
              resizeMode: "contain",
            }}
          />
        </Block>
        <Block sty flex space="between" style={styles.padded}>
          <Block style={{ zIndex: 0 }}>
            <Block>
              <Block>
                <Text> </Text>
              </Block>
            </Block>
            <Block style={{ marginTop: 50 }}>
              <Text> Email Address </Text>
              <Input
                style={{ border: "none" }}
                onChangeText={(text) => this.setState({ email : text })}
                placeholder="Please enter your email address"
              />
            </Block>
            <Block>
              <Text> First Name </Text>
              <Input
                onChangeText={(text) => this.setState({ firstName: text })}
                placeholder="Please enter your first name"
              />
            </Block>
            <Block>
              <Text> Last Name </Text>
              <Input
                onChangeText={(text) => this.setState({ lastName: text })}
                placeholder="Please enter your last name"
              />
            </Block>
            <Block>
              <Text> Password </Text>
              <Input
                onChangeText={(text) => this.setState({ password: text })}
                placeholder="Please enter a password"
              />
            </Block>
              <Button
                style={styles.button}
                title="Submit"
                color={"#7D6EFE"}
                onPress={this.signUpButton}
                textStyle={{ color: "white", fontWeight: "bold" }}
                >
              Submit
            </Button>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK,
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 3,
    position: "relative",
    top: -250,
    bottom: theme.SIZES.BASE,
    zIndex: 1,
  },
  button: {
    justifyContent: "center",
    alignContent: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 30,
    width: 200,
    marginTop: 1,

    alignSelf: "stretch",

    shadowRadius: 0,
    shadowOpacity: 0,
  },
  logo: {
    width: 200,
    height: 60,
    zIndex: 2,
    position: "relative",
    marginTop: "-50%",
  },
  title: {
    marginTop: "-5%",
  },
  subTitle: {
    marginTop: 20,
  },
});
