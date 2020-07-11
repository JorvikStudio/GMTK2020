import { SCENE_NAMES } from "../_cst";
import playerAtlas from "../assets/spritesheets/gino.json";
import enemy1Atlas from "../assets/spritesheets/enemy1.json";
import enemy2Atlas from "../assets/spritesheets/enemy2.json";
import enemy3Atlas from "../assets/spritesheets/enemy3.json";
import enemy4Atlas from "../assets/spritesheets/enemy4.json";
import enemy5Atlas from "../assets/spritesheets/enemy5.json";
import { ANIMS } from "../sprites/player/_cst";
import { ANIMS as ENEMY_ANIMS } from "../sprites/enemy/_cst"

export class PreloadScene extends Phaser.Scene {
  // Preload images and animations here

  constructor() {
    super(SCENE_NAMES.PRELOAD);
  }

  preload() {
    this.load.multiatlas("player_atlas", playerAtlas, "src/assets/spritesheets");
    this.load.multiatlas("enemy1_atlas", enemy1Atlas, "src/assets/spritesheets");
    this.load.multiatlas("enemy2_atlas", enemy2Atlas, "src/assets/spritesheets");
    this.load.multiatlas("enemy3_atlas", enemy3Atlas, "src/assets/spritesheets");
    this.load.multiatlas("enemy4_atlas", enemy4Atlas, "src/assets/spritesheets");
    this.load.multiatlas("enemy5_atlas", enemy5Atlas, "src/assets/spritesheets");
    this.load.audio("music", [require("../assets/unwritten-return.mp3")]);
  }

  create() {

    this.createPlayerAnimations();
    this.createEnemy1Animations();
    this.createEnemy2Animations();
    this.createEnemy3Animations();
    this.createEnemy4Animations();
    this.createEnemy5Animations();

    this.music = this.sound.add("music");
    var musicConfig = {
      mute: false,
      volume: 1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0
    };

    this.music.play(musicConfig);  

    this.scene.start(SCENE_NAMES.MAIN_MENU);
    //this.scene.start(SCENE_NAMES.LEVEL1);
  }

  createPlayerAnimations() {
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
      key: ANIMS.PLAYER.CAST,
      frames: this.anims.generateFrameNames("player_atlas", {
        start: 1,
        end: 7,
        zeroPad: 2,
        prefix: "throw_attack",
        suffix: ".png"
      }),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: ANIMS.PLAYER.DAMAGED,
      frames: this.anims.generateFrameNames("player_atlas", {
        start: 1,
        end: 3,
        zeroPad: 2,
        prefix: "hit",
        suffix: ".png"
      }),
      frameRate: 3
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
  }

  createEnemy1Animations() {
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
      key: ENEMY_ANIMS.ENEMY1.IDLE,
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
      key: ENEMY_ANIMS.ENEMY1.HIT,
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
      key: ENEMY_ANIMS.ENEMY1.ATTACK,
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
  }

  createEnemy2Animations() {

    this.anims.create({
      key: ENEMY_ANIMS.ENEMY2.IDLE,
      frames: this.anims.generateFrameNames("enemy2_atlas", {
        start: 1,
        end: 11,
        zeroPad: 2,
        prefix: "idle",
        suffix: ".png"
      }),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: ENEMY_ANIMS.ENEMY2.HIT,
      frames: this.anims.generateFrameNames("enemy2_atlas", {
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
      key: ENEMY_ANIMS.ENEMY2.ATTACK,
      frames: this.anims.generateFrameNames("enemy2_atlas", {
        start: 1,
        end: 8,
        zeroPad: 2,
        prefix: "attack",
        suffix: ".png"
      }),
      frameRate: 8,
      repeat: -1
    });
  }

  createEnemy3Animations() {
    this.anims.create({
      key: ENEMY_ANIMS.ENEMY3.IDLE,
      frames: this.anims.generateFrameNames("enemy3_atlas", {
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
      key: ENEMY_ANIMS.ENEMY3.HIT,
      frames: this.anims.generateFrameNames("enemy3_atlas", {
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
      key: ENEMY_ANIMS.ENEMY3.ATTACK_LEFT,
      frames: this.anims.generateFrameNames("enemy3_atlas", {
        start: 1,
        end: 8,
        zeroPad: 2,
        prefix: "attack_left",
        suffix: ".png"
      }),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: ENEMY_ANIMS.ENEMY3.ATTACK_RIGHT,
      frames: this.anims.generateFrameNames("enemy3_atlas", {
        start: 1,
        end: 8,
        zeroPad: 2,
        prefix: "attack_right",
        suffix: ".png"
      }),
      frameRate: 8,
      repeat: -1
    });
  }

  createEnemy4Animations() {
    this.anims.create({
      key: ENEMY_ANIMS.ENEMY4.IDLE,
      frames: this.anims.generateFrameNames("enemy4_atlas", {
        start: 1,
        end: 7,
        zeroPad: 2,
        prefix: "idle",
        suffix: ".png"
      }),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: ENEMY_ANIMS.ENEMY4.HIT,
      frames: this.anims.generateFrameNames("enemy4_atlas", {
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
      key: ENEMY_ANIMS.ENEMY4.ATTACK,
      frames: this.anims.generateFrameNames("enemy4_atlas", {
        start: 1,
        end: 7,
        zeroPad: 2,
        prefix: "attack",
        suffix: ".png"
      }),
      frameRate: 8,
      repeat: -1
    });
  }

  createEnemy5Animations() {
    this.anims.create({
      key: ENEMY_ANIMS.ENEMY5.IDLE,
      frames: this.anims.generateFrameNames("enemy5_atlas", {
        start: 1,
        end: 9,
        zeroPad: 2,
        prefix: "idle",
        suffix: ".png"
      }),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: ENEMY_ANIMS.ENEMY5.HIT,
      frames: this.anims.generateFrameNames("enemy5_atlas", {
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
      key: ENEMY_ANIMS.ENEMY5.ATTACK,
      frames: this.anims.generateFrameNames("enemy5_atlas", {
        start: 1,
        end: 6,
        zeroPad: 2,
        prefix: "attack",
        suffix: ".png"
      }),
      frameRate: 8,
      repeat: -1
    });
  }
}