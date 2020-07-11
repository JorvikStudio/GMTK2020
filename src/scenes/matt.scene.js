import { SCENE_NAMES } from "../_cst";
import { Player } from "../sprites/player/player";
import { Enemy1 } from "../sprites/enemy/enemy1";
import player_dino from "../assets/spritesheets/dino.png"

import tiles from "../assets/tilesets/matt/tiles.png";
import dino_level from "../assets/tilesets/matt/dino_level.json";
import { ANIMS } from "../sprites/player/_cst";
import { Enemy2 } from "../sprites/enemy/enemy2";

export class MattScene extends Phaser.Scene {

    constructor () {
        super(SCENE_NAMES.MATT_SCENE);
        console.log("construct")
    }

    preload() {
      console.log("preload");

      this.load.image("tiles", tiles);
      this.load.tilemapTiledJSON("map", dino_level);
    }
      
    create() {

      const map = this.make.tilemap({key: "map"});
      console.log(map);

      const tileset = map.addTilesetImage("Dungeon", "tiles");
      this.mainLayer = map.createStaticLayer("mainLayer", tileset, 0, 0);
      this.mainLayer.setCollisionByProperty({collides: true});

      this.mainLayer.scale = 2;

      const debugGraphics = this.add.graphics().setAlpha(0.75);
      
      /*
      mainLayer.renderDebug(debugGraphics, {
        tileColor: null, // Color of non-colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
      });
      */

      this.anims.create({
        key: ANIMS.DINO.JUMP,
        frames: this.anims.generateFrameNumbers(this.player_dino_sheet, {
          start: 12,
          end: 12
        }),
        frameRate: 8,
        repeat: -1
      });

      this.anims.create({
        key:ANIMS.DINO.CROUCH,
        frames: this.anims.generateFrameNumbers(this.player_dino_sheet, {
          start: 17,
          end: 17
        }),
        frameRate: 8,
        repeat: -1
      });

      this.anims.create({
        key:ANIMS.DINO.CROUCH_WALK,
        frames: this.anims.generateFrameNumbers(this.player_dino_sheet, {
          start: 18,
          end: 23
        }),
        frameRate: 8,
        repeat: -1
      });
      //animations
      this.anims.create({
        key: ANIMS.DINO.IDLE,
        frames: this.anims.generateFrameNumbers(this.player_dino_sheet, {
            start: 0,
            end: 3
        }),
        frameRate: 8,
        repeat: -1
      });
      
      this.anims.create({
        key: ANIMS.DINO.WALK,
        frames: this.anims.generateFrameNumbers(this.player_dino_sheet, {
          start: 4,
          end: 9
        }),
        frameRate: 8,
        repeat: -1
      });
      
      this.player = new Player(this);
      this.enemy = new Enemy1(this);
      this.enemy2 = new Enemy2(this);

      this.physics.add.collider(this.player, this.mainLayer);
      this.physics.add.collider(this.enemy, this.mainLayer);
      this.physics.add.collider(this.enemy2, this.mainLayer);
      
    }

    update() {
      this.player.update();
    }
}