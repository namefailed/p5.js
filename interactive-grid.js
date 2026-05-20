// Interactive Grid - grid of cells that change on hover/click

let cols = 40;
let rows = 30;
let cellSize = 30;
let grid = [];
let hueOffset = 0;

function setup() {
  cols = floor(windowWidth / cellSize);
  rows = floor(windowHeight / cellSize);
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  
  // Initialize grid
  for (let i = 0; i < cols; i++) {
    grid[i] = [];
    for (let j = 0; j < rows; j++) {
      grid[i][j] = {
        hue: random(360),
        saturation: 80,
        brightness: 100,
        active: false
      };
    }
  }
}

function draw() {
  background(230, 30, 10);
  
  hueOffset += 0.5;
  
  // Draw grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * cellSize;
      let y = j * cellSize;
      
      if (grid[i][j].active) {
        // Active cell with glow
        fill(grid[i][j].hue, grid[i][j].saturation, grid[i][j].brightness);
        noStroke();
        rect(x + 2, y + 2, cellSize - 4, cellSize - 4, 6);
        
        // Glow effect
        fill(grid[i][j].hue, grid[i][j].saturation, 100, 30);
        rect(x, y, cellSize, cellSize, 8);
      } else {
        // Inactive cell
        fill(0, 0, 15);
        noStroke();
        rect(x + 1, y + 1, cellSize - 2, cellSize - 2, 4);
      }
    }
  }
  
  // Hover effect
  let hoverI = floor(mouseX / cellSize);
  let hoverJ = floor(mouseY / cellSize);
  if (hoverI >= 0 && hoverI < cols && hoverJ >= 0 && hoverJ < rows) {
    grid[hoverI][hoverJ].hue = (hueOffset) % 360;
    grid[hoverI][hoverJ].saturation = 80;
    grid[hoverI][hoverJ].brightness = 100;
    grid[hoverI][hoverJ].active = true;
  }
  
  // UI panel
  colorMode(RGB);
  fill(0, 0, 0, 150);
  noStroke();
  rect(10, 10, 260, 55, 8);
  fill(200);
  textSize(12);
  text('Interactive Grid', 25, 30);
  textSize(11);
  text('Click or hover to activate • SPACE to reset', 25, 47);
  colorMode(HSB);
}

function mousePressed() {
  let i = floor(mouseX / cellSize);
  let j = floor(mouseY / cellSize);
  if (i >= 0 && i < cols && j >= 0 && j < rows) {
    grid[i][j].active = !grid[i][j].active;
    grid[i][j].hue = random(360);
  }
}

function keyPressed() {
  if (key === ' ') {
    // Reset to default colors
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j].hue = random(360);
        grid[i][j].saturation = 80;
        grid[i][j].brightness = 100;
        grid[i][j].active = false;
      }
    }
  }
}

function windowResized() {
  cols = floor(windowWidth / cellSize);
  rows = floor(windowHeight / cellSize);
  resizeCanvas(windowWidth, windowHeight);
  // Reinitialize grid
  grid = [];
  for (let i = 0; i < cols; i++) {
    grid[i] = [];
    for (let j = 0; j < rows; j++) {
      grid[i][j] = {
        hue: random(360),
        saturation: 80,
        brightness: 100,
        active: false
      };
    }
  }
}
