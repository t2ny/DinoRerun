let player;
let obstacles = [];
let textures = [];
let clouds = [];
let groundLine;
let prevFrameCount = 0;
let spawnDelay = 60;
let cloudImg;
let cactusImg;
let cactusImg2;
let gameOver = false;
let hiScore = 0;
let score = 0;
let font;
let primary;

function preload() {
    cloudImg = loadImage('assets/pixel-cloud-alt.png');
    cactusImg = loadImage('assets/cactus.png');
    cactusImg2 = loadImage('assets/cactus2.png');
    font = loadFont('assets/PressStart2P-Regular.ttf');
    primary = color(83, 83, 83);
}

p5.disableFriendlyErrors = true;

function setup() {
    createCanvas(800, 400);
    player = new Player();
    groundLine = new Line(0, height - player.size - 10, width, height - player.size - 10);
    noLoop();
}

function keyPressed() {

    // Restart game
    if (key == ' ' && gameOver) {
        restartGame();
        return;
    }

    // Start game
    if (key == ' ' && !isLooping()) {
        loop();
        return;
    }

    // Jump
    if (key == ' ' || key == 'w') {
        player.jump();
    }
}

function draw() {
    background(255);

    groundLine.show();

    spawnClouds();

    // All code after pop() will be undone
    push();
    player.show();
    pop();
    player.move();

    spawnGroundTexture();

    spawnObstacles();

    score += 0.05;

    text(round(frameRate()), 50, 50);
    showScore();

    if (gameOver) {
        showText('GAME OVER');
    }

    if (!gameOver && !isLooping()) {
        showText('START GAME');
    }

}

function spawnClouds() {
    // Remove clouds that have reached the start of the screen to save memory
    if (clouds.length > 0 && clouds[0].x <= -50) {
        clouds.shift();
    }

    if (Math.random() * (1 - 0) + 0 < 0.1) {
        if (clouds.length < 5) {
            if (clouds.length === 0) {
                clouds.push(new Cloud(cloudImg, 0));
            } else {
                if (clouds[clouds.length - 1].x < width - 200) {
                    clouds.push(new Cloud(cloudImg, Math.random() * (151 - 0) + 0));
                }
            }
        }
    }

    for (let c of clouds) {
        c.show();
        c.move();
    }
}

function spawnObstacles() {
    // Spawning algorithmn
    if (frameCount - prevFrameCount === spawnDelay) {
        obstacles.push(new Obstacle(Math.random() < 0.5 ? cactusImg : cactusImg2));
        prevFrameCount = frameCount;
        spawnDelay = Math.floor(Math.random() * (101 - 25) + 25);
    }

    // Remove obstacles that have reached the start of the screen to save memory
    if (obstacles.length > 0 && obstacles[0].x <= -50) {
        obstacles.shift();
    }

    for (let o of obstacles) {

        if (player.collide(o)) {
            print("Game Over");
            gameOver = true;
            noLoop();
        }

        push();
        o.show();
        pop();
        o.move();
    }
}

function spawnGroundTexture() {
    // Remove textures that have reached the start of the screen to save memory
    if (textures.length > 0 && textures[0].x <= 0) {
        textures.shift();
    }

    if (Math.random() < 0.1) {
        textures.push(new Texture(random(height - 60, height - 40), Math.random() * (11 - 1) + 1));
    }

    for (let t of textures) {
        push();
        t.show();
        pop();
        t.move();
    }
}

function restartGame() {
    obstacles = [];
    gameOver = false;
    prevFrameCount = 0;
    hiScore = score > hiScore ? round(score) : hiScore;
    score = 0;
    frameCount = 0;
    loop();
}

function showScore() {
    let output = '';

    push();
    textFont(font);
    fill(primary);

    if (hiScore > 0) {
        output = `HI ${hiScore.toString().padStart(5, '0')} ${round(score).toString().padStart(5, '0')}`;
    } else {
        output = round(score).toString().padStart(5, '0');
    }
    text(output, width - 200, 75)
    pop();
}

function showText(word) {
    push();
    textFont(font);
    textSize(20);
    fill(primary);
    let tWidth = textWidth(word) / 2;
    text(word, width / 2 - tWidth, height / 2);
    pop();
}