var MovingPlatform = function(group, x, y, minX, maxX, velocity) {
    this.platform = group.create(x, y, 'cloud');
    this.platform.body.immovable = true;

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
