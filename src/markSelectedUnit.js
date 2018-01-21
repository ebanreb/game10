var markSelectedUnit = function(game, x, y, asset, source, frame) 
		                       {  
			                       	Phaser.Sprite.call(this, game, x, y, asset, frame);
			                       	this.type = -1;
			                       	this.source = source;
                                    this.width = this.source.width+10;
								    this.height = this.source.width+10;
								    this.porcent = (this.source.live*100)/this.source.iniLive;
								    this.tint = 0x99ff00;
								    this.anchor.setTo(0.5, 0.5);
								    this.alpha = 0.30;
								    this.visible = false;
								    //game.add.existing(this);
		                       }
		markSelectedUnit.prototype = Object.create(Phaser.Sprite.prototype);
		markSelectedUnit.prototype.constructor = markSelectedUnit;

		markSelectedUnit.prototype.update = function(){
			     try{
			     	 this.x = this.source.x;
	                 this.y = this.source.y;
	                 this.porcent = (this.source.live*100)/this.source.iniLive;
					 //console.log(porcent);
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
	                 if(this.source.selected || this.source.inFocus)
	                 	this.visible = true;
	                 else
	                 	this.visible = false;
			     }catch(err){

			     }
			     
	    };