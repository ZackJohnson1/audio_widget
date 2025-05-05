<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>NeoCoral Audio Test</title>
  <style>
    body {
      margin: 0;
      font-family: monospace;
      background: #fff;
    }

    #loading-screen {
      background-color: #000;
      color: rgb(15, 243, 53);
      font-family: 'Perfect DOS VGA 437', monospace;
      font-size: 1.2rem;
      padding: 3rem;
      height: 100vh;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      white-space: pre-wrap;
    }

    #main-content {
      display: none;
      padding: 2rem;
    }
  </style>
</head>
<body>

  <!-- Loading screen for typing animation -->
  <div id="loading-screen">
    <pre id="loading-text"></pre>
  </div>

  <!-- This appears after loading finishes -->
  <div id="main-content">
    <h1>Hello NeoCoral</h1>
    <p>This is the site content shown after loading.</p>
  </div>

  <script>
    const loadingText = `CONSUMING DAIQUIRI.DLL
INSTALLING BIKINI.EXE
APPLYING VACATION-SPF-30...`;

    const hasLoaded = sessionStorage.getItem('loaded');
    const textEl = document.getElementById('loading-text');
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');

    // Creates and append audio element
    const audio = document.createElement('audio');
    audio.src = '/audio/Crystal Castles - Trash the Rental (Slowed  Reverb).mp3';
    audio.preload = 'auto';
    audio.style.display = 'none';
    document.body.appendChild(audio);

    if (!textEl || !loadingScreen || !mainContent) {
      console.warn('Missing required elements for loading animation.');
    } else if (hasLoaded) {
      loadingScreen.style.display = 'none';
      mainContent.style.display = 'block';
    } else {
      let index = 0;

      function typeChar() {
        if (index < loadingText.length) {
          textEl.textContent = loadingText.slice(0, index) + '█';
          index++;
          setTimeout(typeChar, 50);
        } else {
          textEl.textContent = loadingText;
          setTimeout(() => {
            fadeOutAudio();
            loadingScreen.style.display = 'none';
            mainContent.style.display = 'block';
            sessionStorage.setItem('loaded', 'true');
          }, 1000);
        }
      }

      // Autoplay workaround: muted → unmute
      document.addEventListener('DOMContentLoaded', () => {
        audio.volume = 0;
        audio.muted = true;

        audio.play().then(() => {
          audio.muted = false;
          audio.volume = 0.5;
        }).catch(() => {
          console.warn('Autoplay blocked');
        });

        typeChar();
      });
    }

    // Smooth fade out at end of loading
    function fadeOutAudio() {
      const fadeInterval = setInterval(() => {
        if (audio.volume > 0.05) {
          audio.volume -= 0.05;
        } else {
          audio.pause();
          clearInterval(fadeInterval);
        }
      }, 100);
    }
  </script>
</body>
</html>
