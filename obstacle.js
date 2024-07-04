class Obstacle {
    constructor(img) {
        this.size = 30;
        this.height = 60;
        this.x = width;
        this.y = height - this.height - 50;
        this.speed = 9;
        this.color = color(100, 100, 100);
        this.img = img
    }

    move() {
        this.x -= this.speed;
    }

    show() {
        image(this.img, this.x, this.y, this.size, this.height);
    }
}