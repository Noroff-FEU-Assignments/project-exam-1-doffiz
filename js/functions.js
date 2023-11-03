
export function createPostCard(post) {
    const card = document.createElement("div");
    card.classList.add("card", "flex", "column", "flex1");
    const img = document.createElement("img");
    img.setAttribute("src", post._embedded["wp:featuredmedia"][0].source_url);
    img.setAttribute("alt", post._embedded["wp:featuredmedia"][0].alt_text);
    const cardContent = document.createElement("div");
    cardContent.classList.add("card-mid", "flex", "column", "gap1", "justify-between", "flex1");
    const middle = document.createElement("div");
    const title = document.createElement("h3");
    title.innerText = post.title.rendered;
    const excerpt = document.createElement("div");
    excerpt.classList.add("card-excerpt");
    excerpt.innerHTML = post.excerpt.rendered;
    const readmore = document.createElement("a");
    readmore.setAttribute("href", `post.html?id=${post.id}`);
    readmore.setAttribute("aria-label", `Read more about ${post.title.rendered}`)
    readmore.classList.add("flex", "gap1", "align-center");
    readmore.innerHTML = 'Read More about this<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>';
    middle.appendChild(title);
    middle.appendChild(excerpt);
    cardContent.appendChild(middle);
    cardContent.appendChild(readmore);
    card.appendChild(img);
    card.appendChild(cardContent);
    return card;
  }

