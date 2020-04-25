let dino, platform;

const GRAVITY = 1;
let isRunning = true;
function setup() {
  createCanvas(windowWidth, windowHeight);

  // create the sprites

  // dino
  dino = createSprite(width / 2, 0, 100, 100);
  dino.addAnimation('running', 'data/dinorun0000.png', 'data/dinorun0001.png');
  dino.addAnimation('jumping', 'data/dinoJump0000.png');
  //platform
  platform = createSprite(width / 2, height / 2 + 60, width, 5);
  platform.setCollider('rectangle');
  platform.shapeColor = color(0, 0, 0);
}

function draw() {
  background(250);
  dino.mirrorX(-1);

  dino.collide(platform, (dino) => {
    dino.changeAnimation('running');
    isRunning = true;
  });
  dino.velocity.y += GRAVITY;

  dino.debug = mouseIsPressed;
  platform.debug = mouseIsPressed;
  // draw the sprites
  drawSprites();
}

function keyPressed() {
  if (keyCode === 32 && isRunning) {
    dino.changeAnimation('jumping');
    dino.velocity.y = -10;
    isRunning = false;
  }

  return false;
}
