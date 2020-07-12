import { ANIMS } from "./_cst"
import { EnemyBase } from "./enemy.base";

export class Enemy2 extends EnemyBase {
    constructor(scene, x, y) {
        super(scene, x, y, "enemy2", 32, 32);
        this.patrolBoundaries = {
            left: 496,
            right: 704
        };
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
        super.update();
    }
}