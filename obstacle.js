class Obstacle {
    constructor() {
        this.size = 50;
        this.x = width;
        this.y = height - this.size;
        this.speed = 9;
    }

    move() {
        this.x -= this.speed;
    }

    show() {
        square(this.x, this.y, this.size);
    }
}