var MovingLedge = function(platforms, x, y, sx, sy, minX, maxX, velocity) {
    this.minX = minX;
    this.maxX = maxX;

    this.ledge = platforms.create(x, y, 'ground');
    this.ledge.body.immovable = true;

    if (sx == null) { sx = 0.25; }
    if (sy == null) { sy = 0.5; }
    this.ledge.scale.setTo(sx, sy);

    if (velocity == null) {
        this.velocity = 50;
    } else {
        this.velocity = velocity;
    }

    this.ledge.body.velocity.x = this.velocity;
};

MovingLedge.prototype = {

    move: function() {
        if (this.ledge.x >= this.maxX) {
            this.ledge.body.velocity.x = -this.velocity;
        } else if (this.ledge.x <= this.minX) {
            this.ledge.body.velocity.x = this.velocity;
        }
    }
};
