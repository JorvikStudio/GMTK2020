import { config } from "../../index";
import { ANIMS } from "./_cst"
import { EnemyBase } from "./enemy.base";

export class Enemy3 extends EnemyBase {
    constructor(scene) {
        const x = 100;
        const y = 400;
        super(scene, x, y, "enemy3", 64, 64);
    }

    startBaseAnimation() {
        this.play(ANIMS.ENEMY3.IDLE);
    }

    scheduleAnimations() {
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
    }

    update() {
        this.setSizeToFrame();
    }
}