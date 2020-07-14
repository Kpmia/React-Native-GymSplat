import React from 'react';
import LottieView from 'lottie-react-native';
import Ball from '../assets/animation/loadingball.json';

const LoadingScreen = props => {
    return (
        <LottieView
            source={Ball}
            colorFilters={[{
            keypath: "button",
            color: "#F00000"
            },{
            keypath: "Sending Loader",
            color: "#F00000"
            }]}
            autoPlay
            loop
      />
    );
}

export default LoadingScreen;