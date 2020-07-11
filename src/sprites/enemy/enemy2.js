import { config } from "../../index";
import { ANIMS } from "./_cst"

export class Enemy2 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        var x = (config.width / 2) - 150;
        var y = 50;

        super(scene, x, y, "enemy2");
        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.play(ANIMS.ENEMY2.IDLE);

        setTimeout(() => {
            this.play(ANIMS.ENEMY2.HIT);
        }, 3000);

        setTimeout(() => {
            this.play(ANIMS.ENEMY2.ATTACK);
        }, 6000);

        setTimeout(() => {
            this.play(ANIMS.ENEMY2.IDLE);
        }, 9000);

        this.body.setSize(24, 38)
        this.scale = 1.5

    }

    update() {
        this.setSizeToFrame();
    }
}