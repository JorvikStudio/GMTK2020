import Phaser from "phaser";
import logoImg from "./assets/logo.png";
import { MainMenu } from "./scenes/menu.scene";
import { SceneA } from "./scenes/sceneA.scene";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  scene: [MainMenu, SceneA]
};

const game = new Phaser.Game(config);

