
import { cards } from "./cards.js";

document.addEventListener("DOMContentLoaded", () => {

    const track = document.getElementById("track");

    if (!track) {
        console.error("No #track found 😭");
        return;
    }

    cards.forEach(card => {
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

        track.appendChild(cardElement);
    });

});
const navItems = document.querySelectorAll(".nav-item");

navItems.forEach(item => {
    item.addEventListener("click", () => {
        navItems.forEach(i => i.classList.remove("active"));
        item.classList.add("active");
    })
})

