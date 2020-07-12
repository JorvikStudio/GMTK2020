import { ANIMS } from "./_cst"
import { EnemyBase } from "./enemy.base";

export class Enemy2 extends EnemyBase {
    constructor(scene, x, y, patrolBoundariesLeft, patrolBoundariesRight) {
        super(scene, x, y, "enemy2", 32, 32, patrolBoundariesLeft, patrolBoundariesRight);      
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

    getHitAnimationKey() {
        return ANIMS.ENEMY2.HIT;
    }

    getIdleAnimationKey() {
        return ANIMS.ENEMY2.IDLE;
    }
}