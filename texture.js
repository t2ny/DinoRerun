class Texture {
    constructor(y, w) {
        this.height = 3;
        this.width = w;
        this.x = width;
        this.y = y;
        this.speed = 9;
        this.color = color(100, 100, 100);
    }

    move() {
        this.x -= this.speed;
    }

    show() {
        noStroke();
        fill(this.color);
        rect(this.x, this.y, this.width, this.height);
    }
}