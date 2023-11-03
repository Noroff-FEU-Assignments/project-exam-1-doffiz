const slider = document.getElementById("recentcarousel");
const backArrow = document.getElementById("backarrow");
const nextArrow = document.getElementById("nextarrow");
import { createPostCard } from "./functions.js";
import { API_URL } from "./config.js";

let posts = [];


fetch(API_URL + "/posts?_embed")
  .then(response => response.json())
  .then(data => {
    posts = data;
    displayPosts(0);
  })
  .catch(error => console.log(error));

function displayPosts(startIndex) {
  slider.innerHTML = '';
  for (let i = startIndex; i < startIndex + 3; i++) {
    const post = posts[i % posts.length];
    const card = createPostCard(post);
    slider.appendChild(card);
  }
}

let currentIndex = 0;

function updateSlider() {
  displayPosts(currentIndex);
}

backArrow.addEventListener("click", () => {
  currentIndex = (currentIndex - 3 + posts.length) % posts.length; 
  updateSlider();
});

nextArrow.addEventListener("click", () => {
  currentIndex = (currentIndex + 3) % posts.length;
  updateSlider();
});