let dino, platform, plusTime, minusTime, hourglass, bad_hourglass;
let timer = 30;
const GRAVITY = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);

  hourglass = new Group();
  increaseHourglass = new Group();
  // create the sprites
  let good_hourglass = loadImage('data/increase_time.png');
  bad_hourglass = loadImage('data/decrease_time.png');
  // dino
  dino = new Dino(width / 2, 0, 100, 100);
  dino.draw();
  //platform
  platform = createSprite(width / 2, height / 2 + 60, width, 5);
  platform.setCollider('rectangle');
  platform.shapeColor = color(0, 0, 0);

  for (let i = 0; i < 100; i++) {
    let newHourglass = createSprite(0 + i * -width, height / 2 + 40);
    newHourglass.addImage(bad_hourglass);
    hourglass.add(newHourglass);
  }
  for (let i = 0; i < 100; i++) {
    let newSecondHourglass = createSprite(
      -width / 2 + i * -width,
      height / 2 + 40
    );
    newSecondHourglass.addImage(good_hourglass);
    increaseHourglass.add(newSecondHourglass);
  }
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

  for (var i = 0; i < hourglass.length; i++) {
    hourglass[i].position.x += 5;
    // console.log('Number ' + i + ':' + hourglass[i].position.x);
    if (hourglass[i].position.x > width) {
      deleted(hourglass[i]);
    }
  }
  for (var i = 0; i < increaseHourglass.length; i++) {
    increaseHourglass[i].position.x += 5;
    // console.log('Number ' + i + ':' + hourglass[i].position.x);
    if (increaseHourglass[i].position.x > width) {
      deleted(increaseHourglass[i]);
    }
  }
  dino.sprite.debug = mouseIsPressed;
  platform.debug = mouseIsPressed;
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
function deleted(collected) {
  collected.remove();
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
// class Time {
//   constructor(image, x, y) {
//     this.image = image;
//     this.x = x;
//     this.y = y;
//     this.sprite = createSprite(this.x, y);
//   }
//   draw() {
//     this.sprite.addImage(this.image);
//   }
//   animate() {
//     this.x += 5;
//     if (this.sprite.position.x > width + 10) {
//       this.sprite.remove();
//     }
//   }
// }
