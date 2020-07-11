import { config } from "../../index";
import { ANIMS } from "../player/_cst"

export class Enemy1 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        var x = (config.width / 2) + 100;
        var y = 50;

        super(scene, x, y, "enemy1");
        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.play(ANIMS.ENEMY1.IDLE);

        setTimeout(() => {
            this.play(ANIMS.ENEMY1.HIT);
        }, 3000);

        setTimeout(() => {
            this.play(ANIMS.ENEMY1.ATTACK);
        }, 6000);

        setTimeout(() => {
            this.play(ANIMS.ENEMY1.IDLE);
        }, 9000);

        this.body.setSize(24, 38)
        this.scale = 1.5
        
    }

    update() {
        this.setSizeToFrame();
    }
}