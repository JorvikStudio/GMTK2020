export class Firecircle extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, direction) {
        super(scene, x, y, "firecircle");
    
        this.direction = direction;
        var ball = scene.add.graphics();

        //draw graphics
        ball.fillStyle(0xf0652e, 1);
        ball.fillCircle(this.x, this.y, 10);
        this.ball = ball;
        
        // xthis.anchor.set(0.5)


        // draw the path

        this.drawCurve();
    }
  
    drawCurve ()
    {
        this.size = 32;

        this.graphics = this.scene.add.graphics();
        
        this.curve = new Phaser.Curves.Spline([
            50, 300,
            164, 246,
            274, 342,
            412, 257,
            522, 341,
            664, 264
        ]);

        this.size = 32;

        this.points = this.curve.getDistancePoints(this.size);
        // this.graphics.clear();
    
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

    }
    
  }