import Phaser from "phaser";
import { config } from "../../index";
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
        if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.down)) {
            this.emit("light_down");
        }
        if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.up)) {
            this.emit("light_up");
        }
        if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.space)) {
            this.emit("light_select");
        }
    }
}