import { ANIMS } from "./_cst"
import { EnemyBase } from "./enemy.base";

export class Enemy5 extends EnemyBase {
    constructor(scene, x, y, patrolBoundariesLeft, patrolBoundariesRight) {
        super(scene, x, y, "enemy5", 64, 64, patrolBoundariesLeft, patrolBoundariesRight);     
    }

    startBaseAnimation() {
        this.play(ANIMS.ENEMY5.IDLE);
    }

    scheduleAnimations() {

        setTimeout(() => {
            this.body.setSize(30, 64);
            this.play(ANIMS.ENEMY5.HIT);
        }, 3000);

        setTimeout(() => {
            this.body.setSize(64, 64);
            this.play(ANIMS.ENEMY5.ATTACK);
        }, 6000);

        setTimeout(() => {
            this.body.setSize(30, 64);
            this.play(ANIMS.ENEMY5.IDLE);
        }, 9000);

    }

    update() {
        super.update();
    }

    getEnemySpeed() {
        return 15;
    }

    getHitAnimationKey() {
        return ANIMS.ENEMY5.HIT;
    }

    getIdleAnimationKey() {
        return ANIMS.ENEMY5.IDLE;
    }
}