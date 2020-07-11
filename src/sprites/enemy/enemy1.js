import { config } from "../../index";
import { ANIMS } from "./_cst"
import { EnemyBase } from "./enemy.base";

export class Enemy1 extends EnemyBase {
    constructor(scene) {
        const x = (config.width / 2) + 100;
        const y = 50;
        super(scene, x, y, "enemy1", 32, 32);
    }

    startBaseAnimation()
    {
        this.play(ANIMS.ENEMY1.IDLE);
    }

    scheduleAnimations()
    {
        setTimeout(() => {
            this.play(ANIMS.ENEMY1.HIT);
        }, 3000);

        setTimeout(() => {
            this.play(ANIMS.ENEMY1.ATTACK);
        }, 6000);

        setTimeout(() => {
            this.play(ANIMS.ENEMY1.IDLE);
        }, 9000);
    }

    update() {
        this.setSizeToFrame();
    }
}