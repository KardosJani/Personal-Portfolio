// lets select all required tags or elements

const wrapper = document.querySelector(".wrapper"),
  musicImg = wrapper.querySelector(".img-area img"),
  musicName = wrapper.querySelector(".song-details .name"),
  musicArtist = wrapper.querySelector(".song-details .artist"),
  mainAudio = wrapper.querySelector("#main-audio"),
  playPauseBtn = wrapper.querySelector(".play-pause"),
  prevBtn = wrapper.querySelector("#prev"),
  nextBtn = wrapper.querySelector("#next"),
  progressBar = wrapper.querySelector(".progress-bar");

let musicIndex = 2;
window.addEventListener("load", () => {
  loadMusic(musicIndex);
});

// load Music Function
function loadMusic(indexNumb) {
  musicName.innerText = allMusic[indexNumb - 1].name;
  musicArtist.innerText = allMusic[indexNumb - 1].artist;
  musicImg.src = `images_m/${allMusic[indexNumb - 1].img}.jpg`;
  mainAudio.src = `songs/${allMusic[indexNumb - 1].src}.mp3`;
}

// play music function
function playMusic() {
  wrapper.classList.add("paused");
  playPauseBtn.querySelector("i").innerText = ".bi bi-play-fill";
  mainAudio.play();
}

// next music function
function nextMusic() {
  // here we will just increment of index by 1
  musicIndex++;
  //   if musicIndex is greater than array leght the musicIndex will be 1 so the first song will play
  musicIndex > allMusic.length ? (musicIndex = 1) : (musicIndex = musicIndex);
  loadMusic(musicIndex);
  playMusic();
}

// prev music function
function prevMusic() {
  // here we will just decrement of index by 1
  musicIndex--;
  //   if musicIndex is less than 1 the musicIndex will be array lenght so the last song will play
  musicIndex < 1 ? (musicIndex = allMusic.length) : (musicIndex = musicIndex);
  loadMusic(musicIndex);
  playMusic();
}

// pause music function
function pauseMusic() {
  wrapper.classList.remove("paused");
  playPauseBtn.querySelector("i").innerText = ".bi bi-pause";
  mainAudio.pause();
}

// play or pause music btn event
playPauseBtn.addEventListener("click", () => {
  const isMusicPaused = wrapper.classList.contains("paused");
  // if isMusicPause is true then call pauseMusic else call playMusic
  isMusicPaused ? pauseMusic() : playMusic();
});

// next music btn event
nextBtn.addEventListener("click", () => {
  nextMusic(); //calling next music function
});

// prev music btn event
prevBtn.addEventListener("click", () => {
  prevMusic(); //calling next music function
});

//  update progres bar widht according to music curent time - nu merge!!
mainAudio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime; //getting curent time of songs
  const duration = e.target.duration; //getting total duration of song
  let progressWidht = (currentTime / duration) * 100;
  progressBar.style.widht = `${progressWidht}%`;

  mainAudio.addEventListener("loadeddata", () => {
    let musicCurrentTime = wrapper.querySelector(".curent");
    let musicDuration = wrapper.querySelector(".duration");

    // update song total duration
    let audioDuration = mainAudio.duration;
    let totalMin = Math.floor(audioDuration / 60);
    let totalSec = Math.floor(audioDuration % 60);
    if(totalSec < 10){   //adding 0 if sec is less than 10
      totalSec = `0${totalSec}`
    }
    musicDuration.innerText = `${totalMin}:${totalSec}`;


       // update playing song curent time
       let currentMin = Math.floor(audioDuration / 60);
       let currentSec = Math.floor(audioDuration % 60);
       if(currentSec < 10){   //adding 0 if sec is less than 10
        currentSec = `0${totalSec}`
       }
       musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
  });
});
