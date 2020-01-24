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
    this.score = 0;
    this.app = new PIXI.Application({ context });
    this.directions = {
      x: 2,
      y: -8
    };
    this.startGame();
  }

  async startGame () {
    this.background = await PIXI.Sprite.from(require('./assets/sprites/tiledbackground.png'));
    this.ground = await PIXI.Sprite.from(require('./assets/sprites/sprite-sheet0.png'));
    this.ball = await PIXI.Sprite.from(require('./assets/sprites/ball-sheet0.png'));
    this.graphics = new PIXI.Graphics();
    this.ball.anchor.set(0.5);
    this.ball.width = 70
    this.ball.height = 70
    
    this.screenWidth = this.app.renderer.width;
    this.screenWidthCentered = this.screenWidth / 2;
    this.screenHeight = this.app.renderer.height;
    this.screenHeightCentered = this.screenHeight / 2;
    this.personaWidth = 150;
    this.personaHeight = 30;
    this.ballRadius = 10;
    this.personaX = 0;
    this.personaY = this.screenHeight - this.personaHeight;

    this.ball.x = this.screenWidthCentered;
    this.ball.y = this.screenHeightCentered;
    this.background.width = this.screenWidth;
    this.background.height = this.screenHeight;
    this.ground.width = this.screenWidth;
    this.ground.height = this.screenHeight;

    this.graphics.lineStyle(2, 0x0000ff, 1);
    this.graphics.beginFill(0xff700b, 1);
    this.graphics.drawRect(this.personaX, this.personaY, this.personaWidth, this.personaHeight);

    this.app.stage.addChild(this.background);
    this.app.stage.addChild(this.ground);
    this.app.stage.addChild(this.graphics);
    this.app.stage.addChild(this.ball);
    this.graphics.x = (this.screenWidth - this.personaWidth) / 2;
    this.intervalAnimation(70);
  }

  intervalAnimation = interval => {
    this.secondsInterval = setInterval(() => {
      
      if (this.ball.x > this.screenWidth - this.ballRadius || this.ball.x + this.directions.x < this.ballRadius) {
        this.directions.x = -this.directions.x;
      }
      if (this.ball.y + this.directions.y < this.ballRadius) {
        this.directions.y = -this.directions.y;
      }
      else if(this.ball.y + this.directions.y > this.screenHeight - this.ballRadius) {
        if(this.ball.x > this.graphics.x && this.ball.x < this.graphics.x + this.graphics.width) {
          this.score(+1);
          this.directions.x = -this.directions.x;
          this.directions.y *= -0.8
        }
        else {
          this.score(0);
          clearInterval(this.secondsInterval);
        }
      }
      
      this.ball.y += this.directions.y;
      this.ball.x += this.directions.x;
      this.ball.rotation += 0.1 * 1.2;
    }, interval);
  };

  changePersonaPosition ( direction ) {
    console.log('CHANGE DIRECTION => ', direction);
    if(direction === 1 && this.graphics.x < this.screenWidth - this.graphics.width) {
      console.log('CHANGE DIRECTION 1 => ', this.graphics.x);
      this.graphics.x += 20;
    }
    else if(direction === 2 && this.graphics.x > 0) {
      console.log('CHANGE DIRECTION 2 => ', this.graphics.x);
      this.graphics.x -= 20;
    }
  }
}
