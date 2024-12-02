const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


let circles = [
    { x: 50, y: 100, radius: 25, color: '#f9f105', originalColor: '#f9f105' },
    { x: 50, y: 200, radius: 25, color: 'rgb(3, 23, 247)', originalColor: 'rgb(3, 23, 247)' },
    { x: 50, y: 300, radius: 25, color: 'rgb(255, 0, 0)', originalColor: 'rgb(255, 0, 0)' },
    { x: 50, y: 400, radius: 25, color: 'rgb(6, 245, 22)', originalColor: 'rgb(6, 245, 22)' },
];

let arrows = [
    { x: canvas.width - 50, y: circles[0].y, targetIndex: 0, moving: false },
    { x: canvas.width - 50, y: circles[1].y, targetIndex: 1, moving: false },
    { x: canvas.width - 50, y: circles[2].y, targetIndex: 2, moving: false },
    { x: canvas.width - 50, y: circles[3].y, targetIndex: 3, moving: false },
];

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Circles
    circles.forEach(circle => {
        ctx.fillStyle = circle.color;
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    });

    // Arrows
    arrows.forEach(arrow => {
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(arrow.x, arrow.y);
        ctx.lineTo(arrow.x - 25, arrow.y);
        ctx.lineTo(arrow.x - 25, arrow.y - 5);
        ctx.moveTo(arrow.x - 25, arrow.y);
        ctx.lineTo(arrow.x - 25, arrow.y + 5);
        ctx.stroke();
    
        if (arrow.moving) {
            arrow.x -= 2; 

            // To check if the arrow has reached the edge of the current target circle
            const circleEdgeX = circles[arrow.targetIndex].x - circles[arrow.targetIndex].radius;
            const circleCenterX = circles[arrow.targetIndex].x;
            if (arrow.x <= circleCenterX) {
                arrow.x = circleCenterX- circles[arrow.targetIndex].radius;
                arrow.moving = false; 
                circles[arrow.targetIndex].color = 'gray'; // Change the color of the circle to gray
            }
        }
    });

    requestAnimationFrame(draw);
}

canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    circles.forEach((circle, index) => {
        const dist = Math.sqrt((mouseX - circle.x) ** 2 + (mouseY - circle.y) ** 2);
        if (dist < circle.radius) {
            arrows[index].moving = true; 
        }
    });
});

document.getElementById('reset-button').addEventListener('click', () => {
    circles.forEach(circle => {
        circle.color = circle.originalColor; 
    });
    arrows.forEach(arrow => {
        arrow.x = 470; 
        arrow.moving = false; 
    });
});

// This will start the drawing loop
draw();
