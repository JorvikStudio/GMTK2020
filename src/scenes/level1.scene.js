import { Scene } from "phaser";
import { SCENE_NAMES } from "../_cst";

import { Player } from "../sprites/player/player";

import tiles from "../assets/tilesets/gino/Assets.png";
import background from "../assets/tilesets/gino/Background.png";
import gino_level from "../assets/tilesets/gino/gino_level.json";

import { Enemy1 } from "../sprites/enemy/enemy1";
import { Enemy2 } from "../sprites/enemy/enemy2";
import { Enemy4 } from "../sprites/enemy/enemy4";
import { Enemy5 } from "../sprites/enemy/enemy5";
import { Enemy3 } from "../sprites/enemy/enemy3";
import { Fireball } from "../sprites/fireball/fireball";
import { throttle } from "../utils";

export class Level1Scene extends Scene {

    constructor() {
        super(SCENE_NAMES.LEVEL1);
        console.log("construct")
        this.throttledDamage = throttle(this.dealPlayerDamage, 750);
    }

    preload() {
        console.log("preload");

        this.load.image("tiles", tiles);
        this.load.image("sky", background);
        this.load.tilemapTiledJSON("map", gino_level);
    }

    create() {

        const map = this.make.tilemap({ key: "map" });

        const tileset = map.addTilesetImage("Assets", "tiles");

        this.add.image(0, 300, 'sky');
        this.add.image(800, 300, 'sky');

        this.backgroundLayer = map.createStaticLayer("backgroundLayer", tileset, 0, 0);
        this.backgroundLayer.scale = 2;
        this.mainLayer = map.createStaticLayer("mainLayer", tileset, 0, 0);
        this.mainLayer.setCollisionByProperty({ collides: true });
        this.mainLayer.scale = 2;

        this.add.graphics().setAlpha(0.75); //debugGraphics

        /*
        mainLayer.renderDebug(debugGraphics, {
          tileColor: null, // Color of non-colliding tiles
          collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
          faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });
        */

        this.enemies = this.add.group();
        this.spells = this.add.group();

        this.player = new Player(this, 100, 560);
        //this.enemies.add(new Enemy3(this, 400, 510));
        this.enemies.add(new Enemy2(this, 600, 525));
        this.enemies.add(new Enemy4(this, 800, 210));
        this.enemies.add(new Enemy1(this, 1100, 300));
        this.enemies.add(new Enemy5(this, 1400, 400));

        // set bounds so the camera won't go outside the game world
        this.cameras.main.setBounds(0, 0, 1600, 610);
        // make the camera follow the player
        this.cameras.main.startFollow(this.player, true);

        this.physics.add.collider(this.player, this.mainLayer);
        this.physics.add.collider(this.enemies, this.mainLayer);
        this.physics.add.collider(this.spells, this.mainLayer, (spell, wall) => {
            if (spell.onImpact) {
                spell.onImpact();
            }
        });

        this.physics.add.collider(this.enemies, this.spells);
    }

    dealPlayerDamage(player, damage) {
        player.damage(damage);
    }

    update() {
        this.player.update();

        this.physics.overlap(this.player, this.enemies, (player, enemy) => {
            this.throttledDamage(player, 10);
        });

        this.physics.overlap(this.spells, this.enemies, (spell, enemy) => {
            enemy.takeDamage(0.5);
        });

        for (const enemy of this.enemies.getChildren()) {
            enemy.update();
        }

        for (const spell of this.spells.getChildren()) {
            spell.update();
        }
    }
}