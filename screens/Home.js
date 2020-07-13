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
  Alert,
  Modal,
} from "react-native"
 
import { Block, Card } from 'galio-framework';

import GymFloor from "../assets/imgs/GymFloorMapp.png";
import ScrollBottomSheet from "react-native-scroll-bottom-sheet";

import AuthManager from "./networking/AuthManager";
import ServerManager from "./networking/ServerManager";
import MachineCell from "../components/MachineCell";

// import { machineImages } from "../constants/Images"

import LottieView from 'lottie-react-native';
import Ball from '../assets/animation/loadingball.json'
import LoadingBall from '../components/LoadingScreen';
import FloorCoordinates from '../components/FloorCoordinates';

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
      machineInfo: '',
      isLoading: true
    }
  }

  logOutButton = async() => {
    AuthManager.logUserOut().then(event => {
      this.props.navigation.navigate('onboarding');
      console.log('logged out successfully.')
    })
  }

  performTimeConsumingTask = async() => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        2600
      )
    );
  }

  async componentDidMount() {
      // document.location.reload();

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
      const data = await this.performTimeConsumingTask();

      if (data !== null) {
        this.setState({ isLoading: false });
      }
    }

  showMachine = info => {
    this.setState({ machineInfo : info })
    this.setState({ modal : !this.state.modal })
  }

  closeMachine = info => {
    this.setState({ modal : false })
  }

  render() {
    if (this.state.isLoading) {
      return ( 
      <View style={{paddingTop: 200,}}> 
      <Block center>
          <LottieView
            style={{height: 200, width: 200}}
            colorFilters={{
              backgroundColor: '#FF'
            }}
            source={Ball}
            autoPlay
            loop
      />
      <Text style={{marginTop: 30, fontWeight: 'bold', color: '#4023B5'}}> Loading </Text>
      {/* <Image 
        style={{width: 30, height: 30}}
        source={require('../assets/imgs/gymsplaticon.png')}
        /> */}
      </Block>
      </View> 
      );
    } else {

    return (
      <View 
      style={styles.container}>
        <ScrollView vertical>
          <ScrollView minimumZoomScale={-10} maximumZoomScale={1} horizontal>

            <Image
              style={{ width: 5644,height: 4084}}
              source={GymFloor}
              resizeMode="stretch"
            />
            <View style={{position: 'absolute'}}>

            <FloorCoordinates />

            </View>
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
              <Button onPress={this.logOutButton} title="logout" />

              <Block row right>
              </Block>

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
        <View>
          <Block row right>
          </Block>
          </View>
      </View>
    )
  }
}
}

const styles = StyleSheet.create({
  home: {
    width: width,
    backgroundColor: "black",
  },
  card: {
    backgroundColor: 'white'
  },
  point: {
    position: 'absolute',
    zIndex: 999
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
