import React, { useState } from 'react';
import { Text, View, StatusBar, StyleSheet, Image, Alert} from 'react-native';
import Matter, { Composite, Events } from 'matter-js';
import Constants from './components/Constants';
import Player from './components/Player';
import { GameEngine } from 'react-native-game-engine';
import FingerTouch from './systems/FingerTouch';
import Ball from './components/Ball';
import BallSpeed from './systems/BallSpeed';
import Sprites from '../assets/sprites/Sprites';
const App = () => {
  const [running, setRunning] = useState(true);
  const [score, setScore] = useState(0);
  let gameEngine = null

  const entities = setupWorld();

  function setupWorld () {
    const engine = Matter.Engine.create({ enableSleeping: false });
    const world = engine.world;
    world.gravity.y = 0.0;
  
    const samuca = Matter.Bodies.rectangle( Constants.MAX_WIDTH / 2, Constants.MAX_HEIGHT - 46, Constants.PLAYER_WIDTH, Constants.PLAYER_HEIGHT );

    const ball = Matter.Bodies.circle( Constants.MAX_WIDTH / 2, Constants.MAX_HEIGHT / 2, Constants.BAll_WIDTH );

    ball.velocity = {
      x: 2,
      y: 2
    }

    Matter.World.add(world, [samuca, ball]);
    // Events.on(engine, 'collisionStart', (event) => {
    //   var pairs = event.pairs;
    //   console.log(pairs)
    //   gameEngine.dispatch({ type: "game-over"});         
    // });

    return {
      physics: { engine: engine, world: world },
      player: { body: samuca, pose: 0, renderer: Player},
      ball: { body: ball, pose: 0, renderer: Ball, bounce: 0.9}
    }
  }

  function onEvent (e) {
    if (e.type === "game-over"){
        //Alert.alert("Game Over");
      setRunning(false)
    } else if (e.type === "score") {
      setScore(score + 1)
    }
  }

  function reset () {
    gameEngine.swap(setupWorld());
    setRunning(true)
    setScore(0)
  }

  return (
    <View style={styles.container}>
      <Image source={Sprites.background} style={styles.backgroundImage} resizeMode="stretch" />
      <Image source={Sprites.floorMark} style={styles.backgroundImage} resizeMode="stretch" />
      <GameEngine
        ref={(ref) => { gameEngine = ref; }}
        style={styles.gameContainer}
        systems={[FingerTouch, BallSpeed]}
        running={running}
        onEvent={onEvent}
        entities={entities}>
        <StatusBar hidden={true} />
      </GameEngine>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
  },
  backgroundImage: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: Constants.MAX_WIDTH,
      height: Constants.MAX_HEIGHT
  },
  gameContainer: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
  },
  gameOverText: {
      color: 'white',
      fontSize: 48,
      fontFamily: '04b_19'
  },
  gameOverSubText: {
      color: 'white',
      fontSize: 24,
      fontFamily: '04b_19'
  },
  fullScreen: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'black',
      opacity: 0.8,
      justifyContent: 'center',
      alignItems: 'center'
  },
  score: {
      position: 'absolute',
      color: 'white',
      fontSize: 72,
      top: 50,
      left: Constants.MAX_WIDTH / 2 - 20,
      textShadowColor: '#444444',
      textShadowOffset: { width: 2, height: 2},
      textShadowRadius: 2,
      fontFamily: '04b_19'
  },
  fullScreenButton: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      flex: 1
  }
});

export default App;
