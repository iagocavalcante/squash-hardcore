import { PIXI } from 'expo-pixi';
import { PixelRatio } from 'react-native';

const Settings = {
  initialSize: 10,
  tileSize: 20,
  hasGrid: true,
  foodColor: 0x6f42c1,
  snakeColor: 0x50b948,
  backgroundColor: 0xecf0f1,
};

export default class Game {
  constructor(context) {
    this.app = PIXI.application({
      context,
      backgroundColor: Settings.backgroundColor,
    });

    const size = Settings.tileSize * PixelRatio.get();
  }
}
