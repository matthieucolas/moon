const img = document.getElementById("bouncingImage");
const svgCanvas = document.getElementById("svgCanvas");

// Position initiale de l'image (calculée à partir du centre)
let currentPosition = {
  x: img.offsetLeft + img.width / 2,
  y: img.offsetTop + img.height / 2,
};
let targetPosition = getRandomPosition(); // Position aléatoire initiale
const speed = 0.2; // Vitesse constante du mouvement (en pixels par frame)

// Taille initiale de l'image
let currentSize = img.width;
const minSize = 80; // Taille minimale (en pixels)
const maxSize = 150; // Taille maximale (en pixels)
const sizeChangeSpeed = 0.3; // Facteur de changement de taille (vitesse de l'animation de la taille)
let growing = true; // Flag pour savoir si l'image doit grossir ou rétrécir

// Variables pour la rotation
let currentRotation = 0; // Angle de rotation initial (en degrés)
const rotationSpeed = 0.05; // Vitesse de rotation (en degrés par frame)

let lastTime = 0; // Temps de la dernière mise à jour pour réguler la fréquence

// Fonction pour obtenir une position aléatoire dans les dimensions de l'écran
function getRandomPosition() {
  const screenWidth = window.innerWidth - img.width;
  const screenHeight = window.innerHeight - img.height;

  const randomX = Math.random() * screenWidth - 100;
  const randomY = Math.random() * screenHeight - 100;

  return { x: randomX, y: randomY };
}

// Fonction de déplacement constant de l'image vers une nouvelle position
function moveImage(timestamp) {
  if (!lastTime) lastTime = timestamp;
  const deltaTime = timestamp - lastTime; // Temps écoulé entre chaque frame

  // Limiter la fréquence de mise à jour de l'image
  if (deltaTime > 16) {
    // ~60fps (1000ms / 60)
    // Calcule l'écart entre la position actuelle et la cible
    const deltaX = targetPosition.x - currentPosition.x;
    const deltaY = targetPosition.y - currentPosition.y;

    // Calcule la distance totale entre la position actuelle et la cible
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Si l'écart est suffisamment faible, choisir une nouvelle position aléatoire
    if (distance < speed) {
      currentPosition = targetPosition; // Atteindre la cible
      targetPosition = getRandomPosition(); // Nouvelle position aléatoire
    } else {
      // Déplacer avec une vitesse constante et direction normalisée
      const moveX = (deltaX / distance) * speed;
      const moveY = (deltaY / distance) * speed;

      currentPosition.x += moveX;
      currentPosition.y += moveY;
    }

    // Appliquer la nouvelle position en ajustant pour le centre de l'image
    img.style.left = `${currentPosition.x - img.width / 2}px`;
    img.style.top = `${currentPosition.y - img.height / 2}px`;

    // Faire grossir ou réduire l'image lentement
    if (growing) {
      currentSize += sizeChangeSpeed; // Augmenter la taille
      if (currentSize >= maxSize) {
        growing = false; // Lorsque la taille maximale est atteinte, commencer à réduire
      }
    } else {
      currentSize -= sizeChangeSpeed; // Réduire la taille
      if (currentSize <= minSize) {
        growing = true; // Lorsque la taille minimale est atteinte, commencer à agrandir
      }
    }

    // Appliquer la taille
    img.width = currentSize;

    // Appliquer la rotation lente
    currentRotation += rotationSpeed; // Augmenter l'angle de rotation
    if (currentRotation >= 360) {
      // Réinitialiser l'angle de rotation pour éviter qu'il dépasse 360°
      currentRotation = 0;
    }

    // Appliquer la transformation de rotation
    img.style.transform = `rotate(${currentRotation}deg)`;

    lastTime = timestamp; // Mise à jour du temps de la dernière animation
  }

  requestAnimationFrame(moveImage); // Appel suivant de la fonction
}

// Fonction pour générer un point SVG avec une position et taille aléatoires
function generateRandomPoint() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  // Taille aléatoire du point (entre 2px et 10px)
  const size = Math.random() * 0.1 + 1;

  // Position aléatoire dans les dimensions de l'écran
  const x = Math.random() * screenWidth;
  const y = Math.random() * screenHeight;
  const opacity = Math.random();

  // Création du cercle SVG
  const circle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  circle.setAttribute("cx", x); // Coordonnée X du centre du cercle
  circle.setAttribute("cy", y); // Coordonnée Y du centre du cercle
  circle.setAttribute("r", size); // Rayon du cercle (taille)
  circle.setAttribute("opacity", opacity); // Rayon du cercle (taille)
  circle.setAttribute("fill", "white"); // Couleur blanche pour les points

  // Ajout du cercle dans l'élément SVG
  svgCanvas.appendChild(circle);
}

// Fonction pour générer plusieurs points sur l'écran à intervalles réguliers
function generatePoints() {
  // Générer 100 points aléatoires
  for (let i = 0; i < 1000; i++) {
    generateRandomPoint();
  }
}

// Générer des points à l'écran lorsque la page est chargée
generatePoints();
moveImage(); // Démarre l'animation
