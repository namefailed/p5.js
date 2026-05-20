// Voronoi Diagram - interactive voronoi cell visualization

let points = [];
let numPoints = 8;
let hueOffset = 0;
let dirty = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  colorMode(HSB);
  frameRate(20);
  
  for (let i = 0; i < numPoints; i++) {
    points.push({
      x: random(width),
      y: random(height),
      hue: random(360)
    });
  }
}

function draw() {
  hueOffset += 1;
  
  if (dirty) {
    // Recompute voronoi cells — write directly to pixels[] in RGB
    loadPixels();
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
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
          let c = color(hue, 70, map(minDist, 0, 200, 100, 60));
          let idx = (x + y * width) * 4;
          pixels[idx]     = red(c);
          pixels[idx + 1] = green(c);
          pixels[idx + 2] = blue(c);
          pixels[idx + 3] = 255;
        }
      }
    }
    updatePixels();
    dirty = false;
  }
  
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
  points.push({ x: mouseX, y: mouseY, hue: random(360) });
  numPoints++;
  dirty = true;
}

function keyPressed() {
  if (key === ' ') {
    points = [];
    numPoints = 8;
    for (let i = 0; i < numPoints; i++) {
      points.push({ x: random(width), y: random(height), hue: random(360) });
    }
    dirty = true;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  dirty = true;
}
