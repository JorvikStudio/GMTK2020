import Phaser from "phaser";
export class Firecircle extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, "firecircle");
    
        var ball = scene.add.graphics();

        this.ball = ball;
        
        this.pi = 0;

        this.isEntryComplete = false;

        this.scene.physics.world.enable(this);
        this.body.setImmovable(true);
        this.body.allowGravity = false;
        this.body.isCircle = true;

        this.createShellFlightPath(this.x, this.y);
        this.createShellEntryPath(this.shell.getStartPoint());

        this.curve = this.shell;

        this.scene.physics.world.enable(this);

        this.body.setImmovable(true);
        this.body.allowGravity = false;
        this.body.isCircle = true;
    }
  
    createShellFlightPath(x, y)
    {
        var height = 100;
        var width = 50;

        this.shell = new Phaser.Curves.Ellipse(x, y, width, height);
        
        // this.drawCurve(this.shell);
    }
    
    createShellEntryPath(endPoint)
    {
        var startPoint = new Phaser.Math.Vector2(this.x, this.y);
        var controlPoint = new Phaser.Math.Vector2((this.x+(this.width/2)), this.y-60);

        this.entryPath = new Phaser.Curves.QuadraticBezier(startPoint, controlPoint, endPoint);

        // this.drawCurve(this.entryPath);
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

        this.curve = this.createShellFlightPath(this.scene.player.x, this.scene.player.y)
        
        this.ball.clear();
        const destroySelf = false;
        
        if (!this.isEntryComplete)
        {
            this.drawFireballs(this.entryPath, 15);
            if(this.pi == 15)
            {
                this.isEntryComplete = true;
                this.pi = 0;
            }
        }
        else
        {
            this.drawFireballs(this.shell, 80);
        }
        
        if(destroySelf) {
            this.destroy();
        }

        this.pi++;
    }

    drawFireballs (curve, numberOfPoints)
    {
        for (var i = 0; i<3; i++)
        {
            const size = (i+1)*3;
            const offset = size * 1.5;

            const percent = (this.pi+i)/numberOfPoints;
            const point = curve.getPoint(percent);
            var x = point.x;
            var y = point.y;
            
            this.drawfireball(x, y, size);

            this.body.position = new Phaser.Math.Vector2(point.x - offset, point.y - offset);
            this.body.updateCenter();
            this.body.setVelocityX(1);
        }
    }

    drawfireball (x, y, size)
    {
        this.ball.fillStyle(0xf0652e, 1);
        this.ball.fillCircle(x, y, size);
    }

    destroySelf() {
        this.ball.clear();
        this.destroy();
      }
  }