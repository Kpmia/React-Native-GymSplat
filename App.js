import React, { useState } from "react";
import { Image } from "react-native";
import { AppLoading } from "expo";
import { useFonts } from "@use-expo/font";
import { Asset } from "expo-asset";
import { Block, GalioProvider } from "galio-framework";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import onBoarding from "./screens/Onboarding";
import AuthForm from "./screens/Pro";
import Home from "./screens/Home";
import Tutorial from "./screens/Tutorial";
import LoginFlow from "./screens/LoginFlow";
import Activity from "./screens/Activity";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// Before rendering any navigation stack
import { enableScreens } from "react-native-screens";
enableScreens();

export default (props) => {
  const [isLoadingComplete, setLoading] = useState(false);
  let [fontsLoaded] = useFonts({
    "Avenir Next": require("./assets/font/avenir.ttf"),
  });

  // function _loadResourcesAsync() {
  //   return (
  //     Promise.all([...cacheImages(assetImages)])
  //   );
  // }

  function _handleLoadingError(error) {
    return console.warn(error);
  }

  function _handleFinishLoading() {
    return setLoading(true);
  }

  if (!fontsLoaded && !isLoadingComplete) {
    return (
      <AppLoading
        // startAsync={_loadResourcesAsync}
        onError={_handleLoadingError}
        onFinish={_handleFinishLoading}
      />
    );
  } else if (fontsLoaded) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="onboarding" component={onBoarding} />
          <Stack.Screen name="Pro" component={AuthForm} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Tutorial" component={Tutorial} />
          <Stack.Screen name="Login" component={LoginFlow} />
          <Stack.Screen name="Activity" component={Activity} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};
