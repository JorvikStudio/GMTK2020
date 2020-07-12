import Phaser from "phaser";
export class Bastion extends Phaser.Physics.Arcade.Sprite {

  constructor(scene, x, y, direction) {
      super(scene, x, y, "bastionWall");
  
      this.direction = direction;
      this.bastionWall = scene.add.graphics();
    
      this.scene.physics.world.enable(this);
      this.body.setImmovable(true);
      this.body.allowGravity = false;

      this.createBastion();

      for (var i =1; i <= 8; i++)
      {
        this.createBastionSpike(scene, i);
      }
    }

  createBastion ()
  {
    const bastionBase = this.y + 26;
    const bastionStart = this.x + 24 * this.direction;
    const bastionLength = 60 * this.direction;
    const bastionHeight = 40;

    var point1 = new Phaser.Geom.Point(bastionStart, bastionBase-bastionHeight);
    var point2 = new Phaser.Geom.Point(bastionStart, bastionBase);
    var point3 = new Phaser.Geom.Point(this.x+bastionLength, bastionBase);

    this.bastionWall.fillTriangle(point1.x, point1.y, point2.x, point2.y, point3.x, point3.y);
    this.bastionWallGeom = new Phaser.Geom.Triangle(point1.x, point1.y, point2.x, point2.y, point3.x, point3.y);
    this.bastionWall.fillStyle(0x464a4f, 1)
  }

  createBastionSpike (scene, iteration)
  {

    // don't delete commented out code, will be useful to improve on the below if we have chance
    // below is for debuging
    var hypotenuse = this.bastionWallGeom.getLineC();
    // var line = scene.add.graphics();
    // line.strokeLineShape(hypotenuse);

    var rad = Phaser.Math.DegToRad(90);
    // var normalLine = Phaser.Geom.Line.Rotate(hypotenuse, rad);
    // var normal = scene.add.graphics();
    // normal.strokeLineShape(normalLine);   
    
    if (iteration > 5) {
      var flip = -1 * this.direction;
    }
    else {
      var flip = 1  * this.direction;
    }
    var spikeBaseStart = 0.05 * iteration*2;
    var spikeBaseLenth = 0.10 * this.direction;
    var spikeBase1 = hypotenuse.getPoint(spikeBaseStart);
    var spikeBase2 = hypotenuse.getPoint(spikeBaseStart + spikeBaseLenth);

    var spikeBase = new Phaser.Geom.Line(spikeBase1.x, spikeBase1.y, spikeBase2.x, spikeBase2.y);
    var spikeMiddle = Phaser.Geom.Line.GetMidPoint(spikeBase);

    var normalAtSpikeMiddle = Phaser.Geom.Line.RotateAroundPoint(hypotenuse, spikeMiddle , rad * flip) // need a better way get the normal at this point

    // var normalAtSpike = scene.add.graphics();
    // normalAtSpike.strokeLineShape(normalAtSpikeMiddle);
    
    var spikeTop = Phaser.Geom.Line.GetMidPoint(normalAtSpikeMiddle);

    this.spike = scene.add.graphics();
    this.spike.fillTriangle(spikeBase1.x, spikeBase1.y, spikeBase2.x, spikeBase2.y, spikeTop.x, spikeTop.y);

    this.spike.fillStyle(0x464a4f, 1);
  }

  create ()
  {

  }
  
  update ()
  {

  }

  onImpact() {
    this.active = false;
    this.destroySelf();
  }
}