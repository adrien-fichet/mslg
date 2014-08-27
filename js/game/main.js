window.onload = function() {
    var conf = new Configuration();
    var game = new Phaser.Game(conf.WINDOW_WIDTH, conf.WINDOW_HEIGHT, Phaser.CANVAS, '', {
        preload: preload,
        create: create,
        update: update,
        render: render
    });
    var player = new Player(game, conf);
    var level = new Level(game, conf);
    var hud = new Hud(game);
    var debug = new Debug(game, conf);

    function preload() {
        Phaser.Canvas.setSmoothingEnabled(game.context, false);

        game.scale.maxWidth = conf.WINDOW_WIDTH;
        game.scale.maxHeight = conf.WINDOW_HEIGHT;
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.setScreenSize();

        player.preload();
        level.preload();
        hud.preload();
    }

    function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        level.create();
        player.create();
        hud.create();
        debug.create();
    }

    function update() {
        game.physics.arcade.collide(player.sprite, level.idlePlatformsGroup);
        game.physics.arcade.collide(player.sprite, level.movingPlatformsGroup);
        game.physics.arcade.collide(level.starsGroup, level.idlePlatformsGroup);
        game.physics.arcade.overlap(player.sprite, level.starsGroup, collectStar, null, this);

        player.update();
        level.update();
        debug.update();
    }

    function render() {
        debug.render();
    }

    function collectStar(player, star) {
        star.kill();
        hud.font.text = 'Well played!';
    }
};
