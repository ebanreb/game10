var Weapon = {};

	    ////////////////////////////////////////////////////
	    //  ROCKETS BULLET //
	    ////////////////////////////////////////////////////

	    Weapon.Rockets = function (game,source,pos, data) {

	        Phaser.Group.call(this, game, game.world, 'Rockets', false, true);

	        this.pos = pos;
	        this.nextFire = 0;
	        this.bulletSpeed = data.speed;
	        this.fireRate = data.fRate;
	        this.dmg = data.dmg;
	        this.target = source.target;
            this.g = game;

            this.sourceGroup = source.grupo;

		    this.timer = 0;
		    this.addCycle = data.cycle;

		    this.TIMELIVE = data.live;

	        return this;

	    };

	    Weapon.Rockets.prototype = Object.create(Phaser.Group.prototype);
	    Weapon.Rockets.prototype.constructor = Weapon.Rockets;

	    Weapon.Rockets.prototype.fire = function (source) {
			try{
	    		var myTarget = {};
	            if(this.target == null) { return; }
	            else{ myTarget.x = this.target.x; myTarget.y = this.target.y;}
	    	}catch(err){
	    		this.target = null;
                return false;
	    	}

            //this.nextFire += game.time.elapsed;
            //this.timer += game.time.elapsedMS;

            var dist = game.math.distance(source.x,source.y, myTarget.x , myTarget.y);
            var maxDist = (this.TIMELIVE * (this.bulletSpeed))/1000;
            //console.log("dist: "+dist+" maxDist: "+maxDist);
            if(dist < maxDist)
		         this.addRockets(this.g,source);

	        if (game.time.now < this.nextFire) { return; }

	        bullet = this.getFirstExists(false);
	        if (bullet)
	        {
	            bullet.reset(source.x,source.y);
	        }
	        
	        this.nextFire = game.time.now + this.fireRate;

	    };

	    Weapon.Rockets.prototype.addRockets = function (game,source) {
            
	        //if (game.time.now < this.timer) { return; }
	        this.timer -= game.time.physicsElapsedMS;
	        //console.log(this.timer);
	        if (this.timer > 0) { return; }

	        var rotacion = 45;
            
            for (var i = 0; i < this.pos.length; i++)
	        {
	        	rotacion = rotacion * -1;
	            
			    this.add(new Bullet(game, this.pos[i][3], this.pos[i][0], this.pos[i][1], this.pos[i][2],0.5,0.5,this.bulletSpeed, this.TIMELIVE, this.dmg, source, this.sourceGroup, source.rotation + rotacion,this.target,0,-5,true), true);
	        }

	        //this.setAll('SPEED', this.bulletSpeed);
	        //this.setAll('cycle', this.TIMELIVE);

	        this.setAll('tracking', true);
	        
	        //this.timer = game.time.now + this.addCycle;
	        this.timer = this.addCycle;

	    };

	    ////////////////////////////////////////////////////
	    //  BEAM BULLET //
	    ////////////////////////////////////////////////////

	    Weapon.Beams = function (game,source,pos, data,color) {

	        Phaser.Group.call(this, game, game.world, 'Beams', false, true);
            
            this.pos = pos;
	        this.nextFire = 0;
	        this.bulletSpeed = data.speed;
	        this.fireRate = data.fRate;
	        this.dmg = data.dmg;
            this.g = game;
            this.target = source.target;
		    this.timer = 0;
		    this.addCycle = data.cycle;
            this.sourceGroup = source.grupo;
		    this.TIMELIVE = data.live;
		    this.COLOR = color;

	        return this;

	    };

	    Weapon.Beams.prototype = Object.create(Phaser.Group.prototype);
	    Weapon.Beams.prototype.constructor = Weapon.Beams;

	    Weapon.Beams.prototype.fire = function (source) {
            try{
	    		var myTarget = {};
	            if(this.target == null) { return; }
	            else{ myTarget.x = this.target.x; myTarget.y = this.target.y;}
	    	}catch(err){
	    		this.target = null;
                return false;
	    	}

            var dist = game.math.distance(source.x,source.y, myTarget.x , myTarget.y);
            var maxDist = 2000;
            //console.log("dist: "+dist+" maxDist: "+maxDist);
            
            //this.timer += game.time.elapsedMS;

            if(dist < maxDist)
		         this.addBeams(this.g,source);
		         
	        if (game.time.now < this.nextFire) { return; }

	        bullet = this.getFirstExists(false);
	        if (bullet)
	        {
	            bullet.reset(source.x,source.y);
	        }
	        
	        this.nextFire = game.time.now + this.fireRate;


	        /*var grupo = this;

	        this.forEach(function(item) {

		        if (game.time.now > item.timerAlive){
                 grupo.remove(item,true);
	            }
		        
		    });*/

	    };

	    Weapon.Beams.prototype.addBeams = function (game,source) {
            this.timer -= game.time.physicsElapsedMS;
            if (this.timer > 0) { return; }
             
            for (var i = 0; i < this.pos.length; i++)
	        {
                var thisIntersection = getIntersection(this.pos[i][0], this.pos[i][1], source);

                if(!thisIntersection)
	                 this.add(new Bullet(game, this.pos[i][3], this.pos[i][0], this.pos[i][1], this.pos[i][2],0,0.5,this.bulletSpeed, this.TIMELIVE, this.dmg, source, this.sourceGroup, source.rotation,this.target), true);
	            
	        }
	        //this.add(new Bullet(game, 'ray', -134, 50, 1,0,0.5,this.bulletSpeed, this.TIMELIVE, source, source.body.rotation,this.CG,this.coll), true);
	        //this.add(new Bullet(game, 'ray', -134, -50, 1,0,0.5,this.bulletSpeed, this.TIMELIVE, source, source.body.rotation,this.CG,this.coll), true);

	        //this.setAll('SPEED', this.bulletSpeed);
	        //this.setAll('cycle', this.TIMELIVE);
          
	        this.setAll('tracking', false);
	        this.setAll('SCALE', true);
	        this.setAll('BEAM', this.COLOR);
	        //this.setAll('w', 95);

	        this.timer = this.addCycle;

	    };

	    ////////////////////////////////////////////////////
	    //  Simple BULLET //
	    ////////////////////////////////////////////////////

	    Weapon.SimpleBullet = function (game,source,pos, data) {

	        Phaser.Group.call(this, game, game.world, 'SimpleBullet', false, true);
            
            this.pos = pos;
	        this.nextFire = 0;
	        this.bulletSpeed = data.speed;
	        this.fireRate = data.fRate;
	        this.dmg = data.dmg;
            this.g = game;
            this.target = source.target;
		    this.timer = 0;
		    this.addCycle = data.cycle;
            this.sourceGroup = source.grupo;
		    this.TIMELIVE = data.live;

	        return this;

	    };

	    Weapon.SimpleBullet.prototype = Object.create(Phaser.Group.prototype);
	    Weapon.SimpleBullet.prototype.constructor = Weapon.SimpleBullet;

	    Weapon.SimpleBullet.prototype.fire = function (source) {
	    	try{
	    		var myTarget = {};
	            if(this.target == null) { return; }
	            else{ myTarget.x = this.target.x; myTarget.y = this.target.y;}
	    	}catch(err){
	    		this.target = null;
                return false;
	    	}
            
            var dist = game.math.distance(source.x,source.y, myTarget.x , myTarget.y);
            var maxDist = (this.TIMELIVE * (this.bulletSpeed))/1000;
            //console.log("dist: "+dist+" maxDist: "+maxDist);

            //this.timer += game.time.elapsedMS;

            if(dist < maxDist)
		         this.addSimple(this.g,source);
		         
	        if (game.time.now < this.nextFire) { return; }

	        bullet = this.getFirstExists(false);
	        if (bullet)
	        {
	            bullet.reset(source.x,source.y);
	        }
	        
	        this.nextFire = game.time.now + this.fireRate;
	    };

	    Weapon.SimpleBullet.prototype.addSimple = function (game,source) {
            this.timer -= game.time.physicsElapsedMS;
            if (this.timer > 0) { return; }
            
            for (var i = 0; i < this.pos.length; i++)
	        {
	        	var targetAngle = game.math.angleBetween(
			        source.x, source.y,
			        game.rnd.integerInRange(this.target.x-20, this.target.x+20), game.rnd.integerInRange(this.target.y-20, this.target.y+20)
				);

		        this.add(new Bullet(game, this.pos[i][3], this.pos[i][0], this.pos[i][1], this.pos[i][2],0.5,0.5,this.bulletSpeed, this.TIMELIVE, this.dmg, source, this.sourceGroup, targetAngle, this.target,0,0), true)
            	.crop({x: this.pos[i][4], y: this.pos[i][5], width: this.pos[i][6], height: this.pos[i][7]});
	            
	        }

	        //this.setAll('SPEED', this.bulletSpeed);
	        //this.setAll('cycle', this.TIMELIVE);
          
	        this.setAll('tracking', false);
	        this.setAll('SCALE', false);
	        //this.setAll('w', 95);

	        this.timer = this.addCycle;

	    };