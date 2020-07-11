export class Firecircle extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, direction) {
        super(scene, x, y, "firecircle");
    
        this.direction = direction;
        var ball = scene.add.graphics();

        this.ball = ball;
        
        this.pi = 0;

        this.createShellFlightPath();
        this.createShellEntryPath(this.shell.getPoint(0.85));

        // this.curve = this.entryPath;
        // this.curve.add(this.shell)
        this.curve = this.shell;
    }
  
    createShellFlightPath()
    {
        var height = 100;
        var width = 50;

        var height = 150;
        var width = 100;

        this.shell = new Phaser.Curves.Ellipse(this.x, this.y, width, height);
        
        this.drawCurve(this.shell);
    }
    
    createShellEntryPath(endPoint)
    {
        var startPoint = new Phaser.Math.Vector2(this.x, this.y);
        var controlPoint = new Phaser.Math.Vector2((this.x+(this.width/2)), this.y-60);

        this.entryPath = new Phaser.Curves.QuadraticBezier(startPoint, controlPoint, endPoint);

        this.drawCurve(this.entryPath);
    }

    // this will draw the flight path, more for debugging than anything else
    drawCurve(curve)
    {
        this.graphics = this.scene.add.graphics();
        this.graphics.lineStyle(1, 0xffffff, 1);

        curve.draw(this.graphics, 64);
    
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