// Conway's Game of Life - cellular automaton simulation

let grid;
let cols = 60;
let rows = 40;
let resolution = 12;
let running = true;
let generation = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(10);
  cols = width / resolution;
  rows = height / resolution;
  grid = createGrid(cols, rows);
  randomizeGrid();
}

function draw() {
  background(20, 25, 30);
  
  if (running) {
    grid = computeNextGeneration();
    generation++;
  }
  
  // Draw cells with glow effect
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j] === 1) {
        let x = i * resolution;
        let y = j * resolution;
        
        // Glow
        fill(100, 200, 255, 50);
        noStroke();
        rect(x - 2, y - 2, resolution + 4, resolution + 4, 3);
        
        // Cell
        fill(100, 200, 255);
        rect(x + 1, y + 1, resolution - 2, resolution - 2, 2);
      }
    }
  }
  
  // UI panel
  colorMode(RGB);
  fill(0, 0, 0, 150);
  noStroke();
  rect(10, 10, 180, 70, 8);
  fill(200);
  textSize(14);
  text('Game of Life', 25, 30);
  textSize(11);
  text(`Generation: ${generation}`, 25, 45);
  text(`Population: ${countPopulation()}`, 25, 58);
  text('SPACE: pause • R: random • C: clear', 25, 73);
  colorMode(HSB);
}

function createGrid(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows).fill(0);
  }
  return arr;
}

function randomizeGrid() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = random() > 0.8 ? 1 : 0;
    }
  }
  generation = 0;
}

function computeNextGeneration() {
  let next = createGrid(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      let neighbors = countNeighbors(grid, i, j);
      
      if (state === 0 && neighbors === 3) {
        next[i][j] = 1;
      } else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
        next[i][j] = 0;
      } else {
        next[i][j] = state;
      }
    }
  }
  return next;
}

function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}

function countPopulation() {
  let count = 0;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      count += grid[i][j];
    }
  }
  return count;
}

function mousePressed() {
  let i = floor(mouseX / resolution);
  let j = floor(mouseY / resolution);
  if (i >= 0 && i < cols && j >= 0 && j < rows) {
    grid[i][j] = grid[i][j] ? 0 : 1;
  }
}

function keyPressed() {
  if (key === ' ') running = !running;
  if (key === 'r' || key === 'R') randomizeGrid();
  if (key === 'c' || key === 'C') {
    grid = createGrid(cols, rows);
    generation = 0;
  }
}

function windowResized() {
  cols = width / resolution;
  rows = height / resolution;
  resizeCanvas(windowWidth, windowHeight);
  grid = createGrid(cols, rows);
  randomizeGrid();
}
