import Phaser from "phaser";
export class Bastion extends Phaser.Physics.Arcade.Sprite {

  constructor(scene, x, y, direction) {
      super(scene, x, y, "bastionWall");
  
      this.direction = direction;
      this.bastionWall = scene.add.graphics();
    
      this.scene.physics.world.enable(this);
      this.body.setImmovable(true);
      this.body.allowGravity = false;
      // this.body.isCircle = true;

      this.pi = 0;


      this.createBastion();

      this.createBastionSpike(scene);

      this.createFlightpath();
    }

  createBastion ()
  {
    const bastionBase = this.y + 26;
    const bastionStart = this.x + 24
    const bastionLength = 70;
    const bastionHeight = 50;

    var point1 = new Phaser.Geom.Point(bastionStart, bastionBase-bastionHeight);
    var point2 = new Phaser.Geom.Point(bastionStart, bastionBase);
    var point3 = new Phaser.Geom.Point(this.x+bastionLength, bastionBase);

    // this.bastionWall.fillTriangle(point1.x, point1.y, point2.x, point2.y, point3.x, point3.y); // turn back on to get inital wall in
    this.bastionWallGeom = new Phaser.Geom.Triangle(point1.x, point1.y, point2.x, point2.y, point3.x, point3.y);
    this.bastionWall.fillStyle(0x464a4f, 1)
  }

  createBastionSpike (scene)
  {
    // below is for debuging
    var hypotenuse = this.bastionWallGeom.getLineC();
    var line = scene.add.graphics();
    line.strokeLineShape(hypotenuse);

    var spikeBaseStart = 0.10;
    var spikeBaseLenth = 0.10;
  
    // var normalTohypotenuse = Phaser.Geom.Line.GetNormal(hypotenuse);
    // var middlePoint = Phaser.Geom.Line.GetMidPoint(hypotenuse);

    // var normalLine = new Phaser.Geom.Line (normalTohypotenuse.x, normalTohypotenuse.y, middlePoint.x, middlePoint.y);

    var rad = Phaser.Math.DegToRad(90);
    var normalLine = Phaser.Geom.Line.Rotate(hypotenuse, rad);


    var normal = scene.add.graphics();
    normal.strokeLineShape(normalLine);


    var point1 = hypotenuse.getPoint(spikeBaseStart);
    var point2 = hypotenuse.getPoint(spikeBaseStart + spikeBaseLenth);
    // var point3 = new Phaser.Geom.Point(this.x+spikeLength, spikeBase);

  }

  createFlightpath ()
  {
    this.size = 32;

    this.curve = new Phaser.Curves.Spline();

    for (var i = 0; i<8; i++)
    {
      this.curve.addPoint((this.x + (60 * i * this.direction)), (this.y + 30*(Math.sin(i * 90))))
    }        
            
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
      // this.ball.clear();
      // const destroySelf = false;
      
      // for (var i = 0; i<3; i++)
      // {
      //     const percent = (this.pi+i)/70;

      //     if(percent <= 1 && this.active) {
      //       const point = this.curve.getPoint(percent);
      //       if (point) {

      //         const size = (i+1)*3;
      //         const offset = size * 1.5;

      //         this.drawfireball(point.x, point.y, size);
      //         this.body.position = new Phaser.Math.Vector2(point.x - offset, point.y - offset);
      //         this.body.updateCenter();
      //         this.body.setVelocityX(1);
      //       }
      //     } else {
      //       this.destroySelf();
      //     }
      // }
      
      this.pi++;
  }

  // drawfireball (x, y, size)
  // {
  //     this.ball.fillStyle(0xf0652e, 1);
  //     this.ball.fillCircle(x, y, size);
  // }

  onImpact() {
    this.active = false;
    this.destroySelf();
  }

  // destroySelf() {
  //   this.ball.clear();
  //   this.destroy();
  // }
}