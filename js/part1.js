var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var platforms, player, cursors, stars;

function preload ()
{
  this.load.image('sky', 'assets/sky.png');
  this.load.image('ground', 'assets/platform.png');
  this.load.image('star', 'assets/star.png');
  this.load.image('bomb', 'assets/bomb.png');
  this.load.spritesheet('player', 'assets/dude.png',
      { frameWidth: 32, frameHeight: 48 } );
}

function create ()
{
  //Background
  this.add.image(400, 300, 'sky');

  //Platforms
  platforms = this.physics.add.staticGroup();
  platforms.create(400, 568, 'ground').setScale(2).refreshBody();
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');

  //Player
  InitPlayer(this);

  //Items
  InitStars(this);

  //Collisions
  this.physics.add.collider(player, platforms);
  this.physics.add.collider(stars, platforms);
  this.physics.add.overlap(player, stars, CollectStar, null, this);

  //Key Input
  cursors = this.input.keyboard.createCursorKeys();
  //console.log(cursors);
}

function update ()
{
  KeyInput();
}

function InitPlayer(scene)
{
  player = scene.physics.add.sprite(100, 450, 'player');

  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  scene.anims.create({
    key: 'left',
    frames: scene.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  scene.anims.create({
            key: 'turn',
            frames: [ { key: 'player', frame: 4 } ],
            frameRate: 20
  });

  scene.anims.create({
    key: 'right',
    frames: scene.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });
}

function InitStars(scene)
{
  stars = scene.physics.add.group({
    key: 'star',
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 }
  });

  stars.children.iterate(function (child) {
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  });
}

function CollectStar(player, star)
{
    star.disableBody(true, true);
}

function KeyInput()
{
  if (cursors.left.isDown && !cursors.right.isDown) {
    player.setVelocityX(-160);
    player.anims.play('left', true);
  }
  else if (cursors.right.isDown && !cursors.left.isDown) {
    player.setVelocityX(160);
    player.anims.play('right', true);
  }
  else {
    player.setVelocityX(0);
    player.anims.play('turn');
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
  }
}
