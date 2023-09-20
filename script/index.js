console.log("welcome to MyMusicPlay");

let index = 0;
let masterPlay = document.getElementById("masterPlay");
let audioElement = new Audio("../songs/1.mp3");
let progressBar = document.getElementById("myProgressBar");
const gif = document.getElementById("gif");
const songItems = Array.from(document.getElementsByClassName("songItem"));
const songItemsPlay = Array.from(
  document.getElementsByClassName("songItemPlay")
);
//audioElement.play();

//song album list
const album = [
  {
    name: "Ishq-e-zadya",
    filepath: "../songs/1.mp3",
    coverpath: "../covers/1.jpg",
  },
  {
    name: "Ishq-e-zadya",
    filepath: "../songs/2.mp3",
    coverpath: "../covers/2.jpg",
  },
  {
    name: "Ishq-e-zadya",
    filepath: "../songs/3.mp3",
    coverpath: "../covers/3.jpg",
  },
  {
    name: "Ishq-e-zadya",
    filepath: "../songs/4.mp3",
    coverpath: "../covers/4.jpg",
  },
  {
    name: "Ishq-e-zadya",
    filepath: "../songs/5.mp3",
    coverpath: "../covers/5.jpg",
  },
  {
    name: "Ishq-e-zadya",
    filepath: "../songs/6.mp3",
    coverpath: "../covers/6.jpg",
  },
  {
    name: "Ishq-e-zadya",
    filepath: "../songs/7.mp3",
    coverpath: "../covers/7.jpg",
  },
];

songItems.map((element, i) => {
  element.getElementsByTagName("img")[0].src = album[i].coverpath;
  element.getElementsByClassName("songName")[0].innerText = album[i].name;
});
//play/pause
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
  }
});

// progressing with progress bar
audioElement.addEventListener("timeupdate", () => {
  //update seek bar
  progress = parseInt(
    (audioElement.currentTime / audioElement.duration) * 1000
  );
  progressBar.value = progress;
});

progressBar.addEventListener("change", () => {
  audioElement.currentTime = (progressBar.value / 1000) * audioElement.duration;
});
const makeAllPlays = () => {
  songItemsPlay.forEach((element) => {
    element.classList.remove("fa-circle-pause");
    element.classList.add("fa-circle-play");
  });
};
const playingSongWithIndex = (index) => {
  makeAllPlays();
  const chotaplay = document.getElementById(`${index}`);
  chotaplay.classList.remove("fa-circle-play");
  chotaplay.classList.add("fa-circle-pause");
  audioElement.src = `../songs/${index + 1}.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.add("fa-pause-circle");
  gif.style.opacity = 1;
};
songItemsPlay.forEach((element) => {
  element.addEventListener("click", (e) => {
    makeAllPlays();
    index = parseInt(e.target.id);
    //playingSongWithIndex(index);
    e.target.classList.remove("fa-circle-play");
    e.target.classList.add("fa-circle-pause");
    audioElement.src = `../songs/${index + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
  });
});
document.getElementById("prev").addEventListener("click", () => {
  index = index - 1;
  if (index < 0) {
    index = index + 7;
  }
  playingSongWithIndex(index);
});
document.getElementById("next").addEventListener("click", () => {
  index = (index + 1) % 7;
  playingSongWithIndex(index);
});
