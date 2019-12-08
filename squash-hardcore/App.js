import { GLView } from 'expo-gl';
import Constants from 'expo-constants';
import { PIXI } from 'expo-pixi';
import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import GestureView from './src/GestureView';

export default class App extends React.Component {

  state = { score: 0 };
  personaX = 0;
  personaY = 0;
  personaWidth = 0;
  screenWidth = 0;

  onTap = () => {
    if (this.game) {
      this.game.board.onTap();
    }
  };

  onSwipe = dir => {
    console.log(dir)
    if(dir === 1 && this.personaX < this.screenWidth - this.personaWidth) {
      this.personaX += 7;
    }
    else if(dir === 2 && this.personaX > 0) {
      this.personaX -= 7;
    }
  };
  onContextCreate = async context => {
    const Settings = {
      initialSize: 10,
      tileSize: 20,
      hasGrid: true,
      foodColor: 0x6f42c1,
      snakeColor: 0x50b948,
      backgroundColor: 0xecf0f1,
    };

    let score = 0;

    const app = new PIXI.Application({ context });

    const background = await PIXI.Sprite.from(require('./assets/sprites/tiledbackground.png'));
    const ground = await PIXI.Sprite.from(require('./assets/sprites/sprite-sheet0.png'));
    const ball = await PIXI.Sprite.from(require('./assets/sprites/ball-sheet0.png'));
    const graphics = new PIXI.Graphics();

    ball.anchor.set(0.5);
    ball.width = 70
    ball.height = 70
    
    this.screenWidth = app.renderer.width;
    const screenWidthCentered = this.screenWidth / 2;
    const screenHeight = app.renderer.height;
    const screenHeightCentered = screenHeight / 2;
    this.personaWidth = 150;
    const personaHeight = 30;
    const ballRadius = 10;
    this.personaX = (this.screenWidth - this.personaWidth) / 2;
    this.personaY = screenHeight - personaHeight;

    ball.x = this.screenWidthCentered;
    ball.y = screenHeightCentered;
    background.width = this.screenWidth;
    background.height = screenHeight;
    ground.width = this.screenWidth;
    ground.height = screenHeight;

    const directions = {
      x: 2,
      y: -2
    }

    graphics.lineStyle(2, 0x0000ff, 1);
    graphics.beginFill(0xff700b, 1);
    graphics.drawRect(this.personaX, this.personaY, this.personaWidth, personaHeight);

    app.stage.addChild(background);
    app.stage.addChild(ground);
    app.stage.addChild(graphics);
    app.stage.addChild(ball);
    app.ticker.add((delta) => {
      if (ball.x > this.screenWidth - ballRadius || ball.x + directions.x < ballRadius) {
        directions.x = - directions.x;
      }
      if (ball.y + directions.y < ballRadius) {
        directions.y = - directions.y;
      }
      else if(ball.y > screenHeight - ballRadius) {
        if(ball.x > this.personaX && ball.x < this.personaX + this.personaWidth) {
          score += 1;
          this.setState({ score });
          directions.y = - directions.y;
        }
        else {
          score = 0;
          this.setState({ score });
          app.ticker.stop()
          app.ticker.start()
        }
      }
      ball.y += directions.y;
      ball.x += directions.x;
      ball.rotation += 0.1 * delta;
    });

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