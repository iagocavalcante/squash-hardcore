import React from 'react';
import { Animated, Text } from 'react-native';
import Sprites from '../../assets/sprites/Sprites';

const Player = (props) => {
  const animatedValue = new Animated.Value(props.body.velocity.y);
  const width = 32;
  const height = 64;
  const x = props.body.position.x - width / 2;
  const y = props.body.position.y - height / 2;

  animatedValue.setValue(props.body.velocity.y);
  const rotation = animatedValue.interpolate({
      inputRange: [-10, 0, 10, 20],
      outputRange: ['-20deg', '0deg', '15deg', '45deg'],
      extrapolate: 'clamp'
  })

  const image = Sprites[`samuca${props.pose}`];

  return (
    <Animated.Image
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: width,
        height: height,
        transform: [{ rotate: rotation }]
      }}
      resizeMode="stretch"
      source={image} />
  );
};

export default Player;
