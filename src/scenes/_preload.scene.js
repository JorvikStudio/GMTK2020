import { SCENE_NAMES } from "../_cst";
import playerAtlas from "../assets/spritesheets/gino.json";
import enemy1Atlas from "../assets/spritesheets/enemy1.json";
import { ANIMS } from "../sprites/player/_cst";

export class PreloadScene extends Phaser.Scene {
  // Preload images and animations here

  constructor() {
    super(SCENE_NAMES.PRELOAD);
  }

  preload() {
    this.load.multiatlas("player_atlas", playerAtlas, "src/assets/spritesheets");
    this.load.multiatlas("enemy1_atlas", enemy1Atlas, "src/assets/spritesheets");
  }

  create() {

    this.anims.create({
      key: ANIMS.PLAYER.IDLE,
      frames: this.anims.generateFrameNames("player_atlas", {
        start: 1,
        end: 8,
        zeroPad: 2,
        prefix: "idle",
        suffix: ".png"
      }),
      frameRate: 8,
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
      key: ANIMS.ENEMY1.IDLE,
      frames: this.anims.generateFrameNames("enemy1_atlas", {
        start: 1,
        end: 7,
        zeroPad: 2,
        prefix: "fly",
        suffix: ".png"
      }),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: ANIMS.ENEMY1.HIT,
      frames: this.anims.generateFrameNames("enemy1_atlas", {
        start: 1,
        end: 3,
        zeroPad: 2,
        prefix: "hit",
        suffix: ".png"
      }),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: ANIMS.ENEMY1.ATTACK,
      frames: this.anims.generateFrameNames("enemy1_atlas", {
        start: 1,
        end: 10,
        zeroPad: 2,
        prefix: "attack",
        suffix: ".png"
      }),
      frameRate: 8,
      repeat: -1
    });
    
    this.scene.start(SCENE_NAMES.MATT_SCENE);
  }
}