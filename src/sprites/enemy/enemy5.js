import { ANIMS } from "./_cst"
import { EnemyBase } from "./enemy.base";

export class Enemy5 extends EnemyBase {
    constructor(scene, x, y) {
        super(scene, x, y, "enemy5", 64, 64);
        this.patrolBoundaries = {
            left: 1050,
            right: 1600
        };
    }

    startBaseAnimation() {
        this.play(ANIMS.ENEMY5.IDLE);
    }

    scheduleAnimations() {

        setTimeout(() => {
            this.play(ANIMS.ENEMY5.HIT);
        }, 3000);

        setTimeout(() => {
            this.play(ANIMS.ENEMY5.ATTACK);
        }, 6000);

        setTimeout(() => {
            this.play(ANIMS.ENEMY5.IDLE);
        }, 9000);

    }

    update() {
        super.update();
        this.setSizeToFrame();
    }

    getEnemySpeed() {
        return 15;
    }
}