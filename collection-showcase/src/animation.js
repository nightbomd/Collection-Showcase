import { animate } from "animejs";
import { createDraggable } from "animejs";
import { Spring } from "animejs";

window.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".fadeInUpAnimate");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {

        animate(entry.target, {
          y: [40, 0],
          opacity: [0, 1],
          duration: 500,
          ease: "outQuad"
        });

        observer.unobserve(entry.target)
      }
    });
  }, { threshold: 0.1 });

  animatedElements.forEach(el => observer.observe(el));
});

const track = document.querySelector(".track");

window.addEventListener("load", () => {
    track.innerHTML += track.innerHTML;

    const originalWidth = track.scrollWidth / 2;

    track.style.setProperty(
        "--scroll-distance",
        `-${originalWidth}px`
    );
});

track.addEventListener("mouseover", () => {
    track.style.animationPlayState = "paused";
});

track.addEventListener("mouseout", () => {
    track.style.animationPlayState = "running";
});

const heroImg = document.getElementById("hero-img");

function animateSelectionBar() {
    const images = ["./images/thibg.png", "./images/heroimg2.png", "./images/heroimg3.png"];

    const dots = document.querySelectorAll(".dot");

    let index = 0;
    let isAnimating = false;

    function updateDots(i) {
        dots.forEach(d => d.classList.remove("active"));
        dots[i].classList.add("active");
    }

    function changeSlide(i) {
        if (isAnimating) return;
        isAnimating = true;

        // OUT animation (current image leaves left)
        heroImg.classList.add("slide-out-left");

        setTimeout(() => {
            // change image mid-animation
            heroImg.src = images[i];

            // reset position to right instantly
            heroImg.classList.remove("slide-out-left");
            heroImg.classList.add("slide-in-right");

            updateDots(i);

            // force reflow so transition triggers
            void heroImg.offsetWidth;

            // IN animation (comes from right)
            heroImg.classList.remove("slide-in-right");

            setTimeout(() => {
                isAnimating = false;
            }, 500);
        }, 250); // half of animation timing
    }

    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            index = i;
            changeSlide(index);
        });
    });

    setInterval(() => {
        index = (index + 1) % images.length;
        changeSlide(index);
    }, 2500);
}

animateSelectionBar();