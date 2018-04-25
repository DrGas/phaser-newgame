var cursors, bee, catcher, score, scoreTXT, music, beesound, winText, loseText;
var timer, timerEvent, text;
var countDown = 30;


MyCatcherGame.Game = function(game) {
	this.catcher;
	this.bee;
	this.bg;
	
	
	this.music;
	this.beesound; 
};

MyCatcherGame.Game.prototype = {
	
	
	create:function() {
		this.buildWorld();
		this.music = this.add.audio('background');
	   	this.music.play('', 0, 0.3, true);
	
	   	this.beesound = this.add.audio('beesound');
		
		//Create Catcher
		catcher = this.add.sprite(this.world.width / 2 , this.world.height /2, 'catcher');
		catcher.anchor.setTo(0.5, 0.5);
		this.physics.enable(catcher, Phaser.Physics.ARCADE);
		catcher.enableBody = true;

		
		//Create Bee
		bee=this.add.sprite(this.world.width * Math.random(), this.world.height * Math.random(),'bee');
		bee.anchor.setTo(0.5, 0.5);
		this.physics.enable(bee, Phaser.Physics.ARCADE);
		bee.enableBody=true;

		cursors = this.input.keyboard.createCursorKeys();
		
		//create SCORE
		score = 0;
		scoreTXT = this.add.text(10, 10, score.toString(), { font: "30px 'eightbitwonder'", fill: "#FAB526"});
		
		
		//add sound & music
		music = this.add.audio('background');
		music.play();
		
		beesound= this.add.audio('bee');
		
		
		
		// Create a custom timer
        timer = this.time.create();
        
        // Create a delayed event 1m and 30s from now
        timerEvent = timer.add(Phaser.Timer.SECOND * countDown, this.endTimer, this);
        
        // Start the timer
        timer.start();
      
        text = this.add.text(750, 30, this.formatTime(Math.round((timerEvent.delay - timer.ms) / 1000)), 
        { font: "30px 'eightbitwonder'", fill: "#ff0044" });
      
        text.anchor.set(0.5);
      
        
      
        //this.scoreLabelTween = game.add.tween(text.scale).to({ x: 1.2, y: 1.2}, 2000, Phaser.Easing.Linear.In);
		
		
		
	},
	
	buildWorld:function() {
		this.add.image(0,0, 'background');

	},
	
	
	update:function() {
		this.keyboard();
		this.physics.arcade.overlap(bee, catcher, beeHitHandler, null, this);
	}, 
	
	keyboard:function() {
		
		
		//runs the game loop
		//if left arrow is pressed
		if(cursors.left.isDown && catcher.x>10){
			catcher.x -= 5;
			//scaling 100% pointing in the orginal directiosn
			catcher.scale.x = 1;
			
		}
		
		if(cursors.right.isDown && catcher.x<this.world.width-10){
			catcher.x += 5;
			catcher.scale.x = -1;
			
		}
		
		if(cursors.up.isDown && catcher.y>10){
			catcher.y -= 5;
			
		}
		
		if(cursors.down.isDown && catcher.y<this.world.height-10){
			catcher.y += 5;
			}
		
		
		var tmp = this.formatTime(Math.round((timerEvent.delay - timer.ms) / 1000));
 
        if (timer.running && tmp >= 1) {
          text.text = this.formatTime(Math.round((timerEvent.delay - timer.ms) / 1000));
        }
		
	}, 
	
	render:function(){
		if (!timer.running && score != 3) {
			loseText = this.add.text(this.world.centerX, this.world.centerY, "- YOU LOST BEE FIGHT -\nclick to play again", { font: "30px 'eightbitwonder'", fill: '#FAB526', align: "center"  });
    		loseText.anchor.setTo(0.5, 0.5);
			this.input.onDown.addOnce(restart, this);
			text.kill();
			bee.destroy();
			catcher.destroy();
        }
	},
	
	endTimer:function() {
		timer.stop();
		
	},
	
	formatTime:function(s){
		// Convert seconds (s) to a nicely formatted and padded time string
        var minutes = "0" + Math.floor(s / 60);
        var seconds = "" + (s - minutes * 60);
        return seconds.substr(-2);  
	}
	
};

function beeHitHandler(){
		console.log('bee cought');
		this.beesound.play();
		bee.x = this.world.width * Math.random();
		bee.y = this.world.height * Math.random();
		score++;
		scoreTXT.setText(score.toString());
	
			if (score == 3) {
  				
			winText = this.add.text(this.world.centerX, this.world.centerY, "- YOU WON HONEY! -\nclick to get to second level!", { font: "30px 'eightbitwonder'", fill: '#FAB526', align: "center"  });
			this.input.onDown.addOnce(nextLevel, this);
    		winText.anchor.setTo(0.5, 0.5);

			text.kill();
			bee.destroy();
			catcher.destroy();
			
			} 
	}


function restart() {
	'use strict';
	loseText.destroy();
	this.state.start('Game');
	
}

function nextLevel(){
	'use strict';
	winText.destroy();
	this.music.stop();
	this.state.start('GameLvl2');
	
}