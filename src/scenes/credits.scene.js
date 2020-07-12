import { Scene } from "phaser";
import { SCENE_NAMES } from "../_cst";

export class CreditsScene extends Scene {

    constructor() {
        super(SCENE_NAMES.CREDITS);
    }

    create() {

        this.creditsText = this.add.text(0, 0, 'Created for the GMTK Game Jam 2020\n\nThanks for playing!', { fontSize: '32px', fontFamily: "Consolas", fill: '#fff' });
        this.madeByText = this.add.text(0, 0, 'Created By:\n\n\nMatt Staton\n\nDeclan Morris\n\nChris Jamison\n\nAlex Lumley', { fontSize: '26px', fontFamily: "Consolas", fill: '#fff' });
        this.assetsByText = this.add.text(0, 0, 'Assets by:\n\n\nSzadi art. (https://szadiart.itch.io/)\n\nEstúdio Vaca Roxa (https://bakudas.itch.io/)', { fontSize: '26px', fontFamily: "Consolas", fill: '#fff' });
        this.musicByText = this.add.text(0, 0, 'Music:\n\n\nKevin MacLeod - Unwritten Return', { fontSize: '26px', fontFamily: "Consolas", fill: '#fff' });
        this.zone = this.add.zone(400, 300, 800, 600);

        Phaser.Display.Align.In.Center(
          this.creditsText,
          this.zone
        );
         
        Phaser.Display.Align.In.Center(
          this.madeByText,
          this.zone
        );

        Phaser.Display.Align.In.Center(
          this.assetsByText,
          this.zone
        );

        Phaser.Display.Align.In.Center(
          this.musicByText,
          this.zone
        );
         
        this.madeByText.setY(1000);
        this.assetsByText.setY(1000);
        this.musicByText.setY(1000);

        this.creditsTween = this.tweens.add({
          targets: this.creditsText,
          y: -300,
          ease: 'Power1',
          duration: 3000,
          delay: 1000,
          onComplete: function () {
            this.destroy;
          }
        });

        this.madeByTween = this.tweens.add({
          targets: this.madeByText,
          y: -500,
          ease: 'Power1',
          duration: 5000,
          delay: 2000,
          onComplete: function () {
            this.destroy;
          }
        });

        this.assetsByTween = this.tweens.add({
          targets: this.assetsByText,
          y: -500,
          ease: 'Power1',
          duration: 7000,
          delay: 4000,
          onComplete: function () {
            this.destroy;
          }
        });

        this.musicByTween = this.tweens.add({
          targets: this.musicByText,
          y: -500,
          ease: 'Power1',
          duration: 9000,
          delay: 6000,
          onComplete: function () {
            this.musicByTween.destroy;
            this.scene.start(SCENE_NAMES.MAIN_MENU);
          }.bind(this)
        });

    }
 }