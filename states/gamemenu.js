var GameMenu = function() {};

GameMenu.prototype = {
    
    menuConfig: {
        startY: 260,
        startX: 30
    },

    init: function () {
        this.titleText = game.make.text(game.world.centerX, 100, "Proxima", {
            font: 'bold 60pt Jura',
            fill: '#FDFFB5',
            align: 'center'
        });
        this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        this.titleText.anchor.set(0.5);
        // Option count calculates where to vertically place each nav item.
        this.optionCount = 1;
    },

    create: function () {
        // game.add.sprite(0, 0, 'menu-bg'); // Background image
        // game.add.existing(this.titleText); // Title text
        if (music.name !== "theme" && playMusic) {
            music.stop();
            music = game.add.audio('theme');
            music.loop = true;
            music.play();
        }
        
        // This changes how the game handles focus changes(ex. pausing).
        // It is set to false by default and needs to be be manually set to true, 
        // so that auto-pausing gets turned off.
        game.stage.disableVisibilityChange = true; 
        game.add.sprite(0, 0, 'menu-bg');
        game.add.existing(this.titleText);

        

        // Adds each nav item. For now, I'll just focus on the main menu.
        this.addMenuOption('Start', {x: 355, y: 250}, function () {
            // this.txt.setShadow(-5, 5, 'rgba(200,200,200,0.5)', 0);
            
            game.state.start("Game");
        });
    },
};

Phaser.Utils.mixinPrototype(GameMenu.prototype, mixins);