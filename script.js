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
  { id: 1, title: "Our First Meet", cover: "cover1.jpeg", desc: "A memory to cherish forever.", images: ["p1.jpg","p2.jpeg"], video: null },
  { id: 2, title: "Promise of Forever ", cover: "cover2.jpeg", desc: "Our Special Day; We exchanged the rings of promise", images: ["p3.jpeg","p4.JPG"], video: null },
  { id: 3, title: "Special Moments", cover: "cover3.jpeg", desc: "Golden moments together.", images: ["p5.jpeg"], video: null },
  { id: 4, title: "Big Day", cover: "cover4.jpeg", desc: "Loads of happiness and cheers to the new beginning", images: ["p6.jpeg","p7.jpeg"], video: null },
  { id: 5, title: "Those Dance Moves", cover: "cover5.jpeg", desc: "Huge Applause for the Lovebirdies", images: ["p8.jpeg"], video: null },
  { id: 6, title: "Another meet", cover: "cover6.jpeg", desc: "Unexpected meetups", images: ["p9.jpeg","p10.jpeg"], video: null },
  { id: 7, title: "Some candid/ Closeups", cover: "cover7.jpeg", desc: "Closeness of LOVE", images: ["p11.JPG"], video: null },
  { id: 8, title: "Lil Efforts Big Changes", cover: "cover8.png", desc: "Celebrating you.", images: ["p12.jpeg","p13.jpeg"], video: null },
  { id: 9, title: "Lovely Memories", cover: "cover9.jpeg", desc: "Nature and love.", images: ["p14.jpeg"], video: null },
  { id: 10, title: "Heartfelt Moments", cover: "cover10.JPG", desc: "Longer Distance but close to the hearts.", images: ["p15.JPG","p16.JPG"], video: null },
  { id: 11, title: "Valentine’s Day", cover: "cover11.jpeg", desc: "Our love story.", images: ["p17.jpeg","p18.jpeg"], video: "https://drive.google.com/file/d/1J_lhk07f-nd3TrS4e0virPVsFdtS7VMW/view?usp=sharing" },
  { id: 12, title: "Forever Trailer", cover: "cover12.jpeg", desc: "Movie trailer of our love.", images: ["p19.JPG","p20.JPG"], video: "https://drive.google.com/file/d/1HYCGrXpy4hmNGbbPVEvwukwSI1p9MYqL/view?usp=sharing" }
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



