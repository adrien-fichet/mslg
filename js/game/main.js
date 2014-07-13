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
    var text;
    var font;
    var image;
    var displayDebugInfo = false;
    var displayDebugInfoKey;

    function preload() {
        Phaser.Canvas.setSmoothingEnabled(game.context, false);
        player.preload();
        level.preload();
        game.load.image('defaultFont', 'assets/Ninja Gaiden (Tecmo).png');
    }

    function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        level.create();
        player.create();
        setupFont();
        displayDebugInfoKey = game.input.keyboard.addKey(conf.KEY_DISPLAY_DEBUG_INFO);
        text = game.add.text(220, 350, '', { fontSize: '32px', fill: '#ffffff' });
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
        font.text = 'Well played!';
    }

    function setupFont() {
        var key = 'defaultFont';
        var size = 8;
        font = game.add.retroFont(key, size, size, Phaser.RetroFont.TEXT_SET1, 760 / 8, 0, 0, 0, 8);
        font.align = Phaser.RetroFont.ALIGN_CENTER;
        font.buildRetroFontText();
        image = game.add.image(300, 370, font);
        image.scale.set(4);
        image.anchor.set(0.5);
        image.smoothed = false;
    }
};
