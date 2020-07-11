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

      this.player = new Player(this);
      this.enemy = new Enemy1(this);
      this.enemy2 = new Enemy2(this);

      this.physics.add.collider(this.player, this.mainLayer);
      this.physics.add.collider(this.enemy, this.mainLayer);
      this.physics.add.collider(this.enemy2, this.mainLayer);

      this.enemies = this.add.group();

      this.enemies.add(this.enemy);
      this.enemies.add(this.enemy2);

      //this.physics.add.collider(this.player, this.enemies);
      
    }

    update() {
      this.player.update();

      this.enemy.update();
      this.enemy2.update();

      this.physics.overlap(this.player, this.enemies, () => {
        this.player.damage();
      });
    }
}