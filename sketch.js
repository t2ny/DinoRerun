let player;
let obstacles = [];
let prevFrameCount = 0;
let spawnDelay = 60;

function setup() {
    createCanvas(800, 400);
    player = new Player();
}

function keyPressed() {
    if (key == ' ') {
        player.jump();
    }
}

function draw() {
    background(220);

    player.show();
    player.move();

    // Spawning algorithmn
    if (frameCount - prevFrameCount === spawnDelay) {
        obstacles.push(new Obstacle());
        prevFrameCount = frameCount;
        spawnDelay = Math.floor(random(22, 101));
    }

    // Remove obstacles that have reached the start of the screen to save memory
    if (obstacles.length > 0 && obstacles[0].x <= 0) {
        obstacles.shift();
    }

    for (let o of obstacles) {
        o.show();
        o.move();

        if (player.collide(o)) {
            print("Game Over");
            noLoop();
        }
    }
}