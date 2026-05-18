
import { cards } from "./cards.js";
import { createDraggable } from "animejs"
import { animate } from "animejs"



function render(card, container, index) {
  const cardElement = document.createElement("div");

  cardElement.dataset.index = index;

  cardElement.classList.add("fadeInUpAnimate");
  cardElement.innerHTML = `
            <div class="card custom-card  rarity-${card.rarity}">
                <img src="${card.image}" />
                <div class="card-title text-center">
                    <h4 class="p-2">${card.title}</h4>
                    <span class="p-2 fs-5 text-center shadow p-2 ${card.rarity}">
                        ${card.rarity.toUpperCase()}
                    </span>
                </div>
            </div>
        `;

  cardElement.addEventListener("click", () => {
    console.log(card.title);
  });

  container.appendChild(cardElement);
}
document.addEventListener("DOMContentLoaded", () => {

  const track = document.getElementById("track");

  if (!track) {
    console.error("No #track found 😭");
    return;
  }

  cards.forEach((card, index) => {
    render(card, track, index);
  });
});

const renderContainer = document.getElementById("render");

renderContainer.innerHTML = `
  <div class="row col-12 g-4">
    ${cards.map((card, index) =>
  `
      <div 
        class="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
        data-index="${index}"
      >
        <div class="card custom-card col-12 rarity-${card.rarity} fadeInUpAnimate">
          <img src="${card.image}" class="card-img-top" />
          <div class="card-body text-center">
            <h5 class="mb-3">${card.title}</h5>
            <span class="${card.rarity} p-2 ">
              ${card.rarity.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    `).join("")}
  </div>
`;

renderContainer.addEventListener("click", (event) => {

  const wrapper = event.target.closest("[data-index]");
  if (!wrapper) return;

  const index = wrapper.dataset.index;
  const data = cards[index];

  const modal = document.createElement("div");
  modal.classList.add("modal", "text-center", `rarity-${data.rarity}`);

  modal.innerHTML = `
    <div class="modal-content"> 
      <span class="close-button p-1">&times;</span>
      <h2 class="mb-5">${data.title}</h2>
      <img src="${data.image}" alt="${data.title}" class="img-fluid mb-3 ${data === cards[0] ? "tung" : ""}" />
      <span class="${data.rarity} p-2   m-auto">
        ${data.rarity.toUpperCase()}
      </span>
      <ul class="list-unstyled p-3">
        <li class="highlight-light-red fw-bold fs-4">strength: <span class="highlight-orange">${data.attributes.strength}</span></li>
        <li class="highlight-light-red fw-bold fs-4">intelligence: <span class="highlight-orange">${data.attributes.intelligence}</span></li>
        <li class="highlight-light-red fw-bold fs-4">agility: <span class="highlight-orange">${data.attributes.agility}</span></li>
      </ul>
      <p class="mt-3">${data.desc}</p>
      
    </div>
  `;

  document.body.appendChild(modal);

  const img = modal.querySelector("img");

  img.addEventListener("click", () => {
    if (Number(index) !== 0) return;
    alert("huh");

    const lastCard = renderContainer.querySelector(
      `[data-index="${cards.length - 1}"]`
    );

    lastCard.innerHTML = `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@qwertzzfn/video/7632288400342666528" data-video-id="7632288400342666528" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@qwertzzfn" href="https://www.tiktok.com/@qwertzzfn?refer=embed">@qwertzzfn</a> Use this for new sticker old is banned <a title="tungtungtungsahur" target="_blank" href="https://www.tiktok.com/tag/tungtungtungsahur?refer=embed">#tungtungtungsahur</a> <a title="sticker" target="_blank" href="https://www.tiktok.com/tag/sticker?refer=embed">#sticker</a> <a title="fypp" target="_blank" href="https://www.tiktok.com/tag/fypp?refer=embed">#fypp</a> <a title="viral" target="_blank" href="https://www.tiktok.com/tag/viral?refer=embed">#viral</a> <a target="_blank" title="♬ Originalton - ༄⋆°•☁︎Mui_To༄⋆°•☁︎" href="https://www.tiktok.com/music/Originalton-7626004967614090017?refer=embed">♬ Originalton - ༄⋆°•☁︎Mui_To༄⋆°•☁︎</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>`;
  });

  createDraggable(modal.querySelector(".modal-content"), {
    container: modal,
    friction: 0,
  });

  modal.querySelector(".close-button").addEventListener("click", () => {
    modal.remove();
  });

  modal.tabIndex = -1;
  modal.focus();
  modal.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      modal.remove();
    }
  });
});


const navItems = document.querySelectorAll(".nav-animate");
console.log("nav items:", document.querySelectorAll(".nav-animate").length);
navItems.forEach(item => {
  const svg = item.querySelector("img");

  let spinAnimation;

  item.addEventListener("mouseenter", () => {
    spinAnimation = animate(svg, {
      rotate: 360,
      duration: 1000,
      loop: true,
      ease: "linear",
    });
  });

  item.addEventListener("mouseleave", () => {
    spinAnimation?.pause();

    animate(svg, {
      rotate: 0,
      duration: 400,
      ease: "outExpo",
    });
  });
});

