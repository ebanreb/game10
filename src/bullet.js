//  Our core Bullet class
	    //  This is a simple Sprite object that we set a few properties on
	    //  It is fired by all of the Weapon classes

	    var Bullet = function (game, key, x, y, scale , anchorX , anchorY ,speed ,live, dmg, source, sourceGroup, angle, target, tBody, bodyOffset,booster) {

	        Phaser.Sprite.call(this, game, 0, 0, key);

	        game.physics.enable(this, Phaser.Physics.ARCADE);

            //this.cacheAsBitmap = true;
            //this.boosterTrails = game.add.group();

	        //this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
	        this.source = source;
            this.target = target;
	        this.dmg = dmg;
	        this.typeBody = tBody;
	        this.offsetRadius = bodyOffset;

            this.vX = x;
            this.vY = y;
            var rdShot =  game.math.angleBetween(
			        0, 0,
			        x, y
				  );	        

	        //this.anchor.set(0.5);
	        this.w = this.width;
	        this.anchor.x = anchorX;
	        this.anchor.y = anchorY;
	        this.scale.set(scale);
	        this.rotation = angle;
	        /*this.body.x = x;
	        this.body.y = y;*/
	        this.x = this.source.x + (Math.cos(this.source.rotation+rdShot) * Math.sqrt(Math.pow(x,2)+Math.pow(y,2)) );
		    this.y = this.source.y + (Math.sin(this.source.rotation+rdShot) * Math.sqrt(Math.pow(x,2)+Math.pow(y,2)) );

	        // Define constants that affect motion
		    this.SPEED = speed; // missile speed pixels/second
		    this.TURN_RATE = 1.5; // turn rate in degrees/frame

		    // Set a timer so we can perform an action after a delay.
		    this.cycle = live;
		    //this.timerAlive = game.time.now + this.cycle;
		    this.timerAlive = this.cycle;

	        //this.checkWorldBounds = true;
	        //this.outOfBoundsKill = true;
	        this.exists = false;

	        this.tracking = false;
	        this.SCALE = false;
	        this.BEAM = false;
	        this.explosion = false;

	        this.eX = 0;
	        this.eY = 0;

	        this.distancia = {};
	        this.distancia.contacto = false;

		    this.hasCollided = false;
		    this.zoombie = false;
            
            this.booster = null;
            this.subBooster = null;

	        if(booster){
	        	this.subBooster = new TheBooster(game,((this.width/2)*-1),0,'booster'); // boosters
	        	this.addChild(this.subBooster);
								    
	        	this.booster = game.add.emitter(this.x, this.y);
			    this.booster.makeParticles('boostParticle');
			    this.booster.bounce.setTo(0.5, 0.5);
			    this.booster.minParticleScale = 0.1;
    			this.booster.maxParticleScale = 0.1;
			    this.booster.setXSpeed(0, 0);
			    this.booster.setRotation(0,0);
			    this.booster.setYSpeed(0, 0);

			    this.booster.gravity = 0;
			    this.booster.setAlpha(100, 0, 200);
                this.booster.start(false, 200, 0);
			
                sourceGroup.add(this.booster);
	        }
            
	    };

	    Bullet.prototype = Object.create(Phaser.Sprite.prototype);
	    Bullet.prototype.constructor = Bullet;

        /*Bullet.prototype.particleBurst = function(player) {    
             this.booster.x = this.x;    
             this.booster.y = this.y;    
             this.booster.start(true, 2500, null, 10);   //explode, lifespan, .. , count    
             this.booster.forEach(this.setUp, this);
        }

        Bullet.prototype.setUp =function (particle){    
             if (!particle.exists) {
                     particle.alpha=1;
             }    
             game.add.tween(particle).to({ alpha: 0 }, 1000, Phaser.Easing.Cubic.Out, true);    
             game.add.tween(particle.scale).to({ x: 2,y:2 }, 1000, Phaser.Easing.Cubic.Out, true);
        }*/

        /*Bullet.prototype.emitteParticuleTo = function (x, y, xDest, yDest, nb, tm, particle){   
            var emitter = game.add.emitter(x, y, 100);  
            emitter.makeParticles(particle);    
            emitter.minParticleScale = 0.2; 
            emitter.maxParticleScale = 0.4; 
            emitter.start(true, tm, 20, nb);    
            setTimeout(function(){      
                    emitter.forEach(function(particle){     
                    particle.gravity = 0        
                    var tw = game.add.tween(particle).to({ x: xDest, y: yDest}, 500, Phaser.Easing.Linear.None, true, 0, false);        
                    tw.onComplete.addOnce(function(){ particle.kill(); }, this);        
                }, this, false);    
            }, 700);    
        }*/

	    Bullet.prototype.update = function () {

		    if(!this.inCamera){
                //console.log('1');
                //this.revive();
                //this.visible = true;
                this.renderable = false;
                if(this.booster){
			    	this.booster.renderable = false;
			    }
            }else{
            	//console.log('0');
            	//this.visible = false;
            	//this.kill();

            	if(this.tracking){
            		if(worldScale >= 0.25){
            			this.renderable = true;
            			if(this.booster){
					    	this.subBooster.update();
					    	this.booster.on = true;
			                this.booster.emitX = this.x;
			                this.booster.emitY = this.y;
					    }
            		}else{
            			if(this.booster){
		                    this.booster.renderable = false;
		                    this.booster.on = false;
            			}
		                this.renderable = false;
					}
            	}else{
            		this.renderable = true;
            	}
            }

		    if(this.target==null){
	    	  	 this.thisDestroy();
	    	  	 return false;
	    	}

	    	try{
	    		var coll = getCollide(this, this.target,true);
	    		if(coll && !this.zoombie){
	               this.hitObject(this,this.target);
	               if(!this.SCALE) return false;
		    	}else{
		    		this.distancia.contacto = false;
		    	}
	    	}catch(err){
                return false;
	    	}
            
            //this.timerAlive += game.time.physicsElapsed;
		    //if (game.time.now > this.timerAlive){
		    this.timerAlive -= game.time.physicsElapsedMS;
		    if (this.timerAlive <= 0){
		    	 if(this.booster)
		             this.booster.destroy();
                 this.thisDestroy();
                 return false;
	        }

	    	if(!this.SCALE){
              this.move();
	    	}else{
	    	  if (this.target!=null && this.source!=null){
	    	  	  //dataLinesRec(this);
                  try{
                     var sourceX = this.source.x;
                     var sourceY = this.source.y;
                     var sourceR = this.source.rotation;
                     var targetX = this.target.x;
                     var targetY = this.target.y;
                 
                     var thisIntersection = getIntersection(this.vX, this.vY, this.source);
			    	 if(thisIntersection){
		                 //this.destroy();
		                 this.thisDestroy();
		                 return false;
			    	 }
               
                  }catch(err) {
				     this.thisDestroy();
				     return false;  
				  }   
	              var targetAngle = game.math.angleBetween(
			        this.x, this.y,
			        targetX, targetY
				  );
				  /*this.anchor.x = 0;
	        	  this.anchor.y = 0.5;*/
	        	  var rdShot =  game.math.angleBetween(
			        0, 0,
			        this.vX, this.vY
				  );
				  this.x = sourceX + (Math.cos(sourceR+rdShot) * Math.sqrt(Math.pow(this.vX,2)+Math.pow(this.vY,2)) );
				  this.y = sourceY + (Math.sin(sourceR+rdShot) * Math.sqrt(Math.pow(this.vX,2)+Math.pow(this.vY,2)) );
		    	  this.rotation = targetAngle;
	              var dist = game.math.distance(this.x,this.y, targetX , targetY);
	              var maxScale = dist/this.w;

	              if(!this.distancia.contacto){
                     /*if(this.width < dist){
		              	  if( (this.width + (this.SPEED) ) > dist){
	                        this.width = dist;
		              	  }else{
		              	  	this.width += (this.SPEED);
		              	  }
                      
		             }else{
		              	this.width = dist;
		             }*/
		             this.distancia.valor = dist;
		             this.width += (this.SPEED * deltaTime);
	              }else{
	              	 //this.distancia.valor = dist;
                     //if(dist !== this.distancia.valor){
                     	/*if(dist > this.distancia.valor)
                             this.width += (dist-this.distancia.valor);
                        else if(dist < this.distancia.valor)
                        	 this.width -= (this.distancia.valor-dist);*/
                        	///this.width = dist;

                        ///this.distancia.valor = dist;
                     //}

                     //this.target.live -= this.dmg;
                     //console.log(coll);
                     this.width = game.math.distance(this.x,this.y, coll.x , coll.y);
	              }

			      this.alpha = game.rnd.realInRange(0.6, 1);
	    	  }
	    	  
	    	  
	    	}
            
	    };

	    Bullet.prototype.move = function (){

           	if (this.tracking && this.target!=null)
	        {
	        	try{
	        		var targetX = this.target.x;
	        		var targetY = this.target.y;
	        		// Calculate the angle from the missile to the mouse cursor game.input.x
				    // and game.input.y are the mouse position; substitute with whatever
				    // target coordinates you need.
				    var targetAngle = game.math.angleBetween(
				        this.x, this.y,
				        targetX, targetY
				    );
	        	}catch(err){
                    targetAngle = this.rotation;
	        	}
	            
			    // Gradually (this.TURN_RATE) aim the missile towards the target angle
			    if (this.rotation !== targetAngle && this.TURN_RATE>0) {
			        // Calculate difference between the current angle and targetAngle
			        var delta = targetAngle - this.rotation;

			        // Keep it in range from -180 to 180 to make the most efficient turns.
			        if (delta > Math.PI) delta -= Math.PI * 2;
			        if (delta < -Math.PI) delta += Math.PI * 2;

			        if (delta > 0) {
			            // Turn clockwise
			            this.angle += this.TURN_RATE * deltaTime;
			        } else {
			            // Turn counter-clockwise
			            this.angle -= this.TURN_RATE * deltaTime;
			        }

			        // Just set angle to target angle if they are close
			        if ( (Math.abs(delta) < game.math.degToRad(this.TURN_RATE)) || ( (Math.abs(this.rotation)+1)>180 || (Math.abs(this.rotation)-1)<0 ) ) {
			            this.rotation = targetAngle;
                        this.TURN_RATE = 0;
			        }
			    }else{
			    	this.rotation = targetAngle;
			    }

                //this.particleBurst(this);

	        }
             
            // Calculate velocity vector based on this.rotation and this.SPEED
		    this.body.velocity.x = Math.cos(this.rotation) * (this.SPEED);
		    this.body.velocity.y = Math.sin(this.rotation) * (this.SPEED);

	    };

	    Bullet.prototype.hitObject = function (body1, body2) {
	    	//  body1 is the bullet (as it's the body that owns the callback)
		    //  body2 is the body it impacted with, in this case our panda
		    //  As body2 is a Phaser.Physics.P2.Body object, you access its own (the sprite) via the sprite property:
		    //body2.sprite.alpha -= 0.1;
		   
		    this.hasCollided = true;
            //console.log(this.hasCollided);
            body2.live -= this.dmg;
            if(!this.SCALE){
            	
            	if(this.inCamera){
            		this.explosion = new Explosion(game, this.x, this.y, 'explosion',1,1);
            		layers.stageGroup.add(this.explosion);
            	}
            	/*if(this.booster)
                     this.booster.destroy(true);*/
                this.thisDestroy();
            }else{
            	var pointX = this.x + (this.width * Math.cos(this.rotation));
	            var pointY = this.y + (this.width * Math.sin(this.rotation));
	            this.distancia.contacto = true;
            	if(!this.explosion){
	                var cExplo;
	            	switch(this.BEAM){
	            		case 0:
	            		  cExplo = 'redBeamHit';
	            		break;
	            		case 1:
	            		  cExplo = 'greenBeamHit';
	            		break;
	            		case 2:
	            		  cExplo = 'blueBeamHit';
	            		break;
	            		default:
	            		  cExplo = 'explosion';
	            		break;
	            	}
	            	this.explosion = new Explosion(game, pointX, pointY, cExplo,1.5,1.5, true);
	            	layers.stageGroup.add(this.explosion);
	            	//this.distancia.valor = this.width;
            	}else{
                     this.explosion.x = pointX;
            	     this.explosion.y = pointY-8;
            	}
            	
            }

            //body2.sprite.tint = 0x0000ff;            
		    
	    };
        
        Bullet.prototype.thisDestroy = function (){
										if(this.SCALE){
                                             if(this.explosion) 
                                             	 this.explosion.destroy(true);
										}
                                        try{
                                            if(this.booster!=null){
	                                            this.booster.destroy();    
	                                            this.booster = null;
                                         	}      
        								}catch(err){

        								}
										this.zoombie = true;
										this.destroy(true);

								    };

        Bullet.prototype.removeBeamImpact = function (){
										 if(this.SCALE){
                                             if(this.explosion) 
                                             	 this.explosion.destroy(true);
										 }       
								    };
        Bullet.prototype.removeBoosterTrail = function (){
        								try{
                                            if(this.booster!=null){
	                                            this.booster.destroy();    
	                                            this.booster = null;
                                         }      
        								}catch(err){

        								}
                                    };

	    Bullet.prototype.noTarget = function (obj){
										 if(this.target == obj){
										 	this.zoombie = true;
										 	this.thisDestroy();
										 	//console.log(this.zoombie);
										 	/*if(this.SCALE)
										 		this.destroy();*/
                                         }
								    };

	    Bullet.prototype.endCollided = function (body1, body2) {
	       this.hasCollided = false;
	       //console.log(this.hasCollided);
	       //body1.sprite.tint = 0xffffff;            
	    };