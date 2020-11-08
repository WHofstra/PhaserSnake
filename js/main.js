const ROW_AMOUNT       = [ 20, 20 ];
const BACKGROUND_COLOR = 0x09001a,
      GRIDLINE_COLOR   = 0x431d2b,
      SNAKE_COLOR      = 0x91fd01,
      EDIBLE_COLOR     = 0xfe004f;
const SPEED_VALUE      = 5;

const direction = {
  UP:    0,
  RIGHT: 1,
  DOWN:  2,
  LEFT:  3
}

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
var cursors, field, player, edible;
var playerSegmentArray = [];

function preload ()
{
  cursors = this.input.keyboard.addKeys({
      arrowUp:   'up',
      arrowDown: 'down',
      arrowLeft: 'left',
      arrowRight: 'right',
      altUp:      'W',
      altDown:    'S',
      altLeft:    'A',
      altRight:   'D'
  });
}

function create ()
{
  ///Grid
  InitGrid(this);

  //Items
  InitEdible(this);

  //Player
  InitPlayer(this);

  //Collisions
  this.physics.add.overlap(player, edible, Eat, null, this);
}

function update ()
{
  KeyInput();
}

function InitGrid(scene)
{
  field = scene.add.grid(config.width * 1/2, config.height * 1/2, config.width,
     config.height, config.width / ROW_AMOUNT[0], config.height / ROW_AMOUNT[1],
     BACKGROUND_COLOR, 0x010101, GRIDLINE_COLOR, 0x010101);

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
  player = AddPlayerSegment(new Phaser.Math.Vector2(field.cellWidth * (ROW_AMOUNT[0] - 1) * 1/2,
                            field.cellHeight * (ROW_AMOUNT[1] - 1) * 1/2), direction.RIGHT, scene);
  player.direction = direction.RIGHT;
  player.speed     = field.cellWidth * SPEED_VALUE;
  MoveObject(player.body, player.speed, 0);
}

function AddPlayerSegment(position, direct, scene)
{
  let segment = scene.add.rectangle(position.x, position.y, field.cellWidth,
                                    field.cellHeight, SNAKE_COLOR);

  scene.physics.add.existing(segment);
  segment.body.collideWorldBounds           = true;
  segment.body.customBoundsRectangle.width  = field.width;
  segment.body.customBoundsRectangle.height = field.height;

  return segment;
}

function InitEdible(scene)
{
  let randomPos = new Phaser.Math.Vector2((Math.floor(Math.random() * ROW_AMOUNT[0]) + 1/2) * field.cellWidth,
                                          (Math.floor(Math.random() * ROW_AMOUNT[1]) + 1/2) * field.cellHeight);

  edible = scene.physics.add.group({
    key: 'apple',
    setXY: { x: randomPos.x, y: randomPos.y }
  });

  edible.scene.add.rectangle(randomPos.x, randomPos.y, field.cellWidth,
                             field.cellHeight, EDIBLE_COLOR);
}

function Eat(player, apple)
{
  console.log("Touch");
  apple.disableBody(true, true);
}

function KeyInput()
{
  //If the Up-arrow or 'W'-key is Pressed
  if ((Phaser.Input.Keyboard.JustDown(cursors.arrowUp) ||
       Phaser.Input.Keyboard.JustDown(cursors.altUp))  &&
       player.direction != direction.DOWN)
  {
    player.direction = direction.UP;
    MoveObject(player.body, 0, -player.speed);
  }
  //If the Down-arrow or 'S'-key is Pressed
  else if ((Phaser.Input.Keyboard.JustDown(cursors.arrowDown) ||
            Phaser.Input.Keyboard.JustDown(cursors.altDown))  &&
            player.direction != direction.UP)
  {
    player.direction = direction.DOWN;
    MoveObject(player.body, 0, player.speed);
  }
  //If the Right-arrow or 'D'-key is Pressed
  else if ((Phaser.Input.Keyboard.JustDown(cursors.arrowRight) ||
            Phaser.Input.Keyboard.JustDown(cursors.altRight))  &&
            player.direction != direction.LEFT)
  {
    player.direction = direction.RIGHT;
    MoveObject(player.body, player.speed, 0);
  }
  //If the Left-arrow or 'A'-key is Pressed
  else if ((Phaser.Input.Keyboard.JustDown(cursors.arrowLeft) ||
            Phaser.Input.Keyboard.JustDown(cursors.altLeft))  &&
            player.direction != direction.RIGHT)
  {
    player.direction = direction.LEFT;
    MoveObject(player.body, -player.speed, 0);
  }
}

function MoveObject(physicsObject, velocityX, velocityY)
{
  physicsObject.velocity.x = velocityX;
  physicsObject.velocity.y = velocityY;
}
