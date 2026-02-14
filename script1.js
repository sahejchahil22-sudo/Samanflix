// ---------- PASSWORD & HEARTS ----------
const unlockBtn = document.getElementById("unlockBtn");
const passwordInput = document.getElementById("passwordInput");
const lockScreen = document.getElementById("lockScreen");
const errorMsg = document.getElementById("errorMsg");
const heartsContainer = document.getElementById("heartsContainer");
const mainSite = document.getElementById("mainSite");

unlockBtn.addEventListener("click", () => {
  const pw = passwordInput.value.trim();
  if (pw === "Saman0831") {
    errorMsg.textContent = "";
    createHearts(35);
    setTimeout(() => {
      lockScreen.style.display = "none";
      mainSite.classList.remove("hidden");
      showToast("Welcome back, <b>Daman</b>. Your love story continues… 💕");
    }, 1200);
  } else {
    errorMsg.textContent = "Wrong password, try again! ❤️";
  }
});

function createHearts(num) {
  for (let i = 0; i < num; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = 2 + Math.random() * 2 + "s";
    heart.textContent = "❤️";
    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 3500);
  }
}

// ---------- WELCOME TOAST ----------
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add("show"), 50);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 350);
  }, 3200);
}

// ---------- MOVIES SETUP ----------
const continueRow = document.getElementById("continueRow");
const myListRow = document.getElementById("myListRow");
const movieRow = document.getElementById("movieRow");

const movies = [
  { id: 1, title: "Our First Meet", cover: "assets/cover1.jpg", desc: "A memory to cherish forever.", images: ["assets/p1.jpg","assets/p2.jpg"], video: null },
  { id: 2, title: "Promise of Forever ", cover: "assets/cover2.jpg", desc: "Our Special Day; We exchanged the rings of promise", images: ["assets/p3.jpg","assets/p4.jpg"], video: null },
  { id: 3, title: "Special Moments", cover: "assets/cover3.jpg", desc: "Golden moments together.", images: ["assets/p5.jpg"], video: null },
  { id: 4, title: "Big Day", cover: "assets/cover4.jpg", desc: "Loads of happiness and cheers to the new beginning", images: ["assets/p6.jpg","assets/p7.jpg"], video: null },
  { id: 5, title: "Those Dance Moves", cover: "assets/cover5.jpg", desc: "Huge Applause for the Lovebirdies", images: ["assets/p8.jpg"], video: null },
  { id: 6, title: "Another meet", cover: "assets/cover6.jpg", desc: "Unexpected meetups", images: ["assets/p9.jpg","assets/p10.jpg"], video: null },
  { id: 7, title: "Some candid/ Closeups", cover: "assets/cover7.jpg", desc: "Closeness of LOVE", images: ["assets/p11.jpg"], video: null },
  { id: 8, title: "Lil Efforts Big Changes", cover: "assets/cover8.jpg", desc: "Celebrating you.", images: ["assets/p12.jpg","assets/p13.jpg"], video: null },
  { id: 9, title: "Lovely Memories", cover: "assets/cover9.jpg", desc: "Nature and love.", images: ["assets/p14.jpg"], video: null },
  { id: 10, title: "Heartfelt Moments", cover: "assets/cover10.jpg", desc: "Longer Distance but close to the hearts.", images: ["assets/p15.jpg","assets/p16.jpg"], video: null },
  { id: 11, title: "Valentine’s Day", cover: "assets/cover11.jpg", desc: "Our love story.", images: ["assets/p17.jpg","assets/p18.jpg"], video: "https://drive.google.com/file/d/1J_lhk07f-nd3TrS4e0virPVsFdtS7VMW/view?usp=sharing" },
  { id: 12, title: "Forever Trailer", cover: "assets/cover12.jpg", desc: "Movie trailer of our love.", images: ["assets/p19.jpg","assets/p20.jpg"], video: "https://drive.google.com/file/d/1HYCGrXpy4hmNGbbPVEvwukwSI1p9MYqL/view?usp=sharing" }
];

const continueWatching = [movies[11], movies[3], movies[0], movies[1]];
const myList = [movies[7], movies[5], movies[2], movies[11]];

continueWatching.forEach(m => continueRow.appendChild(createCard(m)));
myList.forEach(m => myListRow.appendChild(createCard(m)));
movies.forEach(m => movieRow.appendChild(createCard(m)));

function createCard(movie) {
  const card = document.createElement("div");
  card.className = "movie-card";
  const img = document.createElement("img");
  img.src = movie.cover;
  card.appendChild(img);
  card.addEventListener("click", () => openMovie(movie.id));
  return card;
}

// ---------- MODAL ----------
const modal = document.getElementById("movieModal");
const modalCover = document.getElementById("modalCover");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalVideo = document.getElementById("modalVideo");
const slideImg = document.getElementById("slideImg");
const playBtn = document.getElementById("playBtn");

let currentSlide = 0;
let currentMovie = null;

function openMovie(id) {
  currentMovie = movies.find(m => m.id === id);
  modalCover.src = currentMovie.cover;
  modalTitle.textContent = currentMovie.title;
  modalDesc.textContent = currentMovie.desc;
  currentSlide = 0;
  slideImg.src = currentMovie.images[0];
  modalVideo.classList.add("hidden");
  modalVideo.pause();
  modalVideo.src = "";

  if(currentMovie.video) {
    playBtn.style.display = "inline-block";
    function playVideo() {
      modalVideo.src = currentMovie.video;
      modalVideo.classList.remove("hidden");
      modalVideo.play();
    }
    playBtn.onclick = playVideo;

    if(currentMovie.id === 12) { // Auto-play Movie 12
      setTimeout(() => playVideo(), 600);
    }
  } else {
    playBtn.style.display = "none";
  }

  modal.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
  modalVideo.pause();
  modalVideo.src = "";
}

// ---------- SLIDESHOW ----------
function prevSlide() {
  if(!currentMovie) return;
  currentSlide = (currentSlide - 1 + currentMovie.images.length) % currentMovie.images.length;
  slideImg.src = currentMovie.images[currentSlide];
}
function nextSlide() {
  if(!currentMovie) return;
  currentSlide = (currentSlide + 1) % currentMovie.images.length;
  slideImg.src = currentMovie.images[currentSlide];
}

// ---------- MUSIC ----------
const bgMusic = document.getElementById("bgMusic");
function toggleMusic() {
  if(bgMusic.paused) bgMusic.play();
  else bgMusic.pause();
}

