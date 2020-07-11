import {config, game} from "../../index";
import { ANIMS, PLAYER_STATE } from "./_cst";
import { Fireball } from "../fireball/fireball";
export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene) {
    var x = config.width / 2;
    var y = 200;

    super(scene, x, y, "player_dino");
    scene.physics.world.enable(this);
    scene.add.existing(this);
    this.setDisplaySize(this.body.width * 3, this.body.height * 3);
    this.play(ANIMS.DINO.IDLE);

    this.cursorKeys = this.scene.input.keyboard.createCursorKeys();
    this.keyboard = this.scene.input.keyboard.addKeys(Phaser.Input.Keyboard.KeyCodes);

    this.resetSize(false);
    console.log(this.keyboard);

    this.playerJumpHeight = 650;
    this.isJumping = false; 
    this.state = PLAYER_STATE.IDLE;
  }

  update() {
    
    let isCrouched = false;
    let playerSpeed = 250;

    this.debugShowBody = this.keyboard.SHIFT.isDown;
    this.jumpingFrame = false;
    if(this.keyboard.SHIFT.isDown) {
      // Debug here
    }

    if(Phaser.Input.Keyboard.JustDown(this.keyboard.Z)) {
      const direction = this.flipX ? -1 : 1
      const fb = new Fireball(this.scene, this.x, this.y, direction);
      fb.update();
    }

    if(Phaser.Input.Keyboard.JustDown(this.keyboard.SPACE)) {
      if(!this.isJumping) {
        this.isJumping = true;
        this.jump();
        this.state = PLAYER_STATE.JUMPING;
        this.jumpingFrame = true;
      }
    }
    
    if(!this.jumpingFrame && this.isJumping && this.body.onFloor()) {
      this.isJumping = false;
    }

    let isMoving = false;
    if (this.cursorKeys.right.isDown) {
      isMoving = true;
      this.body.setVelocityX(playerSpeed);
      this.setFlipX(false);
    } else if (this.cursorKeys.left.isDown) {
      isMoving = true;
      this.body.setVelocityX(-playerSpeed);
      this.setFlipX(true);
    } else {
      this.body.setVelocityX(0);
    }
    

    if(this.isJumping) {
      this.state = PLAYER_STATE.JUMPING;
    } else if(isMoving) {
      this.state = PLAYER_STATE.WALKING;
    } else {
      this.state = PLAYER_STATE.IDLE;
    }

    if(this.cursorKeys.down.isDown) {
      this.crouch(this.flipX);
      isCrouched = true;
    } else {
      this.resetSize();
    }
    
    switch(this.state) {
      case PLAYER_STATE.JUMPING:
        this.anims.play(ANIMS.DINO.JUMP);
        break;
      case PLAYER_STATE.IDLE:
        if(isCrouched) {
          this.anims.play(ANIMS.DINO.CROUCH);
        } else {
          this.anims.play(ANIMS.DINO.IDLE, true);
        }
        break;
      case PLAYER_STATE.WALKING:
        if(isCrouched) {
          this.anims.play(ANIMS.DINO.CROUCH_WALK, true)
        } else {
          this.anims.play(ANIMS.DINO.WALK, true);
        }
        break;
      default:
        console.log("STATE NOT ANIMATED")
    }
    // Normalize and scale the velocity so that player can't move faster along a diagonal
    //this.body.velocity.normalize().scale(playerSpeed);

    this.setSizeToFrame();
  }

  jump() {
      this.setVelocityY(-this.playerJumpHeight);
  }


  /* 110% not the way to do this with offsets, need to look into this more */
  resetSize(flipped) {
    const multiplier = flipped ? -1 : 1;
    this.body.setOffset(4 * multiplier, 0);
    this.body.setSize(16, 18, false);
  }

  crouch() {
    this.body.setOffset(0, 4);
    this.body.setSize(20, 14, false);
  }
}