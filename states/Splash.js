var Splash = function () {};

Splash.prototype = {

    loadScripts: function () {
        // Font loader
        game.load.script('WebFont', 'vendor/webfontloader.js');
        // Other state's scripts that will be loaded
        game.load.script('gamemenu','states/gamemenu.js');
        // game.load.script('thegame', 'states/thegame.js');
        // game.load.script('gameover','states/gameover.js');
        // game.load.script('credits', 'states/credits.js');
        // game.load.script('options', 'states/options.js');    
    },

    
    loadBgm: function () {
        // Loads background music
        game.load.audio('theme', '/assets/music/proximathemesong.mp3');    
    },

    loadImages: function () {
        game.load.image()        
    },

    loadFonts: function (text) {
        // WebFont.load({
        //     google: {
        //       families: ['Jura'],
        //     }
        //   })
        //   WebFontConfig = {
        //     loading: function() { console.log('loading')},
        //     active: function() { console.log('font is active'); },
        //     // inactive: function() {},
        //     fontloading: function(familyName, fvd) { console.log('font has loaded') },
        //     fontactive: function(familyName, fvd) { console.log('font is active') }
        //     // fontinactive: function(familyName, fvd) {}
        //   };
        // WebFontConfig = {
        //     google: {
        //         families: ['Jura']
        //     },
        //     loading: function() { console.log('loading')},
        //     active: function() { console.log('font is active'); },
        //     // inactive: function() {},
        //     fontloading: function(familyName, fvd) { console.log('font has loaded') },
        //     fontactive: function(familyName, fvd) { console.log('font is active') }
        // }
          
    },

    init: function () {
               
           //console.log('font is active');
           this.loadingBar = game.make.sprite(game.world.centerX-(387/2), 400, "loading");
           this.logo       = game.make.sprite(game.world.centerX, 200, 'brand');
           this.status     = game.make.text(game.world.centerX, 380, 'Loading...', {fill: 'white', font: "bold 20pt Jura"});
           utils.centerGameObjects([this.logo, this.status]);
        
        
    },

    // The preload function then will call all of the previously defined functions:
    preload: function () {
        // object z-index is set when object is added
        game.add.sprite(0, 0, 'stars');
        
        // my logo
        // scales the logo down to half size, should probably resize in PS later...
        game.add.existing(this.logo).scale.setTo(0.25);
        
        // loading bar
        game.add.existing(this.loadingBar);
        
        // status text that says it's loading
        game.add.existing(this.status);

        // loads the loading bar sprite
        this.load.setPreloadSprite(this.loadingBar);

        this.loadScripts();
        this.loadImages();
        this.loadFonts();
        this.loadBgm();
    },

    addGameStates: function () {

         game.state.add("GameMenu",GameMenu);
        // game.state.add("Game",Game);
        // game.state.add("GameOver",GameOver);
        // game.state.add("Credits",Credits);
        // game.state.add("Options",Options);
      },
    
      addGameMusic: function () {
        music = game.add.audio('theme');
        music.loop = true;
        music.play();
      },
    
      create: function() {
        
        this.status.style.font = "bold 20pt Jura";
        this.addGameStates();
        this.addGameMusic();
    
        setTimeout(() => {
            this.status.setText('Ready!');
        }, 2000);
    }
};