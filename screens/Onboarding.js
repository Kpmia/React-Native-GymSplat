import React from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";

const { height, width } = Dimensions.get("screen");

import Images from "../constants/Images";

class Onboarding extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <Block flex style={styles.container}>
                <ImageBackground
            source={Images.Onboarding}
            style={{position:'absolute', width: width, height: height, resizeMode:'contain'}}
          />
        <StatusBar hidden />
        <Block flex center>
        </Block>
        <Block center>
          
          <Image source={Images.LogoOnboarding} />
        </Block>
        <Block flex space="between" style={styles.padded}>
            <Block  style={{ zIndex: 0 }}>
              <Block>
                <Block center>
                  <Text color={'#A6A8B2'} style={{ fontWeight: 'bold', marginBottom: 20, marginTop: 10}} size={15}>
                    Track your journey.
                  </Text>
                </Block>
              </Block>
              <Block style={{marginTop: 0}}  center>
                <Button
                  // style={styles.button}
                  style={{borderRadius: 3, fontColor: 'white', borrder: '#D2D2D2', height: 46, width: 278, boxShadow: '0px #FFFF', shadowOpacity: 0}}
                  color={'#7D6EFE'}
                  onPress={() => navigation.navigate("Login")}
                  textStyle={{ color: 'white', fontWeight: 'bold' }}
                >
                 Sign In
                </Button>
              </Block>
              <Text center style={{marginTop: 13, fontSize: 16, color: '#C1C1C1'}}> or </Text>
              <Block style={{marginTop: 10, color: '#C1C1C1'}} center>
                <Button
                  // style={styles.button}
                  style={{borderRadius: 3, fontColor: 'white', border: '1px solid #D2D2D2', borderWidth: 1, borderColor: '#D2D2D2', shadowOpacity: 0, fontSize: 16, height: 46, width: 278}}
                  color={'#FFF'}
                  onPress={() => navigation.navigate("Pro")}
                  textStyle={{ color: '#969696'}}
                >
                 Create an account
                </Button>
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
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: "relative",
    bottom: theme.SIZES.BASE,
    zIndex: 1,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
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

export default Onboarding;
