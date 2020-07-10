export class Fireball extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, direction) {
    super(scene, x, y, "fireball");

    this.direction = direction;
    var ball = scene.add.graphics();
    ball.fillStyle(0xf0652e, 1);
    ball.fillCircle(this.x, this.y, 10);
    this.ball = ball;
    scene.physics.world.enable(this.ball);

    this.ball.body.allowGravity = false;
    this.ball.body.setCircle(10);
    this.ball.body.setOffset(this.x - 10, this.y - 10)

    this.ball.body.setVelocityX(500 * direction);
    
  }

  create() {

  }

  update() {
    
  }
}