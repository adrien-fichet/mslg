var Hud = function(game) {
    this.game = game;
    this.font = null;
    this.fontImage = null;
};

Hud.prototype = {

    preload: function() {
        this.game.load.image('defaultFont', 'assets/Ninja Gaiden (Tecmo).png');
    },

    create: function() {
        this.font = this.game.add.retroFont('defaultFont', 8, 8, Phaser.RetroFont.TEXT_SET1, 760 / 8, 0, 0, 0, 8);
        this.font.buildRetroFontText();
        this.fontImage = this.game.add.image(300, 370, this.font);
        this.fontImage.fixedToCamera = true;
        this.fontImage.scale.set(4);
        this.fontImage.anchor.set(0.5);
        this.fontImage.smoothed = false;
    }
};
