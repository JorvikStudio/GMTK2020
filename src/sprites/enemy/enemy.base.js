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
    }

    startBaseAnimation() {
        //Implement me in subclass
    }

    scheduleAnimations() {
        //Implement me in subclass
    }
}