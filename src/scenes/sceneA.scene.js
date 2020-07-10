import { SCENE_NAMES } from "../_cst";
import logo from "../assets/logo.png";

export class SceneA extends Phaser.Scene {

    constructor () {
        super(SCENE_NAMES.SCENE_A);
    }

    preload() {
        this.load.image("logo", logo);
    }
      
    create() {
        const logo = this.add.image(400, 150, "logo");
      
        this.tweens.add({
          targets: logo,
          y: 450,
          duration: 2000,
          ease: "Power2",
          yoyo: true,
          loop: -1
        });
    }
}