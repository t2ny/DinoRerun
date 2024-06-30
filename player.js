class Player {
    constructor(animation, animateSpeed, idleImg) {
        this.size = 60;
        this.x = 50;
        this.y = height - this.size - 50;
        this.vy = 0;
        this.gravity = 1;
        this.color = color(100, 100, 100);
        this.animation = animation;
        this.animateSpeed = animateSpeed;
        this.index = 0;
        this.idleImg = idleImg;
    }

    jump() {
        if (this.y === height - this.size - 50) {
            this.vy = -17;
        }
    }

    move() {
        this.y += this.vy;
        this.vy += this.gravity;
        this.y = constrain(this.y, 0, height - this.size - 50);
    }

    show() {

        if (this.y < height - this.size - 50 || !isLooping()) {
            image(this.idleImg, this.x, this.y, this.size, this.size);
        } else {
            image(this.animation[Math.floor(this.index % this.animation.length)], this.x, this.y, this.size, this.size);
        }

    }

    animate() {
        this.index += this.animateSpeed;
    }

    collide(obstacle) {
        if ((obstacle.x <= this.x + this.size - 10) &&
            (obstacle.y <= this.y + this.size - 10) &&
            (obstacle.x + obstacle.size >= this.x + 10)) {
            return true;
        }

        return false;
    }

}