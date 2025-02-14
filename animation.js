class MoonAnimation {
  img = document.getElementById("bouncingImage");
  currentPosition;
  targetPosition;
  speed = 0.2;
  currentSize;
  minSize = 80;
  maxSize = 150;
  sizeChangeSpeed = 0.3;
  growing = true;
  currentRotation = 0;
  rotationSpeed = 0.05;
  lastTime = 0;

  constructor() {
    this.targetPosition = this.getRandomPosition();
    this.currentPosition = {
      x: this.img.offsetLeft + this.img.width / 2,
      y: this.img.offsetTop + this.img.height / 2,
    };
    this.currentSize = this.img.width;
  }

  getRandomPosition() {
    const screenWidth = window.innerWidth - this.img.width;
    const screenHeight = window.innerHeight - this.img.height;

    const randomX = Math.random() * screenWidth - 100;
    const randomY = Math.random() * screenHeight - 100;

    return { x: randomX, y: randomY };
  }

  animate(timestamp) {
    if (!this.lastTime) this.lastTime = timestamp;
    const deltaTime = timestamp - this.lastTime;

    if (deltaTime > 16) {
      const deltaX = this.targetPosition.x - this.currentPosition.x;
      const deltaY = this.targetPosition.y - this.currentPosition.y;

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < this.speed) {
        this.currentPosition = this.targetPosition;
        this.targetPosition = this.getRandomPosition();
      } else {
        const moveX = (deltaX / distance) * this.speed;
        const moveY = (deltaY / distance) * this.speed;

        this.currentPosition.x += moveX;
        this.currentPosition.y += moveY;
      }

      this.img.style.left = `${this.currentPosition.x - this.img.width / 2}px`;
      this.img.style.top = `${this.currentPosition.y - this.img.height / 2}px`;

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

      this.img.width = this.currentSize;

      this.currentRotation += this.rotationSpeed;
      if (this.currentRotation >= 360) {
        this.currentRotation = 0;
      }

      this.img.style.transform = `rotate(${this.currentRotation}deg)`;

      this.lastTime = timestamp;
    }

    requestAnimationFrame(this.animate.bind(this));
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
    const star = new Star();
    svgCanvas.appendChild(star.create());
  }
}

generateStars(10000);
const moonAnimation = new MoonAnimation();
moonAnimation.animate(100);