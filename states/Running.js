var Running = function(running) {};

var player;
var enemy;
var shots;
var shotTime = 0;
var cursors;
var fireButton;
var score = 0;
var scoreString = '';
var scoreText;
var lives;
var enemyShots;
var firingTimer = 0;
var stateText;

// function addAnimatedSprite(collide = true){
 
//     player = game.add.sprite(400, 400, 'player');
//     player.anchor.setTo(0.5, 0.5);
//     game.physics.enable(player, Phaser.Physics.ARCADE);
//     player.body.collideWorldBounds = true;

//     // The enemy ship
//     enemy = game.add.sprite(600, 270, 'enemy');
//     enemy.anchor.setTo(1, 1.7);
//     game.physics.enable(enemy, Phaser.Physics.ARCADE);
// }

Running.prototype = {

    preload: function() {
        this.load.image('planet', 'assets/images/proxima-bg.png');
        // Third parameter is the length and width of each frame in the player spritesheet
        // The last parameter is the number of frames.
        game.load.spritesheet('player', '/assets/images/player-spritesheet.png', 120, 142, 4);
        // Player's Shot
        game.load.spritesheet('shots', '/assets/images/shot_spritesheet2.png', 120, 140, 4);
        // Enemy Spritesheet
        game.load.spritesheet('enemy', '/assets/images/enemy1-spritesheet.png', 342, 140, 4);
    },

    


    create: function() {
        // The music loop
        if (music.name !== "game-music" && gameOptions.playMusic) {
            music.stop();
            music = game.add.audio('game-music');
            music.loop = true;
            music.play();
        }

        // This adds and starts the physics library
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Background
        game.add.sprite(0, 0, 'planet');
        
        // The Player
        player = game.add.sprite(400, 400, 'player');
        player.anchor.setTo(0.5, -0.2);
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.collideWorldBounds = true;

        // The enemy ship
        enemy = game.add.sprite(600, 270, 'enemy');
        enemy.anchor.setTo(1, 1.9);
        game.physics.enable(enemy, Phaser.Physics.ARCADE);

        // Lives
        lives = game.add.group();
        scoreText = game.add.text(10, 10, scoreString + score, {font: 'Jura', fill: '#fff'});

        for(var i = 0; i < 3; i++) {
            var ship = lives.create(game.world.width - 100 + (30 * i), 60, 'ship');
            ship.anchor.setTo(0.5, 0.5);
            ship.angle = 90;
            ship.alpha = 0.4;
        }

        // Adds the game controls
        cursors = game.input.keyboard.createCursorKeys();
        fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        // Player's shot group
        shots = game.add.group();
        shots.enableBody = true;
        shots.physicsBodyType = Phaser.Physics.ARCADE;
        shots.createMultiple(30, 'shots');
        shots.setAll('scale.x', 1.7);
        shots.setAll('scale.y', 1.7);
        shots.setAll('anchor.x', 0.5);
        shots.setAll('anchor.y', .1);
        shots.setAll('outOfBoundsKill', true);
        shots.setAll('checkWorldBounds', true);

        // The Enemy's shot group
        enemyShots = game.add.group();
        enemyShots.enableBody = true;
        enemyShots.physicsBodyType = Phaser.Physics.ARCADE;
        enemyShots.createMultiple(30, 'enemyShots');
        enemyShots.setAll('anchor.x', 0.5);
        enemyShots.setAll('anchor y', 1);
        enemyShots.setAll('outOfBoundsKill', true);
        enemyShots.setAll('checkWorldBounds', true);

        // Animation
        var jetstream = player.animations.add('jetstream');
        var playerShot = player.animations.add('playerShot');
        var enemyJetstream = enemy.animations.add('enemyJetstream');
        
        // Initiate Animation
        player.animations.play('jetstream', 16, true);
        shots.animations.play('shots', 16, true);
        enemy.animations.play('enemyJetstream', 16, true);

    },

    update: function() {
        // Player movement logic
        if (player.alive) {

            // Resets the player's velocity and checks for key movement
            
            player.body.velocity.setTo(0, 0);
            
            if (cursors.left.isDown)
            {
                player.body.velocity.x = -200;
                
            }

            else if (cursors.right.isDown) {
                player.body.velocity.x = 200;

            }

            // If the spacebar is pushed down, shoot a bolt
            if (fireButton.isDown) {
                fireShot();
            }

            // if (game.time.now > firingTimer)
            // {
            //     enemyShots();
            // }

            
        }    
    }
     
};

// Function to handle shots firing
 function fireShot() {
    if (game.time.now > shotTime)
    {
        // Grabs first bullet from pool
        shot = shots.getFirstExists(false);

        if(shot)
        {
            // Fires the shot
            shot.reset(player.x, player.y + 8);
            shot.body.velocity.y = -300;
            shotTime = game.time.now + 200;
        }
    }
 }

 // Bullet reset

 function resetShot (shot) {
     // Delete shot when it goes off the screen...
     shot.kill();
 }