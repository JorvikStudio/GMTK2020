export class Fireball extends Phaser.Physics.Arcade.Sprite {

  constructor(scene, x, y, direction) {
      super(scene, x, y, "fireball");
  
      this.direction = direction;
      var ball = scene.add.graphics();

      this.ball = ball;
      this.scene.physics.world.enable(this);

      this.body.setImmovable(true);
      this.body.allowGravity = false;
      this.body.isCircle = true;

      this.pi = 0;

      this.createFlightpath();
    }

  createFlightpath ()
  {
    this.curve = new Phaser.Curves.Spline();

    for (var i = 0; i<8; i++)
    {
      this.curve.addPoint((this.x + (60 * i * this.direction)), (this.y + 30*(Math.sin(i * 90))))
    }
  }
    
  // this will draw the flight path, more for debugging than anything else
  drawFlightpath()
  {
    this.graphics = this.scene.add.graphics();
    
    this.graphics.lineStyle(1, 0xffffff, 1);

    this.curve.draw(this.graphics, 64);

    this.graphics.fillStyle(0x00ff00, 1);
    this.graphics.lineStyle(1, 0x00ff00, 1);
  }

  create ()
  {

  }
  
  update ()
  {
      this.ball.clear();
      const destroySelf = false;
      
      for (var i = 0; i<3; i++)
      {
          const percent = (this.pi+i)/70;

          if(percent <= 1 && this.active) {
            const point = this.curve.getPoint(percent);
            if (point) {

              const size = (i+1)*3;
              const offset = size * 1.5;

              this.drawfireball(point.x, point.y, size);
              this.body.position = new Phaser.Math.Vector2(point.x - offset, point.y - offset);
              this.body.updateCenter();
              this.body.setVelocityX(1);
            }
          } else {
            this.destroySelf();
          }
      }
      
      this.pi++;
  }

  drawfireball (x, y, size)
  {
      this.ball.fillStyle(0xf0652e, 1);
      this.ball.fillCircle(x, y, size);
  }

  onImpact() {
    this.active = false;
    this.destroySelf();
  }

  destroySelf() {
    this.ball.clear();
    this.destroy();
  }
}