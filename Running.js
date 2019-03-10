var Running = function(running) {};

var player;
var enemy;
var ship;
var shots;
var shotTime = 0;
var cursors;
var fireButton;
var score = 0;
var scoreString = 'Score: ';
var scoreText;
var shield = 100.00;
var lives;
var enemyLives = 5;
var enemyShots;
var firingTimer = 0;
var stateText;
var randomInterval = 0;
var weapon;
let counter2 = 0;
var spawnTimer = 9;

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
        //game.load.spritesheet('player', '/assets/images/player-forcefield02.png', 127, 150, 4);
        // Player's Shot
        game.load.spritesheet('shots', '/assets/images/shot_spritesheet4.png', 120, 140, 4);
        // Enemy Spritesheet
        game.load.spritesheet('enemy', '/assets/images/enemy1-spritesheet.png', 342, 140, 4);
        game.load.spritesheet('enemyShots', '/assets/images/shot_spritesheet.png', 120, 140, 4);
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
        enemy = game.add.sprite(342, 140, 'enemy');
        enemy.anchor.setTo(0.5, 1.9);
        game.physics.enable(enemy, Phaser.Physics.ARCADE);
        enemy.body.collideWorldBounds = true;
        
        // Lives
        scoreText = game.add.text(10, 10, scoreString + score, {font: 'Bold 20pt Jura', fill: '#fff'});
        shield = game.add.text(615, 10, "Shields: " + shield + "%", {font: 'Bold 20pt Jura', fill: '#fff'});

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
        shots.setAll('anchor.y', 0.2);
        shots.setAll('outOfBoundsKill', true);
        shots.setAll('checkWorldBounds', true);

        // The Enemy's shot group
        enemyShots = game.add.group();
        enemyShots.enableBody = true;
        enemyShots.physicsBodyType = Phaser.Physics.ARCADE;
        enemyShots.createMultiple(1, 'enemyShots');
        enemyShots.setAll('scale.x', 2);
        enemyShots.setAll('scale.y', 2);
        enemyShots.setAll('anchor.x', 0.5);
        enemyShots.setAll('anchor.y', 0.7);
        enemyShots.setAll('outOfBoundsKill', true);
        enemyShots.setAll('checkWorldBounds', true);
        // weapon = game.add.weapon(30, 'enemyShots');
        // weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        // weapon.bulletSpeed = 600;
        // weapon.fireRate = 100;
        // weapon.trackSprite(enemy, 0, 0, true);


        // Animation
        var jetstream = player.animations.add('jetstream');
        var playerShot = player.animations.add('playerShot');
        var enemyJetstream = enemy.animations.add('enemyJetstream');
        var enemyShot = enemy.animations.add('enemyShot');
        
        // Initiate Animation
        player.animations.play('jetstream', 16, true);
        //shots.animations.play('shots', 16, true);
        enemy.animations.play('enemyJetstream', 12, true);
        enemy.animations.play('enemyShot', 16, true);
    },

    update: function() {
        
        // Player movement logic
        if (player.alive) {
            
            setTimeout(() => {
                enemyShoots();    
            }, 1800);
            
            
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

            // Spawn function
            // do {
            //     createEnemy();
                
            // } while (i < spawnTimer);
            

            //  Run collisions
            //game.physics.arcade.overlap(shots, enemy, collisionHandler, null, this);
            // game.physics.arcade.overlap(enemyShoots, player, enemyHitsPlayer, null, this);

            // Enemy movement logic
             enemy.body.velocity.setTo(0, 0);
             randomInterval = getRandom(4000, 5000);
            
            // setTimeout(() => {
            //     if (enemy.body.x == player.body.x) {
            //         enemy.body.velocity.x = 180;
            //     }    
            // }, randomInterval);

            // if ((player.body.center) == (enemy.body.halfWidth.center)) {
            //     enemy.body.velocity.x = 200;
            // } else if ((player.body.width.x) == (enemy.body.right.x)) {
            //     enemy.body.velocity.x = -240;
            // }

            

            if (game.physics.arcade.distanceBetween(enemy, player) < 250) {
                // If the player is left of the enemy & the enemy is still or moving right
                if (player.x < enemy.x && enemy.body.velocity.x >= 0) {
                    // Moves the enemy left
                    enemy.body.velocity.x = 250;
                }
                // If the player is right of the enemy & enemy is still to moving left
                else if (player.x > enemy.x && enemy.body.velocity.x <=0) {
                    // Move enemy right
                    enemy.body.velocity.x = -250;
                } 
            }

            if (player.body.velocity.x == -200) {
                enemy.body.velocity.x = -250;
                
            }

            else if (player.body.velocity.x == 200){
                enemy.body.velocity.x = 250;
            }
            
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
            shot.body.velocity.y = -200;
            shotTime = game.time.now + 500;
        }
    }
 }

// Enemy Shooting function
 function enemyShoots() {
    // Grab the first bullet we can from the pool
        enemyShot = enemyShots.getFirstExists(false);
        if(enemyShot) {
            // counter++;
            // console.log(enemyShot);
            enemyShot.position.x = 200;
            enemyShot.position.y = 200;
            enemyShot.reset(enemy.body.center.x, enemy.y -8);
            enemyShot.body.velocity.y = 200;
            firingTimer = game.time.now + 500;

        }
    }



 // Bullet reset

 function resetShot (shot) {
     // Delete shot when it goes off the screen...
     shot.kill();
 }

 function collisionHandler (shots, enemy) {

    //  When a bullet hits an alien we kill them both
    shots.kill();
    enemy.kill();

    //  Increase the score
    score += 20;
    scoreText.text = scoreString + score;

    // //  Create an explosion 
    // var explosion = explosions.getFirstExists(false);
    // explosion.reset(alien.body.x, alien.body.y);
    // explosion.play('kaboom', 30, false, true);

    if (score == 1000)
    {
        score += 9000;
        scoreText.text = scoreString + score;

        enemyShots.callAll('kill',this);
        stateText.text = " You Won, \n Click to see scoreboard";
        stateText.visible = true;

        // Click to restart handler
        game.input.onTap.addOnce(restart,this);
    }

}

 // Random numbers for enemy to change paths
 function getRandom(min, max) {
     return Math.random() * (max - min) + min;
} 