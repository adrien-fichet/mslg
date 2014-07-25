var Debug = function(game, conf) {
    this.conf = conf;
    this.game = game;
    this.displayDebugInfo = false;
    this.displayDebugInfoKey = null;
};

Debug.prototype = {

    create: function() {
        this.displayDebugInfoKey = this.game.input.keyboard.addKey(this.conf.KEY_DISPLAY_DEBUG_INFO);
    },

    update: function() {
        if (this.displayDebugInfoKey.justPressed()) {
            this.displayDebugInfo = !this.displayDebugInfo;
        }
    },

    render: function() {
        if (this.displayDebugInfo == true) {
            this.game.debug.pointer(this.game.input.activePointer);
        }
    }
};
