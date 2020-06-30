import React from "react";
import {
  ImageBackground,
  StyleSheet,
  StatusBar,
  Dimensions,
} from "react-native";
import { Block, Text, theme, Button, Card, Input } from "galio-framework";

const { height, width } = Dimensions.get("screen");

import LoginPage from "../assets/imgs/loginpage.jpg";
import AuthManager from "./networking/AuthManager";

export default class LoginFlow extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }

  loginButtonPressed = async (event) => {
    if (this.state.email == "" || this.state.password == "") {
      alert("Please fill out all fields");
      return;
    }
    const success = await AuthManager.login(
      this.state.email,
      this.state.password
    );

    if (success) {
      console.log("login success");
      this.props.navigation.navigate("Home");
    } else {
      alert("Error logging in, try again!");
    }
  };

  render() {
    return (
      <Block flex style={styles.container}>
        <StatusBar hidden />
        <Block flex center>
          <ImageBackground
            source={LoginPage}
            style={{
              position: "absolute",
              width: width,
              height: height,
              resizeMode: "contain",
            }}
          />
        </Block>
        <Block flex space="between" style={styles.padded}>
          <Block style={{ zIndex: 0 }}>
            <Block>
              <Block>
                <Text> </Text>
              </Block>
            </Block>
            <Block style={{ marginTop: 80 }}>
              <Text> Email Address </Text>
              <Input
                style={{ border: "none" }}
                onChangeText={(text) => this.setState({ email: text })}
                placeholder="Please enter your email address"
              />
            </Block>
            <Block></Block>
            <Block>
              <Text> Password </Text>
              <Input
                onChangeText={(text) => this.setState({ password: text })}
                placeholder="Please enter a password"
              />
              <Block right>
                <Button
                  style={styles.button}
                  title="Submit"
                  color={"#7D6EFE"}
                  onPress={this.loginButtonPressed}
                  textStyle={{ color: "white", fontWeight: "bold" }}
                >
                  Submit
                </Button>
              </Block>
            </Block>
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
    width: 100,
    marginTop: 10,

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
