import Matter, { Events } from 'matter-js';
import { Dimensions, Alert } from 'react-native';
import Constants from '../components/Constants';

const BallSpeed = ( entities ) => {
  const screenWidth = Dimensions.get('screen').width;
  const screenHeight = Dimensions.get('screen').height;

  const ball = entities.ball.body;
  const player = entities.player.body;

  if (ball.position.x  > screenWidth || ball.position.x < 0) {
    ball.velocity.x *= -1;
  }

  if (ball.position.x > screenWidth && ball.velocity.x > 0) {
    ball.velocity.x *= -1;
  }

  if (ball.position.y < 0 && ball.velocity.y < 0) {
    ball.velocity.y *= -1;
  }

  Events.on(entities.physics.engine, 'beforeUpdate', function(event) {
    var engine = event.source;

    // apply random forces every 5 secs
    if (event.timestamp % 5000 < 50)
      console.log('shakeup')
  });
  Events.on(entities.physics.engine, 'collisionStart', (event) => {
    var pairs = event.pairs;
    console.log(pairs);
    
    for (var i = 0, j = pairs.length; i != j; ++i) {
      var pair = pairs[i];

      if (pair.bodyA === collider) {
        pair.bodyB.render.strokeStyle = redColor;
      } else if (pair.bodyB === collider) {
        pair.bodyA.render.strokeStyle = redColor;
      }
    }
  });

  Events.on(entities.physics.engine, 'collisionEnd', function(event) {
    var pairs = event.pairs;
    console.log(pairs)
    for (var i = 0, j = pairs.length; i != j; ++i) {
      var pair = pairs[i];

      if (pair.bodyA === collider) {
        pair.bodyB.render.strokeStyle = greenColor;
      } else if (pair.bodyB === collider) {
        pair.bodyA.render.strokeStyle = greenColor;
      }
    }
  });

 
    // let collisions = Matter.Query.ray(
    //   [ball, player],
      
    // );

    // if (collisions)
    // console.log(collisions)

  // if (collision(ball, player, { x: ball.position.x, y: ball.position.y})) {
  //   console.log('COLIDIU')
  // }
  if (Matter.Detector.canCollide(ball, player)) {
    console.log('SIMSIM')
    // if (Matter.Bounds.overlaps(ball.bounds, player.bounds)) {
    //   const ballCollide = Matter.SAT.collides(ball, player);
    //   if (ballCollide.collided) {
    //     console.log(ballCollide)
    //     ball.velocity.y *= -1;
    //     ball.velocity.x += ball.velocity.x * 0.3;
    //   }
    // }
  }
  

  if (ball.position.y > screenHeight) {
    ball.velocity.y *= -1;
  }

  ball.position.x += ball.velocity.x;
  ball.position.y += ball.velocity.y;

  return entities
};

export default BallSpeed;
