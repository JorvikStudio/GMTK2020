import {config, game} from "../../index";
import { ANIMS, PLAYER_STATE } from "./_cst";
import { Fireball } from "../fireball/fireball";
export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene) {
    var x = config.width / 2;
    var y = 200;

    super(scene, x, y, "player");
    scene.physics.world.enable(this);
    scene.add.existing(this);
    //this.play(ANIMS.PLAYER.IDLE);

    this.cursorKeys = this.scene.input.keyboard.createCursorKeys();
    this.keyboard = this.scene.input.keyboard.addKeys(Phaser.Input.Keyboard.KeyCodes);

    this.playerJumpHeight = 650;
    this.isJumping = false; 
    this.state = PLAYER_STATE.IDLE;
    this.body.setSize(24, 38);
    this.scale = 1.5
    console.log(this);
    //this.body.updateCenter();
    
    this.body.offset = ({x: -1, y: 0});
  }

  update() {
    console.log(this.body.touching.down)
    this.body.updateCenter();
    let isCrouched = false;
    let playerSpeed = 250;

    this.debugShowBody = this.keyboard.SHIFT.isDown;
    this.jumpingFrame = false;
    this.debugShowBody = true;
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

    switch(this.state) {
      case PLAYER_STATE.JUMPING:
        this.anims.play(ANIMS.PLAYER.JUMP);
        break;
      case PLAYER_STATE.IDLE:
        if(isCrouched) {
          //this.anims.play(ANIMS.DINO.CROUCH);
        } else {
          this.anims.play(ANIMS.PLAYER.IDLE, true);
        }
        break;
      case PLAYER_STATE.WALKING:
        if(isCrouched) {
          //this.anims.play(ANIMS.DINO.CROUCH_WALK, true)
        } else {
          this.anims.play(ANIMS.PLAYER.WALK, true);
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

}