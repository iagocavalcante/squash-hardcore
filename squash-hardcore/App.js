import { GLView } from 'expo-gl';
import Constants from 'expo-constants';
import { PIXI } from 'expo-pixi';
import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import GestureView from './src/GestureView';
import Game from './Game';

export default class App extends React.Component {

  state = { score: 0 };

  onSwipe = dir => {
    this.game.changePersonaPosition(dir);
  };

  onContextCreate = async context => {
    this.game = new Game(context)
    this.game.score = score => this.setState({ score });
  };
  render() {
    return (
      <View style={styles.container}>
        <GestureView onSwipe={this.onSwipe}>
          <GLView style={{ flex: 1 }} onContextCreate={this.onContextCreate} />
        </GestureView>
        <Text style={styles.score}>{this.state.score}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  score: {
    fontSize: 48,
    textAlign: 'right',
    position: 'absolute',
    top: 24,
    right: 24,
    opacity: 0.6,
    fontWeight: 'bold',
  },
});