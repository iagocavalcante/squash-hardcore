import React from 'react';
import { Animated } from 'react-native';
import Sprites from '../../assets/sprites/Sprites';
import Constants from './Constants';
const Ball = ( props ) => {
  const animatedValue = new Animated.Value(props.body.velocity.y);
  const x = props.body.position.x - Constants.BAll_WIDTH / 2;
  const y = props.body.position.y - Constants.BAll_HEIGHT / 2;

  animatedValue.setValue(props.body.velocity.y + 0.8);
  const rotation = animatedValue.interpolate({
    inputRange: [-10, 0, 10, 20],
    outputRange: ['-20deg', '0deg', '15deg', '45deg'],
    extrapolate: 'clamp'
  })

  props.body.isSensor = true

  const image = Sprites.ball;

  return (
    <Animated.Image
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: Constants.BAll_WIDTH,
        height: Constants.BAll_HEIGHT,
        transform: [{ rotate: rotation }]
      }}
      resizeMode="stretch"
      source={image} />
  );
};

export default Ball;
