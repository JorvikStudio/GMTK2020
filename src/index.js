import Phaser from "phaser";
import logoImg from "./assets/logo.png";
import { MainMenu } from "./scenes/menu.scene";
import { SceneA } from "./scenes/sceneA.scene";
import { MattScene } from "./scenes/matt.scene";


export const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  scene: [MainMenu, MattScene, SceneA],
  render: {
    pixelArt: true
  },
  physics: {
    default: "arcade",
    arcade: {
      //debug: true,
      gravity: { y: 800 } // Top down game, so no gravity
    }
  }
};

const game = new Phaser.Game(config);

