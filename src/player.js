var MyPlayer = function(game, x, y, type, frame) 
		                       {  
                                    this.ship = type;

			                       	Phaser.Sprite.call(this, game, x, y, this.ship.key, frame);

			                       	game.physics.enable(this, Phaser.Physics.ARCADE);

			                       	this.type = this.ship.type;
			                       	this.typeBody = this.ship.typeBody;
			                       	this.offsetRadius = this.ship.offsetRadius
			                       	this.SPEED = this.ship.speed;
			                       	this.target = null;
			                       	this.TURN_RATE = this.ship.turnRate;
			                       	this.weapons = [];
			                       	this.iniLive = this.ship.live;
			                       	this.live = this.ship.live;
			                       	this.angulo = 0;
			                       	this.lastX = x;
			                       	this.lastY = y;
			                       	this.indexSelec = null;
			                       	this.playerPos = {x:x,y:y};
			                       	this.selected = false; //si esta seleccionada
			                       	this.playerMoving = false;
			                       	this.inAttack = false;
			                       	this.inFocus = false;
                                    this.tween1 = null;
                                    this.tween2 = null;
                                    this.AVOID_DISTANCE = 40; // pixels
								    this.anchor.setTo(0.5, 0.5);
                                    this.grupo = layers.playerLayer;
                                    this.hM = false;
								    
								    /*this.healtBar = new HealthBar(game,0,this.height/2,'healtBar',this.live,this.width,10, this);
								    this.addChild(this.healtBar);*/
								    this.healtBar = new HealthBar(game,10,15,'healtBar',this.live,(width/2),10, this);
								    //this.healtBar.tint = 0xff0000;
								    //game.add.existing(this.healtBar);
								    layers.interfaceLayer.add(this.healtBar);

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
						                layers.playerLayer.add(this.weapons[i]);
						            }

                                    this.markPointToMove = null;
                                    this.markSelectedUnit = new markSelectedUnit(game, this.playerPos.x, this.playerPos.y, 'markPointToMove', this);

                                     if(this.type === 0){
                                        //  player's boosters
                                        this.booster = new TheBooster(game,((this.width/2)*-1)+50,0,'booster');
                                        //this.booster.angle = -90;
                                        this.addChild(this.booster);

                                        this.markPointToMove = new markPointToMove(game, this.playerPos.x, this.playerPos.y, 'healtBar', this);
                                        layers.playerLayer.add(this.markPointToMove);
                                    }

						            layers.playerLayer.add(this.markSelectedUnit);
						            

						            this.inputEnabled = true;
                                    this.input.priorityID = 1;
								    //this.input.pixelPerfectClick = true;
                                    if(this.type === 0){
                                        this.events.onInputDown.add(onDown);
                                        this.events.onInputUp.add(this.onUp, this);
                                    }else
                                        this.events.onInputDown.add(this.clicked, this);
								    this.events.onInputOver.add(this.over, this);
								    this.events.onInputOut.add(this.out, this);

								    //Tell it we don't want physics to manage the rotation
								    //this.body.allowRotation = false;

                                    this.playerMask = game.add.sprite(0, 0, this.ship.key);
                                    this.playerMask.anchor = {x: 0.5, y: 0.5};
                                    this.addChild(this.playerMask);

		                       }
		MyPlayer.prototype = Object.create(Phaser.Sprite.prototype);
		MyPlayer.prototype.constructor = MyPlayer;

		MyPlayer.prototype.update = function (){
			                            
                                        //dataLinesRec(this);

			                            if(this.live <= 0){
			                            	 /*for (var i = 0; i < this.weapons.length; i++)
										     {
												 this.weapons[i].callAll('beamDestroy',null);
										     }*/

                                             playerUnits.remove(this);

										     try{
									                 layers.behindTheShipLayer.callAll('noTarget',null,this);
			                            	 }catch(err){

			                            	 }

										     for (var i = 0; i < this.weapons.length; i++)
								             {
								                this.weapons[i].callAll('removeBeamImpact',null);
                                                this.weapons[i].callAll('removeBoosterTrail',null);
								                this.weapons[i].removeAll(true);
								                this.weapons[i].pendingDestroy = true;
								             }

			                            	 //PlayerCazasGroup.forEach(function (c) { c.destroy(); });

						                 	 if(this.inCamera){
						                 	    var explosion = new Explosion(game, this.x, this.y, 'explosionShip',2,2,false,24);
            								 	layers.playerLayer.add(explosion);
            								 	game.camera.shake(0.0005, 400);	
						                 	 }

            								 this.healtBar.pendingDestroy = true;
            								 this.markSelectedUnit.pendingDestroy = true;
            								 this.markPointToMove.pendingDestroy = true;
                                             this.target = null;
            								 /*if(this.selected){
            								 	 //selectedUnits -= 1;
            								 	 this.selected = false;
            								 	 selector.countSelectedUnits();
            								 }*/
            								 this.selected = false;
            								 selector.countSelectedUnits();
            								 this.destroy(true);
            								 //console.log('muerto');
                                             return false;
						                }

						                if(!this.inCamera){
							                this.renderable = false;
							            }else{
							            	this.renderable = true;
							            }

						                if(selector.vs && !ATTACK && this.type === 0){
							                if(getCollide(this, selector, false) || getOverlapSelector(this)){
									             this.selected = true;
									             //console.log('01');
										    }else{
										    	 this.selected = false;
										    	 //console.log('02');
										    }

										    //console.log('00');
									    }

									    //console.log(this.selected);
                                         
                                        if(!this.inAttack && this.target){
                                             var distToTheTarget = game.math.distance(this.x,this.y, this.target.x , this.target.y);
                                             if(distToTheTarget>2000)
                                                 this.noTarget(this.target);
                                        }
                                        
                                        if(this.type === 0){

			                                this.move();
                                        }else{
                                            this.rotation += this.TURN_RATE;
                                        }

                                        /*
							             // If there are fewer than MAX_MISSILES, launch a new one
									    if (PlayerCazasGroup.countLiving() < MAX_CAZAS) {
									        // Set the launch point to a random location below the bottom edge
									        // of the stage
									        launchCazas(game.rnd.integerInRange(this.body.x-20, this.body.x+20),game.rnd.integerInRange(this.body.y - 20, this.body.y + 20));
									    }
									    */

									    if(this.target!=null){
									    	
									    	for (var i = 0; i < this.weapons.length; i++)
								            {
								            	//this.weapons[i].visible = true;
								                this.weapons[i].fire(this);
								            }

									    }else{
                                            if(!this.hM)
                                                this.selectTarget();
                                        }
							            
								    };
                                    
		MyPlayer.prototype.move = function (){

                                         //console.log('Tween1: ' + this.tween1 + ' Tween2: ' + this.tween2);

                                         if(this.inAttack){
                                            var distToTarget = 0;
                                            distToTarget = game.math.distance(this.x,this.y, this.target.x , this.target.y); 
                                         }

                                         if( (this.playerMoving || (this.inAttack && distToTarget<2000)) && (this.tween1 && this.tween1.isRunning) ){       
                                                     this.tween1.stop();
                                                     game.tweens.removeFrom(this);
                                                     this.tween1 = null;
                                                     this.tween2 = null;
                                         }
                                        
                                         ///Flocking
                                         if( (!this.tween1 || (this.tween1 && !this.tween1.isRunning)) 
                                             && (!this.tween2 || (this.tween2 && !this.tween2.isRunning)) && !this.playerMoving ){
                                                var avoidAngle = 0;
                                                //this.parent.forEachAlive(function(m) {

                                                 for(var j = 0; j < playerUnits.total; j++){
                                                    //console.log('A');
                                                    var m = playerUnits.list[j];


                                                    // Don't calculate anything if the other missile is me
                                                    if (this == m) continue;
                                                    //console.log('B');
                                                    // Already found an avoidAngle so skip the rest
                                                    if (avoidAngle !== 0) break;

                                                    if( (m.tween1 && m.tween1.isRunning) ) continue;
                                                    if( (m.tween2 && m.tween2.isRunning) ) continue;
                                                    
                                                    
                                                    // Calculate the distance between me and the other missile
                                                    //var distance = game.math.distance(this.x, this.y, m.x, m.y);

                                                    // If the missile is too close...
                                                    //if (distance < m.width/2) {
                                                    if (this.x == m.x && this.y == m.y) {
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
                                                                this.hM = false;
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

        MyPlayer.prototype.selectTarget = function(){
            try{
                                          
              //console.log('TOTAL: ' + layers.playerLayer.total);
              //console.log('TARGET: ' + this.target);
              if(this.target == null){
                
                 
                 if(enemyUnits.total > 0){

                     var lastDist = 0;
                     var tar = null;
                     for(var j = 0; j < enemyUnits.total; j++){
                        var newTarget = enemyUnits.list[j];
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

        MyPlayer.prototype.Attack = function(enemy) {
        	                        if(this.selected){
                                        
                                        this.hM = true;

        	                        	if(enemy){
                                            this.target =  enemy;
	                                        this.inAttack = true;
			                             	for (var i = 0; i < this.weapons.length; i++){
								                this.weapons[i].target = enemy;
								            }
        	                        	}else{
                                            this.inAttack = false;
                                        }
        	                        }
        };

        MyPlayer.prototype.resetTarget = function() {
        	                       
                                        this.target =  null;
                                        this.inAttack = false;
		                             	/*for (var i = 0; i < this.weapons.length; i++)
							            {
							                this.weapons[i].target = null;
							            }*/
							            for (var i = 0; i < this.weapons.length; i++)
							            {
							                this.weapons[i].callAll('removeBeamImpact',null);
                                            this.weapons[i].callAll('removeBoosterTrail',null);
							                this.weapons[i].removeAll(true);
							            }
        };

        MyPlayer.prototype.noTarget = function (obj){
                                         if(this.target == obj){
                                             this.resetTarget();
                                         }
                                    };

        MyPlayer.prototype.unSelect = function() {
        	                        if(!ATTACK && !this.onFocus){
                                	     this.selected = false;
                                	     this.indexSelec = null;	
                                    }
        };

        MyPlayer.prototype.onUp = function (enmy, p){
                                             onUp(enmy, p);
                                             if(p.button===0)
                                                 this.selected = true;
                                    };

        MyPlayer.prototype.clicked = function (enmy, p){
                                        //if(p.button===0){
                                             layers.playerLayer.callAll('unSelect',null);
                                             this.selected = true;
                                             selector.countSelectedUnits();
                                        //}
								    };

		MyPlayer.prototype.over = function (enmy, p){
			                             this.healtBar.visible = true;
			                             this.inFocus = true;
								    };

		MyPlayer.prototype.out = function (enmy, p){
			                             this.healtBar.visible = false;
			                             this.inFocus = false;
								    };