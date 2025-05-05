// Create audio element
const audio = document.createElement('audio');
audio.id = 'loading-audio';
audio.src = '/audio/Crystal Castles - Trash the Rental (Slowed  Reverb).mp3';
audio.preload = 'auto';

// Optional: Hide the audio element
audio.style.display = 'none';
document.body.appendChild(audio);

// Create a fallback button if autoplay is blocked
const manualBtn = document.createElement('button');
manualBtn.textContent = 'Play Music';
manualBtn.style = `
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  padding: 0.5rem 1rem;
  font-family: monospace;
  background: black;
  color: lime;
  border: 2px solid lime;
  cursor: pointer;
  display: none;
`;
document.body.appendChild(manualBtn);

// Try autoplay
document.addEventListener('DOMContentLoaded', () => {
  audio.play().catch(() => {
    console.warn('Autoplay blocked — showing manual play button');
    manualBtn.style.display = 'block';
  });
});

// Manual play fallback
manualBtn.addEventListener('click', () => {
  audio.play();
  manualBtn.style.display = 'none';
});

// Pause audio when loading is done
const interval = setInterval(() => {
  const loadingFinished = sessionStorage.getItem('loaded');
  if (loadingFinished) {
    audio.pause();
    clearInterval(interval);
  }
}, 100);