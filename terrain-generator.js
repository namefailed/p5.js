// Terrain Generator - 3D terrain using noise

let cols = 40;
let rows = 40;
let scl = 20;
let w, h;
let terrain = [];
let flying = 0;
let hueOffset = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  w = cols * scl;
  h = rows * scl;
  
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    terrain[y] = [];
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      terrain[y][x] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += 0.1;
    }
    yoff += 0.1;
  }
}

function draw() {
  background(20, 25, 30);
  
  hueOffset += 0.5;
  
  // Enhanced lighting
  ambientLight(80);
  directionalLight(255, 255, 255, 0.5, 0.5, -1);
  pointLight(100, 150, 255, 0, -200, 200);
  pointLight(255, 100, 150, 200, -200, 200);
  
  // Rotate and fly
  rotateX(PI / 3);
  translate(-w / 2, -h / 2);
  flying -= 1;
  
  // Update terrain
  let yoff = flying;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      terrain[y][x] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += 0.1;
    }
    yoff += 0.1;
  }
  
  // Draw terrain with color gradient
  for (let y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      let hue = map(terrain[y][x], -100, 100, 200, 30);
      fill(hue, 70, 90);
      vertex(x * scl, y * scl, terrain[y][x]);
      vertex(x * scl, (y + 1) * scl, terrain[y + 1][x]);
    }
    endShape();
  }
  
  // Instructions
  push();
  resetMatrix();
  camera();
  noLights();
  
  fill(0, 0, 0, 150);
  noStroke();
  rect(-150, -height/2 + 10, 300, 60, 8);
  
  fill(200);
  textSize(14);
  text('3D terrain using noise', -130, -height/2 + 35);
  textSize(11);
  text('Click to regenerate terrain', -130, -height/2 + 55);
  pop();
}

function mousePressed() {
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      terrain[y][x] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += 0.1;
    }
    yoff += 0.1;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
