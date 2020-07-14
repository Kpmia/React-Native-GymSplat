import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { createDrawerNavigator } from "@react-navigation/drawer";

//screens
import Home from "./screens/Home";
import Activity from "./screens/Activity";

const Drawer = createDrawerNavigator();

const Header = props => {
    return (
        <Drawer.Navigator
        drawerContentOptions={{ gesturesEnabled: false }}
         screenOptions={{ headerShown: false, navigationOptions: {
        gesturesEnabled: false,
        }, }}>
          {/* <Stack.Screen name="Activity" component={Activity} />
          <Stack.Screen name="Home" component={Home} /> */}
        </Drawer.Navigator>
      );
}


export default Header;