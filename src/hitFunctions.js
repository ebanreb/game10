function getCollide(body1, body2, checkOverlap){

	    	var linesBody1 = [];
	    	var linesBody2 = [];
	    	var intersect = false;
            
            if(testOverlap(body1,body2)){
               
               if(body1.typeBody == 0 && body2.typeBody == 0){
		    		 //console.log('AQUI');
	                 if(circleCircleOverlap(body1,body2))
	                 	 return true;
		        }else{
	                 switch(body1.typeBody){
		               case 0:
		               linesBody1 = getLinesCir(body1, (body1.width/2) - body1.offsetRadius,body2);
		               break;
		               case 1:
		               linesBody1 = getLinesRec(body1);
		               break;
		               default:
		               linesBody1 = getLinesRec(body1);
		               break;
			    	}
			    	switch(body2.typeBody){
			    	   case 0:
		               linesBody2 = getLinesCir(body2,(body2.width/2) - body2.offsetRadius,body1);
		               break;
		               case 1:
		               linesBody2 = getLinesRec(body2);
		               break;
		               default:
		               linesBody2 = getLinesRec(body2);
		               break;
			    	}

			    	for(var i = 0; i < linesBody1.length; i++) {
			    		 for(var j = 0; j < linesBody2.length; j++) {
			    		 	 intersect = Phaser.Line.intersects(linesBody1[i], linesBody2[j]);
				             if(intersect)
				             	 return intersect;
			    		 }
			        }

		            if(checkOverlap){
		            	 var p = overlapBodys(body1, body2);
		                 if(p)
		            	     return p;
		            }
		    	}
            

            }

		    return intersect;

	    }

	    function getLinesRec(body){
            var lines = [];

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

            var vX = ((W/2)*-1) + offsetX;
		    var vY = ((H/2)*-1) + offsetY; 
		    var rdShot =  game.math.angleBetween(
			        centerX, centerY,
			        vX, vY
		    );

			var l1x1 = X + (Math.cos(body.rotation+rdShot) * Math.sqrt(Math.pow(vX,2)+Math.pow(vY,2)) );
			var l1y1 = Y + (Math.sin(body.rotation+rdShot) * Math.sqrt(Math.pow(vX,2)+Math.pow(vY,2)) );

			var vX = (W/2) + offsetX;
		    var vY = ((H/2)*-1) + offsetY; 
		    var rdShot =  game.math.angleBetween(
			        centerX, centerY,
			        vX, vY
		    );

			var l1x2 = X + (Math.cos(body.rotation+rdShot) * Math.sqrt(Math.pow(vX,2)+Math.pow(vY,2)) );
			var l1y2 = Y + (Math.sin(body.rotation+rdShot) * Math.sqrt(Math.pow(vX,2)+Math.pow(vY,2)) );
			

            lines.push(new Phaser.Line(l1x1, l1y1, l1x2, l1y2));

            var vX = ((W/2)*-1) + offsetX;
		    var vY = (H/2) + offsetY; 
		    var rdShot =  game.math.angleBetween(
			        centerX, centerY,
			        vX, vY
		    );

			var l2x1 = X + (Math.cos(body.rotation+rdShot) * Math.sqrt(Math.pow(vX,2)+Math.pow(vY,2)) );
			var l2y1 = Y + (Math.sin(body.rotation+rdShot) * Math.sqrt(Math.pow(vX,2)+Math.pow(vY,2)) );

			var vX = (W/2) + offsetX;
		    var vY = (H/2) + offsetY; 
		    var rdShot =  game.math.angleBetween(
			        centerX, centerY,
			        vX, vY
		    );

			var l2x2 = X + (Math.cos(body.rotation+rdShot) * Math.sqrt(Math.pow(vX,2)+Math.pow(vY,2)) );
			var l2y2 = Y + (Math.sin(body.rotation+rdShot) * Math.sqrt(Math.pow(vX,2)+Math.pow(vY,2)) );

            lines.push(new Phaser.Line(l2x1, l2y1, l2x2, l2y2));

            var vX = (W/2) + offsetX;
		    var vY = ((H/2)*-1) + offsetY; 
		    var rdShot =  game.math.angleBetween(
			        centerX, centerY,
			        vX, vY
		    );

			var l3x1 = X + (Math.cos(body.rotation+rdShot) * Math.sqrt(Math.pow(vX,2)+Math.pow(vY,2)) );
			var l3y1 = Y + (Math.sin(body.rotation+rdShot) * Math.sqrt(Math.pow(vX,2)+Math.pow(vY,2)) );

			var vX = (W/2) + offsetX;
		    var vY = (H/2) + offsetY; 
		    var rdShot =  game.math.angleBetween(
			        centerX, centerY,
			        vX, vY
		    );

			var l3x2 = X + (Math.cos(body.rotation+rdShot) * Math.sqrt(Math.pow(vX,2)+Math.pow(vY,2)) );
			var l3y2 = Y + (Math.sin(body.rotation+rdShot) * Math.sqrt(Math.pow(vX,2)+Math.pow(vY,2)) );

			// Create an array of lines that represent the four edges of each wall
            lines.push(new Phaser.Line(l3x1, l3y1, l3x2, l3y2));

            var vX = ((W/2)*-1) + offsetX;
		    var vY = ((H/2)*-1) + offsetY; 
		    var rdShot =  game.math.angleBetween(
			        centerX, centerY,
			        vX, vY
		    );

			var l4x1 = X + (Math.cos(body.rotation+rdShot) * Math.sqrt(Math.pow(vX,2)+Math.pow(vY,2)) );
			var l4y1 = Y + (Math.sin(body.rotation+rdShot) * Math.sqrt(Math.pow(vX,2)+Math.pow(vY,2)) );

			var vX = ((W/2)*-1) + offsetX;
		    var vY = (H/2) + offsetY; 
		    var rdShot =  game.math.angleBetween(
			        centerX, centerY,
			        vX, vY
		    );

			var l4x2 = X + (Math.cos(body.rotation+rdShot) * Math.sqrt(Math.pow(vX,2)+Math.pow(vY,2)) );
			var l4y2 = Y + (Math.sin(body.rotation+rdShot) * Math.sqrt(Math.pow(vX,2)+Math.pow(vY,2)) );

			// Create an array of lines that represent the four edges of each wall
            lines.push(new Phaser.Line(l4x1, l4y1, l4x2, l4y2));

            return lines;
	    }

	    function getLinesCir(body,rd,tBody){
            var lines = [];
            //var points = getPointsRec(tBody);

			var l1x1 = body.x;
			var l1y1 = body.y;

			var rdShot =  game.math.angleBetween(
			        body.x, body.y,
			        tBody.x, tBody.y
		    );

			var l1x2 = body.x + (rd * Math.cos(rdShot));
            var l1y2 = body.y + (rd * Math.sin(rdShot));

			lines.push(new Phaser.Line(l1x1, l1y1, l1x2, l1y2));

			/*var l2x1 = body.x;
			var l2y1 = body.y;

			var rdShot =  game.math.angleBetween(
			        body.x, body.y,
			        points.p1x, points.p1y
		    );

			var l2x2 = body.x + (rd * Math.cos(rdShot));
            var l2y2 = body.y + (rd * Math.sin(rdShot));

			lines.push(new Phaser.Line(l2x1, l2y1, l2x2, l2y2));

			var l3x1 = body.x;
			var l3y1 = body.y;

			var rdShot =  game.math.angleBetween(
			        body.x, body.y,
			        points.p3x, points.p3y
		    );

			var l3x2 = body.x + (rd * Math.cos(rdShot));
            var l3y2 = body.y + (rd * Math.sin(rdShot));

			lines.push(new Phaser.Line(l3x1, l3y1, l3x2, l3y2));*/

            return lines;
	    }

	    function overlapBodys(body1, body2){
	    	 var center1X = 0;
	    	 var center1Y = 0;
	    	 var center2X = 0;
	    	 var center2Y = 0;
	    	 var p1 = getPointOverlap(body1, ((body1.width/2) - body1.offsetRadius), body2);
	    	 var p2 = getPointOverlap(body2, ((body2.width/2) - body2.offsetRadius), body1);
	    	 switch(body1.anchor.x){
                 case 0:
                     center1X = body1.x + (body1.width/2);
                     break;
                 case 0.5:
                     center1X = body1.x;
                     break;
                 case 1:
                     center1X = body1.x + ((body1.width/2)*-1);
                     break;
             }
             switch(body1.anchor.y){
	             case 0:
			         center1Y = body1.y + (body1.height/2);
	                 break;
	             case 0.5:
			         center1Y = body1.y;
	                 break;
	             case 1:
			         center1Y = body1.y + ((body1.height/2)*-1);
	                 break;
             }

             switch(body2.anchor.x){
                 case 0:
                     center2X = body2.x + (body2.width/2);
                     break;
                 case 0.5:
                     center2X = body2.x;
                     break;
                 case 1:
                     center2X = body2.x + ((body2.width/2)*-1);
                     break;
             }
             switch(body2.anchor.y){
	             case 0:
			         center2Y = body2.y + (body2.height/2);
	                 break;
	             case 0.5:
			         center2Y = body2.y;
	                 break;
	             case 1:
			         center2Y = body2.y + ((body2.height/2)*-1);
	                 break;
             }
             
             center1X = Math.round(center1X);
             center1Y = Math.round(center1Y);
             center2X = Math.round(center2X);
             center2Y = Math.round(center2Y);
             /*var distToPoint1 = game.math.distance(center1X,center1Y, p1.x , p1.y);
             var distToBody1 = game.math.distance(center1X,center1Y, center2X , center2Y);
             var distToOtherPoint1 = game.math.distance(p1.x, p1.y, center2X ,center2Y);
             var distToPoint2 = game.math.distance(center2X,center2Y, p2.x , p2.y);
             var distToBody2 = game.math.distance(center2X,center2Y, center1X , center1Y);
             var distToOtherPoint2 = game.math.distance(p2.x,p2.y, center1X , center1Y);*/

             //if( (distToOtherPoint1 <= distToPoint2) || (distToBody1 <= distToPoint1) ){
             //if( (Math.round(distToBody1)>=-1 && Math.round(distToBody1)<=1) || (Math.round(distToOtherPoint1)>=-1 && Math.round(distToOtherPoint1)<=1) ){
             var valuesX = getMaxMin(center2X,Math.round(p2.x));
             var valuesY = getMaxMin(center2Y,Math.round(p2.y));
             if( ((center1X>=valuesX.min && center1X<=valuesX.max) && (center1Y>=valuesY.min && center1Y<=valuesY.max)) ||
             	 ((p1.x>=valuesX.min && p1.x<=valuesX.max) && (p1.y>=valuesY.min && p1.y<=valuesY.max)) ){
             	 /*console.log('distToBody1: '+distToBody);
             	 console.log('distToPoint1: '+distToPoint);
             	 console.log('distToOtherPoint1: '+distToOtherPoint1);*/
             	 return p2;
             }

             //if( (distToOtherPoint2 <= distToPoint1) || (distToBody2 <= distToPoint2) ){
             //if( (Math.round(distToBody2)>=-1 && Math.round(distToBody2)<=1) || (Math.round(distToOtherPoint2)>=-1 && Math.round(distToOtherPoint2)<=1) ){
             var valuesX = getMaxMin(center1X,Math.round(p1.x));
             var valuesY = getMaxMin(center1Y,Math.round(p1.y));
             if( (center2X>=valuesX.min && center2X<=valuesX.max) && (center2Y>=valuesY.min && center2Y<=valuesY.max) ||
             	 ((p2.x>=valuesX.min && p2.x<=valuesX.max) && (p2.y>=valuesY.min && p2.y<=valuesY.max)) ){
             	 /*console.log('distToBody2: '+distToBody);
             	 console.log('distToPoint2: '+distToPoint);
             	 console.log('distToOtherPoint2: '+distToOtherPoint2);*/
             	 return p1;
             }

             return false;
	    }

	    function getMaxMin(n1,n2){
            var values = {max:0,min:0};
            values.max = n1;
            values.min = n1;
            if(n2>values.max)
            	values.max = n2;
            else
            	values.min = n2;

            return values;
	    }

	    function getPointOverlap(body1, rd, body2){
            
            var point = null;

            var rdShot =  game.math.angleBetween(
			        body1.x, body1.y,
			        body2.x, body2.y
		    );
           
            switch(body1.typeBody){
               case 0:
               rd = rd + 10; 
               point = {x:0,y:0};
               point.x = body1.x + (rd * Math.cos(rdShot));
               point.y = body1.y + (rd * Math.sin(rdShot));
               return point;
               break;
               default:
               var linesBody1 = getLinesRec(body1);
               rd = body1.width+10; 
               var l1x1 = body1.x;
               var l1y1 = body1.y;
               
               var l1x2 = body1.x + ( (rd) * Math.cos(rdShot));
               var l1y2 = body1.y + ( (rd) * Math.sin(rdShot));
                
               var l = new Phaser.Line(l1x1, l1y1, l1x2, l1y2);
               for(var i = 0; i < linesBody1.length; i++) {
	    		 	 point = Phaser.Line.intersects(linesBody1[i], l);
	    		 	 if(point)
	    		 	 	 return point;
	           }
               break;

	    	}

	    	return false;

	    }

	    function getOverlapSelector(body){

	    	var overlap = false;
	    	var p1 = getPointsRec(selector);

            if( (body.x>=p1.minX && body.x<=p1.maxX) && (body.y>=p1.minY && body.y<=p1.maxY) ){
                return true;
            }

		    return overlap;

	    }

	    /*function getOverlap(body1, body2){

	    	var overlap = false;
	    	var p1 = getPointsRec(body1);
            var p2 = getPointsRec(body2);

            if(
            	((p1.p0x>=p2.minX && p1.p0x<=p2.maxX) && (p1.p0y>=p2.minY && p1.p0y<=p2.maxY)) ||
            	((p1.p1x>=p2.minX && p1.p1x<=p2.maxX) && (p1.p1y>=p2.minY && p1.p1y<=p2.maxY)) ||
            	((p1.p2x>=p2.minX && p1.p2x<=p2.maxX) && (p1.p2y>=p2.minY && p1.p2y<=p2.maxY)) ||
            	((p1.p3x>=p2.minX && p1.p3x<=p2.maxX) && (p1.p3y>=p2.minY && p1.p3y<=p2.maxY))

            ){
                return true;
            }

            if(
            	((p2.p0x>=p1.minX && p2.p0x<=p1.maxX) && (p2.p0y>=p1.minY && p2.p0y<=p1.maxY)) ||
            	((p2.p1x>=p1.minX && p2.p1x<=p1.maxX) && (p2.p1y>=p1.minY && p2.p1y<=p1.maxY)) ||
            	((p2.p2x>=p1.minX && p2.p2x<=p1.maxX) && (p2.p2y>=p1.minY && p2.p2y<=p1.maxY)) ||
            	((p2.p3x>=p1.minX && p2.p3x<=p1.maxX) && (p2.p3y>=p1.minY && p2.p3y<=p1.maxY))

            ){
                return true;
            }

		    return overlap;

	    }*/

	    function circleCircleOverlap(body1, body2){
            var dx = body1.x - body2.x;
			var dy = body1.y - body2.y;
            var offsetRadius01 = body1.offsetRadius;
			var offsetRadius02 = body2.offsetRadius;
			var distance = Math.sqrt(dx * dx + dy * dy);
			var sumBodys = ((body1.width/2) - offsetRadius01) + ((body2.width/2) - offsetRadius02);

			if (distance < sumBodys) {
			    return true;
			}
            return false;
	    }

	    function testOverlap(body1, body2, offset = 20){
            
            var x1 = body1.x; 
            var y1 = body1.y;
            var x2 = body2.x;
            var y2 = body2.y;
            var w1 = body1.width;
            var w2 = body2.width;



            switch(body1.anchor.x){
                 case 0:                     
                     x1 = body1.x + ((w1/2) * Math.cos(body1.rotation));
                     y1 = body1.y + ((w1/2) * Math.sin(body1.rotation));
                     break;
                 case 1:
                 	 x1 = body1.x + ( ((w1/2)*-1) * Math.cos(body1.rotation));
                 	 y1 = body1.y + ((w1/2) * Math.sin(body1.rotation));
                     break;
            }
            switch(body1.anchor.y){
                 case 0:
                     y1 = body1.y + ((w1/2) * Math.sin(body1.rotation));
                     break;
                 case 1:
                     y1 = body1.y + ( ((w1/2)*-1) * Math.sin(body1.rotation));
                     break;
            }

            switch(body2.anchor.x){
                 case 0:                     
                     x2 = body2.x + ((w2/2) * Math.cos(body2.rotation));
                     y2 = body2.y + ((w2/2) * Math.sin(body2.rotation));
                     break;
                 case 1:
                 	 x2 = body2.x + ( ((w2/2)*-1) * Math.cos(body2.rotation));
                 	 y2 = body2.y + ((w2/2) * Math.sin(body2.rotation));
                     break;
            }
            switch(body2.anchor.y){
                 case 0:
                     y2 = body2.y + ((w2/2) * Math.sin(body2.rotation));
                     break;
                 case 1:
                     y2 = body2.y + ( ((w2/2)*-1) * Math.sin(body2.rotation));
                     break;
            }

            var dx = x1 - x2;
			var dy = y1 - y2;
			var offsetRadius01 = offset;
			var offsetRadius02 = offset;
			var distance = Math.sqrt(dx * dx + dy * dy);
			var sumBodys = ((w1/2) + offsetRadius01) + ((w2/2) + offsetRadius02);

			if (distance < sumBodys) {
			    return true;
			}
            return false;
	    }

	    function getPointsRec(body){
            
            var points = {
            	          p0x:0,p0y:0,
                          p1x:0,p1y:0,
                          p2x:0,p2y:0,
                          p3x:0,p3y:0,
                          maxX:0,minX:0,
                          maxY:0,minY:0
                         };

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

            var vX = ((W/2)*-1) + offsetX;
		    var vY = ((H/2)*-1) + offsetY; 
		    var rdShot =  game.math.angleBetween(
			        centerX, centerY,
			        vX, vY
		    );

			var l1x1 = X + (Math.cos(body.rotation+rdShot) * Math.sqrt(Math.pow(vX,2)+Math.pow(vY,2)) );
			var l1y1 = Y + (Math.sin(body.rotation+rdShot) * Math.sqrt(Math.pow(vX,2)+Math.pow(vY,2)) );
			points.p0x = l1x1;
			points.p0y = l1y1;
			points.maxX = l1x1;
			points.minX = l1x1;
			points.maxY = l1y1;
			points.minY = l1y1;

			var vX = (W/2) + offsetX;
		    var vY = ((H/2)*-1) + offsetY; 
		    var rdShot =  game.math.angleBetween(
			        centerX, centerY,
			        vX, vY
		    );

			var l1x2 = X + (Math.cos(body.rotation+rdShot) * Math.sqrt(Math.pow(vX,2)+Math.pow(vY,2)) );
			var l1y2 = Y + (Math.sin(body.rotation+rdShot) * Math.sqrt(Math.pow(vX,2)+Math.pow(vY,2)) );
			points.p1x = l1x2;
			points.p1y = l1y2;
			if(l1x2 > points.maxX) points.maxX = l1x2;
			if(l1x2 < points.minX) points.minX = l1x2;
			if(l1y2 > points.maxY) points.maxY = l1y2;
			if(l1y2 < points.minY) points.minY = l1y2;

            var vX = ((W/2)*-1) + offsetX;
		    var vY = (H/2) + offsetY; 
		    var rdShot =  game.math.angleBetween(
			        centerX, centerY,
			        vX, vY
		    );

			var l2x1 = X + (Math.cos(body.rotation+rdShot) * Math.sqrt(Math.pow(vX,2)+Math.pow(vY,2)) );
			var l2y1 = Y + (Math.sin(body.rotation+rdShot) * Math.sqrt(Math.pow(vX,2)+Math.pow(vY,2)) );
			points.p2x = l2x1;
			points.p2y = l2y1;
			if(l2x1 > points.maxX) points.maxX = l2x1;
			if(l2x1 < points.minX) points.minX = l2x1;
			if(l2y1 > points.maxY) points.maxY = l2y1;
			if(l2y1 < points.minY) points.minY = l2y1;

			var vX = (W/2) + offsetX;
		    var vY = (H/2) + offsetY; 
		    var rdShot =  game.math.angleBetween(
			        centerX, centerY,
			        vX, vY
		    );

			var l2x2 = X + (Math.cos(body.rotation+rdShot) * Math.sqrt(Math.pow(vX,2)+Math.pow(vY,2)) );
			var l2y2 = Y + (Math.sin(body.rotation+rdShot) * Math.sqrt(Math.pow(vX,2)+Math.pow(vY,2)) );
			points.p3x = l2x2;
			points.p3y = l2y2;
			if(l2x2 > points.maxX) points.maxX = l2x2;
			if(l2x2 < points.minX) points.minX = l2x2;
			if(l2y2 > points.maxY) points.maxY = l2y2;
			if(l2y2 < points.minY) points.minY = l2y2; 

			return points;

	    }

        // https://phaser.io/examples/v2/geometry/line-intersection
        // http://gamemechanicexplorer.com/#raycasting-1
        // var ray = new Phaser.Line(person.x, person.y, this.ball.x, this.ball.y);
		// Given a ray, this function iterates through all of the walls and
		// returns the closest wall intersection from the start of the ray
		// or null if the ray does not intersect any walls.
		function getIntersection(rX, rY, source, bullet) {
		    var lines = [];
		    var intersect = false;
            var cir = source.typeBody;
		    
		    var vX = (source.width/2)*-1;
		    var vY = 0; 
		    var rdShot =  game.math.angleBetween(
			        0, 0,
			        vX, vY
		    );

			var l1x1 = source.x + (Math.cos(source.rotation+rdShot) * Math.sqrt(Math.pow(vX,2)+Math.pow(vY,2)) );
			var l1y1 = source.y + (Math.sin(source.rotation+rdShot) * Math.sqrt(Math.pow(vX,2)+Math.pow(vY,2)) );

			var vX = (source.width/2);
		    var vY = 0; 
		    var rdShot =  game.math.angleBetween(
			        0, 0,
			        vX, vY
		    );

			var l1x2 = source.x + (Math.cos(source.rotation+rdShot) * Math.sqrt(Math.pow(vX,2)+Math.pow(vY,2)) );
			var l1y2 = source.y + (Math.sin(source.rotation+rdShot) * Math.sqrt(Math.pow(vX,2)+Math.pow(vY,2)) );

	        // Create an array of lines that represent the four edges of each wall
            lines.push(new Phaser.Line(l1x1, l1y1, l1x2, l1y2));

            var vX = ((source.width/2)*-1)*cir;
		    var vY = (source.height/2)*-1; 
		    var rdShot =  game.math.angleBetween(
			        0, 0,
			        vX, vY
		    );

			var l2x1 = source.x + (Math.cos(source.rotation+rdShot) * Math.sqrt(Math.pow(vX,2)+Math.pow(vY,2)) );
			var l2y1 = source.y + (Math.sin(source.rotation+rdShot) * Math.sqrt(Math.pow(vX,2)+Math.pow(vY,2)) );

			var vX = ((source.width/2)*-1)*cir;
		    var vY = (source.height/2); 
		    var rdShot =  game.math.angleBetween(
			        0, 0,
			        vX, vY
		    );

			var l2x2 = source.x + (Math.cos(source.rotation+rdShot) * Math.sqrt(Math.pow(vX,2)+Math.pow(vY,2)) );
			var l2y2 = source.y + (Math.sin(source.rotation+rdShot) * Math.sqrt(Math.pow(vX,2)+Math.pow(vY,2)) );

			// Create an array of lines that represent the four edges of each wall
            lines.push(new Phaser.Line(l2x1, l2y1, l2x2, l2y2));

		    var rdShot =  game.math.angleBetween(
			        0, 0,
			        rX, rY
		    );
            
            var iX = source.x + (Math.cos(source.rotation+rdShot) * Math.sqrt(Math.pow(rX,2)+Math.pow(rY,2)) );
			var iY = source.y + (Math.sin(source.rotation+rdShot) * Math.sqrt(Math.pow(rX,2)+Math.pow(rY,2)) );
            var dist = game.math.distance(source.x,source.y, source.target.x , source.target.y);
            var targetAngle = game.math.angleBetween(
			        iX, iY,
			        source.target.x, source.target.y
				  );
            var eX = source.target.x + (dist * Math.cos(targetAngle));
            var eY = source.target.y + (dist * Math.sin(targetAngle));
            lineRay = new Phaser.Line(iX, iY, eX, eY);

	        // Test each of the edges in this wall against the ray.
	        // If the ray intersects any of the edges then the wall must be in the way.
	        for(var i = 0; i < lines.length; i++) {
	             intersect = Phaser.Line.intersects(lineRay, lines[i]);
	             if(intersect && Math.round(intersect.x)!=Math.round(iX) && Math.round(intersect.y)!=Math.round(iY) ){
	             	 
	             	 /*game.add.sprite(intersect.x, intersect.y, 'simpleBullet');
	             	 game.add.sprite(iX, iY, 'simpleBullet');*/
	             	 return true;
	             }
	             /*console.log(intersect);
	             	 console.log('ix: '+iX+' iY: '+iY);*/
	        }

		    return false;
		}