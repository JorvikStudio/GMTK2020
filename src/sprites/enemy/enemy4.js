import { config } from "../../index";
import { ANIMS } from "./_cst"

export class Enemy4 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        var x = (config.width / 2) - 60;
        var y = 50;

        super(scene, x, y, "enemy4");
        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.play(ANIMS.ENEMY4.IDLE);

        setTimeout(() => {
            this.play(ANIMS.ENEMY4.HIT);
        }, 3000);

        setTimeout(() => {
            this.play(ANIMS.ENEMY4.ATTACK);
        }, 6000);

        setTimeout(() => {
            this.play(ANIMS.ENEMY4.IDLE);
        }, 9000);

        this.body.setSize(64, 64);
        this.scale = 1.5

    }

    update() {
        this.setSizeToFrame();
    }
}