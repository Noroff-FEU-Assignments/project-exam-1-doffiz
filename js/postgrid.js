import { API_URL } from "./config.js";
import { createPostCard } from "./functions.js";

const postGrid = document.getElementById("postgrid");
const loadMoreButton = document.getElementById("load-more");
const sortDropdown = document.getElementById("sort-dropdown");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const allPosts = [];
let currentPage = 1;
let totalPosts = 0;
let orderby = "date";
let order = "desc";
let postsToShow = 9;
let searchTerm = '';

function fetchAllPosts() {
    let apiUrl = `${API_URL}/posts?_embed&orderby=${orderby}&order=${order}&per_page=20`;

  if (searchTerm) {
    apiUrl += `&search=${searchTerm}`;
  }

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      totalPosts = data.length;
      allPosts.length = 0;
      allPosts.push(...data);
      displayPosts();
    })
    .catch(error => console.log(error));
}

function applySort(selectedValue) {
  const parts = selectedValue.split(':');
  order = parts[1] || "desc";
  currentPage = 1;
  postsToShow = 9;
  fetchAllPosts();
}

loadMoreButton.addEventListener('click', () => {
  currentPage++;
  postsToShow += 9;
  displayPosts();
});
searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchButton.click();
    }
});
searchButton.addEventListener('click', () => {
  currentPage = 1;
  postsToShow = 9;
  searchTerm = searchInput.value;
  fetchAllPosts();
});

function displayPosts() {
  postGrid.innerHTML = '';

  const startIndex = 0;
  const endIndex = Math.min(postsToShow, allPosts.length);

  const sortedPosts = allPosts.slice().sort((a, b) => {
    if (order === "asc") {
      return a.date.localeCompare(b.date);
    } else {
      return b.date.localeCompare(a.date);
    }
  });

  for (let i = startIndex; i < endIndex; i++) {
    const post = sortedPosts[i];
    const card = createPostCard(post);
    postGrid.appendChild(card);
  }

  loadMoreButton.style.display = endIndex < totalPosts ? 'block' : 'none';
}

sortDropdown.addEventListener('change', () => {
  applySort(sortDropdown.value);
});

fetchAllPosts();
