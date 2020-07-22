import Constants from "../components/Constants";
import Matter, { Events } from 'matter-js';

let tick = 1;
let pose = 1;
let deltas = {};
const FingerTouch = (entities, { touches, time }) => {
  const player = entities.player.body;
  const engine = entities.physics.engine;

  touches.filter(t => t.type === "move").forEach(t => {
    if (player && player.position) {

      Matter.Body.setPosition( player, {
        x: player.velocity.x + t.event.pageX,
        y: Constants.MAX_HEIGHT - 48
      });
      
      if (t.delta.pageX > 0) {
        tick = 20
        if (tick % 20 === 0) {
          pose = 6;
          entities.player.pose = pose;
        }
    
        tick = 40
    
        if (tick % 20 === 0) {
          pose = 7;
          entities.player.pose = pose;
        }
    
      } else {
        tick = 20
        if (tick % 20 === 0) {
          pose = 3;
          entities.player.pose = pose;
        }
    
        tick = 40
    
        if (tick % 20 === 0) {
          pose = 4;
          entities.player.pose = pose;
        }
      }
    }
  });

  tick += 1;
  if (tick % 20 === 0){
    pose += 1;
    if (pose > 3){
      pose = 1;
    }
    player.pose = pose;
  }
 
  return entities;
};
 
export default FingerTouch;