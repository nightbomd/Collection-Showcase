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
  
