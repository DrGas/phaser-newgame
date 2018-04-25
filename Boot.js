var MyCatcherGame = {};

MyCatcherGame.Boot = function(game) {};

MyCatcherGame.Boot.prototype = {
	preload: function() {
		this.load.image('preloaderBar', 'images/loader_bar.png');
		this.load.image('titleimage', 'images/TitleImage.png');
		
	}, 
	
	create: function() {
		this.input.maxPointers = 1;
		this.stage.disableVisibilityChange = false;
		
		//centering the game stage in the middle of browser
		//this.scale.pageAlignHorizontally = true;
		//this.scale.pageAlignVertically = true;
		//this.scale.setScreenSize(true);

		this.input.addPointer();
		this.stage.backgroundColor = '#171642';
        
        this.state.start('Preloader');
	}	
	
};