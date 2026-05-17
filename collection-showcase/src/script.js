
import { cards } from "./cards.js";
import { createDraggable } from "animejs"


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
      <img src="${data.image}" alt="${data.title}" class="img-fluid mb-3" />
      <span class="${data.rarity} p-2   m-auto">
        ${data.rarity.toUpperCase()}
      </span>
      <ul class="list-unstyled p-3">
        <li>strength: ${data.attributes.strength}</li>
        <li>intelligence: ${data.attributes.intelligence}</li>
        <li>agility: ${data.attributes.agility}</li>
      </ul>
      <p class="mt-3">${data.desc}</p>
      
    </div>
  `;

  document.body.appendChild(modal);

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


const navItems = document.querySelectorAll(".nav-item");

navItems.forEach(item => {
  item.addEventListener("click", () => {
    navItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");
  })
})




