// Rotating Cube - 3D cube with lighting

let rotationSpeed = 0.01;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  background(20, 25, 30);
  
  // Enhanced lighting
  ambientLight(80);
  directionalLight(255, 255, 255, 0.5, 0.5, -1);
  pointLight(100, 150, 255, -200, -200, 200);
  pointLight(255, 100, 150, 200, -200, 200);
  
  // Rotate cube with varying speeds
  rotateX(frameCount * rotationSpeed);
  rotateY(frameCount * rotationSpeed * 1.3);
  rotateZ(frameCount * rotationSpeed * 0.5);
  
  // Draw cube with color
  noStroke();
  fill(100, 150, 255);
  box(200);
  
  // Draw wireframe overlay
  stroke(255, 255, 255, 100);
  strokeWeight(2);
  noFill();
  box(205);
  
  // Instructions (2D overlay)
  push();
  resetMatrix();
  camera();
  noLights();
  
  // UI panel
  fill(0, 0, 0, 150);
  noStroke();
  rect(-150, -height/2 + 10, 300, 80, 8);
  
  fill(200);
  noStroke();
  textSize(14);
  text('3D rotating cube with lighting', -130, -height/2 + 35);
  textSize(11);
  text('Move mouse to change rotation speed', -130, -height/2 + 55);
  text(`Speed: ${rotationSpeed.toFixed(3)}`, -130, -height/2 + 75);
  pop();
}

function mouseMoved() {
  rotationSpeed = map(mouseX, 0, width, 0.005, 0.03);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
