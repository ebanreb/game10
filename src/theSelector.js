var TheSelector = function(game, x, y, asset, frame) 
		                       {  
			                       	Phaser.Sprite.call(this, game, x, y, asset, frame);
                                    this.width = 0;
								    this.height = 0;

								    this.anchor.setTo(0, 0);
								    this.alpha = 0.35;
								    this.vs = false;
								    this.iniX = x;
								    this.iniY = y;
								    this.finSel=false;
								    this.sw = false;
								    this.indexTarget = 0;
								    this.typeBody = 1;
								    
								    this.tint = 0x00CCFF;
								    this.hasCollided = false;
		                       }
		TheSelector.prototype = Object.create(Phaser.Sprite.prototype);
		TheSelector.prototype.constructor = TheSelector;

		TheSelector.prototype.update = function(){
			//this.reset(this.iniX, this.iniY);
			
			/*if(this.sw && !this.finSel){
				
			}*/

			if(this.finSel){
				this.finSel=false;
				this.vs = false;
				this.countSelectedUnits();
				//this.sw = false;
				this.x = 0;
            	this.y = 0;
            	this.width = 0;
				this.height = 0;
				this.iniX = 0;
				this.iniY = 0;
				//this.sw = true;
			}

		};

		TheSelector.prototype.countSelectedUnits = function() {
			var offsetY = height - 50;
			var x = 10;
			var y = offsetY;
			var numV = 3;
			var cellW = 10;
			var cellH = 10;
            
            selectedUnits = 0;
            totalUnits = 0;
            selectShips = [];
            groupIconsSelected.removeAll(true);

			//layers.playerLayer.forEach(function(item) {
             for(var j = 0; j < playerUnits.total; j++){                                
                    var item = playerUnits.list[j];
			        if(item.live > 0){
			        	 if(item.selected){
                             selectShips.push(item);
	                     	 item.indexSelec = selectedUnits;
	                     	 selectedUnits +=1;
			        	 }
			        	 
	                     if(totalUnits%numV == 0){
                            x += cellW;
                            y = offsetY;                            
                         }

		                 totalUnits += 1;

		                 groupIconsSelected.add(new iconSelector(game,x,y,'healtBar', item));
		                 y += cellH;
		            } 
			 }      
			//});
			
		};