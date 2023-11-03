import { API_URL } from "./config.js";
import { setTitle, setMetaDescription } from "./functions.js";

const postContainer = document.getElementById("post");
const content = document.getElementById("content");
function getPostIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    return postId;
  }
  
  function fetchSinglePost(postId) {
    const apiUrl = `${API_URL}/posts/${postId}?_embed`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        displaySinglePost(data);
        setTitle(data.title.rendered);
        setMetaDescription(data.excerpt.rendered);
      })
      .catch(error => console.log(error));
  }
  
  function displaySinglePost(post) {
    const leftCol = document.createElement("div")
    leftCol.classList.add("flex1", "flex", "column", "gap2", "justify-between")
    const titleElement = document.createElement("h1");
    titleElement.innerHTML = post.title.rendered;
    const excerptElement = document.createElement("strong");
    excerptElement.innerHTML = post.excerpt.rendered;
    const titleExcerptDiv = document.createElement("div");
    const authorDiv = document.createElement("div");
    authorDiv.classList.add("flex", "gap1", "bg-section", "column", "pad1", "author-div");
    const authorInnerBox = document.createElement("div");
    authorInnerBox.classList.add("flex", "gap1", "align-center", "justify-between", "mob-col");
    const authorImg = document.createElement("img");
    authorImg.classList.add("author-img");
    authorImg.src = post._embedded.author[0].avatar_urls["96"];
    const authorTitle = document.createElement("h2");
    authorTitle.innerHTML = "who?";
    const authorName = document.createElement("h3");
    authorName.innerHTML = post._embedded.author[0].name;
    authorDiv.appendChild(authorTitle);
    authorInnerBox.appendChild(authorName);
    authorInnerBox.appendChild(authorImg);
    authorDiv.appendChild(authorInnerBox);   
    const authorBoxTime = document.createElement("div");
    const time = new Date(post.date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    authorBoxTime.innerHTML = time;
    authorDiv.appendChild(authorBoxTime);
    titleExcerptDiv.appendChild(titleElement);
    titleExcerptDiv.appendChild(excerptElement);
    leftCol.appendChild(titleExcerptDiv);
    leftCol.appendChild(authorDiv);
    const rightCol = document.createElement("div")
    rightCol.classList.add("flex1", "flex", "column")
    const imgElement = document.createElement("img");
    imgElement.src = post._embedded["wp:featuredmedia"][0].source_url;
    rightCol.appendChild(imgElement);
    postContainer.appendChild(leftCol);
    postContainer.appendChild(rightCol);
    content.innerHTML = post.content.rendered;

  }
  
  function fetchAndDisplayPost() {
    const postId = getPostIdFromURL();
    if (postId) {
      fetchSinglePost(postId);
    }
  }
  
  fetchAndDisplayPost();
  