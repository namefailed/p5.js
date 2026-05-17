// Sierpinski Triangle - classic fractal triangle

let depth = 5;
let hueOffset = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
}

function draw() {
  background(230, 30, 10);
  
  hueOffset += 0.5;
  
  translate(width / 2, height);
  
  // Draw sierpinski triangle
  let size = min(width, height) * 0.8;
  drawSierpinski(0, 0, size, depth);
  
  // Instructions
  resetMatrix();
  colorMode(RGB);
  fill(0, 0, 0, 150);
  noStroke();
  rect(10, 10, 150, 45, 8);
  fill(200);
  textSize(12);
  text('Classic fractal triangle', 25, 30);
  textSize(11);
  text('Click to change depth • SPACE to reset', 25, 45);
  colorMode(HSB);
}

function drawSierpinski(x, y, size, d) {
  if (d === 0) {
    let hue = (hueOffset + map(x, -size, size, 0, 60)) % 360;
    fill(hue, 70, 100);
    noStroke();
    triangle(x, y, x + size, y, x + size / 2, y - size * 0.866);
  } else {
    let newSize = size / 2;
    drawSierpinski(x, y, newSize, d - 1);
    drawSierpinski(x + newSize, y, newSize, d - 1);
    drawSierpinski(x + newSize / 2, y - newSize * 0.866, newSize, d - 1);
  }
}

function mousePressed() {
  depth = (depth + 1) % 7;
  if (depth === 0) depth = 1;
}

function keyPressed() {
  if (key === ' ') {
    depth = 5;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
