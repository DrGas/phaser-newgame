var cursors02, crazybee, catcher02, score02, scoreTXT02, music, beesound, winText02, loseText02;
var timer02, timerEvent02, text02;
var countDown02 = 15;


MyCatcherGame.GameLvl2 = function(game) {
	this.catcher02;
	this.bg02;
	this.crazybee;
	
	
	this.music;
	this.beesound; 
};

MyCatcherGame.GameLvl2.prototype = {
	
	
	create:function() {
		this.buildWorld02();
		this.music = this.add.audio('background');
	   	this.music.play('', 0, 0.3, true);
	
	   	this.beesound = this.add.audio('beesound');
		
		//Create Catcher
		catcher02 = this.add.sprite(this.world.width / 2 , this.world.height /2, 'catcher02');
		catcher02.anchor.setTo(0.5, 0.5);
		this.physics.enable(catcher02, Phaser.Physics.ARCADE);
		catcher02.enableBody = true;

		
		//Create Bee
		crazybee=this.add.sprite(this.world.width * Math.random(), this.world.height * Math.random(),'crazybee');
		crazybee.anchor.setTo(0.5, 0.5);
		this.physics.enable(crazybee, Phaser.Physics.ARCADE);
		crazybee.enableBody=true;

		cursors02 = this.input.keyboard.createCursorKeys();
		
		//create SCORE
		score02 = 0;
		scoreTXT02 = this.add.text(10, 10, score02.toString(), { font: "30px 'eightbitwonder'", fill: "#FAB526"});
		
		
		//add sound & music
		music = this.add.audio('background');
		music.play();
		
		beesound= this.add.audio('crazybee');
		
		
		
		// Create a custom timer
        timer02 = this.time.create();
        
        // Create a delayed event 1m and 30s from now
        timerEvent02 = timer02.add(Phaser.Timer.SECOND * countDown02, this.endTimer, this);
        
        // Start the timer
        timer02.start();
      
        text02 = this.add.text(750, 30, this.formatTime02(Math.round((timerEvent02.delay - timer02.ms) / 1000)), 
        { font: "30px 'eightbitwonder'", fill: "#ff0044" });
      
        text02.anchor.set(0.5);
      
        
      
        //this.scoreLabelTween = game.add.tween(text.scale).to({ x: 1.2, y: 1.2}, 2000, Phaser.Easing.Linear.In);
		
		
		
	},
	
	buildWorld02:function() {
		this.add.image(0,0, 'background02');

	},
	
	
	update:function() {
		this.keyboard02();
		this.physics.arcade.overlap(crazybee, catcher02, beeHitHandler02, null, this);
	}, 
	
	keyboard02:function() {
		
		
		//runs the game loop
		//if left arrow is pressed
		if(cursors02.left.isDown && catcher02.x>10){
			catcher02.x -= 5;
			//scaling 100% pointing in the orginal directiosn
			catcher02.scale.x = 1;
			
		}
		
		if(cursors02.right.isDown && catcher02.x<this.world.width-10){
			catcher02.x += 5;
			catcher02.scale.x = -1;
			
		}
		
		if(cursors02.up.isDown && catcher02.y>10){
			catcher02.y -= 5;
			
		}
		
		if(cursors02.down.isDown && catcher02.y<this.world.height-10){
			catcher02.y += 5;
			}
		
		
		var tmp2 = this.formatTime02(Math.round((timerEvent02.delay - timer02.ms) / 1000));
 
        if (timer02.running && tmp2 >= 1) {
          text02.text = this.formatTime02(Math.round((timerEvent02.delay - timer02.ms) / 1000));
        }
		
	}, 
	
	render:function(){
		if (!timer02.running && score02 != 10) {
			loseText02 = this.add.text(this.world.centerX, this.world.centerY, "- YOU LOST BEE FIGHT -\nclick to play again", { font: "30px 'eightbitwonder'", fill: '#FAB526', align: "center"  });
    		loseText02.anchor.setTo(0.5, 0.5);
			this.input.onDown.addOnce(restart02, this);
			text02.kill();
			crazybee.destroy();
			catcher02.destroy();
        }
	},
	
	endTimer02:function() {
		timer02.stop();
		
	},
	
	formatTime02:function(s){
		// Convert seconds (s) to a nicely formatted and padded time string
        var minutes = "0" + Math.floor(s / 60);
        var seconds = "" + (s - minutes * 60);
        return seconds.substr(-2);  
	}
	
};

function beeHitHandler02(){
		console.log('bee cought');
		this.beesound.play();
		crazybee.x = this.world.width * Math.random();
		crazybee.y = this.world.height * Math.random();
		score02++;
		scoreTXT02.setText(score02.toString());
	
			if (score02 == 10) {
  				
			winText02 = this.add.text(this.world.centerX, this.world.centerY, "- CONGRATULATIONS, YOU CONQUERED CRAZY BEES!", { font: "30px 'eightbitwonder'", fill: '#FAB526', align: "center"  });
    		winText02.anchor.setTo(0.5, 0.5);

			text02.kill();
			crazybee.destroy();
			catcher02.destroy();
			
			} 
	}


function restart02() {
	'use strict';
	loseText02.destroy();
	this.state.start('GameLvl2');
	
}
