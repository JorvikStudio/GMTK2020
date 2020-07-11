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

    this.anims.create({
      key: ANIMS.PLAYER.IDLE,
      frames: this.anims.generateFrameNames("player_atlas", {
        start: 1,
        end: 10,
        zeroPad: 2,
        prefix: "idle",
        suffix: ".png"
      }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: ANIMS.PLAYER.WALK,
      frames: this.anims.generateFrameNames("player_atlas", {
        start: 1,
        end: 8,
        zeroPad: 2,
        prefix: "run",
        suffix: ".png"
      }),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: ANIMS.PLAYER.JUMP_LAUNCH,
      frames: this.anims.generateFrameNames("player_atlas", {
        start: 1,
        end: 2,
        zeroPad: 2,
        prefix: "jump_start",
        suffix: ".png"
      }),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: ANIMS.PLAYER.JUMP,
      frames: this.anims.generateFrameNames("player_atlas", {
        start: 1,
        end: 4,
        zeroPad: 2,
        prefix: "jump_mid",
        suffix: ".png"
      }),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: ANIMS.PLAYER.JUMP_LAND,
      frames: this.anims.generateFrameNames("player_atlas", {
        start: 1,
        end: 1,
        zeroPad: 2,
        prefix: "jump_landing",
        suffix: ".png"
      }),
      frameRate: 8,
      repeat: -1
    });
    
    this.scene.start(SCENE_NAMES.MATT_SCENE);
  }
}