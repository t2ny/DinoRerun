class Cloud {
    constructor(img, y) {
        this.height = 100;
        this.width = 150;
        this.x = width;
        this.y = y;
        this.speed = 0.75;
        this.img = img;
    }

    move() {
        this.x -= this.speed;
    }

    show() {
        image(this.img, this.x, this.y);
    }
}