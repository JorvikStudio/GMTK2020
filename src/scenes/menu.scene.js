import { SCENE_NAMES } from "../_cst";

export class MainMenu extends Phaser.Scene {

    constructor() {
        super(SCENE_NAMES.MAIN_MENU)
    }

    create() {

        const helloButton = this.add.text(100, 100, 'Go to Game!', { fill: '#0f0' });
        helloButton.setInteractive();
        helloButton.on("pointerdown", () => {
            this.scene.start(SCENE_NAMES.SCENE_A);
        })
    }


}