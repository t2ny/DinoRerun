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

function setup() {
    createCanvas(800, 400);
    player = new Player();
    groundLine = new Line(0, height - player.size - 10, width, height - player.size - 10);
}

function keyPressed() {

    if (key == ' ' && gameOver) {
        restartGame();
        return;
    }

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

    spawnObstacles();

    spawnGroundTexture();

    score = round(frameCount / 60);

    text(frameRate(), 50, 50);
    showScore();

    if (gameOver) {
        showGameOverText();
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
        obstacles.push(new Obstacle(cactusImg));
        prevFrameCount = frameCount;
        spawnDelay = Math.floor(random(25, 101));
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

    if (random(1) < 0.1) {
        textures.push(new Texture(random(height - 60, height - 40), random(1, 11)));
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
    textures = [];
    clouds = [];
    gameOver = false;
    prevFrameCount = 0;
    hiScore = score > hiScore ? score : hiScore;
    frameCount = 0;
    loop();
}

function showScore() {
    let output = '';

    push();
    textFont(font);
    fill(primary);

    if (hiScore > 0) {
        output = `HI ${hiScore.toString().padStart(5, '0')} ${score.toString().padStart(5, '0')}`;
    } else {
        output = score.toString().padStart(5, '0');
    }
    text(output, width - 200, 75)
    pop();
}

function showGameOverText() {
    push();
    textFont(font);
    textSize(20);
    fill(primary);
    let tWidth = textWidth('GAME OVER') / 2;
    text('GAME OVER', width / 2 - tWidth, height / 2);
    pop();
}