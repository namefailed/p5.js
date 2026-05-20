// Gravity Simulation - n-body gravitational attraction with trails

let bodies = [];
let trailLength = 180;
let paused = false;
let hueOffset = 0;
let G = 1.0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  initBodies();
}

function initBodies() {
  bodies = [];
  let cx = width / 2;
  let cy = height / 2;
  let orbitR = min(width, height) * 0.28;

  // Central large mass
  let sun = new Body(cx, cy, 0, 0, 800, random(360));
  sun.fixed = false;
  bodies.push(sun);

  // Orbiting bodies
  let count = floor(random(4, 9));
  for (let i = 0; i < count; i++) {
    let angle = random(TWO_PI);
    let r = random(orbitR * 0.35, orbitR);
    let x = cx + cos(angle) * r;
    let y = cy + sin(angle) * r;

    // Circular orbit velocity: v = sqrt(G * M / r)
    let speed = sqrt(G * sun.mass / r) * 0.95;
    let vx = -sin(angle) * speed;
    let vy = cos(angle) * speed;
    let mass = random(20, 120);
    bodies.push(new Body(x, y, vx, vy, mass, random(360)));
  }

  // A few rogue bodies for chaos
  let rogues = floor(random(1, 3));
  for (let i = 0; i < rogues; i++) {
    let x = random(width * 0.1, width * 0.9);
    let y = random(height * 0.1, height * 0.9);
    let vx = random(-1.5, 1.5);
    let vy = random(-1.5, 1.5);
    bodies.push(new Body(x, y, vx, vy, random(40, 100), random(360)));
  }
}

function draw() {
  background(230, 30, 10, 0.18);
  
  hueOffset += 0.2;

  if (!paused) {
    // Update: compute forces, then integrate
    for (let i = 0; i < bodies.length; i++) {
      bodies[i].resetForce();
    }
    for (let i = 0; i < bodies.length; i++) {
      for (let j = i + 1; j < bodies.length; j++) {
        bodies[i].attract(bodies[j]);
      }
    }
    for (let b of bodies) {
      b.update();
    }

    // Remove escaped bodies
    bodies = bodies.filter(b => {
      return b.pos.x > -width && b.pos.x < width * 2 &&
             b.pos.y > -height && b.pos.y < height * 2;
    });
  }

  // Draw trails
  for (let b of bodies) b.drawTrail();
  // Draw bodies on top
  for (let b of bodies) b.draw();

  // UI
  colorMode(RGB);
  fill(0, 0, 0, 150);
  noStroke();
  rect(10, 10, 240, 75, 8);
  fill(200);
  textSize(13);
  text('N-Body Gravity Simulation', 25, 32);
  textSize(11);
  text(`Bodies: ${bodies.length}  G: ${G.toFixed(1)}`, 25, 48);
  text('Click to reset • SPACE to pause', 25, 62);
  text('Scroll to change G', 25, 76);
  colorMode(HSB);
}

function mousePressed() {
  initBodies();
}

function keyPressed() {
  if (key === ' ') paused = !paused;
}

function mouseWheel(event) {
  G = max(0.1, min(5.0, G - event.delta * 0.001));
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initBodies();
}

class Body {
  constructor(x, y, vx, vy, mass, hue) {
    this.pos = createVector(x, y);
    this.vel = createVector(vx, vy);
    this.acc = createVector(0, 0);
    this.mass = mass;
    this.radius = pow(mass, 0.45);
    this.hue = hue;
    this.trail = [];
    this.fixed = false;
  }

  resetForce() {
    this.acc.set(0, 0);
  }

  attract(other) {
    let force = p5.Vector.sub(other.pos, this.pos);
    let distSq = constrain(force.magSq(), 200, 50000);
    let strength = (G * this.mass * other.mass) / distSq;
    force.setMag(strength);

    this.acc.add(p5.Vector.div(force, this.mass));
    other.acc.sub(p5.Vector.div(force, other.mass));
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(12);
    this.pos.add(this.vel);
    this.trail.push(this.pos.copy());
    if (this.trail.length > trailLength) this.trail.shift();
  }

  drawTrail() {
    noFill();
    for (let i = 1; i < this.trail.length; i++) {
      let alpha = map(i, 0, this.trail.length, 0, 0.85);
      stroke((this.hue + hueOffset) % 360, 70, 100, alpha);
      strokeWeight(map(i, 0, this.trail.length, 0.3, 1.5));
      line(this.trail[i - 1].x, this.trail[i - 1].y, this.trail[i].x, this.trail[i].y);
    }
  }

  draw() {
    let h = (this.hue + hueOffset) % 360;
    // Glow
    noStroke();
    fill(h, 70, 100, 0.15);
    ellipse(this.pos.x, this.pos.y, this.radius * 4);
    // Body
    fill(h, 80, 100);
    ellipse(this.pos.x, this.pos.y, this.radius * 2);
    // Highlight
    fill(h, 20, 100, 0.7);
    ellipse(this.pos.x - this.radius * 0.25, this.pos.y - this.radius * 0.25, this.radius * 0.6);
  }
}
