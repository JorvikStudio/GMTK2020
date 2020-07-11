import { config, game } from "../../index";
import { ANIMS } from "./_cst";

export class Light extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        var x = config.width / 2;
        var y = 200;

        super(scene, x, y, "light_animation");
        scene.add.existing(this);
        this.setDisplaySize(64, 64);
        this.play(ANIMS.LIGHT.DEFAULT);
        this.cursorKeys = this.scene.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.cursorKeys.down.isDown) {
            this.emit("light_down");
        }
        if (this.cursorKeys.up.isDown) {
            this.emit("light_up");
        }
        if (this.cursorKeys.space.isDown) {
            this.emit("light_select");
        }
    }
}