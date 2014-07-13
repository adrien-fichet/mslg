window.onload = function() {
    var conf = new Configuration();
    var game = new Phaser.Game(conf.WINDOW_WIDTH, conf.WINDOW_HEIGHT, Phaser.CANVAS, '', {
        preload: preload,
        create: create,
        update: update,
        render: render
    });
    var player = new Player(conf, game);
    var level = new Level(game);
    var hud = new Hud(game);
    var displayDebugInfo = false;
    var displayDebugInfoKey;

    function preload() {
        Phaser.Canvas.setSmoothingEnabled(game.context, false);
        player.preload();
        level.preload();
        hud.preload();
    }

    function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        level.create();
        player.create();
        hud.create();
        displayDebugInfoKey = game.input.keyboard.addKey(conf.KEY_DISPLAY_DEBUG_INFO);
    }

    function update() {
        game.physics.arcade.collide(player.sprite, level.idlePlatformsGroup);
        game.physics.arcade.collide(player.sprite, level.movingPlatformsGroup);
        game.physics.arcade.collide(level.starsGroup, level.idlePlatformsGroup);
        game.physics.arcade.overlap(player.sprite, level.starsGroup, collectStar, null, this);

        player.update();
        level.update();

        if (displayDebugInfoKey.justPressed()) {
            displayDebugInfo = !displayDebugInfo;
        }
    }

    function render() {
        if (displayDebugInfo == true) {
            game.debug.pointer(game.input.activePointer);
        }
    }

    function collectStar(player, star) {
        star.kill();
        hud.font.text = 'Well played!';
    }
};
