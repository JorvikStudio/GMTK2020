import Phaser from "phaser";

export class EnemyBase extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, posX, posY, texture, width, height) {
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
        this.patrolBoundaries = {
            left: 496,
            right: 704
        };
    }

    startBaseAnimation() {
        //Implement me in subclass
    }

    scheduleAnimations() {
        //Implement me in subclass
    }

    update() {
        this.patrolPoints();
    }

    patrolPoints() {
        if (this.checkFloors) {
            const currentVelocity = this.body.velocity.x;
            const isGoingLeft = currentVelocity < 0;
            const isGoingRight = currentVelocity > 0;
            const velocityMultiplier = 50;
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
}