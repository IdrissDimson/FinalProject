// let dino, dinoRun1, dinoRun2, dinoJump, dinoDead;
let dino;
function drawDino() {}

function preload() {
  dino = loadImage('data/dino0000.png');
  // dinoRun1 = loadImage('data/dinorun0000.png');
  // dinoRun2 = loadImage('data/dinorun0001.png');
  // dinoJump = loadImage('data/dinoJump0000.png');
  // dinoDead = loadImage('data/dinoDead0000.png');
}
function setup() {
  createCanvas(displayWidth, displayHeight);
}

function draw() {
  background(247);
  line(0, height / 2, width, height / 2);
  image(dino, width / 2, height / 2, dino.width * 4, dino.height * 4);
}
