var HealthBar = function(game, x, y, asset, objLive, objW, objH, source, frame) 
		                       {  
			                       	Phaser.Sprite.call(this, game, x, y, asset, frame);
                                    
                                    this.source = source;
			                       	this.iniWidth = objLive;
			                       	this.w = objW;
								    this.h = objH;
								    this.porcent = (this.source.live*100)/this.iniWidth;

								    this.anchor.setTo(0, 0);
                                    this.fixedToCamera = true;
								    this.visible = false;
		                       }
		HealthBar.prototype = Object.create(Phaser.Sprite.prototype);
		HealthBar.prototype.constructor = HealthBar;
		HealthBar.prototype.update = function(){
			 try{
			 	 this.porcent = (this.source.live*100)/this.iniWidth;
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
				 this.height = this.h;
	             this.width = ((this.source.live*this.w)/this.iniWidth);
			 }catch(err){
                 this.visible = false;
			 }

			 try{
			 	 if(this.source.live>0){}
			 }catch(err){
                 this.destroy();
			 }
			 
		};