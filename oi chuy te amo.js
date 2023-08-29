// Cria um novo contexto de áudio
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Carrega o arquivo de áudio
const audioFile = './imgs/SnapInsta.io - SAINT MOTEL - Slow Dance (Official Audio) (320 kbps) (mp3cut.net).mp3';

// Cria um elemento de áudio usando o contexto de áudio
const audioElement = new Audio();
audioElement.src = audioFile;

// Conecta o elemento de áudio ao contexto de áudio
const source = audioContext.createMediaElementSource(audioElement);
source.connect(audioContext.destination);

// Inicia a reprodução do áudio
audioElement.play();

const particleCount = 120; // Experimente alterar a contagem de partículas e veja o que acontece
const colors = ["#f071CA", "Green", "Yellow"]; // Você não está limitado a apenas 2 cores aqui!
const particles = [];

const canvas = document.getElementById('fireworkCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = Math.random() * 2 + 1;
    this.velocity = {
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1
    };
    this.alpha = 1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.closePath();
    ctx.fill();
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.01;
    this.radius -= 0.01;
    this.draw();
  }
}

function createFirework(x, y) {
  for (let i = 0; i < particleCount; i++) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const particle = new Particle(x, y, color);
    particles.push(particle);
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();

    if (particles[i].alpha <= 0 || particles[i].radius <= 0) {
      particles.splice(i, 1);
      i--;
    }
  }

  requestAnimationFrame(animate);
}

canvas.addEventListener('click', function(event) {
  const mouseX = event.clientX;
  const mouseY = event.clientY;
  createFirework(mouseX, mouseY);
});

animate();