// Particle Fountain - 3D particle fountain

let particles = [];
let maxParticles = 600;
let hueOffset = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  background(20, 25, 30);
  
  hueOffset += 0.5;
  
  // Enhanced lighting
  ambientLight(80);
  directionalLight(255, 255, 255, 0.5, 0.5, -1);
  pointLight(100, 150, 255, 0, -200, 200);
  pointLight(255, 100, 150, 200, -200, 200);
  
  // Rotate view
  rotateX(-PI / 6);
  rotateY(frameCount * 0.005);
  
  // Add new particles
  for (let i = 0; i < 5; i++) {
    if (particles.length < maxParticles) {
      particles.push(new Particle(hueOffset));
    }
  }
  
  // Limit particle count
  if (particles.length > maxParticles) {
    particles.splice(0, particles.length - maxParticles);
  }
  
  // Update and display particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    
    if (particles[i].isDead()) {
      particles.splice(i, 1);
    }
  }
  
  // Instructions
  push();
  resetMatrix();
  camera();
  noLights();
  
  fill(0, 0, 0, 150);
  noStroke();
  rect(-120, -height/2 + 10, 240, 50, 8);
  
  fill(200);
  textSize(14);
  text('3D particle fountain', -100, -height/2 + 30);
  textSize(11);
  text(`Particles: ${particles.length}`, -100, -height/2 + 48);
  pop();
}

class Particle {
  constructor(hueVal) {
    this.pos = createVector(random(-50, 50), 200, random(-50, 50));
    this.vel = createVector(random(-2, 2), random(-8, -12), random(-2, 2));
    this.acc = createVector(0, 0.3, 0);
    this.size = random(8, 15);
    this.hue = (hueVal + random(-20, 20)) % 360;
    this.life = 255;
    this.decay = random(2, 4);
  }
  
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.life -= this.decay;
    this.size *= 0.99;
  }
  
  display() {
    noStroke();
    fill(this.hue, 80, 100, this.life / 255);
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    sphere(this.size);
    pop();
    
    // Glow
    fill(this.hue, 80, 100, (this.life / 255) * 0.3);
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    sphere(this.size * 1.5);
    pop();
  }
  
  isDead() {
    return this.life <= 0 || this.pos.y > 200;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
