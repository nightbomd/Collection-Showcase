export function initCanvas() {
   
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
for (let i = 0; i < 50; i++) { // this line is modified slightly 
    stars.push({
        x: Math.random() * spaceCanvas.width,
        y: Math.random() * spaceCanvas.height,
        radius: Math.random() * 100 + 3,
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
    ctx.fillStyle = "#DF2323"; //`hsl(${(mouse.y / spaceCanvas.height) * 360}, 100%, 50%)`;
    ctx.beginPath(); //#DF2323;

    ctx.arc(mouse.x, mouse.y, 20, 0, Math.PI * 2); // Add circle to the same path
    ctx.strokeStyle = "#DF2323"; //`hsl(${(mouse.y / spaceCanvas.height) * 360}, 100%, 50%)`;
    ctx.shadowColor = "#DF2323"; //`hsl(${(mouse.y / spaceCanvas.height) * 360}, 100%, 50%)`;
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
        ctx.fillStyle = "#DF2323"; //`hsl(${(star.y / spaceCanvas.height) * 360}, 100%, 50%)`;
        ctx.shadowColor = "#DF2323";//`hsl(${(star.y / spaceCanvas.height) * 360}, 100%, 50%)`;
        ctx.shadowBlur = star.radius * 2;

        ctx.fillRect(star.x, star.y, star.radius, star.radius);
    });

    requestAnimationFrame(animateStars);
}
animateStars();
drawStars();
// ends here
};
initCanvas();