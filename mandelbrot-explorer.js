// Mandelbrot Explorer - zoomable mandelbrot set

let xMin = -2.5;
let xMax = 1.0;
let yMin = -1.25;
let yMax = 1.25;
let maxIter = 100;
let needsRender = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  pixelDensity(1);
  frameRate(30);
}

function draw() {
  if (!needsRender) return;
  needsRender = false;
  
  loadPixels();
  
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let a = map(x, 0, width, xMin, xMax);
      let b = map(y, 0, height, yMin, yMax);
      
      let ca = a;
      let cb = b;
      
      let n = 0;
      while (n < maxIter) {
        let aa = a * a - b * b;
        let bb = 2 * a * b;
        a = aa + ca;
        b = bb + cb;
        if (a * a + b * b > 16) break;
        n++;
      }
      
      let pix = (x + y * width) * 4;
      if (n === maxIter) {
        pixels[pix]     = 0;
        pixels[pix + 1] = 0;
        pixels[pix + 2] = 0;
        pixels[pix + 3] = 255;
      } else {
        let hue = map(n, 0, maxIter, 0, 360);
        let col = color(hue, 80, 100);
        pixels[pix]     = red(col);
        pixels[pix + 1] = green(col);
        pixels[pix + 2] = blue(col);
        pixels[pix + 3] = 255;
      }
    }
  }
  
  updatePixels();
  
  // UI panel
  colorMode(RGB);
  fill(0, 0, 0, 150);
  noStroke();
  rect(10, 10, 220, 70, 8);
  fill(200);
  textSize(14);
  text('Mandelbrot Explorer', 25, 30);
  textSize(11);
  text(`Zoom: ${(1 / (xMax - xMin)).toFixed(2)}x`, 25, 45);
  text(`Iterations: ${maxIter}`, 25, 58);
  text('Click to zoom in • SPACE to reset', 25, 73);
  colorMode(HSB);
}

function mousePressed() {
  let cx = map(mouseX, 0, width, xMin, xMax);
  let cy = map(mouseY, 0, height, yMin, yMax);
  
  let xRange = (xMax - xMin) * 0.25;
  let yRange = (yMax - yMin) * 0.25;
  xMin = cx - xRange;
  xMax = cx + xRange;
  yMin = cy - yRange;
  yMax = cy + yRange;
  
  maxIter = min(maxIter + 25, 500);
  needsRender = true;
}

function mouseWheel(event) {
  if (event.delta > 0) {
    maxIter = max(50, maxIter - 25);
  } else {
    maxIter = min(500, maxIter + 25);
  }
  needsRender = true;
}

function keyPressed() {
  if (key === ' ') {
    xMin = -2.5; xMax = 1.0;
    yMin = -1.25; yMax = 1.25;
    maxIter = 100;
    needsRender = true;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  needsRender = true;
}
