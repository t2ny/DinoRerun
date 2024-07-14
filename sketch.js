let player;
let obstacles = [];
let textures = [];
let clouds = [];
let animations = [];
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
let spriteSheet;
let spriteDate;
let dinoImg;
let dinoDie;
let keyPressDelay = 0;

function preload() {
    cloudImg = loadImage('assets/pixel-cloud-alt.png');
    cactusImg = loadImage('assets/cactus.png');
    cactusImg2 = loadImage('assets/cactus2.png');
    spriteSheet = loadImage('assets/sprite_sheet.png');
    dinoImg = loadImage('assets/dino.png');
    dinoDie = loadImage('assets/dino-die.png');
    spriteData = loadJSON('assets/sprite_sheet.json');
    font = loadFont('assets/PressStart2P-Regular.ttf');
    primary = color(83, 83, 83);
}

function setup() {
    createCanvas(800, 400);
    player = new Player(animations, 0.2, dinoImg);
    groundLine = new Line(0, height - player.size - 1, width, height - player.size - 1);

    // Make pixel dense screen the same
    pixelDensity(1);

    let sprites = spriteData.sprites;
    for (let i = 0; i < sprites.length; i++) {
        let x = sprites[i].x;
        let y = sprites[i].y;
        let img = spriteSheet.get(x, y, 60, 60);
        animations.push(img);
    }
    noLoop();
}

function keyPressed() {

    let currentTime = millis();

    // Restart game
    if ((key == ' ' || key == 'w' || key == 'ArrowUp') && gameOver) {
        if (currentTime - keyPressDelay < 750) return;
        restartGame();
        return;
    }

    // Start game
    if ((key == ' ' || key == 'w' || key == 'ArrowUp') && !isLooping()) {
        loop();
        return;
    }

    // Jump
    if (key == ' ' || key == 'w' || key == 'ArrowUp') {
        player.jump();
    }
}

function draw() {
    background(255);

    groundLine.show();

    spawnClouds();

    spawnGroundTexture();

    spawnObstacles();

    // All code after pop() will be undone
    push();
    player.show();
    player.move();
    player.animate();
    pop();


    score += 0.05;

    // text(round(frameRate()), 50, 50);
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


    for (let o of obstacles) {
        push();
        o.move();
        o.show();
        pop();
    }

    // Remove obstacles that have reached the start of the screen to save memory
    if (obstacles.length > 0 && obstacles[0].x <= -50) {
        obstacles.shift();
    }

    if (obstacles.length > 0 && player.collide(obstacles[0])) {
        print("Game Over");
        gameOver = true;
        player.idleImg = dinoDie;
        keyPressDelay = millis();
        noLoop();
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
        t.move();
        t.show();
        pop();
    }
}

function restartGame() {
    obstacles = [];
    gameOver = false;
    prevFrameCount = 0;
    hiScore = score > hiScore ? round(score) : hiScore;
    score = 0;
    frameCount = 0;
    player.idleImg = dinoImg;
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