var Explosion = function(game, x, y, asset,sX, sY, NotEND, ft, frame) 
		                       {  
			                       	Phaser.Sprite.call(this, game, x, y, asset, frame);
       
								    //this.renderable = false;
                                    this.anchor.setTo(0.5, 0.5);
								    this.scale.x = sX;
								    this.scale.y = sY;
								    this.NotEND = false;
                                    if(NotEND)
                                    	 this.NotEND = NotEND;
								    this.smoothed = false;
								    this.pT = 30;
								    if(ft!=null) {this.pT = ft;}

								    this.boom = this.animations.add('boom');

                                    //this.anim.onLoop.add(this.animationLooped, this);
								    this.boom.onComplete.add(this.animationStopped, this);

								    this.animations.play('boom',this.pT, this.NotEND);

    								//this.animations.play('on', 18, true);

    								//game.physics.enable(this, Phaser.Physics.ARCADE);
		                       }
		Explosion.prototype = Object.create(Phaser.Sprite.prototype);
		Explosion.prototype.constructor = Explosion;

		/*Explosion.prototype.animationLooped = function(sprite, animation){
		    if (animation.loopCount == 1)
		    {
		    	console.log(animation.loopCount);
		        animation.loop = false;
		    }
		};*/
		Explosion.prototype.animationStopped = function(sprite, animation){
			if(!this.NotEND)
		         this.destroy();
		};