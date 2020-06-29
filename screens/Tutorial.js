import React from 'react'
import { ImageBackground,  Image, StyleSheet, StatusBar, Dimensions, Platform, Linking, View, TextInput, ActionSheetIOS, TouchableOpacity  } from 'react-native';
import { Block, Text, theme, Button, Card, Input } from 'galio-framework';
// import Slideshow from 'react-native-slideshow';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';


const { height, width } = Dimensions.get("window");


//tutorial pages
import Swiper from 'react-native-swiper'
import pageBackground from '../assets/imgs/PageOneBackground.jpg'
import PageTwoBackground from '../assets/imgs/PageTwoBackground.jpg'
import PageThreeBackground from '../assets/imgs/PageThreeBackground.jpg'
import PageFourBackground from '../assets/imgs/PageFourBackground.jpg'
import PageFiveBackground from '../assets/imgs/PageFiveBackground.jpg'


const storage = new Storage({
  size: 1000,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  storageBackend: AsyncStorage,
  sync: {
  }
});


export default class Tutorial extends React.Component {
  componentDidMount() {
    storage
    .load({
      key: 'email',
      autoSync: true,
      syncInBackground: true,
      syncParams: {
        extraFetchOptions: {
        },
        someFlag: true
      }
    })
    .then(ret => {
      console.log(ret);
    })
    storage
    .load({
      key: 'uid',
      autoSync: true,
      syncInBackground: true,
      syncParams: {
        extraFetchOptions: {
        },
        someFlag: true
      }
    })
    .then(ret => {
      console.log(ret);
    })
    storage
    .load({
      key: 'firstName',
      autoSync: true,
      syncInBackground: true,
      syncParams: {
        extraFetchOptions: {
        },
        someFlag: true
      }
    })
    .then(ret => {
      console.log(ret);
    })
    storage
    .load({
      key: 'lastName',
      autoSync: true,
      syncInBackground: true,
      syncParams: {
        extraFetchOptions: {
        },
        someFlag: true
      }
    })
    .then(ret => {
      console.log(ret);
    })
  }
    render() {

        const  { navigation } = this.props
        return (
            <Swiper showsButtons={false}>
            <View style={styles.slide1}>
              <ImageBackground style={styles.image1} source={pageBackground} />
              <Text style={styles.text} >Check activity levels</Text>
              <Text style={styles.subtitle}>Check current {"&"} future activity levels at your gym to quickly plan your 
next gym visit. </Text>
            </View>
            <View style={styles.slide2}>
            <ImageBackground style={styles.image1} source={PageTwoBackground} />

              <Text style={styles.text}> Reserve a machine</Text>
              <Text style={styles.subtitle}>Finding your favorite machine at the right 
time and place is hard, so we made it easy. 
You simply tap the plus button next to your desired machine. </Text>
            </View>
            <View style={styles.slide3}>
            <ImageBackground style={styles.image1} source={PageThreeBackground} />

              <Text style={styles.text}>No more waiting</Text>
              <Text style={styles.subtitle}>Get notified as you move up the queue! But get to your machine quick, or you could get skipped. </Text>
            </View>
            <View style={styles.slide3}>
            <ImageBackground style={styles.image1} source={PageFourBackground} />

                <Text style={styles.text}>Work-in requests</Text>
                <Text style={styles.subtitle}>Get notified as you move up the queue! But get to your machine quick, or you could get skipped. </Text>
                </View>
                <View style={styles.slide3}>
                <ImageBackground style={styles.image1} source={PageFiveBackground} />

                <Text style={styles.text}>Group Reservations</Text>
                <Text style={styles.subtitle}>Finding your favorite machine at the right 
time and place is hard, so we made it easy. 
</Text>
                <Button
                  // style={styles.button}
                  style={{borderRadius: 30, marginTop: 5, fontColor: 'white', border: '#D2D2D2', height: 46, width: 250, boxShadow: '0px #FFFF', shadowOpacity: 0}}
                  color={'#7D6EFE'}
                  onPress={() => navigation.navigate("Home")}
                  textStyle={{ marginTop: 0, color: 'white', fontWeight: 'bold' }}
                > START </Button>
                </View>
          </Swiper>
        );
    }
}

const styles = StyleSheet.create({
    image1: {
        position:'absolute',left:0,bottom:0,right:0,top:0, width: width, height: height, resizeMode:'contain'

    },
    image2: {
        width: width ,
        marginLeft: 40,
        alignItems: 'center',
        height: height * 0.6
    },
    button: {


    },
    image3: {
        width: width ,
        marginLeft: 60,
        justifyContent: 'center',
        alignItems: 'center',
        height: height * 0.65
    },
    image4: {
        width: width  ,
        marginLeft: 50,
        justifyContent: 'center',
        alignItems: 'center',
        height: height * 0.6
    },
    image5: {
        position:'absolute',left:0,bottom:0,right:0,top:0, width: width, height: height,resizeMode:'contain'
    },
    slide1: {
      flex: 1,
      justifyContent: 'center',
      color: '#2E333C',
      alignItems: 'center',
      backgroundColor: '#FFF',
      paddingBottom: 10
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      color: '#2E333C',
      paddingBottom: 10,

      alignItems: 'center',
      backgroundColor: '#FFF'
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      color: '#2E333C',
      paddingBottom: 10,

      alignItems: 'center',
      backgroundColor: '#FFFF'
    },
    text: {
        paddingTop: 450,
      color: '#2E333C',
      fontSize: 25,
      fontWeight: 'bold'
    },
    subtitle: {
        marginTop: 10,
        color: '#697386',
        fontFamily: 'Avenir Next',
        maxWidth: 300,
        lineHeight: 25,
        fontSize: 16,
        textAlign: 'center'
    }
  });