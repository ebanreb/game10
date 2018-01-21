var iconSelector = function(game, x, y, asset, source, frame) 
		                       {  
			                       	Phaser.Sprite.call(this, game, x, y, asset, frame);
                                    this.width = 8;
								    this.height = 8;
								    this.tint = 0x3399FF;
								    this.fixedToCamera = true;
								    this.source = source;
								    this.porcent = (this.source.live*100)/this.source.iniLive;

                                    this.inputEnabled = true;
                                    this.input.priorityID = 2;
								    this.events.onInputUp.add(this.clicked, this);
								    this.events.onInputOver.add(this.over, this);
								    this.events.onInputOut.add(this.out, this);

								    game.add.existing(this);
		                       }
		iconSelector.prototype = Object.create(Phaser.Sprite.prototype);
		iconSelector.prototype.constructor = iconSelector;

		iconSelector.prototype.update = function(){
                 this.width = 8;
	    	     this.height = 8;

	    	     this.porcent = (this.source.live*100)/this.source.iniLive;
				 //console.log(porcent);
				 if(this.source.selected){
                     switch (true) {
					 	case (this.porcent >= 70):
					        this.tint = 0x99ff00;
					        break;
					    case (this.porcent >= 60 && this.porcent < 70):
					        this.tint = 0xCCFF00;
					        break;
					    case (this.porcent >= 50 && this.porcent < 60):
					        this.tint = 0xFFFF00;
					        break;
					    case (this.porcent >= 40 && this.porcent < 50):
					        this.tint = 0xFFCC00;
					        break;
					    case (this.porcent >= 30 && this.porcent < 40):
					        this.tint = 0xFF9900;
					        break;
					    case (this.porcent >= 20 && this.porcent < 30):
					        this.tint = 0xFF6600;
					        break;
					    case (this.porcent > 10 && this.porcent < 20):
					        this.tint = 0xFF3300;
					        break;
					    case (this.porcent <= 10):
					        this.tint = 0xff0000;
					        break;
					 }
				 }else{
                     switch (true) {
                        case (this.porcent >= 70):
                            this.tint = 0x00BFFF;
                            break;
                        case (this.porcent >= 60 && this.porcent < 70):
                            this.tint = 0x1E90FF;
                            break;
                        case (this.porcent >= 50 && this.porcent < 60):
                            this.tint = 0x4169E1;
                            break;
                        case (this.porcent >= 40 && this.porcent < 50):
                            this.tint = 0x7B68EE;
                            break;
                        case (this.porcent >= 30 && this.porcent < 40):
                            this.tint = 0x8A2BE2;
                            break;
                        case (this.porcent >= 20 && this.porcent < 30):
                            this.tint = 0x9400D3;
                            break;
                        case (this.porcent > 10 && this.porcent < 20):
                            this.tint = 0x800080;
                            break;
                        case (this.porcent <= 10):
                            this.tint = 0x4B0082;
                            break;
                     }
				 	 /*this.tint = 0x3399FF;
                     this.alpha = this.porcent/100;*/
				 }
				 
	    };

	    iconSelector.prototype.clicked = function (enmy, p){
        	                             this.source.clicked();
								    };

		iconSelector.prototype.over = function (enmy, p){
			                             //this.alpha = 0.70;
			                             //this.source.over();
								    };

		iconSelector.prototype.out = function (enmy, p){
			                             //this.alpha = 1;
			                             //this.source.out();
								    };