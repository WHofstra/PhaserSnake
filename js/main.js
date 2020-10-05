const ROW_AMOUNT = [ 20, 20 ];

var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight - 4,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
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
var cursors, field, player, tile;

function preload ()
{


  cursors = this.input.keyboard.addKeys({
      arrowUp: 'up',
      arrowDown: 'down',
      arrowLeft: 'left',
      arrowRight: 'right',
      altUp: 'W',
      altDown: 'S',
      altLeft: 'A',
      altRight: 'D'
  });

  field = this.add.grid(config.width / 2, config.height / 2 + 0.5, config.width, config.height + 0.5,
     config.width / ROW_AMOUNT[0], config.height / ROW_AMOUNT[1],
     0x09001a, 0x010101, 0x431d2b, 0x010101);

  if (config.width > config.height) {
    field.width     = field.height;
    field.cellWidth = field.cellHeight;
    field.x        += config.width / 8 + 175;
  }
  else {
    field.height     = field.width;
    field.cellHeight = field.cellWidth;
  }

  playerObject = {
    color: 0x91fd01,
    length: 1
  }
}

function create ()
{
  //Background


  //Player
  //InitPlayer(this);

  //Items
  //InitApples(this);

  //Collisions


  //Key Input

}

function update ()
{
  KeyInput();
}

function InitPlayer(scene)
{
  //player.setCollideWorldBounds(true);
}

function InitApples(scene)
{

}

function CollectStar(player, star)
{
    //star.disableBody(true, true);
}

function KeyInput()
{

}
