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

        var ledge = platforms.create(400, 100, 'ground');
        ledge.body.immovable = true;
        ledge = platforms.create(-150, 200, 'ground');
        ledge.body.immovable = true;

        player = game.add.sprite(32, game.world.height - 150, 'dude');
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
