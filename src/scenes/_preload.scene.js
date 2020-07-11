import { SCENE_NAMES } from "../_cst";
import playerAtlas from "../assets/spritesheets/gino.json";
import { ANIMS } from "../sprites/player/_cst";

export class PreloadScene extends Phaser.Scene {
  // Preload images and animations here

  constructor() {
    super(SCENE_NAMES.PRELOAD);
  }

  preload() {
    this.load.multiatlas("player_atlas", playerAtlas, "src/assets/spritesheets");
  }

  create() {

    const frameNames = this.anims.generateFrameNames("player_atlas", {
      start: 1,
      end: 4,
      zeroPad: 2,
      prefix: "idle",
      suffix: ".png"
    });

    console.log(frameNames);

    this.anims.create({
      key: ANIMS.PLAYER.IDLE,
      frames: frameNames,
      frameRate: 8,
      repeat: -1
    });
    
    this.scene.start(SCENE_NAMES.MATT_SCENE);
  }
}