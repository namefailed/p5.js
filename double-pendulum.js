// Double Pendulum - chaotic physics simulation with trail

let pendulums = [];
let numPendulums = 6;
let trailLength = 600;
let paused = false;
let hueOffset = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  initPendulums();
}

function initPendulums() {
  pendulums = [];
  for (let i = 0; i < numPendulums; i++) {
    let angleOffset = map(i, 0, numPendulums, -0.05, 0.05);
    pendulums.push(new DoublePendulum(
      PI / 2 + angleOffset,
      PI / 2 + angleOffset * 1.1,
      map(i, 0, numPendulums, 0, 360)
    ));
  }
}

function draw() {
  background(230, 30, 10, 0.15);
  
  hueOffset += 0.3;
  translate(width / 2, height * 0.35);
  
  if (!paused) {
    for (let p of pendulums) {
      for (let s = 0; s < 4; s++) {
        p.update();
      }
    }
  }
  
  for (let p of pendulums) {
    p.drawTrail();
  }
  for (let p of pendulums) {
    p.drawArms();
  }
  
  resetMatrix();
  colorMode(RGB);
  fill(0, 0, 0, 150);
  noStroke();
  rect(10, 10, 210, 65, 8);
  fill(200);
  textSize(13);
  text('Double Pendulum', 25, 32);
  textSize(11);
  text(`${numPendulums} pendulums with slight angle offset`, 25, 48);
  text('Click to reset • SPACE to pause', 25, 62);
  colorMode(HSB);
}

function mousePressed() {
  background(0);
  initPendulums();
}

function keyPressed() {
  if (key === ' ') paused = !paused;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class DoublePendulum {
  constructor(a1, a2, hue) {
    this.r1 = min(width, height) * 0.17;
    this.r2 = min(width, height) * 0.17;
    this.m1 = 10;
    this.m2 = 10;
    this.a1 = a1;
    this.a2 = a2;
    this.a1v = 0;
    this.a2v = 0;
    this.hue = hue;
    this.trail = [];
  }

  update() {
    const g = 1;
    const { r1, r2, m1, m2, a1, a2, a1v, a2v } = this;
    const mu = 1 + m1 / m2;

    const num1 = -g * (2 * m1 + m2) * sin(a1)
               - m2 * g * sin(a1 - 2 * a2)
               - 2 * sin(a1 - a2) * m2 * (a2v * a2v * r2 + a1v * a1v * r1 * cos(a1 - a2));
    const den1 = r1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));

    const num2 = 2 * sin(a1 - a2) * (a1v * a1v * r1 * (m1 + m2) + g * (m1 + m2) * cos(a1) + a2v * a2v * r2 * m2 * cos(a1 - a2));
    const den2 = r2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));

    this.a1v += num1 / den1;
    this.a2v += num2 / den2;
    this.a1 += this.a1v;
    this.a2 += this.a2v;

    this.a1v *= 0.9999;
    this.a2v *= 0.9999;

    const x2 = r1 * sin(this.a1) + r2 * sin(this.a2);
    const y2 = r1 * cos(this.a1) + r2 * cos(this.a2);
    this.trail.push({ x: x2, y: y2 });
    if (this.trail.length > trailLength) this.trail.shift();
  }

  drawTrail() {
    noFill();
    for (let i = 1; i < this.trail.length; i++) {
      let alpha = map(i, 0, this.trail.length, 0, 1);
      stroke((this.hue + hueOffset) % 360, 80, 100, alpha);
      strokeWeight(map(i, 0, this.trail.length, 0.5, 2));
      line(this.trail[i - 1].x, this.trail[i - 1].y, this.trail[i].x, this.trail[i].y);
    }
  }

  drawArms() {
    const x1 = this.r1 * sin(this.a1);
    const y1 = this.r1 * cos(this.a1);
    const x2 = x1 + this.r2 * sin(this.a2);
    const y2 = y1 + this.r2 * cos(this.a2);

    stroke(0, 0, 60);
    strokeWeight(2);
    line(0, 0, x1, y1);
    line(x1, y1, x2, y2);

    fill((this.hue + hueOffset) % 360, 80, 100);
    noStroke();
    ellipse(x1, y1, 14, 14);
    ellipse(x2, y2, 10, 10);
  }
}
