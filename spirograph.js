// Spirograph - geometric spirograph with variable parameters

let t = 0;
let R = 120; // Outer radius
let r = 40;  // Inner radius
let d = 60;  // Distance from inner circle center
let hueOffset = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
}

function draw() {
  background(230, 30, 10);
  
  hueOffset += 0.5;
  
  translate(width / 2, height / 2);
  
  // Draw spirograph with glow effect
  let hue = (hueOffset) % 360;
  
  // Glow layers
  for (let g = 3; g > 0; g--) {
    stroke(hue, 70, 100, 0.06 / g);
    strokeWeight(2 + g * 2);
    noFill();
    beginShape();
    for (let angle = 0; angle < TWO_PI * 20; angle += 0.05) {
      let x = (R - r) * cos(angle) + d * cos(((R - r) / r) * angle);
      let y = (R - r) * sin(angle) - d * sin(((R - r) / r) * angle);
      vertex(x, y);
    }
    endShape();
  }
  
  // Main curve
  stroke(hue, 80, 100);
  strokeWeight(1.5);
  noFill();
  beginShape();
  for (let angle = 0; angle < TWO_PI * 20; angle += 0.02) {
    let x = (R - r) * cos(angle) + d * cos(((R - r) / r) * angle);
    let y = (R - r) * sin(angle) - d * sin(((R - r) / r) * angle);
    vertex(x, y);
  }
  endShape();
  
  t += 0.02;
  
  // Instructions
  resetMatrix();
  colorMode(RGB);
  fill(0, 0, 0, 150);
  noStroke();
  rect(10, 10, 150, 45, 8);
  fill(200);
  textSize(12);
  text('Geometric spirograph', 25, 30);
  text('Click to randomize • SPACE to reset', 25, 45);
  colorMode(HSB);
}

function mousePressed() {
  R = random(80, 150);
  r = random(20, 60);
  d = random(30, 80);
}

function keyPressed() {
  if (key === ' ') {
    R = 120;
    r = 40;
    d = 60;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
