import { SCENE_NAMES } from "../_cst";
import walls from "../assets/castle/walls_far.png"
import lights3 from "../assets/castle/anim_light3.png";

import { Light } from "../sprites/light/light"
import { ANIMS } from "../sprites/light/_cst";

export class MainMenu extends Phaser.Scene {

    constructor() {
        super(SCENE_NAMES.MAIN_MENU);
        this.light_positions = {
            play: 200,
            credits: 300
        };
        this.selectorPosition = Object.keys(this.light_positions)[0];
    }

    preload() {
        this.load.image("wall", walls);
        this.load.spritesheet("light_animation", lights3, {
            frameWidth: 64,
            frameHeight: 64
        });
    }

    create() {
        this.anims.create({
            key: ANIMS.LIGHT.DEFAULT,
            frames: this.anims.generateFrameNumbers("light_animation", {
                start: 0,
                end: 4
            }),
            frameRate: 8,
            repeat: -1
        });

        const gameWidth = this.game.canvas.width;
        const gameHeight = this.game.canvas.height;
        this.renderBackground(gameWidth, gameHeight);

        const playButton = this.add.text(175, 200, "Play!", {
            fill: "#fff6a8",
            fontFamily: "Consolas",
            fontSize: 32
        });

        playButton.setInteractive();
        playButton.on("pointerdown", () => {
            this.scene.start(SCENE_NAMES.MATT_SCENE);
        })

        const creditsButton = this.add.text(175, 300, "Credits", {
            fill: "#fff6a8",
            fontFamily: "Consolas",
            fontSize: 32
        });
        creditsButton.setInteractive();
        creditsButton.on("pointerdown", () => {
            this.scene.start(SCENE_NAMES.SCENE_A);
        })

        this.light = new Light(this);
        this.light.setPosition(100, this.light_positions[this.selectorPosition]);

        this.light.on("light_up", () => {
            this.selectorPosition = Object.keys(this.light_positions)[0];
            this.light.setY(this.light_positions[this.selectorPosition]);
        });
        this.light.on("light_down", () => {
            this.selectorPosition = Object.keys(this.light_positions)[1];
            this.light.setY(this.light_positions[this.selectorPosition]);
        });

        this.light.on("light_select", () => {
            const playSelector = Object.keys(this.light_positions)[0];
            const creditsSelector = Object.keys(this.light_positions)[1];
            if (this.selectorPosition === playSelector) {
                this.scene.start(SCENE_NAMES.MATT_SCENE);
            }
        });
        
    }

    renderBackground(gameWidth, gameHeight) {
     
        const backgroundWidth = 480;
        const backgroundHeight = 240;
        const imageWidth = 128;
        const imageHeight = 256;

        const tileScale = gameHeight / imageHeight;
        const tileY = 0;
        
        const columns = Math.ceil(gameWidth / imageWidth);
        const imageCropX = 304;
        for (let i = 0; i < columns; i++) {
            const imageX = ((i * imageWidth) - imageCropX - 20) * tileScale; //yuck! Magic number of 20 makes it look symmetrical
            let image = this.add.image(imageX, tileY, "wall")
            image.setDisplayOrigin(0, 0);
            image.setScale(tileScale);
            image.setCrop(imageCropX, 0, imageWidth, imageHeight)
        }
    }

    update() {
        this.light.update();
    }

}