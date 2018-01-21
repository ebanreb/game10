/*var width = window.innerWidth;
    	var height = window.innerHeight;*/
    	var width = 1680;
    	var height = 1050;

        var stelarBase = function(){
             this.beam = {};
             this.rockets = {};
             this.simpleBullet = {};
             this.subBeam = {};
             this.key = "spaceStation";
             this.live = 20000000;
             this.speed = 0;
             this.type = 1;
             this.typeBody = 0;
             this.offsetRadius = 00;
             this.turnRate = 0.0004;
             this.beam.exist = true;
             this.beam.speed = 50;
             this.beam.fRate = 50;
             this.beam.cycle = 4000;
             this.beam.live = 2000;
             this.beam.dmg = 100;
             this.subBeam.exist = true;
             this.subBeam.speed = 70;
             this.subBeam.fRate = 10;
             this.subBeam.cycle = 2000;
             this.subBeam.live = 1500;
             this.subBeam.dmg = 4;
             this.rockets.exist = true;
             this.rockets.speed = 500;
             this.rockets.fRate = 50;
             this.rockets.cycle = 9000;
             this.rockets.live = 10000;
             this.rockets.dmg = 90;
             this.simpleBullet.exist = true;
             this.simpleBullet.speed = 600;
             this.simpleBullet.fRate = 100;
             this.simpleBullet.cycle = 4000;
             this.simpleBullet.live = 9000;
             this.simpleBullet.dmg = 50;
             this.pBeams = [
                 [0,-100,1,'ray'],
                 [0,100,1,'ray']
             ];
             this.pSubBeams = [
                 //[8,90,1,'subRay'],
                 [0,-120,1,'subRay'],
                 //[48,90,1,'subRay'],
                 [0,-130,1,'subRay'],
                 //[8,-90,1,'subRay'],
                 [0,120,1,'subRay'],
                 //[48,-90,1,'subRay'],
                 [0,130,1,'subRay']
             ];
             this.pRockets = [
                 [0,0,0.1,'bullet10'],
                 [0,0,0.1,'bullet10'],
                 [0,0,0.1,'bullet10'],
                 [0,0,0.1,'bullet10'],
                 [0,0,0.1,'bullet10'],
                 [0,0,0.1,'bullet10'],
                 [0,0,0.1,'bullet10'],
                 [0,0,0.1,'bullet10']
             ];
             this.pSimple = [
                 [0,0,1,'simpleBullet',29,0,29,29],
                 [0,0,1,'simpleBullet',29,0,29,29],
                 [0,0,1,'simpleBullet',29,0,29,29],
                 [0,0,1,'simpleBullet',29,0,29,29],
                 [0,0,1,'simpleBullet',29,0,29,29],
                 [0,0,1,'simpleBullet',29,0,29,29],
                 [0,0,1,'simpleBullet',29,0,29,29],
                 [0,0,1,'simpleBullet',29,0,29,29]
             ];
        };

    	var shipCruiser = function(){
    		 this.beam = {};
    		 this.rockets = {};
    		 this.simpleBullet = {};
    		 this.subBeam = {};
    		 this.key = "carrier";
             this.live = 30000;
             this.speed = 200;
             this.type = 0;
             this.typeBody = 1;
             this.tracking = false;
             this.offsetRadius = 0;
             this.turnRate = 0.8;
             this.beam.exist = true;
             this.beam.speed = 50;
             this.beam.fRate = 50;
             this.beam.cycle = 4000;
             this.beam.live = 2000;
             this.beam.dmg = 10;
             this.subBeam.exist = true;
             this.subBeam.speed = 70;
             this.subBeam.fRate = 10;
             this.subBeam.cycle = 2000;
             this.subBeam.live = 1500;
             this.subBeam.dmg = 4;
             this.rockets.exist = true;
             this.rockets.speed = 500;
             this.rockets.fRate = 50;
             this.rockets.cycle = 9000;
             this.rockets.live = 10000;
             this.rockets.dmg = 90;
             this.simpleBullet.exist = true;
             this.simpleBullet.speed = 600;
             this.simpleBullet.fRate = 100;
             this.simpleBullet.cycle = 4000;
             this.simpleBullet.live = 9000;
             this.simpleBullet.dmg = 50;
             this.pBeams = [
                 [67,-25,1,'ray'],
                 [67,25,1,'ray']
             ];
             this.pSubBeams = [
                 //[8,90,1,'subRay'],
                 [-14,-45,1,'subRay'],
                 //[48,90,1,'subRay'],
                 [-34,-45,1,'subRay'],
                 //[8,-90,1,'subRay'],
                 [-14,45,1,'subRay'],
                 //[48,-90,1,'subRay'],
                 [-34,45,1,'subRay']
             ];
             this.pRockets = [
                 [0,0,0.1,'bullet10'],
                 [0,0,0.1,'bullet10'],
                 [0,0,0.1,'bullet10'],
                 [0,0,0.1,'bullet10']
             ];
             this.pSimple = [
                 [0,0,1,'simpleBullet',29,0,29,29],
                 [0,0,1,'simpleBullet',29,0,29,29],
                 [0,0,1,'simpleBullet',29,0,29,29],
                 [0,0,1,'simpleBullet',29,0,29,29],
                 [0,0,1,'simpleBullet',29,0,29,29],
                 [0,0,1,'simpleBullet',29,0,29,29]
             ];

    	};

    	var shipShuttlenoweps = function(){
    		 this.beam = {};
    		 this.rockets = {};
    		 this.simpleBullet = {};
    		 this.subBeam = {};
    		 this.key = "shuttlenoweps";
             this.live = 20000;
             this.speed = 250;
             this.type = 0;
             this.typeBody = 1;
             this.tracking = false;
             this.offsetRadius = 0;
             this.turnRate = 1;
             this.beam.exist = false;
             this.beam.speed = 0;
             this.beam.fRate = 0;
             this.beam.cycle = 0;
             this.beam.live = 0;
             this.beam.dmg = 0;
             this.subBeam.exist = false;
             this.subBeam.speed = 0;
             this.subBeam.fRate = 0;
             this.subBeam.cycle = 0;
             this.subBeam.live = 0;
             this.subBeam.dmg = 0;
             this.rockets.exist = true;
             this.rockets.speed = 500;
             this.rockets.fRate = 50;
             this.rockets.cycle = 9000;
             this.rockets.live = 10000;
             this.rockets.dmg = 90;
             this.simpleBullet.exist = true;
             this.simpleBullet.speed = 600;
             this.simpleBullet.fRate = 100;
             this.simpleBullet.cycle = 4000;
             this.simpleBullet.live = 9000;
             this.simpleBullet.dmg = 50;
             
             this.pRockets = [
                 [0,0,0.1,'bullet10']
             ];
             this.pSimple = [
                 [0,0,1,'simpleBullet',29,0,29,29],
                 [0,0,1,'simpleBullet',29,0,29,29],
                 [0,0,1,'simpleBullet',29,0,29,29],
                 [0,0,1,'simpleBullet',29,0,29,29]
             ];

    	};

        var shipF5S3 = function(){
             this.beam = {};
             this.rockets = {};
             this.simpleBullet = {};
             this.subBeam = {};
             this.key = "F5S3";
             this.live = 10000;
             this.speed = 300;
             this.type = 0;
             this.typeBody = 1;
             this.tracking = true;
             this.offsetRadius = 0;
             this.turnRate = 2;
             this.beam.exist = false;
             this.beam.speed = 0;
             this.beam.fRate = 0;
             this.beam.cycle = 0;
             this.beam.live = 0;
             this.beam.dmg = 0;
             this.subBeam.exist = false;
             this.subBeam.speed = 0;
             this.subBeam.fRate = 0;
             this.subBeam.cycle = 0;
             this.subBeam.live = 0;
             this.subBeam.dmg = 0;
             this.rockets.exist = false;
             this.rockets.speed = 0;
             this.rockets.fRate = 0;
             this.rockets.cycle = 0;
             this.rockets.live = 0;
             this.rockets.dmg = 0;
             this.simpleBullet.exist = true;
             this.simpleBullet.speed = 900;
             this.simpleBullet.fRate = 100;
             this.simpleBullet.cycle = 2000;
             this.simpleBullet.live = 8000;
             this.simpleBullet.dmg = 40;
             
             this.pSimple = [
                 [0,0,1,'simpleBullet',0,0,29,29],
                 [0,0,1,'simpleBullet',0,0,29,29],
                 [0,0,1,'simpleBullet',0,0,29,29],
                 [0,0,1,'simpleBullet',0,0,29,29],
                 [0,0,1,'simpleBullet',0,0,29,29],
                 [0,0,1,'simpleBullet',0,0,29,29]
             ];

        };

    	var enemyStelarBase = function(){
    		 this.beam = {};
    		 this.rockets = {};
    		 this.simpleBullet = {};
    		 this.subBeam = {};
    		 this.key = "enemyBase";
             this.live = 20000000;
             this.speed = 0;
             this.type = 3;
             this.typeBody = 0;
             this.offsetRadius = 100;
             this.turnRate = 0.0004;
             this.beam.exist = true;
             this.beam.speed = 50;
             this.beam.fRate = 50;
             this.beam.cycle = 4000;
             this.beam.live = 2000;
             this.beam.dmg = 100;
             this.subBeam.exist = true;
             this.subBeam.speed = 70;
             this.subBeam.fRate = 10;
             this.subBeam.cycle = 2000;
             this.subBeam.live = 1500;
             this.subBeam.dmg = 4;
             this.rockets.exist = true;
             this.rockets.speed = 500;
             this.rockets.fRate = 50;
             this.rockets.cycle = 9000;
             this.rockets.live = 10000;
             this.rockets.dmg = 90;
             this.simpleBullet.exist = true;
             this.simpleBullet.speed = 600;
             this.simpleBullet.fRate = 100;
             this.simpleBullet.cycle = 4000;
             this.simpleBullet.live = 9000;
             this.simpleBullet.dmg = 50;
             this.pBeams = [
                 [0,-100,1,'ray'],
                 [0,100,1,'ray']
             ];
             this.pSubBeams = [
                 //[8,90,1,'subRay'],
                 [0,-120,1,'subRay'],
                 //[48,90,1,'subRay'],
                 [0,-130,1,'subRay'],
                 //[8,-90,1,'subRay'],
                 [0,120,1,'subRay'],
                 //[48,-90,1,'subRay'],
                 [0,130,1,'subRay']
             ];
             this.pRockets = [
                 [0,0,0.1,'bullet10'],
                 [0,0,0.1,'bullet10'],
                 [0,0,0.1,'bullet10'],
                 [0,0,0.1,'bullet10'],
                 [0,0,0.1,'bullet10'],
                 [0,0,0.1,'bullet10'],
                 [0,0,0.1,'bullet10'],
                 [0,0,0.1,'bullet10']
             ];
             this.pSimple = [
                 [0,0,1,'simpleBullet',29,0,29,29],
                 [0,0,1,'simpleBullet',29,0,29,29],
                 [0,0,1,'simpleBullet',29,0,29,29],
                 [0,0,1,'simpleBullet',29,0,29,29],
                 [0,0,1,'simpleBullet',29,0,29,29],
                 [0,0,1,'simpleBullet',29,0,29,29],
                 [0,0,1,'simpleBullet',29,0,29,29],
                 [0,0,1,'simpleBullet',29,0,29,29]
             ];

    	};

        var shipCruiserBad = function(){
             this.beam = {};
             this.rockets = {};
             this.simpleBullet = {};
             this.subBeam = {};
             this.key = "carrier";
             this.typeShip = 1;
             this.live = 30000;
             this.speed = 200;
             this.type = 2;
             this.typeBody = 1;
             this.tracking = false;
             this.offsetRadius = 0;
             this.turnRate = 0.8;
             this.beam.exist = true;
             this.beam.speed = 50;
             this.beam.fRate = 50;
             this.beam.cycle = 4000;
             this.beam.live = 2000;
             this.beam.dmg = 10;
             this.subBeam.exist = true;
             this.subBeam.speed = 70;
             this.subBeam.fRate = 10;
             this.subBeam.cycle = 2000;
             this.subBeam.live = 1500;
             this.subBeam.dmg = 4;
             this.rockets.exist = true;
             this.rockets.speed = 500;
             this.rockets.fRate = 50;
             this.rockets.cycle = 9000;
             this.rockets.live = 10000;
             this.rockets.dmg = 90;
             this.simpleBullet.exist = true;
             this.simpleBullet.speed = 600;
             this.simpleBullet.fRate = 100;
             this.simpleBullet.cycle = 4000;
             this.simpleBullet.live = 9000;
             this.simpleBullet.dmg = 50;
             this.pBeams = [
                 [67,-25,1,'ray'],
                 [67,25,1,'ray']
             ];
             this.pSubBeams = [
                 //[8,90,1,'subRay'],
                 [-14,-45,1,'subRay'],
                 //[48,90,1,'subRay'],
                 [-34,-45,1,'subRay'],
                 //[8,-90,1,'subRay'],
                 [-14,45,1,'subRay'],
                 //[48,-90,1,'subRay'],
                 [-34,45,1,'subRay']
             ];
             this.pRockets = [
                 [0,0,0.1,'bullet10'],
                 [0,0,0.1,'bullet10'],
                 [0,0,0.1,'bullet10'],
                 [0,0,0.1,'bullet10']
             ];
             this.pSimple = [
                 [0,0,1,'simpleBullet',29,0,29,29],
                 [0,0,1,'simpleBullet',29,0,29,29],
                 [0,0,1,'simpleBullet',29,0,29,29],
                 [0,0,1,'simpleBullet',29,0,29,29],
                 [0,0,1,'simpleBullet',29,0,29,29],
                 [0,0,1,'simpleBullet',29,0,29,29]
             ];

        };

        var shipShuttlenowepsBad = function(){
             this.beam = {};
             this.rockets = {};
             this.simpleBullet = {};
             this.subBeam = {};
             this.key = "shuttlenoweps";
             this.typeShip = 2;
             this.live = 20000;
             this.speed = 250;
             this.type = 2;
             this.typeBody = 1;
             this.tracking = false;
             this.offsetRadius = 0;
             this.turnRate = 1;
             this.beam.exist = false;
             this.beam.speed = 0;
             this.beam.fRate = 0;
             this.beam.cycle = 0;
             this.beam.live = 0;
             this.beam.dmg = 0;
             this.subBeam.exist = false;
             this.subBeam.speed = 0;
             this.subBeam.fRate = 0;
             this.subBeam.cycle = 0;
             this.subBeam.live = 0;
             this.subBeam.dmg = 0;
             this.rockets.exist = true;
             this.rockets.speed = 500;
             this.rockets.fRate = 50;
             this.rockets.cycle = 9000;
             this.rockets.live = 10000;
             this.rockets.dmg = 90;
             this.simpleBullet.exist = true;
             this.simpleBullet.speed = 600;
             this.simpleBullet.fRate = 100;
             this.simpleBullet.cycle = 4000;
             this.simpleBullet.live = 9000;
             this.simpleBullet.dmg = 50;
             
             this.pRockets = [
                 [0,0,0.1,'bullet10']
             ];
             this.pSimple = [
                 [0,0,1,'simpleBullet',29,0,29,29],
                 [0,0,1,'simpleBullet',29,0,29,29],
                 [0,0,1,'simpleBullet',29,0,29,29],
                 [0,0,1,'simpleBullet',29,0,29,29]
             ];

        };

        var shipF5S3Bad = function(){
             this.beam = {};
             this.rockets = {};
             this.simpleBullet = {};
             this.subBeam = {};
             this.key = "F5S3";
             this.typeShip = 3;
             this.live = 10000;
             this.speed = 300;
             this.type = 2;
             this.typeBody = 1;
             this.tracking = true;
             this.offsetRadius = 0;
             this.turnRate = 2;
             this.beam.exist = false;
             this.beam.speed = 0;
             this.beam.fRate = 0;
             this.beam.cycle = 0;
             this.beam.live = 0;
             this.beam.dmg = 0;
             this.subBeam.exist = false;
             this.subBeam.speed = 0;
             this.subBeam.fRate = 0;
             this.subBeam.cycle = 0;
             this.subBeam.live = 0;
             this.subBeam.dmg = 0;
             this.rockets.exist = false;
             this.rockets.speed = 0;
             this.rockets.fRate = 0;
             this.rockets.cycle = 0;
             this.rockets.live = 0;
             this.rockets.dmg = 0;
             this.simpleBullet.exist = true;
             this.simpleBullet.speed = 900;
             this.simpleBullet.fRate = 100;
             this.simpleBullet.cycle = 2000;
             this.simpleBullet.live = 8000;
             this.simpleBullet.dmg = 40;
             
             this.pSimple = [
                 [0,0,1,'simpleBullet',0,0,29,29],
                 [0,0,1,'simpleBullet',0,0,29,29],
                 [0,0,1,'simpleBullet',0,0,29,29],
                 [0,0,1,'simpleBullet',0,0,29,29],
                 [0,0,1,'simpleBullet',0,0,29,29],
                 [0,0,1,'simpleBullet',0,0,29,29]
             ];

        };

         
       // var stageGroup;
        var deltaTime = 1;
		var player;
		var tween;
		var playerMoving = false;
		var playerPos = new Phaser.Point(0,0);

		var worldScale = 0.25;
		var currentBounds;
		var mapSizeMax;
		var worldwidth=width;
		var worldheight=height;
		var mapSizeX = 1024*24;
		var mapSizeY = 768*24; 
		var prevScale ={};
		var nextScale={};
		var zoompoint={};
		var mapSizeCurrent;
		var distance =0;
		var olddistance =0;
		var distancedelta=0;
		var easing=0.60;
        var oldcamera;

		var xAdjust;
        var yAdjust;

        var selector;
        var selectedUnits = 0;
        var totalUnits = 0;
        var leaderSelected;

        var layers;
        var staticBack;
        var selectShips = [];
        var playerUnits = new Phaser.ArraySet();
        var playerBase;

		var angulo;

		var PlayerCazasGroup,MAX_CAZAS = 8;

		var enemyBase;
        var enemyUnits = new Phaser.ArraySet();
        var enemyUnistLow = new Phaser.ArraySet();
        var enemyUnitsMediun = new Phaser.ArraySet();
        var enemyUnitsHeight = new Phaser.ArraySet();

		var ATTACK = false;

		var buttonFull;
		var groupIconsSelected;
        var MENU_OPTION = false;

		var p0,p1,p2,p3;//DEBUG

        /*
        ////////////////////////////////////////////////////////////////////
        ///inicio_game///
        ///////////////////////////////////////////////////////////////////
        */

        var game = new Phaser.Game(width, height, Phaser.WEBGL, 'test', {preload: preload, create: create, update: update, render: render},true,true);