
		
		function preload() 
		{
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			game.scale.pageAlignHorizontally = true;
			game.scale.pageAlignVertically = true;
			//game.scale.setScreenSize(true);

		    //game.load.image('planet', 'assets/UltraHQ/noShadow.png');
            game.load.image('background', 'assets/background.jpg');
		    //game.load.image('sun', 'assets/sun/sun.png');
		    game.load.image('btnCarrier', 'assets/ships/carrier.png');
		    game.load.image('btnShuttlenoweps', 'assets/ships/shuttlenoweps.png');
            game.load.image('btnF5S3', 'assets/ships/F5S3.png');
		    game.load.image('fullScreen', 'assets/FullScreen_38x38.png');
            game.load.image('spaceStation', 'assets/ships/SS1.png');
		    game.load.image('carrier', 'assets/ships/carrierInGame.png');
		    game.load.image('shuttlenoweps', 'assets/ships/shuttlenowepsInGame.png');
            game.load.image('F5S3', 'assets/ships/F5S3InGame.png');
		    game.load.image('playerCaza', 'assets/ships/F5S3-MIN.png');
		    game.load.image('bullet10', 'assets/missile_icon_100x100.png');
		    game.load.image('simpleBullet', 'assets/spr_bullet_strip04.png');
		    game.load.image('ray', 'assets/Laser-Texture_1x40.png');
		    game.load.image('subRay', 'assets/redLaserRay_1x20.png');
		    game.load.image('boostParticle', 'assets/circle-xxl2-min.png');
		    game.load.image('healtBar', 'assets/hBar.png');
		    game.load.image('markPointToMove', 'assets/circle-dashed-4-512.png');
		    game.load.image('enemyBase', 'assets/ships/starbase-tex.png');
		    //game.load.spritesheet('booster', 'assets/thruster-spritesheet1.png', 50, 178, 4);
		    game.load.spritesheet('blueBeamHit', 'assets/1_asteroid_sprites.png', 128, 128, 12);
		    game.load.spritesheet('redBeamHit', 'assets/1_asteroid_sprites_red.png', 128, 128, 12);
		    game.load.spritesheet('explosion', 'assets/1_base_expl.png', 128, 128, 24);
		    //game.load.spritesheet('explosionShip', 'assets/explosion.png', 256, 256, 48);
            game.load.spritesheet('explosionShip', 'assets/bV7mgky.png', 192, 192, 30);
		    game.load.spritesheet('booster', 'assets/bullet.png');
		    //game.load.image('blueEnemyBullet', 'images/bullet.png');
		    game.time.advancedTiming = true;
    		game.time.desiredFps = 30;
            game.tweens.frameBased = true;
		}
		function create() 
		{   
            worldScale=1;
            //game.forceSingleUpdate = true;
            game.canvas.oncontextmenu = function (e) { e.preventDefault(); }

            // Stretch to fill
            game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;

			/*staticBack = game.add.sprite(0, 0, 'staticBackground');
            staticBack.fixedToCamera = true;*/

            // CHANGE ORDER HERE TO CHANGE RENDERING ORDER!        
	        layers = {
                stageGroup: game.add.group(),  // this group will contain everything except the UI for scaling
	            backgroundLayer: game.add.group(),
	            behindTheShipLayer: game.add.group(),
	            playerLayer: game.add.group(),
                frontObjects: game.add.group(),
	            somethingInFronOfAPlayerButBehindInterface: game.add.group(),
	            interfaceLayer: game.add.group(),
                builderMenu: game.add.group()
	        };      

            mapSizeMax = mapSizeX;
            mapSizeCurrent = mapSizeMax;

            currentBounds = new Phaser.Rectangle(0, 0, mapSizeX, mapSizeY); 
            game.camera.bounds=currentBounds;
            game.camera.focusOnXY(mapSizeX-2000, mapSizeY/2);

		    background1 = game.add.tileSprite(-1000, -1000, mapSizeX+2000, mapSizeY+2000, 'background');
		    layers.backgroundLayer.add(background1);
            /*planet = game.add.sprite(mapSizeX-1000, mapSizeY/2, 'planet');
            planet.anchor.x=0.5;
            planet.anchor.y=0.5;
            layers.backgroundLayer.add(planet);*/

            layers.stageGroup.add(layers.backgroundLayer);
            
            selector = new TheSelector(game,0,0,'healtBar');
            layers.somethingInFronOfAPlayerButBehindInterface.add(selector);

            groupIconsSelected = game.add.group();
            layers.interfaceLayer.add(groupIconsSelected);

            buttonFull = new theButton(game,width-49, 10, 'fullScreen', 1, 1, windowFullScreen, this, 0, 0, 0);
            layers.interfaceLayer.add(buttonFull);

            buttonNewCruiser = new theButton(game,20, height/2, 'btnCarrier', 0.2, 0.2, function(){addPlayerShip(new shipCruiser,buttonNewCruiser)}, this, 0, 0, 0);
            layers.builderMenu.add(buttonNewCruiser);
            buttonNewShuttlenoweps = new theButton(game,20, height/2+100, 'btnShuttlenoweps', 0.3, 0.3, function(){addPlayerShip(new shipShuttlenoweps, buttonNewShuttlenoweps)}, this, 0, 0, 0);
            layers.builderMenu.add(buttonNewShuttlenoweps);
            buttonNewF5S3 = new theButton(game,20, height/2+200, 'btnF5S3', 0.3, 0.3, function(){addPlayerShip(new shipF5S3, buttonNewF5S3)}, this, 0, 0, 0);
            layers.builderMenu.add(buttonNewF5S3);

            layers.interfaceLayer.add(layers.builderMenu);

    		enemyBase = new Enemy(game, 1000, mapSizeY/2, new enemyStelarBase, 0);
    		layers.behindTheShipLayer.add(enemyBase);
    		enemyUnits.add(enemyBase);
    		/*enemyBase02 = new Enemy(game, 3000, mapSizeY/2 + 500, new enemyStelarBase, 0);
    		layers.behindTheShipLayer.add(enemyBase02);*/

            playerBase = new MyPlayer(game, mapSizeX-2000, mapSizeY/2, new stelarBase, 0);  
            playerBase.rotation=0;
            playerUnits.add(playerBase);
            layers.playerLayer.add(playerBase);
            //layers.behindTheShipLayer.add(playerBase);
            selector.countSelectedUnits();
            
            background1.inputEnabled = true;
            background1.input.priorityID = 0;

            layers.stageGroup.add(layers.behindTheShipLayer);
            layers.stageGroup.add(layers.playerLayer);
            layers.stageGroup.add(layers.frontObjects);
            layers.stageGroup.add(layers.somethingInFronOfAPlayerButBehindInterface);

		    game.input.mouse.capture = true;
            
            game.input.mouse.mouseWheelCallback = function(event) {
              var wheelDelt = game.input.mouse.wheelDelta;
              if (wheelDelt < 0) {
                mapSizeCurrent -= 400;
                mapSizeCurrent = Phaser.Math.clamp(mapSizeCurrent, worldwidth, mapSizeMax);
              } else {
                mapSizeCurrent += 400;
                mapSizeCurrent = Phaser.Math.clamp(mapSizeCurrent, worldwidth, mapSizeMax);
              }
              worldScale = (mapSizeCurrent / mapSizeMax);
            };
            
	        background1.events.onInputDown.add(onDown);
	        background1.events.onInputUp.add(onUp);
            game.input.addMoveCallback(trace);

            //game.world.scale.set(worldScale);
            //game.camera.focusOnXY((3000*game.world.scale.x)/1, (mapSizeY/2*game.world.scale.y)/1);

             /*
            **********************************DEBUG
            */
            /*p0 = game.add.sprite(0, 0, 'healtBar');
            p0.tint = 0x99ff00;
            p0.width = 5;
            p0.height = 5;
            p1 = game.add.sprite(0, 0, 'healtBar');
            p1.tint = 0x99ff00;
            p1.width = 5;
            p1.height = 5;
            p2 = game.add.sprite(0, 0, 'healtBar');
            p2.tint = 0x99ff00;
            p2.width = 5;
            p2.height = 5;
            p3 = game.add.sprite(0, 0, 'healtBar');
            p3.tint = 0x99ff00;
            p3.width = 5;
            p3.height = 5;
            layers.interfaceLayer.add(p0);
            layers.interfaceLayer.add(p1);
            layers.interfaceLayer.add(p2);
            layers.interfaceLayer.add(p3);*/
            /*
            ***************************************
            */
		}

		function windowFullScreen(){
			game.scale.startFullScreen();
		}

		function update() 
		{     
			//game.cache = new Phaser.Cache(game);

             if(playerBase.selected)
                layers.builderMenu.visible = true;
             else
                layers.builderMenu.visible = false;

             //console.log('Elementos Array unidades: '+playerUnits.total);
             //console.log('Elementos Grupo: '+layers.playerLayer.length);
             //console.log('Scale: '+worldScale);

                //touch zoom
            if (game.input.pointer1.isDown && game.input.pointer2.isDown) {
              olddistance = distance;
              distance = Phaser.Math.distance(game.input.pointer1.x, game.input.pointer1.y, game.input.pointer2.x, game.input.pointer2.y);
              distancedelta = Math.abs(olddistance - distance);

              if (olddistance > distance && distancedelta > 4) {
                mapSizeCurrent -= 200;
              } else if (olddistance < distance && distancedelta > 4) {
                mapSizeCurrent += 200;
              }
              mapSizeCurrent = Phaser.Math.clamp(mapSizeCurrent, worldwidth, mapSizeMax); //prevent odd scalefactors - set a minimum and maximum scale value
              worldScale = (mapSizeCurrent / mapSizeMax);

              //calculate point between fingers (zoompoint.x and zoompoint.y)
              if (game.input.pointer1.x < game.input.pointer2.x) {
                zoompoint.x = game.input.pointer1.worldX + (Math.abs(game.input.pointer1.worldX - game.input.pointer2.worldX) / 2);
              } else {
                zoompoint.x = game.input.pointer2.worldX + (Math.abs(game.input.pointer1.worldX - game.input.pointer2.worldX) / 2);
              }
              if (game.input.pointer1.y < game.input.pointer2.y) {
                zoompoint.y = game.input.pointer1.worldY + (Math.abs(game.input.pointer1.worldY - game.input.pointer2.worldY) / 2);
              } else {
                zoompoint.y = game.input.pointer2.worldY + (Math.abs(game.input.pointer1.worldY - game.input.pointer2.worldY) / 2);
              }
            } else { // wheelzoom
              zoompoint.x = game.input.mousePointer.worldX;
              zoompoint.y = game.input.mousePointer.worldY;
            }
            
            if(game.input.activePointer.withinGame){
                if(game.input.activePointer.x <= 8){
                    game.camera.x -= 10;
                  }
                  if(game.input.activePointer.x >= worldwidth-8){
                    game.camera.x += 10;
                  }
                  if(game.input.activePointer.y <= 8){
                    game.camera.y -= 10;
                  }
                  if(game.input.activePointer.y >= worldheight-8){
                    game.camera.y += 10;
                  }
              }

          
              oldcamera = null;
              rescalefactorx = mapSizeX / (mapSizeX * layers.stageGroup.scale.x); // multiply by rescalefactor to get original world value
              rescalefactory = mapSizeY / (mapSizeY * layers.stageGroup.scale.y);

              prevScale.x = layers.stageGroup.scale.x;
              prevScale.y = layers.stageGroup.scale.y;
              //console.log('X: ' + prevScale.x +' Y: ' +prevScale.y);

              nextScale.x = prevScale.x + (worldScale - layers.stageGroup.scale.x) * easing;
              nextScale.y = prevScale.y + (worldScale - layers.stageGroup.scale.y) * easing;
              //console.log('X: ' + nextScale.x +' Y: ' + nextScale.y);

              var xAdjust = (zoompoint.x - game.camera.position.x) * (nextScale.x - prevScale.x);
              var yAdjust = (zoompoint.y - game.camera.position.y) * (nextScale.y - prevScale.y);
              //console.log('X: ' + xAdjust +' Y: ' + yAdjust);


              //Only move screen if we're not the same scale
              if (prevScale.x != nextScale.x || prevScale.y != nextScale.y) {
                var scaleAdjustX = nextScale.x / prevScale.x;
                var scaleAdjustY = nextScale.y / prevScale.y;
                var focusX = (game.camera.position.x * scaleAdjustX) + xAdjust * (rescalefactorx);
                var focusY = (game.camera.position.y * scaleAdjustY) + yAdjust * (rescalefactory);
                game.camera.x = focusX;
                game.camera.y = focusY;
                //game.camera.focusOnXY(focusX, focusY);
              } 

              //now actually scale the stage
              layers.stageGroup.scale.x += (worldScale - layers.stageGroup.scale.x) * easing; //easing
              layers.stageGroup.scale.y += (worldScale - layers.stageGroup.scale.y) * easing;

              currentBounds = new Phaser.Rectangle(0, 0, mapSizeX*layers.stageGroup.scale.x, mapSizeY*layers.stageGroup.scale.y);
              game.camera.bounds = currentBounds;
            
            
			

		    if (!game.camera.atLimit.x)
            {
                //background1.tilePosition.x -= ((ship.body.velocity.x) * game.time.physicsElapsed);
                background1.tilePosition.x = -game.camera.x;
                
            }

            if (!game.camera.atLimit.y)
            {
                //background1.tilePosition.y -= ((ship.body.velocity.y) * game.time.physicsElapsed);
                background1.tilePosition.y = -game.camera.y;
                
            }

		    if (game.scale.isFullScreen)
		    	buttonFull.visible = false;
		    else
		    	buttonFull.visible = true;
		        
		} 

		function render()
		{
	        game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");
		}

		function onDown(bg, pointer) 
	    {
	         //console.log('onDown', pointer.button, event.button, event.buttons, event.type);
	         //pointer.x += this.game.camera.x;
	         //pointer.y += this.game.camera.y;
	         if(pointer.button===0){

	         	/*player.target = null;
	         	for (var i = 0; i < player.weapons.length; i++)
	            {
	                player.weapons[i].target = null;
	            }*/
                if(selector.vs==false){
                	//layers.playerLayer.setAll('selected',false);
                	layers.playerLayer.callAll('unSelect',null);
                	//layers.behindTheShipLayer.callAll('unSelect',null);
                	selector.vs = true;
                	selectedUnits = 0;
                	//selector.finSel = false;
                	//selector.body.static = true;
                	selector.width = 1;
					selector.height = 1;
					selector.iniX = pointer.worldX/layers.stageGroup.scale.x;
					selector.iniY = pointer.worldY/layers.stageGroup.scale.y;
	            	selector.x = selector.iniX;
	            	selector.y = selector.iniY;
                }
	            
	         }else if(pointer.button===2){
	         	 actionUnits(pointer);
	         }//FIN BUTTON 2
                 
		}

        function actionUnits(pointer){
                 /*if(selectedUnits == 1){
                    selectShips[0].playerPos.x=pointer.worldX/game.world.scale.x;
                    selectShips[0].playerPos.y=pointer.worldY/game.world.scale.y;
                    selectShips[0].playerMoving = true;
                    selectShips[0].angulo = game.math.angleBetween(selectShips[0].x,selectShips[0].y, selectShips[0].playerPos.x , selectShips[0].playerPos.y);
                 }else{*/
                    var CX = pointer.worldX/layers.stageGroup.scale.x;
                    var CY = pointer.worldY/layers.stageGroup.scale.y;

                    var w = 0, h = 0, grap = 0.1;
                    // Get information about the selected soldiers.
                    var f = 0;
                    while(f<selectShips.length){
                        var a = selectShips[f];
                        w += a.width;
                        h += a.height;
                        f++;
                    }

                    var numSelected = selectShips.length, k = -1;
                    if (!numSelected) return;

                    layers.playerLayer.callAll('Attack',null,ATTACK);
                    
                    // Build a grid of evenly spaced soldiers.
                    var sqrt = Math.sqrt(numSelected),
                        rows = Math.ceil(sqrt),
                        cols = Math.ceil(sqrt),
                        iw = Math.ceil(w / numSelected), // grid cell width
                        ih = Math.ceil(h / numSelected), // grid cell height
                        wg = iw*grap, // width of gap between cells
                        hg = ih*grap; // height of gap between cells
                    if ((rows-1)*cols >= numSelected) rows--;
                    w = iw * cols + wg * (cols-1); // total width of group
                    h = ih * rows + hg * (rows-1); // total height of group
                    // Sort by location to avoid soldiers getting in each others' way.
                    selectShips.sort(function(a, b) {
                        // Round to 10's digit; specific locations can be off by a pixel or so
                        var ax = Math.round10(a.x,-1), ay = Math.round10(a.y,-1), bx = Math.round10(b.x,-1), by = Math.round10(b.y,-1);
                        return ay - by || ax - bx;
                    });
                    // Place the grid over the mouse and send soldiers there.
                    for (var i = 0; i < rows; i++) {
                        for (var j = 0; j < cols; j++) {
                          var s = selectShips[++k];
                          var dist;
                          if (s) {

                            if(s.target){
                               dist = game.math.distance(s.x,s.y, s.target.x , s.target.y);
                            }

                            if( !ATTACK || (ATTACK && dist>2000) ){

                                var mx = CX + j * (iw+wg) - w * 0.5 + s.width * 0.5,
                                my = CY + i * (ih+hg) - h * 0.5 + s.height * 0.5;
                                // Finally, move to the end destination coordinates
                                //s.moveTo(mx, my);
                                s.playerPos.x = mx;
                                s.playerPos.y = my;
                                s.playerMoving = true;
                                s.angulo = game.math.angleBetween(s.x,s.y, s.playerPos.x , s.playerPos.y);              
                                                 
        
                            }else if(ATTACK && s.target){
                                 s.playerMoving = true;
                                 if (s.tween1 && s.tween1.isRunning)    {        
                                     s.tween1.stop();    
                                 }
                                 if (s.tween2 && s.tween2.isRunning)    {        
                                     s.tween2.stop();    
                                 }  
                                 s.playerPos.x = s.x;
                                 s.playerPos.y = s.y;
                                 s.angulo = game.math.angleBetween(s.x,s.y, s.target.x , s.target.y);
                            }
                            
                          }
                        }
                    }
                    
                 //}
        }

		function onUp(bg,pointer) 
	    {
            //console.log('onUp', pointer.button, event.button, event.buttons, event.type);
                if(selector.vs){
                	//selector.vs = false;
					selector.finSel=true;
                }  
	    }

	    function trace(pointer,event) 
	    {
            //console.log('trace', pointer.button, event.button, event.buttons, event.type);
	    	if(pointer.button===0){

                if(selector.vs){
	            	selector.width = (pointer.worldX/layers.stageGroup.scale.x) - selector.x;
					selector.height = (pointer.worldY/layers.stageGroup.scale.y) - selector.y;
					//dataLinesRec(selector);
                }
	            
	        }
	    }

	    function addPlayerShip(typeShip, btn){
                 var newShip = new MyPlayer(game, playerBase.x - playerBase.width, playerBase.y, typeShip, 0);  
                 newShip.rotation=0;
                 playerUnits.add(newShip);
                 layers.playerLayer.add(newShip);
                 selector.countSelectedUnits();
                 //btn.inputEnabled = false;
                 //btn.alpha = 0.5;
	                 //var text = game.add.text(0,0, game.time.events.duration, {font: "66px Arial", fill: "#ffffff"});
	                 //var style = { font: "32px Arial", fill: "#ff0044", wordWrap: false, wordWrapWidth: btn.width, align: "center", backgroundColor: "#ffff00" };
	                 //var text = game.add.text(0, 0, game.time.events.duration, style);
	                 //text.anchor.set(0.5);
	                 //btn.addChild(text);
	                 //btn.text.x = Math.floor((btn.width - btn.text.width)*0.5);    btn.text.y = Math.floor((btn.height - btn.text.height)*0.5);
                 //game.time.events.add(Phaser.Timer.SECOND * 1, function(){btn.inputEnabled = true; btn.input.useHandCursor = true; btn.alpha = 1;}, this);
	    }

		function dataLinesRec(body){

            var centerX = 0, centerY = 0;

            var W = Math.abs(body.width);
            var H = Math.abs(body.height);

            var X = body.x, Y = body.y;
            var offsetX = 0, offsetY = 0;
            
            switch(body.anchor.x){
                 case 0:
                     offsetX = (W/2);
                     break;
                 case 0.5:
                     offsetX = 0;
                     break;
                 case 1:
                     offsetX = (W/2)*-1;
                     break;
            }
            switch(body.anchor.y){
                 case 0:
                     offsetY = (H/2);
                     break;
                 case 0.5:
                     offsetY = 0;
                     break;
                 case 1:
                     offsetY = (H/2)*-1;
                     break;
            }

            if(body.width<0)
            	offsetX *=-1;
            if(body.height<0)
            	offsetY *=-1;

            console.log('PosicionX: '+ X + ' PosicionY: '+ Y);
            console.log('Ancho: ' + W + ' Alto: ' + H);

            var vX = ((W/2)*-1)+offsetX;
		    var vY = ((H/2)*-1)+offsetY; 
		    var rdShot =  game.math.angleBetween(
			        centerX, centerY,
			        vX, vY
		    );

			var l1x1 = X + (Math.cos(body.rotation+rdShot) * Math.sqrt(Math.pow(vX,2)+Math.pow(vY,2)) );
			var l1y1 = Y + (Math.sin(body.rotation+rdShot) * Math.sqrt(Math.pow(vX,2)+Math.pow(vY,2)) );
			console.log('l1x1: '+ l1x1 + ' l1y1: '+ l1y1);
			p0.x = l1x1;
			p0.y = l1y1;

			var vX = (W/2)+offsetX;
		    var vY = ((H/2)*-1)+offsetY; 
		    var rdShot =  game.math.angleBetween(
			        centerX, centerY,
			        vX, vY
		    );

			var l1x2 = X + (Math.cos(body.rotation+rdShot) * Math.sqrt(Math.pow(vX,2)+Math.pow(vY,2)) );
			var l1y2 = Y + (Math.sin(body.rotation+rdShot) * Math.sqrt(Math.pow(vX,2)+Math.pow(vY,2)) );
			console.log('l1x2: '+ l1x2 + ' l1y2: '+ l1y2);
			p1.x = l1x2;
			p1.y = l1y2;

            var vX = ((W/2)*-1)+offsetX;
		    var vY = (H/2)+offsetY; 
		    var rdShot =  game.math.angleBetween(
			        centerX, centerY,
			        vX, vY
		    );

			var l2x1 = X + (Math.cos(body.rotation+rdShot) * Math.sqrt(Math.pow(vX,2)+Math.pow(vY,2)) );
			var l2y1 = Y + (Math.sin(body.rotation+rdShot) * Math.sqrt(Math.pow(vX,2)+Math.pow(vY,2)) );
			console.log('l2x1: '+ l2x1 + ' l2y1: '+ l2y1);
			p2.x = l2x1;
			p2.y = l2y1;

			var vX = (W/2)+offsetX;
		    var vY = (H/2)+offsetY; 
		    var rdShot =  game.math.angleBetween(
			        centerX, centerY,
			        vX, vY
		    );

			var l2x2 = X + (Math.cos(body.rotation+rdShot) * Math.sqrt(Math.pow(vX,2)+Math.pow(vY,2)) );
			var l2y2 = Y + (Math.sin(body.rotation+rdShot) * Math.sqrt(Math.pow(vX,2)+Math.pow(vY,2)) );
			console.log('l2x2: '+ l2x2 + ' l2y2: '+ l2y2);
			p3.x = l2x2;
			p3.y = l2y2;

	    }

	    // Conclusión
		(function() {
		  /**
		   * Ajuste decimal de un número.
		   *
		   * @param {String}  tipo  El tipo de ajuste.
		   * @param {Number}  valor El numero.
		   * @param {Integer} exp   El exponente (el logaritmo 10 del ajuste base).
		   * @returns {Number} El valor ajustado.
		   */
		  function decimalAdjust(type, value, exp) {
		    // Si el exp no está definido o es cero...
		    if (typeof exp === 'undefined' || +exp === 0) {
		      return Math[type](value);
		    }
		    value = +value;
		    exp = +exp;
		    // Si el valor no es un número o el exp no es un entero...
		    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
		      return NaN;
		    }
		    // Shift
		    value = value.toString().split('e');
		    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
		    // Shift back
		    value = value.toString().split('e');
		    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
		  }

		  // Decimal round
		  if (!Math.round10) {
		    Math.round10 = function(value, exp) {
		      return decimalAdjust('round', value, exp);
		    };
		  }
		  // Decimal floor
		  if (!Math.floor10) {
		    Math.floor10 = function(value, exp) {
		      return decimalAdjust('floor', value, exp);
		    };
		  }
		  // Decimal ceil
		  if (!Math.ceil10) {
		    Math.ceil10 = function(value, exp) {
		      return decimalAdjust('ceil', value, exp);
		    };
		  }
		})();