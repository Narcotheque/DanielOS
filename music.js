/* DanielOS Music Player */

const audio = document.getElementById("daniel-audio");
const playButton = document.getElementById("music-toggle");
const statusText = document.getElementById("music-status");
const progress = document.getElementById("music-progress");
const currentTimeText = document.getElementById("music-current");
const durationText = document.getElementById("music-duration");

/* Format seconds as minutes:seconds */

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";

  const minutes = Math.floor(seconds / 60);
  const remaining = Math.floor(seconds % 60);

  return `${minutes}:${String(remaining).padStart(2, "0")}`;
}

/* Play or pause */

playButton.addEventListener("click", async () => {
  if (audio.paused) {
    try {
      await audio.play();
    } catch (error) {
      statusText.textContent = "Unable to play ♡";
      console.error("Music playback failed:", error);
    }
  } else {
    audio.pause();
  }
});

/* Update button when music starts */

audio.addEventListener("play", () => {
  playButton.textContent = "❚❚";
  playButton.setAttribute("aria-label", "Pause music");
  playButton.setAttribute("aria-pressed", "true");
  statusText.textContent = "⏔⏔⏔ ꒰ Playing ꒱ ⏔⏔⏔";
});

/* Update button when music pauses */

audio.addEventListener("pause", () => {
  playButton.textContent = "▶";
  playButton.setAttribute("aria-label", "Play music");
  playButton.setAttribute("aria-pressed", "false");
  statusText.textContent = "⏔⏔⏔ ꒰ Paused ꒱ ⏔⏔⏔";
});

/* Get song duration */

audio.addEventListener("loadedmetadata", () => {
  durationText.textContent = formatTime(audio.duration);
});

/* Update progress while playing */

audio.addEventListener("timeupdate", () => {
  currentTimeText.textContent = formatTime(audio.currentTime);

  if (Number.isFinite(audio.duration) && audio.duration > 0) {
    progress.value = (audio.currentTime / audio.duration) * 100;
  }
});

/* Seek to another part of the song */

progress.addEventListener("input", () => {
  if (Number.isFinite(audio.duration) && audio.duration > 0) {
    audio.currentTime = (progress.value / 100) * audio.duration;
  }
});

/* Reset when song ends */

audio.addEventListener("ended", () => {
  progress.value = 0;
  currentTimeText.textContent = "0:00";
});

/* Handle missing or unsupported audio */

audio.addEventListener("error", () => {
  statusText.textContent = "Audio unavailable ♡";
  playButton.disabled = true;
});
