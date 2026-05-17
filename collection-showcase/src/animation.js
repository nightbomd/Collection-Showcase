import { animate } from "animejs";





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

        observer.unobserve(entry.target);
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

// IMPORTANT: THIS ENTIRE CODE SEGMENT WAS TAKEN FROM THE NAME GENERATOR TCA
// starts here
const spaceCanvas = document.getElementById("canvas");
const ctx = spaceCanvas.getContext("2d");

function resizeCanvas() {
    spaceCanvas.width = window.innerWidth;
    spaceCanvas.height = window.innerHeight;
}
// resize canvas to update mouse position and star positions
window.addEventListener('resize', () => {
    resizeCanvas();
    stars.forEach(star => {
        if (star.x > spaceCanvas.width) star.x = Math.random() * spaceCanvas.width;
        if (star.y > spaceCanvas.height) star.y = Math.random() * spaceCanvas.height;
    });
});

// track mouse position
const mouse = { x: 0, y: 0 };
window.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

spaceCanvas.width = window.innerWidth;
spaceCanvas.height = window.innerHeight;

let stars = []
// create 500 stars with random positions and sizes
for (let i = 0; i < 200; i++) { // this line is modified slightly 
    stars.push({
        x: Math.random() * spaceCanvas.width,
        y: Math.random() * spaceCanvas.height,
        radius: Math.random() * 4 + 3,
        speed: Math.random() * 1 + 0.5,
        vx: 0,
        vy: 0
    })
}

function drawStars() {
    ctx.clearRect(0, 0, spaceCanvas.width, spaceCanvas.height);
    // Draw each star
    stars.forEach(star => {
        ctx.shadowColor = "white";
        ctx.shadowBlur = star.radius * 2;
        ctx.fillRect(star.x, star.y, star.radius, star.radius);

    });

}
const lastPos = { x: mouse.x, y: mouse.y };

function animateStars() {
    ctx.clearRect(0, 0, spaceCanvas.width, spaceCanvas.height);

    // Draw mouse trail
    ctx.fillStyle = `hsl(${(mouse.y / spaceCanvas.height) * 360}, 100%, 50%)`;
    ctx.beginPath();

    ctx.arc(mouse.x, mouse.y, 20, 0, Math.PI * 2); // Add circle to the same path
    ctx.strokeStyle = `hsl(${(mouse.y / spaceCanvas.height) * 360}, 100%, 50%)`;
    ctx.shadowColor = `hsl(${(mouse.y / spaceCanvas.height) * 360}, 100%, 50%)`;
    ctx.lineWidth = 15;
    ctx.shadowBlur = 30;
    ctx.stroke();
    ctx.fill(); // Fill the circle
    lastPos.x = mouse.x;;
    lastPos.y = mouse.y;

    // Update and draw each star
    stars.forEach(star => {
        // Update position
        star.y += star.speed;
        star.x += star.speed * Math.sin(star.y * 0.005);

        const dx = mouse.x - star.x;
        const dy = mouse.y - star.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const maxDistance = Math.min(spaceCanvas.width, spaceCanvas.height) / 3;

        if (distance < maxDistance && distance !== 0) {
            const force = ((maxDistance - distance) / maxDistance) * 2;
            // reused distance calculation for circular motion
            const radialX = dx / distance;
            const radialY = dy / distance;

            // Perpendicular vector for circular motion
            const perpX = -radialY;
            const perpY = radialX;

            star.vx += perpX * force * 0.3;
            star.vy += perpY * force * 0.3;

            star.vx += radialX * force;
            star.vy += radialY * force;
        }
        //motion 
        star.x += star.vx;
        star.y += star.vy;

        // friction 
        star.vx *= 0.98;
        star.vy *= 0.98;

        if (star.y > spaceCanvas.height) star.y = 0;
        if (star.x > spaceCanvas.width) star.x = 0;
        if (star.x < 0) star.x = spaceCanvas.width;

        // Draw the star
        ctx.fillStyle = `hsl(${(star.y / spaceCanvas.height) * 360}, 100%, 50%)`;
        ctx.shadowColor = `hsl(${(star.y / spaceCanvas.height) * 360}, 100%, 50%)`;
        ctx.shadowBlur = star.radius * 2;

        ctx.fillRect(star.x, star.y, star.radius, star.radius);
    });

    requestAnimationFrame(animateStars);
}
animateStars();
drawStars();
// ends here


const heroImg = document.getElementById("hero-img");



function animateSelectionBar() {
    const images = ["/images/thibg.png", "/images/heroimg2.png", "/images/heroimg3.png"];

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