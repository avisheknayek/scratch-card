const canvas = document.getElementById('scratchCanvas');
const ctx = canvas.getContext('2d');
const success = document.getElementById('success');

canvas.width = 260;
canvas.height = 160;

// Cover layer
ctx.fillStyle = '#9ca3af';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.font = '20px Arial';
ctx.fillStyle = '#fff';
ctx.fillText('SCRATCH HERE', 50, 90);

let scratching = false;
let revealed = false;

canvas.addEventListener('mousedown', () => scratching = true);
canvas.addEventListener('mouseup', () => scratching = false);
canvas.addEventListener('mousemove', scratch);

canvas.addEventListener('touchstart', () => scratching = true);
canvas.addEventListener('touchend', () => scratching = false);
canvas.addEventListener('touchmove', scratchTouch);

function scratch(e) {
  if (!scratching || revealed) return;
  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.arc(e.offsetX, e.offsetY, 14, 0, Math.PI * 2);
  ctx.fill();
  checkReveal();
}

function scratchTouch(e) {
  if (!scratching || revealed) return;
  const rect = canvas.getBoundingClientRect();
  const touch = e.touches[0];
  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.arc(touch.clientX - rect.left, touch.clientY - rect.top, 16, 0, Math.PI * 2);
  ctx.fill();
  checkReveal();
}

function checkReveal() {
  const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  let cleared = 0;

  for (let i = 3; i < pixels.length; i += 4) {
    if (pixels[i] === 0) cleared++;
  }

  if (cleared > pixels.length / 8) {
    revealed = true;
    canvas.style.display = 'none';
    success.style.display = 'block';
    
  }
}