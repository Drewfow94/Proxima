var Running = function(running) {};

Running.prototype = {

    preload: function() {
        this.load.image('planet', 'assets/images/proxima-bg.png');
        // Third parameter is the length and width of each frame in the player spritesheet
        // The last parameter is the number of frames.
        game.load.spritesheet('player', '/assets/images/player-spritesheet.png', 120, 142, 4);
        

        

    },

    create: function() {
        game.add.sprite(0, 0, 'planet');
        var player = game.add.sprite(400, 400, 'player');

        if (music.name !== "game-music" && gameOptions.playMusic) {
            music.stop();
            music = game.add.audio('game-music');
            music.loop = true;
            music.play();
        }

        // Animation

        var jetstream = player.animations.add('jetstream');
        // Initiate Animation
        player.animations.play('jetstream', 18, true);




    }

};