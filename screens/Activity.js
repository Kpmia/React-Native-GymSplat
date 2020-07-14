import React from 'react';
import { StyleSheet, ImageBackground, Input,   Dimensions, ScrollView, Image, View, Modal, Text,  Platform, TouchableOpacity, Button } from 'react-native';
import { Block } from 'galio-framework'
import GymSplatBackground from '../assets/imgs/activitybackground.jpg';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';


const { height, width } = Dimensions.get('screen');


class Activity extends React.Component {
    render() {
        return (
            <View>
                <View>
                  </View>
                    <View>
                  <ImageBackground
                  source={GymSplatBackground}
                  style={{position:'absolute', width: width, height: height, resizeMode:'contain'}}
                />
                </View>
                <Text style={{marginTop: 20, fontWeight: 'bold', fontSize: 20, marginLeft: 20, color: '#404F65'}}> Activity Times </Text>
                <View style={{justifyContent: 'center', position: 'relative'}}>
                    <ScrollView>
                    <Block center>

                <ScrollView horizontal style={{height: 1000}}>
                      <Card style={{justifyContent: 'center', elevation: 5, textAlign: 'center', backgroundColor: 'white', shadowOpacity: .2, marginLeft: 10, height: 200, width: width * .9, borderRadius: 7, shadowColor: 'black', shadowRadius: 10, marginTop: 20}}>
                          <CardTitle style={{marginLeft: 10}}
                          title="8 active people"
                          subTitle="Clifton, Western Cape"
                          />
                          <CardContent style={{marginLeft: 12,fontWeight: 'bold', fontFamily: 'Avenir Next'}} text="Weights Section" />

                          <Text style={{marginLeft: 20, marginBottom: 30, fontSize: 10}}> Updated at: 3/4/20 at 3PM EST </Text>
                      </Card>
                      </ScrollView>
                      </Block>

                      </ScrollView>
                </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    home: {
      width: width, 
      backgroundColor: 'black'   
    },
    container: {
      flex: 1,
      backgroundColor: 'black'   
    },
    padded: {
        position: "relative",
        top: -250,
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
      },
  });
  
  export default Activity;