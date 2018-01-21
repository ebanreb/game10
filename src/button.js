var theButton = function(game, x, y, key, scaleX, scaleY, callback, callbackContext, overFrame, outFrame, downFrame, upFrame, group) {  
	    	Phaser.Button.call(this, game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame, group);  
	    	this.fixedToCamera = true;
	    	this.scale.x = scaleX;
	    	this.scale.y = scaleY;
	    	this.iniW = this.width;
	    	this.iniH = this.height;
	    	this.reScale = false;
            this.inputEnabled = true;
            this.input.priorityID = 2;
	    	this.input.useHandCursor = true;
            //this.onInputUp.add(this.up, this);
	    	game.add.existing(this);
	    };

	    theButton.prototype = Object.create(Phaser.Button.prototype);
	    theButton.prototype.constructor = theButton;

	    theButton.prototype.update = function(){
	    	if(!this.reScale){
                 this.width = this.iniW;
	    	     this.height = this.iniH; 
	    	}
	    };

        theButton.prototype.over = function (enmy, p){
                                         MENU_OPTION = true;
                                    };

        theButton.prototype.out = function (enmy, p){
                                         //MENU_OPTION = false;
                                    };

        /*theButton.prototype.up = function(){
            this.inputEnabled = false;
            this.alpha = 0.5;
            game.time.events.add(Phaser.Timer.SECOND * 4, function(){this.inputEnabled = true; this.input.useHandCursor = true;}, this);
        };*/