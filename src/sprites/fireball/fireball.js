export class Fireball extends Phaser.Physics.Arcade.Sprite {

  constructor(scene, x, y, direction) {
      super(scene, x, y, "fireball");
  
      this.direction = direction;
      var ball = scene.add.graphics();

      this.ball = ball;
      
      this.pi = 0;

      this.createFlightpath();
    }

  createFlightpath ()
  {
      this.size = 32;

      
      this.curve = new Phaser.Curves.Spline();
      
      for (var i = 0; i<8; i++)
      {
        this.curve.addPoint((this.x + (60*i)), (this.y + 30*(Math.sin(i*90))))
      }        
      
      this.size = 32;
      
      this.points = this.curve.getDistancePoints(this.size);
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
      
      for (var i = 0; i<3; i++)
      {
          this.percent = (this.pi+i)/70;
          var x = this.curve.getPoint(this.percent).x;
          var y = this.curve.getPoint(this.percent).y;
          this.drawfireball(x, y, (i+1)*3);
      }  
      
      this.pi++;
  }

  drawfireball (x, y, size)
  {
      this.ball.fillStyle(0xf0652e, 1);
      this.ball.fillCircle(x, y, size);
  }
}