class Player {
    constructor() {
        this.size = 50;
        this.x = 50;
        this.y = height - this.size - 50;
        this.vy = 0;
        this.gravity = 1;
        this.color = color(83, 83, 83);
    }

    jump() {
        if (this.y === height - this.size - 50) {
            this.vy = -15;
        }
    }

    move() {
        this.y += this.vy;
        this.vy += this.gravity;
        this.y = constrain(this.y, 0, height - this.size - 50);
    }

    show() {
        // rect(this.x, this.y, this.size, this.size);
        // noStroke();
        noStroke();
        fill(this.color);
        square(this.x, this.y, this.size);
    }

    collide(obstacle) {
        if ((obstacle.x <= this.x + this.size) &&
            (obstacle.y <= this.y + this.size - 10) &&
            (obstacle.x + obstacle.size >= this.x)) {
            return true;
        }

        return false;
    }

}