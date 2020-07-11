import { SCENE_NAMES } from "../_cst";
import walls from "../assets/castle/walls.png"
import background from "../assets/castle/background.png"

export class MainMenu extends Phaser.Scene {

    constructor() {
        super(SCENE_NAMES.MAIN_MENU)
    }

    preload() {
        this.load.image("wall", walls);
        this.load.image("menu_background", background);
    }

    create() {
        const gameWidth = this.game.canvas.width;
        const gameHeight = this.game.canvas.height;
        this.renderBackground(gameWidth, gameHeight);

        const playButton = this.add.text(100, 100, "Play!", {
            fill: "#0f0"
        });
        playButton.setInteractive();
        playButton.on("pointerdown", () => {
            this.scene.start(SCENE_NAMES.MATT_SCENE);
        })

        const helloButton = this.add.text(100, 200, 'Go to Game!', { fill: '#0f0' });
        helloButton.setInteractive();
        helloButton.on("pointerdown", () => {
            this.scene.start(SCENE_NAMES.SCENE_A);
        })
    }

    renderBackground(gameWidth, gameHeight) {
     
        const tileScale = 2;
        const backgroundWidth = 480;
        const backgroundHeight = 240;
        const imageWidth = 128;
        const imageHeight = 256;
        const tileY = gameHeight - (imageHeight * tileScale);

        const backgroundScale = Math.max(gameWidth / backgroundWidth, gameHeight / backgroundHeight);
        console.log(`Background scale is ${backgroundScale}`);

        this.add.image(0, 0, "menu_background")
            .setDisplayOrigin(0, 0)
            .setScale(backgroundScale);

        
        const columns = Math.ceil(gameWidth / imageWidth);
        const imageCropX = 304;
        for (let i = 0; i < columns; i++) {
            const imageX = ((i * imageWidth) - imageCropX) * 2;
            let image = this.add.image(imageX, tileY, "wall")
            image.setDisplayOrigin(0, 0);
            image.setScale(tileScale);
            image.setCrop(imageCropX, 0, imageWidth, imageHeight)
        }
    }


}