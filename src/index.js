import Phaser from "phaser";
import logoImg from "./assets/logo.png";
import { MainMenu } from "./scenes/menu.scene";
import { SceneA } from "./scenes/sceneA.scene";
import { MattScene } from "./scenes/matt.scene";
import { PreloadScene } from "./scenes/_preload.scene";


export const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  scene: [PreloadScene, MattScene, MainMenu, SceneA],
  render: {
    pixelArt: true
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      gravity: { y: 1500 }
    }
  }
};

const game = new Phaser.Game(config);

