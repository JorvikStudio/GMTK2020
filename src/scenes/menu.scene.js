import { SCENE_NAMES } from "../_cst";

import walls from "../assets/castle/walls_far.png"
import lights3 from "../assets/castle/anim_light3.png";
import logo from "../assets/logo.png";
import { Light } from "../sprites/light/light"
import { ANIMS } from "../sprites/light/_cst";

export class MainMenu extends Phaser.Scene {

    constructor() {
        super(SCENE_NAMES.MAIN_MENU);
        this.light_positions = {
            play: 200,
            play2: 275,
            play3: 350,
            credits: 425,

        };
        this.selectorPosition = 0;
    }

    preload() {
        this.load.image("logo", logo);
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

        const logo = this.add.image(400, 150, "logo");

        this.tweens.add({
          targets: logo,
          y: 450,
          duration: 2000,
          ease: "Power2",
          yoyo: true,
          loop: -1
        });

        const gameName = this.add.text(175, 100, "SUPER WIZARD", {
            fill: "#fff6a8",
            fontFamily: "Consolas",
            fontSize: 64
        });

        const playButton = this.add.text(175, 200, "Level 1", {
            fill: "#fff6a8",
            fontFamily: "Consolas",
            fontSize: 32
        });

       playButton.setInteractive();
        playButton.on("pointerdown", () => {
            this.scene.start(SCENE_NAMES.LEVEL1);
        })

        const level2Button = this.add.text(175, 275, "Level 2", {
            fill: "#fff6a8",
            fontFamily: "Consolas",
            fontSize: 32
        });

       level2Button.setInteractive();
        level2Button.on("pointerdown", () => {
            this.scene.start(SCENE_NAMES.LEVEL2);
        })

        const level3Button = this.add.text(175, 350, "Level 3", {
            fill: "#fff6a8",
            fontFamily: "Consolas",
            fontSize: 32
        });

       level3Button.setInteractive();
        level3Button.on("pointerdown", () => {
            this.scene.start(SCENE_NAMES.LEVEL3);
        })

        const creditsButton = this.add.text(175, 425, "Credits", {
            fill: "#fff6a8",
            fontFamily: "Consolas",
            fontSize: 32
        });
        creditsButton.setInteractive();
        creditsButton.on("pointerdown", () => {
            this.scene.start(SCENE_NAMES.SCENE_A);
        })

        this.light = new Light(this);
        this.light.setPosition(100, this.light_positions[this.getLightPositionKey(this.selectorPosition)]);

        this.light.on("light_up", () => {
            this.selectorPosition = this.selectorPosition === 0 ? 0 : this.selectorPosition - 1;
            this.light.setY(this.light_positions[this.getLightPositionKey(this.selectorPosition)]);
        });
        this.light.on("light_down", () => {
            const maxPosition = Object.keys(this.light_positions).length - 1;
            this.selectorPosition = this.selectorPosition === maxPosition ? maxPosition : this.selectorPosition + 1;
            this.light.setY(this.light_positions[this.getLightPositionKey(this.selectorPosition)]);
        });

        this.light.on("light_select", () => {
            const play1Selector = 0
            const play2Selector = 1
            const play3Selector = 2
            const creditsSelector = 3

            if (this.selectorPosition === play1Selector) {
                this.scene.start(SCENE_NAMES.LEVEL1);
            }
            else if (this.selectorPosition === play2Selector) {
                this.scene.start(SCENE_NAMES.LEVEL2);
            }
            else  if (this.selectorPosition === play3Selector) {
                this.scene.start(SCENE_NAMES.LEVEL3);
            }
        });
        
    }

    getLightPositionKey(index) {
        const keys = Object.keys(this.light_positions);
        const selectedKey = keys[index];
        return selectedKey;
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