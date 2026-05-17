
import { cards } from "./cards.js";


function render(card, container) {
   const cardElement = document.createElement("div");
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

    container.appendChild(cardElement);
}
document.addEventListener("DOMContentLoaded", () => {

  const track = document.getElementById("track");

  if (!track) {
    console.error("No #track found 😭");
    return;
  }

  cards.forEach(card => {
    render(card, track);
  });
});

const renderContainer = document.getElementById("render");

renderContainer.innerHTML = `
  <div class="row col-12 g-4">
    ${cards.map(card => `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
        <div class="card custom-card col-12 rarity-${card.rarity}">
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
const navItems = document.querySelectorAll(".nav-item");

navItems.forEach(item => {
  item.addEventListener("click", () => {
    navItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");
  })
})


               

