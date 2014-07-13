var Level = function(game) {
    this.game = game;
    this.platforms = null;
    this.movingLedges = [];
    this.stars = null;
};

Level.prototype = {

    preload: function() {
        this.game.load.image('sky', 'assets/sky.png');
        this.game.load.image('ground', 'assets/platform.png');
        this.game.load.image('star', 'assets/star.png');
    },

    create: function() {
        this.game.add.sprite(0, 0, 'sky');

        this.platforms = this.game.add.group();
        this.platforms.enableBody = true;

        var ground = this.platforms.create(0, this.game.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;

        this.createLedge(100, 300);
        this.createLedge(440, 270, 0.10);
        this.createLedge(440, 230, 0.10);
        this.createLedge(350, 200, 0.10);
        this.createLedge(60, 130, 0.10);
        this.createLedge(0, 100);
        this.createLedge(390, 100);
        this.createLedge(550, 90, 0.10);
        this.createLedge(550, 50, 0.10);

        this.movingLedges.push(new MovingLedge(this.platforms, 300, 300, null, null, 250, 300, null));
        this.movingLedges.push(new MovingLedge(this.platforms, 160, 160, null, null, 160, 200, 30));
        this.movingLedges.push(new MovingLedge(this.platforms, 200, 70, null, null, 180, 250, null));

        this.stars = this.game.add.group();
        this.stars.enableBody = true;
        var star = this.stars.create(557, 0, 'star');
        star.body.gravity.y = 300;
        star.body.bounce.y = 0.7;
    },

    update: function() {
        for (var i=0; i < this.movingLedges.length; i++) {
            this.movingLedges[i].move();
        }
    },

    createLedge: function(x, y, sx, sy) {
        var ledge = this.platforms.create(x, y, 'ground');
        if (sx == null) { sx = 0.25; }
        if (sy == null) { sy = 0.5; }
        ledge.scale.setTo(sx, sy);
        ledge.body.immovable = true;
        return ledge;
    }
};
