let player;
let obstacles = [];
let groundLine;
let prevFrameCount = 0;
let spawnDelay = 60;

function setup() {
    createCanvas(800, 400);
    player = new Player();
    groundLine = new Line(0, height - player.size - 10, width, height - player.size - 10);
}

function keyPressed() {
    if (key == ' ' || key == 'w') {
        player.jump();
    }
}

function draw() {
    background(255);
    //line(0, height - player.size - 10, width, height - player.size - 10);
    groundLine.show();

    // All code after pop() will be undone
    push();
    player.show();
    pop();
    player.move();

    // Spawning algorithmn
    if (frameCount - prevFrameCount === spawnDelay) {
        obstacles.push(new Obstacle());
        prevFrameCount = frameCount;
        spawnDelay = Math.floor(random(25, 101));
    }

    // Remove obstacles that have reached the start of the screen to save memory
    if (obstacles.length > 0 && obstacles[0].x <= 0) {
        obstacles.shift();
    }

    for (let o of obstacles) {

        if (player.collide(o)) {
            print("Game Over");
            noLoop();
        }

        push();
        o.show();
        pop();
        o.move();
    }
}