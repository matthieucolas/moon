const canvas = document.getElementById("particleCanvas");
const acanvas = document.getElementById("audioCanvas");
const ctx = canvas.getContext("2d");
const actx = acanvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const numParticlesPerFrame = 1; // Nombre de particules créées à chaque frame

let time = 0;
const waveCount = 5;
const amplitude = 100;
const frequency = 0.02

class Particle {
  constructor(x, y, speed, angle, size, color) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.angle = angle;
    this.size = size;
    this.color = color;
    this.vx = Math.cos(this.angle) * this.speed;
    this.vy = Math.sin(this.angle) * this.speed;
    this.alpha = 1; // Opacité
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
  }

  draw() {
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawWave() {
  actx.clearRect(0, 0, acanvas.width, acanvas.height);
  actx.lineWidth = 2;
  
  for (let i = 0; i < waveCount; i++) {
      actx.beginPath();
      actx.strokeStyle = `hsl(${i * 60}, 100%, 50%)`;
      
      for (let x = 0; x < acanvas.width; x++) {
          let y = acanvas.height / 2 + Math.sin(x * frequency + time + i) * amplitude * (1 - i / waveCount);
          if (x === 0) {
              actx.moveTo(x, y);
          } else {
              actx.lineTo(x, y);
          }
      }
      actx.stroke();
  }
  time += 0.05;
  requestAnimationFrame(drawWave);
}

function createParticles() {
  for (let i = 0; i < numParticlesPerFrame; i++) {
    let speed = Math.random() * 5 + 1;
    let angle = Math.random() * Math.PI * 2;
    let size = Math.random();
    let color = `#FFFF00`;
    particles.push(
      new Particle(
        canvas.width / 2,
        canvas.height / 2,
        speed,
        angle,
        size,
        color
      )
    );
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  createParticles();
  particles.forEach((particle, index) => {
    particle.update();
    particle.draw();

    const outOfScreen = (particle) => {
      return (
        particle.x < 0 ||
        particle.x > canvas.width ||
        particle.y < 0 ||
        particle.y > canvas.height
      );
    }

    if (outOfScreen(particle)) {
      particles.splice(index, 1); // Supprime les particules disparues
    }
  });
  requestAnimationFrame(animate);
}

function init() {
  animate();
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

init();

class CustomAnimation {
  element;
  currentPosition;
  targetPosition;
  translationSpeed;
  lastTime;
  currentSize;
  minSize;
  maxSize;
  sizeChangeSpeed;
  growing = true;
  currentRotation = 0;
  rotationSpeed;

  constructor(
    element,
    translationSpeed,
    minSize,
    maxSize,
    sizeChangeSpeed,
    rotationSpeed
  ) {
    this.element = element;
    this.translationSpeed = translationSpeed;
    this.minSize = minSize;
    this.maxSize = maxSize;
    this.sizeChangeSpeed = sizeChangeSpeed;
    this.rotationSpeed = rotationSpeed;
    this.targetPosition = this.getRandomPosition();
    this.currentPosition = {
      x: this.element.offsetLeft + this.element.width / 2,
      y: this.element.offsetTop + this.element.height / 2,
    };
    this.currentSize = this.element.width;
  }

  getRandomPosition() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const randomX = Math.random() * screenWidth;
    const randomY = Math.random() * screenHeight;

    return { x: randomX, y: randomY };
  }

  run(timestamp) {
    if (!this.lastTime) this.lastTime = timestamp;
    const deltaTime = timestamp - this.lastTime;

    if (deltaTime > 16) {
      const deltaX = this.targetPosition.x - this.currentPosition.x;
      const deltaY = this.targetPosition.y - this.currentPosition.y;

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < this.translationSpeed) {
        this.currentPosition = this.targetPosition;
        this.targetPosition = this.getRandomPosition();
      } else {
        const moveX = (deltaX / distance) * this.translationSpeed;
        const moveY = (deltaY / distance) * this.translationSpeed;

        this.currentPosition.x += moveX;
        this.currentPosition.y += moveY;
      }

      this.element.style.left = `${
        this.currentPosition.x - this.element.width / 2
      }px`;
      this.element.style.top = `${
        this.currentPosition.y - this.element.height / 2
      }px`;

      if (this.sizeChangeSpeed) {
        if (this.growing) {
          this.currentSize += this.sizeChangeSpeed;
          if (this.currentSize >= this.maxSize) {
            this.growing = false;
          }
        } else {
          this.currentSize -= this.sizeChangeSpeed;
          if (this.currentSize <= this.minSize) {
            this.growing = true;
          }
        }
        this.element.style.width = `${this.currentSize}px`;
      }

      if (this.rotationSpeed) {
        this.currentRotation += this.rotationSpeed;
        if (this.currentRotation >= 360) {
          this.currentRotation = 0;
        }

        this.element.style.transform = `rotate(${this.currentRotation}deg)`;
      }

      this.lastTime = timestamp;
    }

    requestAnimationFrame(this.run.bind(this));
  }
}

class Star {
  size;
  color;
  opacity;
  x;
  y;

  constructor() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    this.size = Math.random();
    this.color = "#FFFFFF";
    this.opacity = Math.random() * 0.25;
    this.x = Math.random() * screenWidth;
    this.y = Math.random() * screenHeight;
  }

  create() {
    const circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    circle.setAttribute("cx", this.x);
    circle.setAttribute("cy", this.y);
    circle.setAttribute("r", this.size);
    circle.setAttribute("opacity", this.opacity);
    circle.setAttribute("fill", this.color);
    return circle;
  }
}

function generateStars(numberOfPoints) {
  const svgCanvas = document.getElementById("svgCanvas");
  for (let i = 0; i < numberOfPoints; i++) {
    const star = new Star().create();
    svgCanvas.appendChild(star);
  }
}

generateStars(10000);
const img = document.getElementById("bouncingImage");
new CustomAnimation(img, 0.2, 500, 2000, 0.5, 0.08).run(100);
