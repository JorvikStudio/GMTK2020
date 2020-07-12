import Phaser from "phaser";
import { ANIMS, PLAYER_STATE, DIRECTION } from "./_cst";
import { Fireball } from "../fireball/fireball";
import { Firecircle } from "../firecircle/firecircle";
import { Bastion } from "../bastion/bastion"
import { Smite } from "../smite/smite"
// import { SCENE_NAMES } from "../../_cst";

export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {

    super(scene, x, y, "player");
    scene.physics.world.enable(this);
    scene.add.existing(this);

    this.cursorKeys = this.scene.input.keyboard.createCursorKeys();
    this.keyboard = this.scene.input.keyboard.addKeys(Phaser.Input.Keyboard.KeyCodes);

    this.playerJumpHeight = 650;
    this.isJumping = false;
    this.isCasting = false;
    this.invincible = false;
    this.setBounce(0, 0);
    this.setImmovable(false);
    this.state = PLAYER_STATE.IDLE;
    this.body.setSize(24, 38);
    this.scale = 1.5
    console.log(this);
    //this.body.updateCenter();
    
    this.body.offset = ({x: -1, y: 0});

    this.on("animationcomplete", this.animComplete, this);
    this.blockedInput = false;

    this.spellList = this.scene.spellList;
    this.currentSpell = '';

    this.chooseSpell();
    setInterval(() => { 
        this.chooseSpell();    
    }, 5000);
  }

  update() {
    this.body.updateCenter();
    let playerSpeed = 250;

    if(this.invincible) {
      this.alpha = 0.5;
    } else {
      this.alpha = 1;
    }
    if(this.body.onFloor()) {
      this.setVelocityX(0);
      this.blockedInput = false;
    }

    this.debugShowBody = this.keyboard.SHIFT.isDown;
    this.jumpingFrame = false;
    this.debugShowBody = true;
    if(this.keyboard.SHIFT.isDown) {
      // Debug here
    }

    if(!this.blockedInput) {

      if(Phaser.Input.Keyboard.JustDown(this.keyboard.X)) {
        const direction = this.flipX ? -1 : 1
        this.castFirecircle();
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
      } else if (this.isCasting) {
        this.state = PLAYER_STATE.CASTING;
      } else {
        this.state = PLAYER_STATE.IDLE;
      }
  
      switch(this.state) {
        case PLAYER_STATE.JUMPING:
          this.anims.play(ANIMS.PLAYER.JUMP);
          break;
        case PLAYER_STATE.IDLE:
            this.anims.play(ANIMS.PLAYER.IDLE, true);
          break;
        case PLAYER_STATE.WALKING:
            this.anims.play(ANIMS.PLAYER.WALK, true);
          break;
        case PLAYER_STATE.CASTING:
          this.anims.play(ANIMS.PLAYER.CAST, true)
          break;
        default:
          console.log("STATE NOT ANIMATED")
      }

    } else {
      console.log("blocked");
    }


    // Normalize and scale the velocity so that player can't move faster along a diagonal
    //this.body.velocity.normalize().scale(playerSpeed);

    this.setSizeToFrame();
  }

  jump() {
      this.setVelocityY(-this.playerJumpHeight);
  }

  damage() {
    if(!this.invincible) {
      console.log("damage");
      this.anims.play(ANIMS.PLAYER.DAMAGED);
      this.blockedInput = true;
      this.setVelocityX(300 * this.getFacingDirection() * -1);
      this.setVelocityY(-200);
      this.invincible = true;

      setTimeout(() => { 
        console.log("timer");
        this.invincible = false;
      }, 3000);
    }
  }

  animComplete(animation) {
    const key = animation.key;
    // const direction = this.flipX;
    if(key === ANIMS.PLAYER.DAMAGED) {
      this.blockedInput = false;
    }
  }

  getFacingDirection() {
    return this.flipX ? DIRECTION.LEFT : DIRECTION.RIGHT;
  }

  chooseSpell() {
    let spells = this.spellList.filter(spellName => spellName != this.currentSpell);
    this.currentSpell = spells[Math.floor(Math.random() * spells.length)];
    let count = 0;
    this.castSpell(this.currentSpell);

    const interval = setInterval(() => {
      if (count < 4) {
        if(this.currentSpell != 'firecircle') { this.castSpell(this.currentSpell); }
        count++;
      } else {
        clearInterval(interval);
      }
    }, 1000);
  }

  castSpell(spellName) {    

    if (spellName == 'fireball'){
      const direction = this.flipX ? -1 : 1
      this.castFireball(direction);
    }
    else if (spellName == 'firecircle'){
      const direction = this.flipX ? -1 : 1
      this.castFirecircle(direction);
    }
    else if (spellName == 'bastion'){
      const direction = this.flipX ? -1 : 1
      this.castBastion(direction);
    }
  }

  castFireball(direction) {
    this.scene.spells.add(new Fireball(this.scene, this.x, this.y, direction));
  }

  castFirecircle(direction) {
    let count = 0;
    this.castSingleFireCircle();
    const interval = setInterval(() => {
      if(count < 3) {
        this.castSingleFireCircle();
        count++;
      } else {
        clearInterval(interval);
      }
    }, 500);
  }

  castBastion(direction) {
    this.scene.spells.add(new Bastion(this.scene, this.x, this.y, direction));
  }

  castSingleFireCircle() {
    const fc = new Firecircle(this.scene, this.x, this.y)
    this.scene.spells.add(fc);

    setTimeout(() => {
      fc.active = false;
      fc.destroySelf();
    }, 5000);
  }

}