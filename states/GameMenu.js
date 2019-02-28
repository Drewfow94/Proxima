var GameMenu = function() {};

GameMenu.prototype = {
    init: function () {
        this.titleText = game.make.text(game.world.centerX, 100, "Game Title", {
            font: 'bold 60pt Proxima-Font',
            fill: '#FDFFB5',
            align: 'center'
        });
        this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        this.titleText.anchor.set(0.5);
    },

    preload: function () {
            // Option count calculates where to vertically place each nav item.
            this.optionCount = 1;
    },

    create: function () {
        game.add.sprite(0, 0, 'menu-bg'); // Background image
        game.add.existing(this.titleText); // Title text
        // This changes how the game handles focus changes(ex. pausing).
        // It is set to false by default and needs to be be manually set to true, 
        // so that auto-pausing gets turned off.
        game.stage.disableVisibilityChange = true; 

        // Use a font and create a nav item
        var optionStyle = { font: '30pt Proxima-font', fill: 'white', align: 'left', stroke: 'rgba(0,0,0,0)', strokeThickness: 4};
        // The text for the start option
        var txt = game.add.text(30, (this.optionCount * 80) + 200, text, optionStyle);
        // A couple of mouse hover states(one for on hover and off hover)
        txt.events.onInputOver.add(function (target) {
                target.fill = "#42f4b3";
                target.stroke = "rgba(200,200,200,0.5)";
        });
        txt.events.onInputOver.add(function (target) {
            target.fill = "white";
            target.stroke = "rgba(0,0,0,0)";
        });  
        txt.stroke = "rgba(0,0,0,0)";
        txt.strokeThickness = 4;
        txt.inputEnabled = true;
        txt.events.onInputUp.add(callback);
        txt.events.onInputOver.add(onOver);
        txt.events.onInputOut.add(onOut);
        this.optionCount ++;
        },
};