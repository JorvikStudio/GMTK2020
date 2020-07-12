import Phaser from "phaser";
import { PreloadScene } from "./scenes/_preload.scene";
import { MainMenu } from "./scenes/menu.scene";
import { Level1Scene } from "./scenes/level1.scene";
import { Level2Scene } from "./scenes/level2.scene";
import { Level3Scene } from "./scenes/level3.scene";

export const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  scene: [PreloadScene, MainMenu, Level1Scene, Level2Scene, Level3Scene],
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

new Phaser.Game(config);

