import { config } from "../../index";
import { ANIMS } from "./_cst"
import { EnemyBase } from "./enemy.base";

export class Enemy2 extends EnemyBase {
    constructor(scene) {
        const x = 600;
        const y = 200;
        super(scene, x, y, "enemy2", 32, 32);
    }

    startBaseAnimation()
    {
        this.play(ANIMS.ENEMY2.IDLE);
    }

    scheduleAnimations() {
        setTimeout(() => {
            this.play(ANIMS.ENEMY2.HIT);
        }, 3000);

        setTimeout(() => {
            this.play(ANIMS.ENEMY2.ATTACK);
        }, 6000);

        setTimeout(() => {
            this.play(ANIMS.ENEMY2.IDLE);
        }, 9000);
    }

    update() {
        this.setSizeToFrame();
    }
}