// Lissajous Curves - complex harmonic motion patterns

let t = 0;
let a = 3;
let b = 2;
let delta = PI / 2;
let hueOffset = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
}

function draw() {
  background(230, 30, 10);
  
  hueOffset += 0.5;
  
  translate(width / 2, height / 2);
  
  // Draw multiple Lissajous curves with different parameters
  let numCurves = 7;
  for (let i = 0; i < numCurves; i++) {
    let scale = map(i, 0, numCurves - 1, min(width, height) * 0.35, min(width, height) * 0.05);
    let hue = (map(i, 0, numCurves, 0, 360) + hueOffset) % 360;
    let localA = a + i * 0.5;
    let localB = b + i * 0.3;
    
    // Glow effect
    for (let g = 2; g > 0; g--) {
      stroke(hue, 70, 100, 0.08 / g);
      strokeWeight(2 + g * 2);
      noFill();
      beginShape();
      for (let angle = 0; angle < TWO_PI; angle += 0.02) {
        let x = scale * sin(localA * angle + delta + i * 0.2);
        let y = scale * sin(localB * angle);
        vertex(x, y);
      }
      endShape();
    }
    
    // Main curve
    stroke(hue, 80, 100);
    strokeWeight(1.5);
    noFill();
    beginShape();
    for (let angle = 0; angle < TWO_PI; angle += 0.01) {
      let x = scale * sin(localA * angle + delta + i * 0.2);
      let y = scale * sin(localB * angle);
      vertex(x, y);
    }
    endShape();
  }
  
  t += 0.01;
  
  // Instructions (reset matrix for text)
  resetMatrix();
  colorMode(RGB);
  fill(0, 0, 0, 150);
  noStroke();
  rect(10, 10, 160, 45, 8);
  fill(200);
  textSize(12);
  text('Lissajous curves', 25, 30);
  text('Click to randomize • SPACE to reset', 25, 45);
  colorMode(HSB);
}

function mousePressed() {
  a = random(1, 6);
  a = random(1, 5);
  b = random(1, 5);
  delta = random(0, TWO_PI);
}

function keyPressed() {
  if (key === ' ') {
    a = 3;
    b = 2;
    delta = PI / 2;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
