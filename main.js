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

  constructor(element, translationSpeed, minSize, maxSize, sizeChangeSpeed, rotationSpeed) {
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

      this.element.style.left = `${this.currentPosition.x - this.element.width / 2}px`;
      this.element.style.top = `${this.currentPosition.y - this.element.height / 2}px`;

      if(this.sizeChangeSpeed){
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

      if(this.rotationSpeed){
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

function createCircle() {
  const svgCanvas = document.getElementById("svgCanvas");
  const circle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  circle.setAttribute("r", 5);
  circle.setAttribute("fill", "white");
  
  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let angle = Math.random() * 2 * Math.PI;
  let distance = Math.max(window.innerWidth, window.innerHeight);
  let startX = targetX + Math.cos(angle) * distance;
  let startY = targetY + Math.sin(angle) * distance;
  console.log(targetX, targetY);
  let initialRadius = 5;

  circle.setAttribute("r", initialRadius);
  circle.setAttribute("cx", startX);
  circle.setAttribute("cy", startY);
  svgCanvas.appendChild(circle);
  
  let speed = 1 + Math.random() * 3;
  function animate() {
      let cx = parseFloat(circle.getAttribute("cx"));
      let cy = parseFloat(circle.getAttribute("cy"));
      let radius = parseFloat(circle.getAttribute("r"));
      let dx = targetX - cx;
      let dy = targetY - cy;
      let dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 5) {
        svgCanvas.removeChild(circle);
          return;
      }
      circle.setAttribute("cx", cx + (dx / dist) * speed);
      circle.setAttribute("cy", cy + (dy / dist) * speed);
      circle.setAttribute("r", Math.max(radius - 0.05, 0.5));
      requestAnimationFrame(animate);
  }
  animate();
}


generateStars(10000);
const img = document.getElementById("bouncingImage");
const animation = new CustomAnimation(img, 0.5, 100, 2000, 1, 0.1);
animation.run(100);
setInterval(createCircle, 30);
