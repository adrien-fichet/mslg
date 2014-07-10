var Ledge = function(platforms, x, y, sx, sy) {
    var ledge = platforms.create(x, y, 'ground');
    if (sx == null) { sx = 0.25; }
    if (sy == null) { sy = 0.5; }
    ledge.scale.setTo(sx, sy);
    ledge.body.immovable = true;
};

var makePlatforms = function(platforms) {
    new Ledge(platforms, 100, 300);
    new Ledge(platforms, 300, 300);
    new Ledge(platforms, 440, 270, 0.10);
    new Ledge(platforms, 440, 230, 0.10);
    new Ledge(platforms, 350, 200, 0.10);
    new Ledge(platforms, 160, 160);
    new Ledge(platforms, 60, 130, 0.10);
    new Ledge(platforms, 0, 100);
    new Ledge(platforms, 200, 70);
    new Ledge(platforms, 390, 100);
    new Ledge(platforms, 550, 90, 0.10);
    new Ledge(platforms, 550, 50, 0.10);
};

window.onload = function() {
    var game = new Phaser.Game(600, 400, Phaser.AUTO, '', { preload: preload, create: create, update: update });
    var platforms;
    var player;
    var cursors

    function preload () {
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('star', 'assets/star.png');
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    }

    function create () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0, 0, 'sky');

        platforms = game.add.group();
        platforms.enableBody = true;

        var ground = platforms.create(0, game.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;

        makePlatforms(platforms);

        player = game.add.sprite(20, 200, 'dude');
        game.physics.arcade.enable(player);

        player.body.bounce.y = 0.2;
        player.body.gravity.y = 1000;
        player.body.collideWorldBounds = true;

        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);

        cursors = game.input.keyboard.createCursorKeys();
    }

    function update() {
        game.physics.arcade.collide(player, platforms);

        player.body.velocity.x = 0;

        if (cursors.left.isDown) {
            player.body.velocity.x = -150;
            player.animations.play('left');

        } else if (cursors.right.isDown) {
            player.body.velocity.x = 150;
            player.animations.play('right');

        } else {
            player.animations.stop();
            player.frame = 4;
        }

        if (cursors.up.isDown && player.body.touching.down) {
            player.body.velocity.y = -300;  // jump
        }
    }
};
