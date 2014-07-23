var Level = function(game) {
    this.game = game;
    this.idlePlatformsGroup = null;
    this.movingPlatformsGroup = null;
    this.starsGroup = null;
};

Level.prototype = {

    preload: function() {
        this.game.load.image('sky', 'assets/sky4.jpg');
        this.game.load.image('ground', 'assets/platform.png');
        this.game.load.image('cloud', 'assets/cloud.png');
        this.game.load.image('star', 'assets/star.png');
    },

    create: function() {
        this.game.world.setBounds(0, 0, 800, 400);

        var sky = this.game.add.sprite(0, 0, 'sky');
        sky.fixedToCamera = true;

        this.idlePlatformsGroup = this.game.add.group();
        this.idlePlatformsGroup.enableBody = true;

        var ground = this.idlePlatformsGroup.create(0, this.game.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;

        new IdlePlatform(this.idlePlatformsGroup, 100, 300);
        new IdlePlatform(this.idlePlatformsGroup, 440, 270, 0.10);
        new IdlePlatform(this.idlePlatformsGroup, 440, 230, 0.10);
        new IdlePlatform(this.idlePlatformsGroup, 350, 200, 0.10);
        new IdlePlatform(this.idlePlatformsGroup, 60, 130, 0.10);
        new IdlePlatform(this.idlePlatformsGroup, 0, 100);
        new IdlePlatform(this.idlePlatformsGroup, 390, 100);
        new IdlePlatform(this.idlePlatformsGroup, 550, 90, 0.10);
        new IdlePlatform(this.idlePlatformsGroup, 550, 50, 0.10);

        this.movingPlatformsGroup = this.game.add.group();
        this.movingPlatformsGroup.enableBody = true;
        new MovingPlatform(this.movingPlatformsGroup, 300, 300, 250, 300, null);
        new MovingPlatform(this.movingPlatformsGroup, 160, 160, 160, 200, 30);
        new MovingPlatform(this.movingPlatformsGroup, 200, 70, 180, 250, null);

        this.starsGroup = this.game.add.group();
        this.starsGroup.enableBody = true;
        var star = this.starsGroup.create(557, 0, 'star');
        star.body.gravity.y = 300;
        star.body.bounce.y = 0.7;
    },

    update: function() {
        this.movingPlatformsGroup.callAll('move');
    }
};
