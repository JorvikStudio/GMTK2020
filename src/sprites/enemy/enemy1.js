import { ANIMS } from "./_cst"
import { EnemyBase } from "./enemy.base";

export class Enemy1 extends EnemyBase {
    constructor(scene, x, y) {
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
        super.update();
    }

    getHitAnimationKey() {
        return ANIMS.ENEMY1.HIT;
    }

    getIdleAnimationKey() {
        return ANIMS.ENEMY1.IDLE;
    }
}