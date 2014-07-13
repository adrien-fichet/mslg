var Hud = function(game) {
    this.game = game;
    this.wellPlayedText = null;
    this.font = null;
    this.fontImage = null;
};

Hud.prototype = {

    preload: function() {
        this.game.load.image('defaultFont', 'assets/Ninja Gaiden (Tecmo).png');
    },

    create: function() {
        this.wellPlayedText = this.game.add.text(220, 350, '', { fontSize: '32px', fill: '#ffffff' });
        this.font = this.game.add.retroFont('defaultFont', 8, 8, Phaser.RetroFont.TEXT_SET1, 760 / 8, 0, 0, 0, 8);
        this.font.align = Phaser.RetroFont.ALIGN_CENTER;
        this.font.buildRetroFontText();
        this.fontImage = this.game.add.image(300, 370, this.font);
        this.fontImage.scale.set(4);
        this.fontImage.anchor.set(0.5);
        this.fontImage.smoothed = false;
    }
};
