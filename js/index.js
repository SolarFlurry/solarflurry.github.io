/// NAVBAR
let currentContent = document.getElementById("home");
let currentContentId = "home";

const navlinks = document.getElementsByClassName("navlink");
let currentNavLink;

for (const navlink of navlinks) {
	if (navlink.getAttribute("content") == "home") {
		currentNavLink = navlink;
	}
	navlink.addEventListener('click', (event) => {
		const content = navlink.getAttribute("content");
		if (content && content != currentContentId) {
			accelerate(true);
			currentContent.style.opacity = 0;
			setTimeout(() => {
				currentContent.style.display = "none";
				accelerate(false)
				window.scrollTo({
					top: 0,
					left: 0,
					behavior: 'auto'
				})
				currentContent = document.getElementById(content);
				currentContent.style.display = "block";
				void navlink.offsetWidth;
				currentContent.style.opacity = 1;
				currentContentId = content;
				currentNavLink.classList.remove("glass");
				currentNavLink = navlink;
				currentNavLink.classList.add("glass");
			}, ACCELERATE_SPEED*Math.PI*4);
		}
	})
} 

/// BACKGROUND
const canvas = document.getElementById("background");

const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

ctx.strokeStyle = "white";
ctx.lineWidth = 2;
ctx.lineCap = "round";

let accelerating = 0;
let time = 0;
const STREAK = 8;

const ACCELERATE_SPEED = 50;
const MAX_SPEED = 0.01;
const MIN_SPEED = 0.001;
let speed = MIN_SPEED;

const points = [];

function accelerate(cond) {
	time = 0;
	if (cond) {
		accelerating = 1
	} else {
		accelerating = -1;
	}
}

function randomPoint() {
	return {
		x: Math.random() * canvas.width*2 - canvas.width/2,
		y: Math.random() * canvas.height*2 - canvas.height/2,
		z: Math.random()*2 + 0.1, 
	}
}

for (let i = 0; i < 1000; i++) {
	points.push(randomPoint());
}

setInterval(() => {
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
	if (accelerating == 1) {
		speed = (Math.sin(time/ACCELERATE_SPEED-Math.PI/2) * 0.5 + 0.5) * (MAX_SPEED - MIN_SPEED) + MIN_SPEED
		if (time >= Math.PI*ACCELERATE_SPEED) {speed = MAX_SPEED;}
	} else if (accelerating == -1) {
		speed = (0.5-Math.sin(time/ACCELERATE_SPEED-Math.PI/2) * 0.5) * (MAX_SPEED - MIN_SPEED) + MIN_SPEED
		if (time >= Math.PI*ACCELERATE_SPEED) {accelerating = 0;}
	} else {
		speed = MIN_SPEED;
	}
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (const point of points) {
		ctx.lineWidth = Math.max(1 / point.z, 0.1);
		ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(1.9-point.z, 1)}`
		ctx.beginPath();
		ctx.moveTo((point.x - canvas.width/2) / point.z + canvas.width/2, (point.y-canvas.height/2) / point.z + canvas.height/2);
		ctx.lineTo((point.x - canvas.width/2) / (point.z + speed*STREAK) + canvas.width/2, (point.y - canvas.height/2) / (point.z + speed*STREAK) + canvas.height/2);
		ctx.stroke();
		point.z -= speed;
		if (point.z <= speed) {
			let newPoint = randomPoint();
			point.x = newPoint.x;
			point.y = newPoint.y;
			point.z = 2;
		}
	}
	time++;
}, 1)