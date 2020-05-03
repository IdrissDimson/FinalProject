let dino, platform, plusTime, minusTime;
let timer = 30;
const GRAVITY = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // create the sprites
  let good_hourglass = loadImage('data/increase_time.png');
  let bad_hourglass = loadImage('data/decrease_time.png');
  // dino
  dino = new Dino(width / 2, 0, 100, 100);
  dino.draw();
  //platform
  platform = createSprite(width / 2, height / 2 + 60, width, 5);
  platform.setCollider('rectangle');
  platform.shapeColor = color(0, 0, 0);
  // increase time
  plusTime = new Time(good_hourglass, 300, 150);
  plusTime.draw();
  // decreae time
  minusTime = new Time(bad_hourglass, 500, 150);
  minusTime.draw();
}

function draw() {
  if (frameCount % 60 === 0 && timer > 0) {
    // stage one is the only stage without a timer
    // if the frameCount is divisible by 60, then a second has passed.
    timer--;
  }
  if (timer === 0) {
    // if the timer reaches 0, go to the next stage.
    // stage++;
  }

  background(250);
  dino.animation();
  dino.sprite.debug = mouseIsPressed;
  platform.debug = mouseIsPressed;
  plusTime.sprite.debug = mouseIsPressed;
  minusTime.sprite.debug = mouseIsPressed;
  // draw the sprites
  drawSprites();
}

function keyPressed() {
  if (keyCode === 32 && dino.isRunning) {
    dino.sprite.changeAnimation('jumping');
    dino.sprite.velocity.y = -10;
    dino.isRunning = false;
  }

  return false;
}

/*
  Dino class
*/

class Dino {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.isRunning = true;
    this.sprite = createSprite(x, y, w, h);
  }
  draw() {
    this.sprite.addAnimation(
      'running',
      'data/dinorun0000.png',
      'data/dinorun0001.png'
    );
    this.sprite.addAnimation('jumping', 'data/dinoJump0000.png');
    this.sprite.addAnimation(
      'ducking',
      'data/dinoduck0000.png',
      'data/dinoduck0001.png'
    );
  }
  animation() {
    this.sprite.mirrorX(-1);
    this.sprite.collide(platform, () => {
      this.sprite.changeAnimation('running');
      this.isRunning = true;
    });
    this.sprite.velocity.y += GRAVITY;
    if (keyDown(83)) this.sprite.changeAnimation('ducking');
  }
}
/*
  Time class
*/
class Time {
  constructor(image, x, y) {
    this.image = image;
    this.x = x;
    this.y = y;
    this.sprite = createSprite(this.x, y);
  }
  draw() {
    this.sprite.addImage(this.image);
  }
}
