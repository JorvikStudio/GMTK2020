import { config } from "../../index";
import { ANIMS } from "./_cst"

export class Enemy3 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        var x = 100;
        var y = 400;

        super(scene, x, y, "enemy3");
        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.play(ANIMS.ENEMY3.IDLE);

        setTimeout(() => {
            this.play(ANIMS.ENEMY3.HIT);
        }, 3000);

        setTimeout(() => {
            this.play(ANIMS.ENEMY3.ATTACK_LEFT);
        }, 6000);

        setTimeout(() => {
            this.play(ANIMS.ENEMY3.ATTACK_RIGHT);
        }, 9000);

        setTimeout(() => {
            this.play(ANIMS.ENEMY3.IDLE);
        }, 12000);

        this.body.setSize(64, 64);
        this.scale = 1.5

    }

    update() {
        this.setSizeToFrame();
    }
}