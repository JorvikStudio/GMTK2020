import { config } from "../../index";
import { ANIMS } from "./_cst"

export class Enemy3 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        var x = (config.width / 2) - 100;
        var y = 50;

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

        this.body.setSize(34, 38)
        this.scale = 1.5

    }

    update() {
        this.setSizeToFrame();
    }
}