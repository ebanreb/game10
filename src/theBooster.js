var TheBooster = function(game, x, y, asset, frame) 
		                       {  
			                       	Phaser.Sprite.call(this, game, x, y, asset, frame);

								    this.anchor.setTo(1, 0.5);
								    /*player.scale.x = 0.4;
								    player.scale.y = 0.4;*/

								    //this.animations.add('on');

    								//this.animations.play('on', 18, true);
		                       }
		TheBooster.prototype = Object.create(Phaser.Sprite.prototype);
		TheBooster.prototype.constructor = TheBooster;

		TheBooster.prototype.update = function(){
			 if(!this.inCamera){
                this.renderable = false;
             }else{
            	this.renderable = true;
             }
		     this.alpha = game.rnd.realInRange(0.6, 1);
		     //this.scale.x = game.rnd.realInRange(1.1, 1.2);
		     //this.scale.y = game.rnd.realInRange(1.1, 1.2);
		};