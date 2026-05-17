// Voronoi Diagram - interactive voronoi cell visualization

let points = [];
let numPoints = 8;
let hueOffset = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  
  // Initialize random points
  for (let i = 0; i < numPoints; i++) {
    points.push({
      x: random(width),
      y: random(height),
      hue: random(360)
    });
  }
}

function draw() {
  background(230, 30, 10);
  
  hueOffset += 0.5;
  
  // Draw voronoi cells
  loadPixels();
  for (let x = 0; x < width; x += 2) {
    for (let y = 0; y < height; y += 2) {
      let minDist = Infinity;
      let closestPoint = null;
      
      for (let point of points) {
        let d = dist(x, y, point.x, point.y);
        if (d < minDist) {
          minDist = d;
          closestPoint = point;
        }
      }
      
      if (closestPoint) {
        let hue = (closestPoint.hue + hueOffset) % 360;
        set(x, y, color(hue, 70, 100));
        set(x + 1, y, color(hue, 70, 100));
        set(x, y + 1, color(hue, 70, 100));
        set(x + 1, y + 1, color(hue, 70, 100));
      }
    }
  }
  updatePixels();
  
  // Draw points with glow
  for (let point of points) {
    // Glow
    fill(point.hue, 80, 100, 50);
    noStroke();
    ellipse(point.x, point.y, 25, 25);
    
    // Point
    fill(255);
    ellipse(point.x, point.y, 10, 10);
  }
  
  // UI panel
  colorMode(RGB);
  fill(0, 0, 0, 150);
  noStroke();
  rect(10, 10, 150, 45, 8);
  fill(200);
  textSize(12);
  text('Interactive voronoi diagram', 25, 30);
  textSize(11);
  text('Click to add • SPACE to reset', 25, 45);
  colorMode(HSB);
}

function mousePressed() {
  points.push({
    x: mouseX,
    y: mouseY,
    hue: random(360)
  });
  numPoints++;
}

function keyPressed() {
  if (key === ' ') {
    points = [];
    for (let i = 0; i < 8; i++) {
      points.push({
        x: random(width),
        y: random(height),
        hue: random(360)
      });
    }
    numPoints = 8;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
