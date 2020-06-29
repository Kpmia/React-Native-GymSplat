import React from 'react';
import { ImageBackground,  Image, StyleSheet, StatusBar, Dimensions, Platform, Linking, View, TextInput, ActionSheetIOS, TouchableOpacity  } from 'react-native';
import { Block, Text, theme,Button, Card, Input } from 'galio-framework';

const { height, width } = Dimensions.get("screen");
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';

import LoginPage from '../assets/imgs/loginpage.jpg'

const axios = require('axios');

const storage = new Storage({
  size: 1000,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  storageBackend: AsyncStorage,
  sync: {
  }
});

export default class LoginFlow extends React.Component {
    constructor() {
        super()
        this.state={
            email: '',
            password: '',
        }
    }

    loginFlow = event => {
        if (this.state.email == '' || this.state.password == '') {
            alert('Please fill out all fields')
            return;
        } else {
            const loginInfo = {
                email: this.state.email,
                password: this.state.password
            }
            axios({
                method: "post", 
                url: "http://gym-splat-backend.ue.r.appspot.com/login",
                data: loginInfo,
                headers: { 'Content-Type': 'application/json' }
              }) .then (response => {

                  storage.save({
                    key: 'email', 
                    data: this.state.email,
                    expires: 1000 * 3600
                  });
                  storage.save({
                    key: 'uid', 
                    data: response.data.user._id,
                    expires: 1000 * 3600
                  });
                  storage.save({
                    key: 'firstName', 
                    data: response.data.user.firstName,
                    expires: 1000 * 3600
                  });
                  storage.save({
                    key: 'lastName', 
                    data: response.data.user.lastName,
                    expires: 1000 * 3600
                  });
                  this.props.navigation.navigate('Home')
                  return;
              }) .catch (error => {
                  console.log(error)
                  alert('Try again another time.')
              })
        }
    }

    render() {
        console.log(this.state.email)
        console.log(this.state.password)
        return (
            <Block flex style={styles.container}>
            <StatusBar hidden />
            <Block flex center>
            <ImageBackground
                source={LoginPage}
                style={{position:'absolute', width: width, height: height, resizeMode:'contain'}}
              />
            </Block>
            <Block flex space="between" style={styles.padded}>
                <Block  style={{ zIndex: 0 }}>
                  <Block>
                    <Block >
                      <Text> </Text>
                    </Block>
                  </Block>
                  <Block style={{marginTop: 80}} >
                    <Text > Email Address </Text>
                      <Input style={{border: 'none'}} onChangeText={(text) => this.setState({ email : text })} placeholder="Please enter your email address" />
                    </Block>
                    <Block >
                    </Block>
                    <Block >
                    <Text> Password </Text>
                      <Input onChangeText={(text) => this.setState({ password : text })}  placeholder="Please enter a password" />
                      <Block right>
                      <Button
                      style={styles.button}
                      title='Submit'
                      color={'#7D6EFE'}
                      onPress={this.loginFlow}
                      textStyle={{ color: 'white', fontWeight: 'bold' }}
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
        backgroundColor: theme.COLORS.BLACK
      },
      padded: {
        paddingHorizontal: theme.SIZES.BASE * 3,
        position: "relative",
        top: -250,
        bottom: theme.SIZES.BASE,
        zIndex: 1,
      },
      button: {
        justifyContent: 'center',
        alignContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 30,
        width:100,
        marginTop: 10,

        alignSelf: 'stretch',
        
    
        shadowRadius: 0,
        shadowOpacity: 0
      },
      logo: {
        width: 200,
        height: 60,
        zIndex: 2,
        position: 'relative',
        marginTop: '-50%'
      },
      title: {
        marginTop:'-5%'
      },
      subTitle: {
        marginTop: 20
      }
    });
    