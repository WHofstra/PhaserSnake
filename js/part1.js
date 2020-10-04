const scale = [ 800, 600 ];

var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: (300 / scale[1]) * window.innerHeight },
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
var platforms, player, cursors, stars, background;

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
  background = this.add.image(config.width / 2, config.height / 2, 'sky');
  background.setScale((background.scaleX / scale[0]) * config.width,
                      (background.scaleY / scale[1]) * config.height);

  //Platforms
  platforms = this.physics.add.staticGroup();
  platforms.create((400 / scale[0]) * config.width,
                   (568 / scale[1]) * config.height, 'ground').setScale((2 / scale[0]) * config.width,
                   (2 / scale[1])   * config.height).refreshBody();
  platforms.create((50 / scale[0])  * config.width,
                   (250 / scale[1]) * config.height, 'ground').setScale((1 / scale[0]) * config.width,
                   (1 / scale[1])   * config.height).refreshBody();
  platforms.create((750 / scale[0]) * config.width,
                   (220 / scale[1]) * config.height, 'ground').setScale((1 / scale[0]) * config.width,
                   (1 / scale[1])   * config.height).refreshBody();

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
}

function update ()
{
  KeyInput();
}

function InitPlayer(scene)
{
  player = scene.physics.add.sprite((100 / scale[0]) * config.width,
                                    (450 / scale[1]) * config.height, 'player');

  player.setScale((player.scaleX / scale[0]) * config.width,
                  (player.scaleY / scale[1]) * config.height);

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
    child.setScale((child.scaleX / scale[0]) * config.width,
                   (child.scaleY / scale[1]) * config.height);
  });
}

function CollectStar(player, star)
{
    star.disableBody(true, true);
}

function KeyInput()
{
  if (cursors.left.isDown && !cursors.right.isDown) {
    player.setVelocityX(-(160 / scale[0]) * config.width);
    player.anims.play('left', true);
  }
  else if (cursors.right.isDown && !cursors.left.isDown) {
    player.setVelocityX((160 / scale[0]) * config.width);
    player.anims.play('right', true);
  }
  else {
    player.setVelocityX(0);
    player.anims.play('turn');
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-(230 / scale[0]) * config.width);
  }
}
