// =========================
// SETTINGS
// =========================
const correctPassword = "Saman0831";

// =========================
// MOVIES DATA (EDIT THIS)
// =========================
const movies = [
  {
    id: 1,
    title: "First Meet",
    cover: "cover1.jpeg",
    desc: "The moment our story started 💕",
    images: ["p1.jpg", "p2.jpeg"],
    song: "songs/movie1.mp3"
    
  },
  {
    id: 2,
    title: "The Promise of Forever",
    cover: "cover2.jpeg",
    desc: "That day still feels like magic; Time we exchanged the rings of promise✨",
    images: ["p3.jpeg", "p4.JPG"],
    song: "songs/movie2.mp3"
  },
  {
    id: 3,
    title: "Special Moments",
    cover: "cover3.jpeg",
    desc: "Golden memories Together🥹",
    images: ["p5.jpeg"],
    song: "songs/movie3.mp3"
  },
  {
    id: 4,
    title: "Big Day",
    cover: "cover4.jpeg",
    desc: "Loads of happiness and cheers to the new beginning",
    images: ["p6.jpeg", "p7.jpeg"],
    song: "songs/movie4.mp3"
  },
  {
    id: 5,
    title: "Those Dance Moves",
    cover: "cover5.jpeg",
    desc: "Huge Applause for the Lovebirdies❤️",
    images: ["p8.jpeg"],
    song: "songs/movie5.mp3"
  },
  {
    id: 6,
    title: "Another meet",
    cover: "cover6.jpeg",
    desc: "Unexpected meetups",
    images: ["p9.jpeg","p10.jpeg"],
    song: "songs/movie6.mp3"
  },
  {
    id: 7,
    title: "Some candid/ Closeups",
    cover: "cover7.jpeg",
    desc: "The world looks better next to you; Closeness of LOVE 🌍",
    images: ["p11.JPG"],
    song: "songs/movie7.mp3"
  },
  {
    id: 8,
    title: "You + Me, Lil Efforts Big Changes",
    cover: "cover8.png",
    desc: "Just us. Always. Forever. 💘",
    images: ["p12.jpeg","p13.jpeg"],
    song: "songs/movie8.mp3"
  },
  {
    id: 9,
    title: "Lovely Memories",
    cover: "cover9.jpeg",
    desc: "You’re my best friend and my love ❤️",
    images: ["p14.jpeg"],
    song: "songs/movie9.mp3"
  },
  {
    id: 10,
    title: "Heartfelt Moments",
    cover: "cover10.JPG",
    desc: "Longer Distance but close to the hearts 💍",
    images: ["p15.JPG","p16.JPG"],
    song: "songs/movie10.mp3"
  },
  {
    id: 11,
    title: "Valentine Special",
    cover: "cover11.jpeg",
    desc: "A love letter in 12 movies 💌",
    images: ["p17.jpeg","p18.jpeg"],
    song: "songs/movie11.mp3"
  },
  {
    id: 12,
    title: "Our Forever Trailer",
    cover: "cover12.jpeg",
    desc: "Welcome back, Daman. Your love story continues… 💕",
    images: ["p19.JPG","p20.JPG"],
    song: "songs/movie12.mp3"
  }
];

// =========================
// ELEMENTS
// =========================
const lockScreen = document.getElementById("lockScreen");
const mainSite = document.getElementById("mainSite");
const passwordInput = document.getElementById("passwordInput");
const unlockBtn = document.getElementById("unlockBtn");
const errorMsg = document.getElementById("errorMsg");
const heartsContainer = document.getElementById("heartsContainer");

const continueRow = document.getElementById("continueRow");
const myListRow = document.getElementById("myListRow");
const movieRow = document.getElementById("movieRow");

const movieModal = document.getElementById("movieModal");
const modalCover = document.getElementById("modalCover");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const slideImg = document.getElementById("slideImg");
const playBtn = document.getElementById("playBtn");
const modalVideo = document.getElementById("modalVideo");

const topNav = document.getElementById("topNav");
const welcomeToast = document.getElementById("welcomeToast");

// =========================
// HEARTS ANIMATION
// =========================
function spawnHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = Math.random() > 0.5 ? "💗" : "💖";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = (3 + Math.random() * 3) + "s";
  heart.style.fontSize = (16 + Math.random() * 18) + "px";
  heartsContainer.appendChild(heart);

  setTimeout(() => heart.remove(), 7000);
}
setInterval(spawnHeart, 380);

// =========================
// UNLOCK LOGIC
// =========================
unlockBtn.addEventListener("click", () => {
  const entered = passwordInput.value.trim();

  if (entered === correctPassword) {
    errorMsg.textContent = "";

    lockScreen.classList.add("hidden");
    mainSite.classList.remove("hidden");

    showToast();
    renderRows();

    // Auto open Movie 12 as trailer
    setTimeout(() => openMovie(12), 1200);
  } else {
    errorMsg.textContent = "Wrong password 😭 Try again, Daman 💘";
  }
});

passwordInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") unlockBtn.click();
});

// =========================
// TOAST
// =========================
function showToast() {
  welcomeToast.classList.remove("hidden");
  setTimeout(() => welcomeToast.classList.add("hidden"), 4200);
}

// =========================
// NAVBAR SCROLL EFFECT
// =========================
window.addEventListener("scroll", () => {
  if (window.scrollY > 40) topNav.classList.add("scrolled");
  else topNav.classList.remove("scrolled");
});

// =========================
// RENDER MOVIE ROWS
// =========================
function renderRows() {
  continueRow.innerHTML = "";
  myListRow.innerHTML = "";
  movieRow.innerHTML = "";

  // Continue Watching: show 1-4
  movies.slice(0, 4).forEach((m) => continueRow.appendChild(makeCard(m)));

  // My List: show 5-8
  movies.slice(4, 8).forEach((m) => myListRow.appendChild(makeCard(m)));

  // Top Picks: show 9-12
  movies.slice(8, 12).forEach((m) => movieRow.appendChild(makeCard(m)));
}

function makeCard(movie) {
  const card = document.createElement("div");
  card.className = "movie-card";
  card.onclick = () => openMovie(movie.id);

  card.innerHTML = `
    <img src="${movie.cover}" alt="${movie.title}">
    <div class="title">${movie.title}</div>
    <div class="mini">💞 Memory Movie</div>
  `;
  return card;
}

// =========================
// MODAL + SLIDESHOW
// =========================
let currentMovie = null;
let slideIndex = 0;

function openMovie(id) {
  currentMovie = movies.find((m) => m.id === id);
  if (!currentMovie) return;

  movieModal.classList.remove("hidden");

  modalTitle.textContent = currentMovie.title;
  modalDesc.textContent = currentMovie.desc;

  // Reset video
  modalVideo.pause();
  modalVideo.classList.add("hidden");
  modalVideo.removeAttribute("src");
  modalVideo.load();

  // Show cover
  modalCover.src = currentMovie.cover;
  modalCover.classList.remove("hidden");

  // Slideshow start
  slideIndex = 0;
  if (currentMovie.images && currentMovie.images.length > 0) {
    slideImg.src = currentMovie.images[0];
  } else {
    slideImg.src = currentMovie.cover;
  }

  // Play button logic
  if (currentMovie.video && currentMovie.video.trim() !== "") {
    playBtn.style.display = "inline-block";
    playBtn.onclick = () => {
      modalCover.classList.add("hidden");
      modalVideo.classList.remove("hidden");
      modalVideo.src = currentMovie.video;
      modalVideo.play();
    };
  } else {
    playBtn.style.display = "none";
  }
}

function closeModal() {
  movieModal.classList.add("hidden");

  modalVideo.pause();
  modalVideo.classList.add("hidden");
  modalVideo.removeAttribute("src");
  modalVideo.load();
}

function nextSlide() {
  if (!currentMovie || !currentMovie.images) return;
  slideIndex = (slideIndex + 1) % currentMovie.images.length;
  slideImg.src = currentMovie.images[slideIndex];
}

function prevSlide() {
  if (!currentMovie || !currentMovie.images) return;
  slideIndex = (slideIndex - 1 + currentMovie.images.length) % currentMovie.images.length;
  slideImg.src = currentMovie.images[slideIndex];
}

// Close modal by clicking outside
movieModal.addEventListener("click", (e) => {
  if (e.target === movieModal) closeModal();
});

// =========================
// SCROLL TO ROW
// =========================
function scrollToRow(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// =========================
// INIT (for safety)
// =========================
renderRows();


