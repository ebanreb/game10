var markPointToMove = function(game, x, y, asset, source, frame) 
		                       {  
			                       	Phaser.Sprite.call(this, game, x, y, asset, frame);
			                       	this.type = -1;
			                       	this.source = source;
								    this.tint = 0xCCFFFF;
								    this.anchor.setTo(0, 0.5);
								    this.visible = false;
								    //game.add.existing(this);
		                       }
		markPointToMove.prototype = Object.create(Phaser.Sprite.prototype);
		markPointToMove.prototype.constructor = markPointToMove;

		markPointToMove.prototype.update = function(){
			     try{
				     if(this.source.selected || this.source.inFocus){
				     	if(this.source.inAttack || (this.source.target && (this.source.tween1 && !this.source.tween1.isRunning) && !this.source.playerMoving) ){
				     		this.tint = 0xff0000;
				     		try{
	                            this.rotation = game.math.angleBetween(
						        this.x, this.y,
						        this.source.target.x, this.source.target.y);
						        this.width = game.math.distance(this.x,this.y, this.source.target.x , this.source.target.y);
				     		}catch(err){
	                    		return false;
				     		}
				     	}
				     	else{
				     		this.tint = 0xCCFFFF;
				     		this.rotation = game.math.angleBetween(
					        this.x, this.y,
					        this.source.playerPos.x, this.source.playerPos.y);
					        this.width = game.math.distance(this.x,this.y, this.source.playerPos.x , this.source.playerPos.y);
				     	}
	                    this.visible = true;
	                    this.x = this.source.x;
	                    this.y = this.source.y;
	                    
				     }else{
				     	this.visible = false;
				     }
	                 
	                 /*this.graphics.clear();
	                 if(this.visible){
	                   this.graphics.lineStyle(1, 0x99ff00, 1);
	                   this.graphics.moveTo(this.x, this.y);  
	    			   this.graphics.lineTo(this.source.x, this.source.y);	
	                 }*/
			     }catch(err){

			     }
			     
	    };