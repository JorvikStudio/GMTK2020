import { ANIMS } from "./_cst"
import { EnemyBase } from "./enemy.base";

export class Enemy4 extends EnemyBase {
    constructor(scene, x, y, patrolBoundariesLeft, patrolBoundariesRight) {
        super(scene, x, y, "enemy4", 64, 64, patrolBoundariesLeft, patrolBoundariesRight);   
    }

    startBaseAnimation() {
        this.play(ANIMS.ENEMY4.IDLE);
    }

    scheduleAnimations() {
        setTimeout(() => {
            this.play(ANIMS.ENEMY4.HIT);
        }, 3000);
        setTimeout(() => {
            this.play(ANIMS.ENEMY4.ATTACK);
        }, 6000);
        setTimeout(() => {
            this.play(ANIMS.ENEMY4.IDLE);
        }, 9000);
    }

    update() {
        super.update();
    }

    getHitAnimationKey() {
        return ANIMS.ENEMY4.HIT;
    }

    getIdleAnimationKey() {
        return ANIMS.ENEMY4.IDLE;
    }
}