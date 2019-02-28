// Creates a game object to start the preloader and the game itself
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game'), 
Main = function () {},
gameOptions = {
    playSound: true,
    playMusic: true
},
musicPlayer;

Main.prototype = {
    // The preloader screen
    preload: function () {
        game.load.image('stars', '/assets/images/stars.jpg');
        game.load.image('loading', '/assets/images/loading-screen.png');
        game.load.image('brand', '/assets/images/andrew-logo-proxima.png');
        game.load.script('polyfill', 'lib/polyfill.js');
        game.load.script('utils', '/lib/utils.js');
        game.load.script('splash', '/states/Splash.js');
    },

    // Creates the splash screen and adds as a game state
    create: function () {
        game.state.add('Splash', Splash);
        game.state.start('Splash');
    }
};

game.state.add('Main', Main);
game.state.start('Main');