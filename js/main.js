const ROW_AMOUNT  = [ 20, 20 ];
const SNAKE_COLOR = 0x91fd01;

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
var cursors, field, player, playerSegment;

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
}

function create ()
{
  ///Grid
  InitGrid(this);

  //Player
  InitPlayer(this);

  //Items
  //InitApples(this);

  //Collisions


  //Key Input

}

function update ()
{
  KeyInput();
}

function InitGrid(scene)
{
  field = scene.add.grid(config.width * 1/2, config.height * 1/2, config.width,
     config.height, config.width / ROW_AMOUNT[0], config.height / ROW_AMOUNT[1],
     0x09001a, 0x010101, 0x431d2b, 0x010101);

  if (config.width >= config.height) {
    field.width     = field.height;
    field.cellWidth = field.cellHeight / ROW_AMOUNT[0] * ROW_AMOUNT[1];
  }
  else {
    field.height     = field.width;
    field.cellHeight = field.cellWidth / ROW_AMOUNT[1] * ROW_AMOUNT[0];
  }
}

function InitPlayer(scene)
{
  player = scene.add.rectangle(field.cellWidth * (ROW_AMOUNT[0] - 1) * 1/2,
    field.cellHeight * (ROW_AMOUNT[1] - 1) * (1/2), field.cellWidth, field.cellHeight, SNAKE_COLOR);
}

function AddPlayerSegment(position, direction)
{

}

function InitApples(scene)
{

}

function EatApple(player, apple)
{
    //apple.disableBody(true, true);
}

function KeyInput()
{

}
