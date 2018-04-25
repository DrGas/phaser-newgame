MyCatcherGame.Preloader = function(game) {
	'use strict';
	this.preloader = null;
	this.titleText = null;
	this.ready = false;
};

MyCatcherGame.Preloader.prototype = {

	preload:function () {
		this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY+90, 'preloaderBar');

		this.preloadBar.anchor.setTo(0.5, 0.5);

		this.load.setPreloadSprite(this.preloadBar);

		this.titleText = this.add.image(this.world.centerX, this.world.centerY-120, 'titleimage');

		this.titleText.anchor.setTo(0.5, 0.5);
		
		this.load.image('titlescreen', 'images/bg-forest.png');
		
		this.load.bitmapFont('eightbitwonder', 'fonts/eightbitwonder.png', 'fonts/eightbitwonder.fnt');
		
		
		//LEVEL1
		//bg image
		this.load.image('background', 'images/bg-forest.png');
		
		//bear - catcher
		this.load.image('catcher', 'images/bear.png', 32, 32);
		
		//bee 
		this.load.image('bee', 'images/bee.png');
		
		this.load.audio('background','sounds/honey-bear-loop.mp3');
		this.load.audio('beesound','sounds/bee.mp3');
		
		//LEVEL2
		//bg image
		this.load.image('background02', 'images/bg-forest-02.png');
		
		//bear - catcher
		this.load.image('catcher02', 'images/bear.png', 32, 32);
		
		//bee 
		this.load.image('crazybee', 'images/crazy-bee.png');
	},



	create: function () {
		this.preloadBar.cropEnabled = false; //force show the whole thing

	},



	update: function () {
	   	this.ready = true;
		this.state.start('StartMenu');

	}

};



