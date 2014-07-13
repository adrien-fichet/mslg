var Configuration = function() {
    this.WINDOW_WIDTH = 600;
    this.WINDOW_HEIGHT = 400;
    this.PLAYER_INITIAL_POS_X = 20;
    this.PLAYER_INITIAL_POS_Y = 200;
    this.PLAYER_GRAVITY_Y = 1000;
    this.PLAYER_JUMP_VELOCITY = -300;
    this.KEY_UP = Phaser.Keyboard.I;
    this.KEY_DOWN = Phaser.Keyboard.K;
    this.KEY_LEFT = Phaser.Keyboard.J;
    this.KEY_RIGHT = Phaser.Keyboard.L;
    this.KEY_JUMP = Phaser.Keyboard.S;
    this.KEY_DISPLAY_DEBUG_INFO = Phaser.Keyboard.D;
};
