/// NAVBAR
let pathname = location.pathname.slice(1);
if (pathname == "") {
	pathname = "home";
} else if (pathname == "blogs") {
	pathname == '../blogs/out';
}
const contentElement = document.getElementById("content");
let currentTab = pathname;

const navlinks = document.getElementsByClassName("navlink");
let currentNavLink;

fetch('/resource/' + pathname + '.html').then((data) => {
	if (!data.ok) {
		// 404
		return;
	}
	data.text().then((data) => {
		contentElement.innerHTML = data;
		contentElement.style.display = "block";
	});
})

for (const navlink of navlinks) {
	if (navlink.getAttribute("content") == pathname) {
		currentNavLink = navlink;
		currentNavLink.classList.add("glass");
	}
	navlink.addEventListener('click', (event) => {
		const content = navlink.getAttribute("content");
		if (content && content != currentTab) {
			accelerate(true);
			contentElement.style.opacity = 0;
			setTimeout(() => {
				contentElement.style.display = "none";
				window.scrollTo({
					top: 0,
					left: 0,
					behavior: 'auto'
				})
				fetch('/resource/' + content + '.html').then((data) => {
					if (!data.ok) {
						// 404
						return;
					}
					if (content == "home") {
						history.replaceState(null, null, '/')
					} else if (content == "../blogs/out") {
						history.replaceState(null, null, '/blogs/');
					} else {
						history.replaceState(null, null, '/' + content);
					}
					accelerate(false);
					data.text().then((data) => {
						contentElement.innerHTML = data;
						contentElement.style.display = "block";

						void navlink.offsetWidth;

						contentElement.style.opacity = 1;
					});
					currentTab = content;

					currentNavLink.classList.remove("glass");
					currentNavLink = navlink;
					currentNavLink.classList.add("glass");
				})
			}, ACCELERATE_SPEED * Math.PI * 4);
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
let accelerateStart = 0;
let lastTime;
const STREAK = 2;

const ACCELERATE_SPEED = 60;
const MAX_SPEED = 0.002;
const MIN_SPEED = 0.0002;
let speed = MIN_SPEED;

let paused = false;

const STAR_COUNT = 1000;

const points = new Float32Array(STAR_COUNT * 3);

function accelerate(cond) {
	accelerateStart = performance.now();
	if (cond) {
		accelerating = 1
	} else {
		accelerating = -1;
	}
}

function setRandomPoint(i) {
	points[i] = Math.random() * canvas.width * 2 - canvas.width / 2
	points[i + 1] = Math.random() * canvas.height * 2 - canvas.height / 2
	points[i + 2] = Math.random() * 2 + 0.1
}

for (let i = 0; i < STAR_COUNT * 3; i += 3) {
	setRandomPoint(i);
}

window.addEventListener("resize", () => {
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
});

document.addEventListener('visibilitychange', () => {
	paused = document.hidden;
	lastTime = performance.now();
})

const frame = (timestamp) => {
	if (paused) {
		window.requestAnimationFrame(frame);
		return;
	}

	let delta;
	if (lastTime == undefined) {
		delta = 1;
	} else {
		delta = timestamp - lastTime;
	}
	let elapsed = timestamp - accelerateStart;

	if (accelerating == 1) {
		speed = (Math.sin(elapsed / ACCELERATE_SPEED - Math.PI / 2) * 0.5 + 0.5) * (MAX_SPEED - MIN_SPEED) + MIN_SPEED
		if (elapsed >= Math.PI * ACCELERATE_SPEED) { speed = MAX_SPEED; }
	} else if (accelerating == -1) {
		speed = (0.5 - Math.sin(elapsed / ACCELERATE_SPEED - Math.PI / 2) * 0.5) * (MAX_SPEED - MIN_SPEED) + MIN_SPEED
		if (elapsed >= Math.PI * ACCELERATE_SPEED) { accelerating = 0; }
	} else {
		speed = MIN_SPEED;
	}

	ctx.globalCompositeOperation = 'destination-out';
	ctx.fillStyle = `rgba(0, 0, 0, ${0.1 * (1 - speed / MAX_SPEED) + 0.5})`;
  	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.globalCompositeOperation = 'source-over'

	const cx = canvas.width / 2;
	const cy = canvas.height / 2;

	for (let i = 0; i < STAR_COUNT * 3; i += 3) {
		ctx.beginPath();
		ctx.lineWidth = Math.max(1 / points[i + 2], 0.1);
		ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(1.9 - points[i + 2], 1)}`
		ctx.moveTo(
			(points[i] - cx) / points[i + 2] + cx,
			(points[i + 1] - cy) / points[i + 2] + cy,
		);
		ctx.lineTo(
			(points[i] - cx) / (points[i + 2] + speed * delta * STREAK) + cx,
			(points[i + 1] - cy) / (points[i + 2] + speed * delta * STREAK) + cy,
		);
		ctx.stroke();
		points[i + 2] -= speed * delta;
		if (points[i + 2] <= speed * delta) {
			setRandomPoint(i);
			points[i + 2] = 2;
		}
	}

	lastTime = timestamp;
	window.requestAnimationFrame(frame);
}

window.requestAnimationFrame(frame);