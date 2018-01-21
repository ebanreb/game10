var Enemy = function(game, x, y, type, frame) 
		                       {  
                                    this.ship = type;

			                       	Phaser.Sprite.call(this, game, x, y, this.ship.key, frame);

			                       	game.physics.enable(this, Phaser.Physics.ARCADE);

			                       	this.type = this.ship.type;
			                       	this.typeShip = this.ship.typeShip;
			                       	this.typeBody = this.ship.typeBody;
			                       	this.offsetRadius = this.ship.offsetRadius
			                       	this.SPEED = this.ship.speed;
			                       	this.target = null;
			                       	this.TURN_RATE = this.ship.turnRate;
			                       	this.live = this.ship.live;
			                       	this.weapons = [];
			                       	this.indexTarget = 0;
			                       	this.angulo = 0;
			                       	this.lastX = x;
			                       	this.lastY = y;
			                       	this.playerPos = {x:x,y:y};
			                       	this.playerMoving = false;
			                       	this.inAttack = false;
                                    this.tween1 = null;
                                    this.tween2 = null;
                                    this.AVOID_DISTANCE = 40; // pixels
                                    this.grupo = layers.behindTheShipLayer;

                                    this.swM = false;

								    this.anchor.setTo(0.5, 0.5);
								    
								    this.rotation = 0;

                                    /*this.healtBar = new HealthBar(game,0,this.height/2,'healtBar',this.live,this.width,10, this);
								    this.addChild(this.healtBar);*/
								    this.healtBar = new HealthBar(game,10,15,'healtBar',this.live,(width/2),10, this);
								    //this.healtBar.tint = 0xff0000;
								    //game.add.existing(this.healtBar);
								    layers.interfaceLayer.add(this.healtBar);

								    if(this.type === 2){
		                                        //  player's boosters
		                                        this.booster = new TheBooster(game,((this.width/2)*-1)+50,0,'booster');
		                                        //this.booster.angle = -90;
		                                        this.addChild(this.booster);
		                                     }

								    if(this.ship.simpleBullet.exist)
								         this.weapons.push(new Weapon.SimpleBullet(game, this,this.ship.pSimple,this.ship.simpleBullet));
								    if(this.ship.rockets.exist)
								         this.weapons.push(new Weapon.Rockets(game, this, this.ship.pRockets, this.ship.rockets));
								    if(this.ship.beam.exist)
								         this.weapons.push(new Weapon.Beams(game, this,this.ship.pBeams, this.ship.beam, 2));
								    if(this.ship.subBeam.exist)
								         this.weapons.push(new Weapon.Beams(game, this,this.ship.pSubBeams, this.ship.subBeam, 0));

								    for (var i = 0; i < this.weapons.length; i++)
						            {
						                layers.behindTheShipLayer.add(this.weapons[i]);
						            }

						            this.enemiMask = game.add.sprite(0, 0, this.ship.key);
								    this.enemiMask.anchor = {x: 0.5, y: 0.5};
								    this.addChild(this.enemiMask);
								    
								    this.inputEnabled = true;
                                    this.input.priorityID = 1;
								    this.input.pixelPerfectClick = true;
								    this.events.onInputDown.add(this.clicked, this);
								    this.events.onInputOver.add(this.over, this);
								    this.events.onInputOut.add(this.out, this);

		                       }
		Enemy.prototype = Object.create(Phaser.Sprite.prototype);
		Enemy.prototype.constructor = Enemy;

		Enemy.prototype.update = function (){
                                         if(this.type === 3){
						                     this.rotation += this.TURN_RATE;
						                     //if(enemyUnits.total<25)
						                     if(enemyUnistLow.total<50){
						                        this.addEnemyShip(3);
						                     }else if(enemyUnitsMediun.total<30){
						                     	this.addEnemyShip(2);
						                     }else if(enemyUnitsHeight.total<20){
						                     	this.addEnemyShip(1);
						                     }
                                         }
						                 else{

						                 	 this.move();
						                 }

						                 //console.log(Phaser.Physics.P2JS.getBody(this));
                                         /*if (this.input.pointerOver())
									     {
									        this.healtBar.visible = true;
									     }
									     else
									     {
									        this.healtBar.visible = false;
									     }*/

									     //this.healtBar.width = ((this.live*(width/2))/this.healtBar.iniWidth)/worldScale;

						                 if(this.live <= 0){
						                 	 /*try{
						                 	 	 player.target = null;
							                 	 for (var i = 0; i < player.weapons.length; i++)
									             {
									                player.weapons[i].target = null;
									             }
						                 	 }catch(err){

						                 	 }*/
                                             
                                             enemyUnits.remove(this);

                                             try{
 												layers.playerLayer.callAll('noTarget',null,this);
                                             }catch(err){

                                             }
						                 	 /*for (var i = 0; i < this.weapons.length; i++)
										     {
												 this.weapons[i].callAll('beamDestroy',null);
										     }*/
										     for (var i = 0; i < this.weapons.length; i++)
								             {
								                this.weapons[i].callAll('removeBeamImpact',null);
                                                this.weapons[i].callAll('removeBoosterTrail',null);
								                this.weapons[i].removeAll(true);
								                this.weapons[i].pendingDestroy = true;
								             }

								            switch(this.typeShip){
												case 1:
												enemyUnitsHeight.remove(this);
												break;
												case 2:
												enemyUnitsMediun.remove(this);
												break;
												case 3:
												enemyUnistLow.remove(this);
												break;
											}

								             if(this.inCamera){
						                 	 	var explosion = new Explosion(game, this.x, this.y, 'explosionShip',2,2,false,24);
            								 	layers.behindTheShipLayer.add(explosion);
            								 	game.camera.shake(0.0005, 400);
            								 }

            								 this.target = null;

            								 if(this.healtBar.visible)
            								 	 ATTACK = false;
						                 	 this.healtBar.pendingDestroy = true;
						                 	 if(this.type === 3){
                                             	enemyBase = null;
                                             }
                                             this.destroy(true);
                                             //this.pendingDestroy = true;
                                             return false;
						                 }

						                if(!this.inCamera){
							                this.renderable = false;
							            }else{
							            	this.renderable = true;
							            }
  
								    	try{
                                          
                                          //console.log('TOTAL: ' + layers.playerLayer.total);
                                          //console.log('TARGET: ' + this.target);
                                          if(this.target == null){

                                             if(layers.playerLayer.total > 0){

                                                 var lastDist = 0;
                                                 var tar = null;
                                                 for(var j = 0; j < playerUnits.total; j++){
                                                    var newTarget = playerUnits.list[j];
                                                    if(newTarget.live>0){ 
                                                         var dist = game.math.distance(this.x,this.y, newTarget.x , newTarget.y);
                                                         //console.log('j: '+j+' DIST: '+dist);
                                                         if( lastDist == 0 && (dist>0 && dist<=4000) ){
                                                             tar=newTarget;
                                                             lastDist = dist;
                                                         }else if( (dist>0 && dist<=4000) && (dist < lastDist) ){
                                                             tar=newTarget;
                                                             lastDist = dist;
                                                         }
                                                    }

                                                 }//FIN FOR

                                                 //console.log(tar);

                                                 if(tar != null){
                                                     this.target=tar;
                                                     this.inAttack = true;
                                                     this.playerPos.x = this.target.x;
                                                     this.playerPos.y = this.target.y;
                                                     this.playerMoving = true;
                                                     this.angulo = game.math.angleBetween(this.x,this.y, this.playerPos.x , this.playerPos.y);
                                                     for (var i = 0; i < this.weapons.length; i++)
                                                     {
                                                         this.weapons[i].target = this.target;
                                                     }

                                                 }

                                             }
                                             
                                             
                                                                                      
                                          }else{
                                          	 var dist = game.math.distance(this.x,this.y, this.target.x , this.target.y);
	                                         if(dist > 4000)
	                                         	 this.resetTarget();
	                                         else{
	                                         	 for (var i = 0; i < this.weapons.length; i++)
										            {
										            	//this.weapons[i].visible = true;
										                this.weapons[i].fire(this);
										            }
	                                         }
                                          }

								    	}catch(err){
                                             this.resetTarget();
                                             //console.log('COSA');
									    }
								    };
        
        Enemy.prototype.move = function (){

                                         //console.log('Tween1: ' + this.tween1 + ' Tween2: ' + this.tween2);

                                         if(this.inAttack){
                                            var distToTarget = 0;
                                            distToTarget = game.math.distance(this.x,this.y, this.target.x , this.target.y); 
                                         }

                                         if( (this.playerMoving || (this.inAttack && distToTarget<2000)) && (this.tween1 && this.tween1.isRunning) && !this.swM){       
                                                     this.tween1.stop();
                                                     game.tweens.removeFrom(this);
                                                     this.tween1 = null;
                                                     this.tween2 = null;
                                                     this.playerPos.x = this.x;
                                                     this.playerPos.y = this.y;
                                         }

                                         if( !this.playerMoving && (this.inAttack && distToTarget>2000) && (!this.tween1 || (this.tween1 && !this.tween1.isRunning)) 
                                         	&& (!this.tween2 || (this.tween2 && !this.tween2.isRunning)) ){
                                              		 this.playerPos.x = this.target.x;
                                                     this.playerPos.y = this.target.y;
                                                     this.playerMoving = true;
                                                     this.angulo = game.math.angleBetween(this.x,this.y, this.playerPos.x , this.playerPos.y);
                                         }
                                        
                                         ///Flocking
                                         if( (!this.tween1 || (this.tween1 && !this.tween1.isRunning)) 
                                             && (!this.tween2 || (this.tween2 && !this.tween2.isRunning)) && !this.playerMoving ){
                                                var avoidAngle = 0;
                                                //this.parent.forEachAlive(function(m) {

                                                 for(var j = 0; j < enemyUnits.total; j++){
                                                    //console.log('A');
                                                    var m = enemyUnits.list[j];


                                                    // Don't calculate anything if the other missile is me
                                                    if (this == m) continue;
                                                    //console.log('B');
                                                    // Already found an avoidAngle so skip the rest
                                                    if (avoidAngle !== 0) break;

                                                    if( (m.tween1 && m.tween1.isRunning) ) continue;
                                                    if( (m.tween2 && m.tween2.isRunning) ) continue;
                                                    
                                                    
                                                    // Calculate the distance between me and the other missile
                                                    var distance = game.math.distance(this.x, this.y, m.x, m.y);

                                                    // If the missile is too close...
                                                    if (distance < m.width/2) {
                                                    //if (this.x == m.x && this.y == m.y) {
                                                        this.AVOID_DISTANCE = m.width;
                                                        // Chose an avoidance angle of 90 or -90 (in radians)
                                                        avoidAngle = Math.PI/game.rnd.integerInRange(2, 4); // zig
                                                        //avoidAngle = Math.PI/2; // zig
                                                        //if (this.z < m.z) avoidAngle *= -1; // zag
                                                        if (game.rnd.integerInRange(0, 1)) avoidAngle *= -1; // zag

                                                        break;
                                                    }
                                                    
                                                    //console.log('C');
                                                     
                                                 }
                                                //}, this);

                                                for(var j = 0; j < playerUnits.total; j++){
                                                    //console.log('A');
                                                    var m = playerUnits.list[j];

                                                    //console.log('B');
                                                    // Already found an avoidAngle so skip the rest
                                                    if (avoidAngle !== 0) break;

                                                    if( (m.tween1 && m.tween1.isRunning) ) continue;
                                                    if( (m.tween2 && m.tween2.isRunning) ) continue;
                                                    
                                                    
                                                    // Calculate the distance between me and the other missile
                                                    //var distance = game.math.distance(this.x, this.y, m.x, m.y);

                                                    // If the missile is too close...
                                                    //if (distance < m.width/2) {
                                                    //if (this.x == m.x && this.y == m.y) {
                                                    if(testOverlap(this, m, 0)){
                                                        this.AVOID_DISTANCE = m.width;
                                                        // Chose an avoidance angle of 90 or -90 (in radians)
                                                        avoidAngle = Math.PI/game.rnd.integerInRange(2, 4); // zig
                                                        //avoidAngle = Math.PI/2; // zig
                                                        //if (this.z < m.z) avoidAngle *= -1; // zag
                                                        if (game.rnd.integerInRange(0, 1)) avoidAngle *= -1; // zag

                                                        break;
                                                    }
                                                    
                                                    //console.log('C');
                                                     
                                                 }
                                                
                                                if (avoidAngle !== 0){
                                                    //console.log(avoidAngle);
                                                    // Add the avoidance angle to steer clear of other missiles
                                                    this.angulo += avoidAngle;
                                                    this.playerPos.x = this.x + (this.AVOID_DISTANCE * Math.cos(this.angulo));
                                                    this.playerPos.y = this.y + (this.AVOID_DISTANCE * Math.sin(this.angulo));
                                                    this.playerMoving = true;
                                                    this.swM = true;
                                                }
                                                
                                         }

                                         if( (this.x + (this.SPEED) * Math.cos(this.angulo))<=0 ||
                                             (this.x + (this.SPEED) * Math.cos(this.angulo))>=mapSizeX ||
                                             (this.y + (this.SPEED) * Math.sin(this.angulo))<=0 ||
                                             (this.y + (this.SPEED) * Math.sin(this.angulo))>=mapSizeY
                                          ){
                                            //this.playerMoving = false;
                                            if (this.tween1 && this.tween1.isRunning){        
                                             this.tween1.stop();  
                                            }

                                            if (this.tween2 && this.tween2.isRunning){        
                                                 this.tween2.stop(); 
                                            }

                                            game.tweens.removeFrom(this);
                                            this.tween1 = null;
                                            this.tween2 = null;

                                            this.playerPos.x = this.x;
                                            this.playerPos.y = this.y;
                                            this.body.velocity.x = 0;
                                            this.body.velocity.y = 0;
                                         }

										 if(this.playerMoving){
                                            this.playerMoving = false;
                                                
                                            if (this.tween1 && this.tween1.isRunning){        
                                                 this.tween1.stop();    
                                            }

                                            if (this.tween2 && this.tween2.isRunning){        
                                                 this.tween2.stop();    
                                            }

                                            this.tween1 = null;
                                            this.tween2 = null;

                                            game.tweens.removeFrom(this);

                                             /**/
                                            var newRotation = 0;
                                            /*var turnNegative = -((Math.PI * 2) - (this.angulo));
                                            var turnPositive = ((Math.PI * 2) - (this.angulo));
                                            
                                            var diffDistance = Math.abs(this.rotation - turnNegative)

                                            // math.pi is the center
                                            if (diffDistance >= Math.PI) {
                                                 newRotation = (Math.PI * 2) - turnPositive;
                                                 //console.log('positive')
                                            } else {
                                                 newRotation = turnNegative - this.rotation;
                                                 //console.log('negative')
                                            }*/
                                            
                                            var angleTo = Phaser.Math.radToDeg(this.angulo);

                                            var shortestAngle = game.math.getShortestAngle(angleTo, this.angle);

                                            var newAngle = this.angle - shortestAngle;

                                            //var time = Math.abs(shortestAngle) * 10;

                                            /**/

                                            //var duration2 = (Math.abs(this.angulo-this.rotation) / this.TURN_RATE)*1000;
                                            
                                            //var duration2 = (Math.abs(newRotation-this.rotation) / this.TURN_RATE)*1000;

                                            var duration2 = (Math.abs(shortestAngle) / this.TURN_RATE)*10;

                                            //this.tween2 = game.add.tween(this).to({ rotation: newRotation}, duration2, Phaser.Easing.Linear.None, true);
                                            this.tween2 = game.add.tween(this).to({ angle: newAngle }, duration2, 'Linear', true);

                                            this.tween2.onComplete.add(function() {

                                                        if(this.ship.tracking && (this.x!=this.playerPos.x && this.y!=this.playerPos.y)) 
                                                             this.angulo = game.math.angleBetween(this.x,this.y, this.playerPos.x , this.playerPos.y);
                                                        this.rotation =this.angulo;

                                                        game.tweens.removeFrom(this);
                                                        this.tween2 = null;
                                                    
                                                        var ease = "Sine.easeInOut";
                                           
                                                        var duration = (game.physics.arcade.distanceToXY(this, this.playerPos.x, this.playerPos.y) / this.SPEED) * 1000;
                                                        if(this.ship.tracking){
                                                             var ease = "Sine.easeOut";
                                                        }
                                                        this.tween1 = game.add.tween(this).to({ x: this.playerPos.x, y: this.playerPos.y }, duration, ease, true);
                                                        //this.tween.frameBased = true;
                                                        this.tween1.onComplete.add(function() { 
                                                                this.booster.visible=false;
                                                                this.x = this.playerPos.x;
                                                                this.y = this.playerPos.y;
                                                                this.lastX = this.x;
                                                                this.lastY = this.y;
                                                                this.body.velocity.x=0;
                                                                this.body.velocity.y=0;    
                                                                game.tweens.removeFrom(this);
                                                                this.tween1 = null;
                                                                this.swM = false;
                                                        }, this);
                                            }, this);
                                            
										 }else{
                                                this.booster.visible=false;
                                         }//FIN ELSE

                                        if (this.tween1 && this.tween1.isRunning){        
                                                 this.booster.visible=true;
                                                 this.booster.update();   
                                        }

                                        if(this.tween2 && this.tween2.isRunning){
           
                                            if( this.ship.tracking && (this.x!=this.playerPos.x && this.y!=this.playerPos.y) ){
                                              this.booster.visible=true;
                                              this.booster.update();   
                                              this.body.velocity.x = Math.cos(this.rotation) * (this.SPEED);
                                              this.body.velocity.y = Math.sin(this.rotation) * (this.SPEED);
                                            }else{
                                                this.body.velocity.x = 0;
                                                this.body.velocity.y = 0;
                                            }
                                   
                                        }else{
                                            this.body.velocity.x = 0;
                                            this.body.velocity.y = 0;
                                        }
							             

		};

		Enemy.prototype.addEnemyShip = function (typeShip){
				var newShip;
				switch(typeShip){
					case 1:
					newShip = new Enemy(game, this.x + this.width, this.y, new shipCruiserBad, 0);  
					enemyUnitsHeight.add(newShip);
					break;
					case 2:
					newShip = new Enemy(game, this.x + this.width, this.y, new shipShuttlenowepsBad, 0);  
					enemyUnitsMediun.add(newShip);
					break;
					case 3:
					newShip = new Enemy(game, this.x + this.width, this.y, new shipF5S3Bad, 0);  
					enemyUnistLow.add(newShip);
					break;
				}
                
                newShip.rotation=0;
                enemyUnits.add(newShip);
                layers.behindTheShipLayer.add(newShip);         
	    };

		Enemy.prototype.clicked = function (enmy, p){
			                             if(p.button === 2){
			                             	actionUnits(p)
			                             }
								    };

		Enemy.prototype.over = function (enmy, p){
			                             ATTACK = this;
			                             this.healtBar.visible = true;
								    };

		Enemy.prototype.out = function (enmy, p){
										 ATTACK = false;
			                             this.healtBar.visible = false;
								    };

		Enemy.prototype.resetTarget = function (){
										 this.target = null;
										 this.inAttack = false;
                                         this.indexTarget = 0;
                                        
							    		 for (var i = 0; i < this.weapons.length; i++)
							             {
							            	//this.weapons[i].visible = true;
							                this.weapons[i].target = null;
							                this.weapons[i].callAll('removeBeamImpact',null);
                                            this.weapons[i].callAll('removeBoosterTrail',null);
							                this.weapons[i].removeAll(true);
							                //this.weapons[i].callAll('noTarget',null,obj);
							             }
							             //console.log('00');
							             /*for (var i = 0; i < this.weapons.length; i++)
									     {
											 this.weapons[i].callAll('noTarget',null,obj);
									     }*/
									     /*for (var i = 0; i < this.weapons.length; i++)
							             {
							                this.weapons[i].removeAll();
							             }*/
								    };
		Enemy.prototype.noTarget = function (obj){
									     if(this.target == obj){
                                             this.resetTarget();
									     }
								    };