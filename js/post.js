import { API_URL } from "./config.js";
import { setTitle, setMetaDescription } from "./functions.js";

const postContainer = document.getElementById("post");
const content = document.getElementById("content");
const submitButton = document.getElementById("submit-button");
const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");

function openImageModal(imageUrl) {
  modalImage.src = imageUrl;
  modal.showModal();
}

function closeImageModal() {
  modal.close();
}

modal.addEventListener("cancel", closeImageModal());

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
  const authorName = document.createElement("h3");
  authorName.innerHTML = post._embedded.author[0].name;
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
  imgElement.addEventListener("click", () => {
    openImageModal(post._embedded["wp:featuredmedia"][0].source_url);
  });
  rightCol.appendChild(imgElement);
  rightCol.appendChild(imgElement);
  postContainer.appendChild(leftCol);
  postContainer.appendChild(rightCol);
  content.innerHTML = post.content.rendered;
}

function fetchComments() {
  const postId = getPostIdFromURL();
  const apiUrl = `${API_URL}/comments?post=${postId}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.length === 0) {
        const noComments = document.createElement("p");
        noComments.innerHTML = "No comments yet... Be the first?";
        noComments.classList.add("no-comments");
        document.getElementById("comment-container").appendChild(noComments);
      } else {
        displayComments(data)
      }
    })
    .catch(error => console.log(error));
}
function displayComments(comments) {
  const commentsContainer = document.getElementById("comment-container");
  commentsContainer.classList.add("flex", "column", "gap2");
  comments.forEach(comment => {
    const commentElement = document.createElement("div");
    commentElement.classList.add("comment");
    const commentAuthor = document.createElement("h3");
    commentAuthor.innerHTML = comment.author_name;
    const commentDate = document.createElement("p");
    commentDate.innerHTML = new Date(comment.date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const commentContent = document.createElement("p");
    commentContent.innerHTML = comment.content.rendered;
    commentElement.appendChild(commentAuthor);
    commentElement.appendChild(commentDate);
    commentElement.appendChild(commentContent);
    commentsContainer.appendChild(commentElement);
  });
}
function fetchAndDisplayPost() {
  const postId = getPostIdFromURL();
  if (postId) {
    fetchSinglePost(postId);
  }
}
function addComment() {
  const postId = getPostIdFromURL();
  const commentAuthor = document.getElementById("comment-author").value;
  const commentContent = document.getElementById("comment-content").value;
  const commentData = {
    post: postId,
    author_name: commentAuthor,
    content: commentContent,
  };
  const apiUrl = `${API_URL}/comments?post=${postId}}`;
  const options = {
    method: "POST",
    body: JSON.stringify(commentData),
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(apiUrl, options)
    .then(response => response.json())
    .then(data => {
      location.reload();
    })
    .catch(error => console.log(error));
}

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  addComment();
});
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeImageModal();
  }
});

fetchAndDisplayPost();
fetchComments();

