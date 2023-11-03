const feautredposts = document.getElementById("hero-featured");
import { createPostCard } from "./functions.js";
import { API_URL } from "./config.js";
fetch(API_URL + "/posts?categories=22&_embed")
    .then(response => response.json())
    .then(data => {
        feautredposts.innerHTML = "";
        data.forEach(post => {
            createPostCard(post);
            const card = createPostCard(post);
            feautredposts.appendChild(card);
        })

    })
    .catch(error => console.log(error))
