class Obstacle {
    constructor() {
        this.size = 50;
        this.x = width;
        this.y = height - this.size - 50;
        this.speed = 9;
        this.color = color(100, 100, 100);
    }

    move() {
        this.x -= this.speed;
    }

    show() {
        noStroke();
        fill(this.color);
        square(this.x, this.y, this.size);
    }
}