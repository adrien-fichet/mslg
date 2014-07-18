var MovingPlatform = function(group, x, y, sx, sy, minX, maxX, velocity) {
    this.platform = group.create(x, y, 'cloud');
    this.platform.body.immovable = true;

    if (sx == null) { sx = 1; }
    if (sy == null) { sy = 1; }
    this.platform.scale.setTo(sx, sy);

    if (velocity == null) { velocity = 50; }
    this.platform.body.velocity.x = velocity;

    this.platform.move = function() {
        if (this.x >= maxX) {
            this.body.velocity.x = -velocity;
        } else if (this.x <= minX) {
            this.body.velocity.x = velocity;
        }
    };
};
