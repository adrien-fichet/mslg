var Player = function(conf, game) {
    this.game = game;
    this.conf = conf;
    this.sprite = null;
    this.keys = {};
};

Player.prototype = {

    preload: function() {
        this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    },

    create: function() {
        this.sprite = this.game.add.sprite(this.conf.PLAYER_INITIAL_POS_X, this.conf.PLAYER_INITIAL_POS_Y, 'dude');
        this.game.physics.arcade.enable(this.sprite);

        this.sprite.body.bounce.y = 0.2;
        this.sprite.body.gravity.y = this.conf.PLAYER_GRAVITY_Y;
        this.sprite.body.collideWorldBounds = true;
        this.game.camera.follow(this.sprite);

        this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
        this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);

        this.keys.cursors = this.game.input.keyboard.createCursorKeys();
        this.keys.upKey = this.game.input.keyboard.addKey(this.conf.KEY_UP);
        this.keys.downKey = this.game.input.keyboard.addKey(this.conf.KEY_DOWN);
        this.keys.leftKey = this.game.input.keyboard.addKey(this.conf.KEY_LEFT);
        this.keys.rightKey = this.game.input.keyboard.addKey(this.conf.KEY_RIGHT);
        this.keys.jumpKey = this.game.input.keyboard.addKey(this.conf.KEY_JUMP);
    },

    update: function() {
        this.sprite.body.velocity.x = 0;

        if (this.keys.cursors.left.isDown || this.keys.leftKey.isDown) {
            this.sprite.body.velocity.x = -150;
            this.sprite.animations.play('left');

        } else if (this.keys.cursors.right.isDown || this.keys.rightKey.isDown) {
            this.sprite.body.velocity.x = 150;
            this.sprite.animations.play('right');

        } else {
            this.sprite.animations.stop();
            this.sprite.frame = 4;
        }

        if (this.sprite.body.touching.down && (this.keys.cursors.up.isDown || this.keys.jumpKey.isDown)) {
            this.sprite.body.velocity.y = this.conf.PLAYER_JUMP_VELOCITY;  // jump
        }
    }
};
