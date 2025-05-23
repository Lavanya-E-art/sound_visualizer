let song;
let fft;
let playing = false;
let currentTrack = "melody.mp3";

function preload() {
  song = loadSound(`assets/${currentTrack}`);
}

function setup() {
  createCanvas(600, 400);
  fft = new p5.FFT();

  // Track selector listener
  let selector = document.getElementById("trackSelector");
  selector.addEventListener("change", function () {
    let selectedFile = this.value;
    switchTrack(selectedFile);
  });

  noLoop();
}

function draw() {
  background(0);
  stroke(255);
  noFill();

  let waveform = fft.waveform();
  beginShape();
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, 0, height);
    vertex(x, y);
  }
  endShape();
}

function togglePlay() {
  if (!playing) {
    song.loop();
    loop();
    playing = true;
  } else {
    song.pause();
    noLoop();
    playing = false;
  }
}

function switchTrack(fileName) {
  if (song && song.isPlaying()) {
    song.stop();
  }
  currentTrack = fileName;
  song = loadSound(`assets/${fileName}`, () => {
    if (playing) {
      song.loop();
    }
  });
}
