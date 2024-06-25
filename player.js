class Player {
    constructor() {
        this.size = 50;
        this.x = 50;
        this.y = height - this.size;
        this.vy = 0;
        this.gravity = 1;
    }

    jump() {
        if (this.y === height - this.size) {
            this.vy = -15;
        }
    }

    move() {
        this.y += this.vy;
        this.vy += this.gravity;
        this.y = constrain(this.y, 0, height - this.size);
    }

    show() {
        // rect(this.x, this.y, this.size, this.size);
        // noStroke();
        square(this.x, this.y, this.size);
    }

    collide(obstacle) {
        if ((obstacle.x <= this.x + this.size - 3) &&
            (obstacle.y <= this.y + this.size - 10) &&
            (obstacle.x + obstacle.size - 3 >= this.x)) {
            return true;
        }

        return false;
    }

}