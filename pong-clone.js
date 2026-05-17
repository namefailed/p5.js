// Pong Clone - classic paddle game

let paddleHeight = 100;
let paddleWidth = 15;
let paddleSpeed = 10;

let leftY, rightY;
let ballX, ballY;
let ballSpeedX, ballSpeedY;
let leftScore = 0;
let rightScore = 0;
let ballSize = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);
  leftY = height / 2 - paddleHeight / 2;
  rightY = height / 2 - paddleHeight / 2;
  resetBall();
}

function draw() {
  background(20, 25, 30);
  
  // Center line
  stroke(60, 70, 80, 50);
  strokeWeight(4);
  for (let i = 0; i < height; i += 30) {
    line(width / 2, i, width / 2, i + 15);
  }
  
  // Draw paddles with glow
  noStroke();
  // Left paddle glow
  fill(100, 150, 255, 30);
  rect(15, leftY - 5, paddleWidth + 10, paddleHeight + 10, 5);
  // Left paddle
  fill(100, 150, 255);
  rect(20, leftY, paddleWidth, paddleHeight, 4);
  
  // Right paddle glow
  fill(255, 100, 100, 30);
  rect(width - 35, rightY - 5, paddleWidth + 10, paddleHeight + 10, 5);
  // Right paddle
  fill(255, 100, 100);
  rect(width - 30, rightY, paddleWidth, paddleHeight, 4);
  
  // Draw ball with glow
  fill(255, 255, 255, 30);
  ellipse(ballX, ballY, ballSize * 1.5);
  fill(255, 255, 255);
  ellipse(ballX, ballY, ballSize);
  
  // Move ball
  ballX += ballSpeedX;
  ballY += ballSpeedY;
  
  // Ball collision with paddles
  if (ballX < 35 + paddleWidth && ballX > 20 && ballY > leftY && ballY < leftY + paddleHeight) {
    ballSpeedX *= -1.05;
    ballSpeedY += (ballY - (leftY + paddleHeight / 2)) * 0.1;
    ballX = 35 + paddleWidth + ballSize / 2;
  }
  if (ballX > width - 35 - paddleWidth && ballX < width - 20 && ballY > rightY && ballY < rightY + paddleHeight) {
    ballSpeedX *= -1.05;
    ballSpeedY += (ballY - (rightY + paddleHeight / 2)) * 0.1;
    ballX = width - 35 - paddleWidth - ballSize / 2;
  }
  
  // Ball collision with walls
  if (ballY < ballSize / 2 || ballY > height - ballSize / 2) {
    ballSpeedY *= -1;
  }
  
  // Score
  if (ballX < 0) {
    rightScore++;
    resetBall();
  }
  if (ballX > width) {
    leftScore++;
    resetBall();
  }
  
  // Limit ball speed
  ballSpeedX = constrain(ballSpeedX, -15, 15);
  ballSpeedY = constrain(ballSpeedY, -10, 10);
  
  // Paddle movement
  if (keyIsDown(87)) leftY -= paddleSpeed; // W
  if (keyIsDown(83)) leftY += paddleSpeed; // S
  if (keyIsDown(UP_ARROW)) rightY -= paddleSpeed;
  if (keyIsDown(DOWN_ARROW)) rightY += paddleSpeed;
  
  // Constrain paddles
  leftY = constrain(leftY, 0, height - paddleHeight);
  rightY = constrain(rightY, 0, height - paddleHeight);
  
  // Score display
  fill(255, 255, 255, 80);
  noStroke();
  textSize(64);
  textAlign(CENTER, TOP);
  text(leftScore, width / 4, 40);
  text(rightScore, width * 3 / 4, 40);
  
  // Instructions
  fill(255, 255, 255, 60);
  textSize(14);
  text('W/S for left paddle • Arrow keys for right paddle', width / 2, height - 40);
  text('SPACE to reset score', width / 2, height - 20);
}

function resetBall() {
  ballX = width / 2;
  ballY = height / 2;
  ballSpeedX = random() > 0.5 ? 7 : -7;
  ballSpeedY = random(-4, 4);
}

function keyPressed() {
  if (key === ' ') {
    leftScore = 0;
    rightScore = 0;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  leftY = height / 2 - paddleHeight / 2;
  rightY = height / 2 - paddleHeight / 2;
}
