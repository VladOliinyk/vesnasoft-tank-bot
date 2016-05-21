













var user = "nutella";
var timer = 0;

function commander() {
	
	return function strategy(world) {
		var me = findMe(world);
		var enemy = findEnemy(world);
		var shell = findShell(world);
		console.log("me is ", me.user, " goto ", enemy.user);

		if (me != undefined && enemy != undefined) {
			var gunXy = [
			enemy.xy[0] - me.xy[0],
			enemy.xy[1] - me.xy[1]];

			var moveXy = [0, 0];
			var distance = getDistanceBetweenTwoPoints(me.xy, enemy.xy);
			if (distance < 150) {
				moveXy = [0, 0];
			} else {
				moveXy = getDirection(me.xy, enemy.xy);
			}

			console.log("my pos:  ", me.xy);
			console.log("i go to: ", moveXy);

				return {
					"move-xy": moveXy, 
					"gun-xy": gunXy,
					"fire": true};
				}
	}
}
	function getDirection(start_xy, destination_xy) {
		return [destination_xy[0] - start_xy[0], destination_xy[1] - start_xy[1]];
	}

	function findEnemy(world) {
		var me = findMe(world);

   	// достаем массив енеми
   	//console.log("начинаем наодить енеми");
   	var enemyArray = [];
   	for (var i = 0; i < world.objects.length; i++) {
   		var o = world.objects[i];   		
   		if (o.type == "player" && o.user != user) {
   			enemyArray.push(o);
   		}
   	}
   		//console.log("все енеми найдены:", enemyArray.length);

 // находим близжайшего
 	//console.log("начинаем находить близжайшего");
 	var nearEnemy = enemyArray[0];
 	var distance = getDistanceBetweenTwoPoints(me.xy, nearEnemy.xy);
 	//console.log("нашли первого", distance);
 	for (var i = 1; i < enemyArray.length; i++) {
 		var tempEnemy = enemyArray[i];
 		var tempDist = getDistanceBetweenTwoPoints(me.xy, tempEnemy.xy);
 		if (tempDist < distance) {
 			//console.log("нашли ближе:", distance, " новый: ", tempDist);
 			distance = tempDist;
 			nearEnemy = tempEnemy;

 		}
 	}

 	return nearEnemy;
 }

 function findMe(world) {
 	for (var i = 0; i < world.objects.length; i++) {
 		var o = world.objects[i];
           if (o.type == "player" && o.user == user) // <-- замените на свой позывной 
           	return o;
       }
   }

   

   function getDistanceBetweenTwoPoints(start_xy, destination_xy) {
   	var x = Math.abs(start_xy[0] - destination_xy[0]);
   	var y = Math.abs(start_xy[1] - destination_xy[1]);
   	return Math.sqrt((Math.pow(x, 2) + Math.pow(y, 2)));
   }


