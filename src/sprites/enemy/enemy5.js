import { config } from "../../index";
import { ANIMS } from "./_cst"

export class Enemy5 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        var x = (config.width / 2) + 175;
        var y = 50;

        super(scene, x, y, "enemy5");
        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.play(ANIMS.ENEMY5.IDLE);

        setTimeout(() => {
            this.play(ANIMS.ENEMY5.HIT);
        }, 3000);

        setTimeout(() => {
            this.play(ANIMS.ENEMY5.ATTACK);
        }, 6000);

        setTimeout(() => {
            this.play(ANIMS.ENEMY5.IDLE);
        }, 9000);

        this.body.setSize(34, 38)
        this.scale = 1.5

    }

    update() {
        this.setSizeToFrame();
    }
}