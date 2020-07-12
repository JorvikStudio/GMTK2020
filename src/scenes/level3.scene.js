import { Scene } from "phaser";
import { SCENE_NAMES } from "../_cst";

import { Player } from "../sprites/player/player";

import tiles from "../assets/tilesets/gino/Assets.png";
import background from "../assets/tilesets/gino/Background.png";
import gino_level_3 from "../assets/tilesets/gino/gino_level_3.json";

import { Enemy1 } from "../sprites/enemy/enemy1";
import { Enemy2 } from "../sprites/enemy/enemy2";
import { Enemy4 } from "../sprites/enemy/enemy4";
import { Enemy5 } from "../sprites/enemy/enemy5";
import { Enemy3 } from "../sprites/enemy/enemy3";

export class Level3Scene extends Scene {

    constructor () {
        super(SCENE_NAMES.LEVEL3);
        console.log("construct")
    }

    preload() {
      console.log("preload");

      this.load.image("tiles", tiles);
      this.load.image("sky", background);
      this.load.tilemapTiledJSON("map", gino_level_3);
    }
      
    create() {

      const map = this.make.tilemap({key: "map"});

      const tileset = map.addTilesetImage("Assets", "tiles");
      this.spellList = ['bastion', 'fireball', 'smite'];

      this.add.image(0, 300, 'sky');
      this.add.image(800, 300, 'sky');

      this.backgroundLayer = map.createStaticLayer("backgroundLayer", tileset, 0, 0);
      this.backgroundLayer.scale = 2;
      this.mainLayer = map.createStaticLayer("mainLayer", tileset, 0, 0);
      this.mainLayer.setCollisionByProperty({collides: true});
      this.mainLayer.scale = 2;

      this.add.graphics().setAlpha(0.75); // debugGraphics

      this.enemies = this.add.group();
      this.spells = this.add.group();

      this.player = new Player(this, 100, 465);
      this.enemies.add(new Enemy1(this, 400, 465, 0, 0));
      this.enemies.add(new Enemy2(this, 700, 525, 0, 0));
      this.enemies.add(new Enemy3(this, 900, 300, 0, 0));
      this.enemies.add(new Enemy4(this, 1000, 410, 0, 0));
      this.enemies.add(new Enemy5(this, 1200, 410, 0, 0));

      // set bounds so the camera won't go outside the game world
      this.cameras.main.setBounds(0, 0, 1600, 610);
      // make the camera follow the player
      this.cameras.main.startFollow(this.player, true);

      this.physics.add.collider(this.player, this.mainLayer);
      this.physics.add.collider(this.enemies, this.mainLayer);      

      this.physics.add.collider(this.spells, this.mainLayer, (spell, wall) => {
        if(spell.onImpact) {
          spell.onImpact();
        }
      });

      this.physics.add.collider(this.enemies, this.spells);
    }

    update() {
      this.player.update();

      this.physics.overlap(this.player, this.enemies, () => {
        this.player.damage();
      });

      this.physics.collide(this.spells, this.enemies, (spell, enemy) => {
        enemy.takeDamage(30);
        if(spell.destroySelf) {
          spell.destroySelf();
        }
      });

      for(const enemy of this.enemies.getChildren()) {
        enemy.update();
      }

      for(const spell of this.spells.getChildren()) {
        spell.update();
      }
    }
}