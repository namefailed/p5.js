// Snake Game - classic snake mechanics

let snake = [];
let food;
let gridSize = 20;
let direction = 'RIGHT';
let score = 0;
let gameOver = false;
let highScore = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(12);
  resetGame();
}

function draw() {
  background(20, 25, 30);
  
  if (gameOver) {
    // Game over screen
    fill(255, 100, 100, 80);
    noStroke();
    textSize(48);
    textAlign(CENTER);
    text('GAME OVER', width / 2, height / 2 - 40);
    textSize(20);
    fill(200);
    text('Press SPACE to restart', width / 2, height / 2);
    text(`Score: ${score}`, width / 2, height / 2 + 40);
    text(`High Score: ${highScore}`, width / 2, height / 2 + 70);
    return;
  }
  
  // Move snake
  moveSnake();
  
  // Check food collision
  if (snake[0].x === food.x && snake[0].y === food.y) {
    score++;
    if (score > highScore) highScore = score;
    placeFood();
  } else {
    snake.pop();
  }
  
  // Check self collision
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      gameOver = true;
    }
  }
  
  // Check wall collision (snake coords are grid-aligned)
  if (snake[0].x < 0 || snake[0].x + gridSize > width || snake[0].y < 0 || snake[0].y + gridSize > height) {
    gameOver = true;
  }
  
  // Draw food with glow
  fill(255, 100, 100, 30);
  noStroke();
  ellipse(food.x + gridSize / 2, food.y + gridSize / 2, gridSize * 1.5);
  fill(255, 100, 100);
  ellipse(food.x + gridSize / 2, food.y + gridSize / 2, gridSize - 4);
  
  // Draw snake with gradient
  for (let i = 0; i < snake.length; i++) {
    let brightness = map(i, 0, snake.length, 100, 60);
    let size = map(i, 0, snake.length, gridSize, gridSize * 0.8);
    fill(100, 255, brightness);
    noStroke();
    rect(snake[i].x + (gridSize - size) / 2, snake[i].y + (gridSize - size) / 2, size, size, 4);
  }
  
  // Score panel
  fill(0, 0, 0, 150);
  noStroke();
  rect(10, 10, 150, 55, 8);
  fill(200);
  textSize(14);
  text(`Score: ${score}`, 25, 30);
  textSize(11);
  text(`High Score: ${highScore}`, 25, 45);
  text('Arrow keys to move', 25, 58);
}

function moveSnake() {
  let head = { x: snake[0].x, y: snake[0].y };
  
  if (direction === 'UP') head.y -= gridSize;
  if (direction === 'DOWN') head.y += gridSize;
  if (direction === 'LEFT') head.x -= gridSize;
  if (direction === 'RIGHT') head.x += gridSize;
  
  snake.unshift(head);
}

function placeFood() {
  food = {
    x: floor(random(width / gridSize)) * gridSize,
    y: floor(random(height / gridSize)) * gridSize
  };
}

function resetGame() {
  snake = [{ x: gridSize * 5, y: gridSize * 5 }];
  placeFood();
  direction = 'RIGHT';
  score = 0;
  gameOver = false;
}

function keyPressed() {
  if (gameOver && key === ' ') {
    resetGame();
    return;
  }
  
  if (keyCode === UP_ARROW && direction !== 'DOWN') direction = 'UP';
  if (keyCode === DOWN_ARROW && direction !== 'UP') direction = 'DOWN';
  if (keyCode === LEFT_ARROW && direction !== 'RIGHT') direction = 'LEFT';
  if (keyCode === RIGHT_ARROW && direction !== 'LEFT') direction = 'RIGHT';
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  gridSize = 20;
  resetGame();
}
