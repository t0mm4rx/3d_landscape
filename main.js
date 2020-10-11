let grid = null;
const grid_size = 50;
const scale = 50;
const perlin_scale = 0.1;
const spikes_height = 750;
let cam_x = 0;
let cam_y = 0;
let cam_z = -100;

function setup() {
	createCanvas(window.innerWidth, window.innerHeight, WEBGL);
	grid = new Array(grid_size).fill(0).map(a => new Array(grid_size).fill(0));
	for (let x = 0; x < grid_size; ++x) {
		for (let y = 0; y < grid_size; ++y) {
			grid[x][y] = noise(x * perlin_scale, y * perlin_scale) * spikes_height;
		}
	}
}

function draw() {
	background(0);
	stroke(255);
	strokeWeight(0.5);
	noFill();
	rotateX(PI / 3);
	translate(-width + cam_x, -height + cam_y, cam_z);
	keys();
	for (let x = 0; x < grid_size - 1; ++x) {
		for (let y = 0; y < grid_size - 1; ++y) {
			// push();
			// translate(x * scale, y * scale, grid[x][y]);
			// sphere(1);
			// pop();
			beginShape();
			vertex(x * scale, y * scale, grid[x][y]);
			vertex((x + 1) * scale, y * scale, grid[x + 1][y]);
			vertex(x * scale, (y + 1) * scale, grid[x][y + 1]);
			endShape();
		}
	}
	// beginShape(TRIANGLE_STRIP);
	// vertex(100, 100);
	// vertex(200, 100);
	// vertex(200, 200);
	// endShape();
	
}

function keys() {
	if (!isKeyPressed)
		return;
	if (key === "ArrowDown")
		cam_y -= 10;
	if (key === "ArrowUp")
		cam_y += 10;
	if (key === "ArrowLeft")
		cam_x += 10;
	if (key === "ArrowRight")
		cam_x -= 10;
	if (key === "u")
		cam_z -= 10;
	if (key === "d")
		cam_z += 10;
}