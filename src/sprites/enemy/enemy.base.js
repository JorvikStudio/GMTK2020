import Phaser from "phaser";

export class EnemyBase extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, posX, posY, texture, width, height, patrolBoundariesLeft, patrolBoundariesRight) {
        super(scene, posX, posY, texture);
        this.startBaseAnimation();
        this.scheduleAnimations();
        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.body.setSize(width, height);
        this.scale = 1.5
        this.setImmovable(true);
        this.hasHitFloor = false;
        this.checkFloors = false;
        this.health = this.getStartingHealth();

        if (patrolBoundariesLeft > 0 && patrolBoundariesRight > 0) {
            this.patrolBoundaries = {
                left: patrolBoundariesLeft,
                right: patrolBoundariesRight
            };
        }
    }

    getStartingHealth() {
        return 100;
    }

    getHitAnimationKey() {
        // Implement me
    }

    getIdleAnimationKey() {
        // Implement me;
    }

    startBaseAnimation() {
        //Implement me in subclass
    }

    scheduleAnimations() {
        //Implement me in subclass
    }

    update() {
        this.setSizeToFrame();
        if (this.enemyPatrols() && this.active) {
            this.patrolPoints();
        }

        if(this.isDead) {
            this.tint = 0x333333;
        } else if(this.isDamaged) {
            this.tint = 0xBF1313;
        } else {
            this.clearTint();
        }
    }

    enemyPatrols() {
        return this.patrolBoundaries != null;
    }

    getEnemySpeed() {
        return 50;
    }

    patrolPoints() {
        if (this.checkFloors) {
            const currentVelocity = this.body.velocity.x;
            const isGoingLeft = currentVelocity < 0;
            const isGoingRight = currentVelocity > 0;
            const velocityMultiplier = this.getEnemySpeed();
            if (!isGoingLeft && !isGoingRight) {
                const startingVelocity = velocityMultiplier * this.getRandomDirection()
                this.setVelocityX(startingVelocity);
                this.setFlipX(startingVelocity < 0);
            }
            else if (isGoingLeft && this.body.left - this.body.width - 5 < this.patrolBoundaries.left)
            {
                this.setFlipX(false);
                this.setVelocityX(-1 * currentVelocity);
            }
            else if (isGoingRight && this.body.right + 5 > this.patrolBoundaries.right)
            {
                this.setFlipX(true);
                this.setVelocityX(-1 * currentVelocity);
            }
        }
        else {
            // Start checking floors after 1ms. Otherwise we sometimes fly off in a random direction at game start
            setTimeout(() => { this.checkFloors = true; }, 1);
        }
    }

    getRandomDirection() {
        const random = Math.random();
        if (random > 0.5)
            return 1;
        return -1;
    }

    takeDamage(damage) {

        this.health = this.health - damage;
        console.log(`Took ${damage} damage. Health is now ${this.health}.`);
        if (this.health < 0) {
            this.die();
        } else {
            this.play(this.getHitAnimationKey());
            this.isDamaged = true;
            setTimeout(() => {
                this.play(this.getIdleAnimationKey());
                this.isDamaged = false;
            }, 500);
        }
    }

    die() {
        this.body.destroy();
        this.scene.tweens.add({
            targets: this,
            angle: 90,
            ease: "Power1",
            duration:500,
        })
        this.isDead = true;
        this.active = false;
        setTimeout(() => {
            this.destroy();
        }, 4000);
    }
}