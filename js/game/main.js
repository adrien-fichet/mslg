var createLedge = function(platforms, x, y, sx, sy) {
    var ledge = platforms.create(x, y, 'ground');
    if (sx == null) { sx = 0.25; }
    if (sy == null) { sy = 0.5; }
    ledge.scale.setTo(sx, sy);
    ledge.body.immovable = true;
    return ledge;
};

var makeIdlePlatforms = function(platforms) {
    createLedge(platforms, 100, 300);
    createLedge(platforms, 440, 270, 0.10);
    createLedge(platforms, 440, 230, 0.10);
    createLedge(platforms, 350, 200, 0.10);
    createLedge(platforms, 60, 130, 0.10);
    createLedge(platforms, 0, 100);
    createLedge(platforms, 390, 100);
    createLedge(platforms, 550, 90, 0.10);
    createLedge(platforms, 550, 50, 0.10);
};

window.onload = function() {
    var conf = new Configuration();
    var game = new Phaser.Game(conf.WINDOW_WIDTH, conf.WINDOW_HEIGHT, Phaser.CANVAS, '', {
        preload: preload,
        create: create,
        update: update,
        render: render
    });
    var player = new Player(conf, game);
    var platforms;
    var stars;
    var text;
    var font;
    var image;
    var movingLedges = [];
    var displayDebugInfo = false;
    var displayDebugInfoKey;

    function preload() {
        Phaser.Canvas.setSmoothingEnabled(game.context, false);
        player.preload();
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('star', 'assets/star.png');
        game.load.image('defaultFont', 'assets/Ninja Gaiden (Tecmo).png');
    }

    function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0, 0, 'sky');

        platforms = game.add.group();
        platforms.enableBody = true;

        var ground = platforms.create(0, game.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;

        makeIdlePlatforms(platforms);
        movingLedges.push(new MovingLedge(platforms, 300, 300, null, null, 250, 300, null));
        movingLedges.push(new MovingLedge(platforms, 160, 160, null, null, 160, 200, 30));
        movingLedges.push(new MovingLedge(platforms, 200, 70, null, null, 180, 250, null));

        setupFont();

        stars = game.add.group();
        stars.enableBody = true;
        var star = stars.create(557, 0, 'star');
        star.body.gravity.y = 300;
        star.body.bounce.y = 0.7;

        player.create();
        displayDebugInfoKey = game.input.keyboard.addKey(conf.KEY_DISPLAY_DEBUG_INFO);

        text = game.add.text(220, 350, '', { fontSize: '32px', fill: '#ffffff' });
    }

    function update() {
        game.physics.arcade.collide(player.sprite, platforms);
        game.physics.arcade.collide(stars, platforms);
        game.physics.arcade.overlap(player.sprite, stars, collectStar, null, this);

        player.update();

        if (displayDebugInfoKey.justPressed()) {
            displayDebugInfo = !displayDebugInfo;
        }

        for (var i=0; i < movingLedges.length; i++) {
            movingLedges[i].move();
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
