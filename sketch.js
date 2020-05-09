let asteroid, dino, platform, plusTime, minusTime, hourglass;
let timer = 10;
let stage = 2;
const GRAVITY = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);

  hourglass = new Group();
  increaseHourglass = new Group();
  // create the sprites
  let good_hourglass = loadImage('data/increase_time.png');
  let bad_hourglass = loadImage('data/decrease_time.png');
  let asteroidImg = loadImage('data/asteroid.png');
  // dino
  dino = new Dino(width / 2, 0, 100, 100);
  dino.draw();
  //platform
  platform = createSprite(width / 2, height / 2 + 60, width, 5);
  platform.setCollider('rectangle');
  platform.shapeColor = color(0, 0, 0);
  // asteroid
  asteroid = createSprite(width - 100, 50, 100, 100);
  asteroid.addImage(asteroidImg);
  asteroid.scale = 0.25;
  for (let i = 0; i < 100; i++) {
    let newHourglass = createSprite(0 + i * -width, height / 2 + 35);
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
  background(250);
  switch (stage) {
    case 1:
      if (frameCount % 60 === 0 && timer > 0) {
        // if the frameCount is divisible by 60, then a second has passed.
        timer--;
      }
      if (timer <= 0) {
        // if the timer reaches 0, go to the next stage.
        stage++;
      }
      textSize(32);
      fill(0);
      text(timer, width / 2, 40);
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
      dino.sprite.overlap(hourglass, (collector, collected) => {
        //show the animation
        timer -= 5;
        //collected is the sprite in the group collectibles that triggered
        //the event
        collected.remove();
      });
      dino.sprite.overlap(increaseHourglass, (collector, collected) => {
        //show the animation
        timer += 2;
        //collected is the sprite in the group collectibles that triggered
        //the event
        collected.remove();
      });

      dino.sprite.debug = mouseIsPressed;
      platform.debug = mouseIsPressed;
      // draw the sprites
      drawSprites();
      break;
    case 2:
      background(255);
      dino.animation();
      // dino.sprite.scale = 3;
      dino.sprite.changeAnimation('dying');
      dino.sprite.position.x = width / 2;
      dino.sprite.position.y = height / 2;
      hourglass.removeSprites();
      increaseHourglass.removeSprites();
      drawSprites();
      break;
    default:
      break;
  }
}

function keyPressed() {
  if (keyCode === 32 && dino.isRunning && stage === 1) {
    dino.sprite.changeAnimation('jumping');
    dino.sprite.velocity.y = -18;
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
    this.sprite.addAnimation('dying', 'data/dinorun0000.png');
  }
  animation() {
    this.sprite.mirrorX(-1);
    this.sprite.collide(platform, () => {
      this.sprite.changeAnimation('running');
      this.isRunning = true;
    });
    this.sprite.velocity.y += GRAVITY;
    if (keyDown(83) && stage === 1) this.sprite.changeAnimation('ducking');
  }
}
