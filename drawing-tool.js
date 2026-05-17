// Drawing Tool - brush with size/color controls

let brushSize = 20;
let brushColor;
let previousMouseX, previousMouseY;
let hue = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  brushColor = color(0);
  colorMode(HSB);
  hue = 0;
}

function draw() {
  if (mouseIsPressed) {
    stroke(brushColor);
    strokeWeight(brushSize);
    strokeCap(ROUND);
    strokeJoin(ROUND);
    line(previousMouseX, previousMouseY, mouseX, mouseY);
  }
  
  previousMouseX = mouseX;
  previousMouseY = mouseY;
  
  // UI panel
  colorMode(RGB);
  fill(255, 255, 255, 240);
  noStroke();
  rect(10, 10, 220, 130, 12);
  
  fill(50);
  textSize(14);
  text('Drawing Tool', 25, 35);
  textSize(11);
  text('Keys 1-5: Brush size', 25, 55);
  text('C: Clear canvas', 25, 70);
  text('S: Save image', 25, 85);
  text(`Size: ${brushSize}px`, 25, 100);
  text(`Hue: ${Math.floor(hue)}`, 25, 115);
  
  // Color preview
  colorMode(HSB);
  fill(hue, 80, 100);
  noStroke();
  rect(180, 25, 30, 30, 6);
  
  hue = (hue + 0.5) % 360;
  brushColor = color(hue, 80, 100);
}

function keyPressed() {
  if (key === '1') brushSize = 10;
  if (key === '2') brushSize = 20;
  if (key === '3') brushSize = 30;
  if (key === '4') brushSize = 40;
  if (key === '5') brushSize = 50;
  if (key === 'c' || key === 'C') background(255);
  if (key === 's' || key === 'S') saveCanvas('drawing', 'png');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(255);
}
