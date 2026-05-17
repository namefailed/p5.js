// Fractal Tree - recursive branching tree with wind effect

let angle = PI / 4;
let len = 120;
let windOffset = 0;
let hueOffset = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
}

function draw() {
  background(230, 25, 10);
  
  hueOffset += 0.3;
  
  translate(width / 2, height);
  
  // Update wind
  windOffset = sin(frameCount * 0.02) * 0.15;
  
  // Draw tree
  drawBranch(len, 10);
  
  // Instructions
  resetMatrix();
  colorMode(RGB);
  fill(0, 0, 0, 150);
  noStroke();
  rect(10, 10, 140, 45, 8);
  fill(200);
  textSize(12);
  text('Fractal tree with wind', 25, 30);
  text('Click to change angle • SPACE to reset', 25, 45);
  colorMode(HSB);
}

function drawBranch(len, depth) {
  stroke(map(depth, 0, 10, 30, 150), 70, 100);
  strokeWeight(map(depth, 0, 10, 1, 8));
  
  line(0, 0, 0, -len);
  translate(0, -len);
  
  if (len > 10) {
    push();
    rotate(angle + windOffset);
    drawBranch(len * 0.7, depth - 1);
    pop();
    
    push();
    rotate(-angle + windOffset);
    drawBranch(len * 0.7, depth - 1);
    pop();
  }
}

function mousePressed() {
  angle = random(PI / 6, PI / 3);
}

function keyPressed() {
  if (key === ' ') {
    angle = PI / 4;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
