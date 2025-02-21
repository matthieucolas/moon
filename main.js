const animationStar = document.getElementById("particleCanvas");
const starsBackground = document.getElementById("starsBackground");
const animationStarCtx = animationStar.getContext("2d");
const starsBackgroundCtx = starsBackground.getContext("2d");
const img = document.getElementById("bouncingImage");

animationStar.width = window.innerWidth;
animationStar.height = window.innerHeight;
starsBackground.width = window.innerWidth;
starsBackground.height = window.innerHeight;

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

  draw(ctx) {
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function createParticles() {
  for (let i = 0; i < numParticlesPerFrame; i++) {
    let speed = Math.random() * 5 + 1;
    let angle = Math.random() * Math.PI * 2;
    let size = Math.random();
    let color = `#FFFF00`;
    particles.push(
      new Particle(
        animationStar.width / 2,
        animationStar.height / 2,
        speed,
        angle,
        size,
        color
      )
    );
  }
}

function animate() {
  animationStarCtx.clearRect(0, 0, animationStar.width, animationStar.height);
  createParticles();
  particles.forEach((particle, index) => {
    particle.update();
    particle.draw(animationStarCtx);

    const outOfScreen = (particle) => {
      return (
        particle.x < 0 ||
        particle.x > animationStar.width ||
        particle.y < 0 ||
        particle.y > animationStar.height
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

class MoonAnimation {
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
    rotationSpeed
  ) {
    this.element = element;
    this.translationSpeed = translationSpeed;
    this.rotationSpeed = rotationSpeed;
    this.targetPosition = this.getRandomPosition();
    this.currentPosition = {
      x: this.element.offsetLeft + this.element.offsetWidth / 2,
      y: this.element.offsetTop + this.element.offsetHeight / 2,
    };
    this.currentSize = this.element.offsetHeight;
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
        this.currentPosition.x - this.element.offsetWidth / 2
      }px`;
      this.element.style.top = `${
        this.currentPosition.y - this.element.offsetHeight / 2
      }px`;

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

function generateStars(numberOfPoints) {

  for (let i = 0; i < numberOfPoints; i++) {
    let speed = 0;
    let angle = 0;
    let size = Math.random();
    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;
    let color = `#FFFFFF`;
    const particle = new Particle(
      x,
      y,
      speed,
      angle,
      size,
      color
    );
    particle.alpha = Math.random();
    particle.draw(starsBackgroundCtx);
  }
}


window.addEventListener("resize", () => {
  animationStar.width =  starsBackground.width = window.innerWidth;
  animationStar.height = starsBackground.height = window.innerHeight;
});

init();
generateStars(5000);
new MoonAnimation(img, 0.5, 0.08).run(100);
