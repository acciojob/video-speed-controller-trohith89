// Get elements
const video = document.querySelector('.player__video');
const progress = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress__filled');
const playerButton = document.querySelector('.player__button');
const volumeSlider = document.querySelector('input[name="volume"]');
const playbackSpeedSlider = document.querySelector('input[name="playbackRate"]');
const skipButtons = document.querySelectorAll('[data-skip]');

// Functions
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  const icon = video.paused ? '►' : '❚ ❚';
  playerButton.textContent = icon;
}

function handleSkip() {
  const skipTime = parseFloat(this.dataset.skip);
  video.currentTime += skipTime;
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const progressPercent = (video.currentTime / video.duration) * 100;
  progressFilled.style.flexBasis = `${progressPercent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

playerButton.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', handleSkip));

volumeSlider.addEventListener('input', handleRangeUpdate);
playbackSpeedSlider.addEventListener('input', handleRangeUpdate);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);