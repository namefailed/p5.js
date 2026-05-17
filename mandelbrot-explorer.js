// Mandelbrot Explorer - zoomable mandelbrot set

let minVal = -2.5;
let maxVal = 2.5;
let maxIter = 100;
let hueOffset = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  pixelDensity(1);
}

function draw() {
  background(0);
  
  hueOffset += 0.5;
  
  loadPixels();
  
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let a = map(x, 0, width, minVal, maxVal);
      let b = map(y, 0, height, minVal, maxVal);
      
      let ca = a;
      let cb = b;
      
      let n = 0;
      while (n < maxIter) {
        let aa = a * a - b * b;
        let bb = 2 * a * b;
        a = aa + ca;
        b = bb + cb;
        if (a * a + b * b > 16) {
          break;
        }
        n++;
      }
      
      let pix = (x + y * width) * 4;
      if (n === maxIter) {
        pixels[pix + 0] = 0;
        pixels[pix + 1] = 0;
        pixels[pix + 2] = 0;
        pixels[pix + 3] = 255;
      } else {
        let hue = (map(n, 0, maxIter, 0, 360) + hueOffset) % 360;
        let col = color(hue, 80, 100);
        pixels[pix + 0] = red(col);
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
  rect(10, 10, 200, 70, 8);
  fill(200);
  textSize(14);
  text('Mandelbrot Explorer', 25, 30);
  textSize(11);
  text(`Zoom: ${(maxVal - minVal).toFixed(4)}`, 25, 45);
  text(`Iterations: ${maxIter}`, 25, 58);
  text('Click to zoom • Scroll to change detail', 25, 73);
  colorMode(HSB);
}

function mousePressed() {
  let clickX = map(mouseX, 0, width, minVal, maxVal);
  let clickY = map(mouseY, 0, height, minVal, maxVal);
  
  let range = maxVal - minVal;
  minVal = clickX - range / 4;
  maxVal = clickX + range / 4;
  
  maxIter += 50;
}

function mouseWheel(event) {
  if (event.delta > 0) {
    maxIter = max(50, maxIter - 25);
  } else {
    maxIter = min(500, maxIter + 25);
  }
}

function keyPressed() {
  if (key === ' ') {
    minVal = -2.5;
    maxVal = 2.5;
    maxIter = 100;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
