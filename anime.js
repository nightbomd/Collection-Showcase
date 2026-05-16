const animatedElements = document.querySelectorAll(".fadeInUpAnimate");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.animate([
                { transform: 'translateY(40px)', opacity: 0 },
                { transform: 'translateY(0)', opacity: 1 }
            ], {
                duration: 500,
                easing: 'ease-out',
                fill: 'forwards'
            });
        }
    });
});

animatedElements.forEach(el => observer.observe(el))

const track = document.querySelector(".track");

track.innerHTML += track.innerHTML;

let x = 0;
const speed = 3;

function animateCarousel() {

    x -= speed;
    if (Math.abs(x) > track.scrollWidth / 2) {
        x = 0;
    }
    track.style.transform = `translateX(${x}px)`;
   
    requestAnimationFrame(animateCarousel);
}

animateCarousel();