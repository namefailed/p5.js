// Particle Trail - mouse-following particles with fade effect

let particles = [];
let maxParticles = 150;
let hueOffset = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
}

function draw() {
  background(0, 0.08); // Fade effect with low opacity
  
  hueOffset += 0.5;
  
  // Add new particle at mouse position
  if (mouseIsPressed) {
    for (let i = 0; i < 5; i++) {
      particles.push(new Particle(mouseX, mouseY, hueOffset));
    }
  } else {
    particles.push(new Particle(mouseX, mouseY, hueOffset));
  }
  
  // Limit particle count
  if (particles.length > maxParticles) {
    particles.splice(0, particles.length - maxParticles);
  }
  
  // Update and display particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    
    // Remove dead particles
    if (particles[i].isDead()) {
      particles.splice(i, 1);
    }
  }
  
  // Instructions
  colorMode(RGB);
  fill(0, 0, 0, 150);
  noStroke();
  rect(10, 10, 220, 55, 8);
  fill(200);
  textSize(12);
  text('Move mouse • Click for more particles', 25, 30);
  text(`Particles: ${particles.length}`, 25, 45);
  text('SPACE to clear', 25, 60);
  colorMode(HSB);
}

function keyPressed() {
  if (key === ' ') {
    particles = [];
  }
}

class Particle {
  constructor(x, y, hueVal) {
    this.x = x;
    this.y = y;
    this.size = random(6, 18);
    this.speed = random(1, 4);
    this.angle = random(TWO_PI);
    this.hue = (hueVal + random(-30, 30)) % 360;
    this.life = 255;
    this.decay = random(2, 4);
  }
  
  update() {
    this.x += cos(this.angle) * this.speed;
    this.y += sin(this.angle) * this.speed;
    this.angle += random(-0.15, 0.15);
    this.life -= this.decay;
    this.size *= 0.97;
  }
  
  display() {
    noStroke();
    fill(this.hue, 85, 100, this.life / 255);
    ellipse(this.x, this.y, this.size);
    
    // Add glow
    fill(this.hue, 85, 100, (this.life / 255) * 0.5);
    ellipse(this.x, this.y, this.size * 1.5);
  }
  
  isDead() {
    return this.life <= 0 || this.size < 0.5;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
