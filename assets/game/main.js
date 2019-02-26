// Creates a game object to start the preloader and the game itself
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game'), Main = function () {};

Main.prototype = {
    // The preloader screen
    preload: function () {
        game.load.image('stars', '/assets/images/stars.jpg');
        game.load.image('loading', '/assets/images/loading-screen.png');
        game.load.image('logo', '/assets/images/andrew-logo.png');
        game.load.image('utils', 'lib/utils.js');
        game.load.script('splash', 'states/splash.js');
    },

    // Creates the splash screen and adds as a game state
    create: function () {
        game.state.add('Splash', Splash);
        game.state.start('Splash');
    }
};

game.state.add('Main', Main);
game.state.start('Main');