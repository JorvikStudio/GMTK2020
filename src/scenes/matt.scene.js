import { SCENE_NAMES } from "../_cst";
import { Player } from "../sprites/player/player";
import { Enemy1 } from "../sprites/enemy/enemy1";
import player_dino from "../assets/spritesheets/dino.png"

import tiles from "../assets/tilesets/gino/Assets.png";
import background from "../assets/tilesets/gino/Background.png";
import gino_level from "../assets/tilesets/gino/gino_level.json";
import { ANIMS } from "../sprites/player/_cst";
import { Enemy2 } from "../sprites/enemy/enemy2";
import { Enemy4 } from "../sprites/enemy/enemy4";
import { Enemy5 } from "../sprites/enemy/enemy5";
import { Enemy3 } from "../sprites/enemy/enemy3";

export class MattScene extends Phaser.Scene {

    constructor () {
        super(SCENE_NAMES.MATT_SCENE);
        console.log("construct")
    }

    preload() {
      console.log("preload");

      this.load.image("tiles", tiles);
      this.load.image("sky", background);
      this.load.tilemapTiledJSON("map", gino_level);

      this.load.audio("music", [require("../assets/unwritten-return.mp3")]);
    }
      
    create() {

      const map = this.make.tilemap({key: "map"});

      const tileset = map.addTilesetImage("Assets", "tiles");

      this.add.image(0, 200, 'sky');
      this.add.image(800, 200, 'sky');

      this.backgroundLayer = map.createStaticLayer("backgroundLayer", tileset, 0, 0);
      this.backgroundLayer.scale = 2;
      this.mainLayer = map.createStaticLayer("mainLayer", tileset, 0, 0);
      this.mainLayer.setCollisionByProperty({collides: true});
      this.mainLayer.scale = 2;
<<<<<<< HEAD
      
=======

>>>>>>> Character animation working somewhat.
      const debugGraphics = this.add.graphics().setAlpha(0.75);
      
      this.player = new Player(this);
      this.enemy1 = new Enemy1(this);
      this.enemy2 = new Enemy2(this);
      this.enemy3 = new Enemy3(this);
      this.enemy4 = new Enemy4(this);
      this.enemy5 = new Enemy5(this);

      // set bounds so the camera won't go outside the game world
      this.cameras.main.setBounds(0, 0, 1600, 610);
      // make the camera follow the player
      this.cameras.main.startFollow(this.player);

      this.physics.add.collider(this.player, this.mainLayer);
      this.physics.add.collider(this.enemy1, this.mainLayer);
      this.physics.add.collider(this.enemy2, this.mainLayer);
      this.physics.add.collider(this.enemy3, this.mainLayer);
      this.physics.add.collider(this.enemy4, this.mainLayer);
      this.physics.add.collider(this.enemy5, this.mainLayer);

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
      
    }

    update() {
      this.player.update();
    }
}