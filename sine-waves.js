// Sine Wave Pattern - animated waves with color gradients

let t = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
}

function draw() {
  background(230, 20, 10);
  
  // Draw multiple sine waves
  let numWaves = 12;
  for (let i = 0; i < numWaves; i++) {
    let yOffset = map(i, 0, numWaves, height * 0.1, height * 0.9);
    let hue = (map(i, 0, numWaves, 0, 360) + t * 20) % 360;
    let amplitude = map(i, 0, numWaves, 80, 40);
    let frequency = map(i, 0, numWaves, 0.008, 0.015);
    
    // Glow effect
    for (let g = 3; g > 0; g--) {
      stroke(hue, 70, 100, 0.1 / g);
      strokeWeight(4 + g * 2);
      noFill();
      
      beginShape();
      for (let x = 0; x < width; x += 3) {
        let y = yOffset + sin(x * frequency + t + i * 0.3) * amplitude;
        vertex(x, y);
      }
      endShape();
    }
    
    // Main wave
    stroke(hue, 80, 100);
    strokeWeight(2);
    noFill();
    
    beginShape();
    for (let x = 0; x < width; x += 2) {
      let y = yOffset + sin(x * frequency + t + i * 0.3) * amplitude;
      vertex(x, y);
    }
    endShape();
  }
  
  t += 0.015;
  
  // Instructions
  colorMode(RGB);
  fill(0, 0, 0, 150);
  noStroke();
  rect(10, 10, 140, 45, 8);
  fill(200);
  textSize(12);
  text('Animated sine waves', 25, 30);
  text('SPACE to pause', 25, 45);
  colorMode(HSB);
}

function keyPressed() {
  if (key === ' ') {
    if (isLooping()) {
      noLoop();
    } else {
      loop();
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
