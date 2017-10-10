import {Base,Base_state,Base_task} from './Base';
import {Controller} from './Controller';

const readline = require('readline');

// const rl = readline.createInterface({
// 	input: process.stdin,
// 	output: process.stdout
// });
// rl.setMaxListeners(0);

// emitter.setMaxListeners(1);
class test{
	constructor(class_name,number)
	{
		this.class_name = class_name;
		this.number = number;
	}

	run(input,except)
	{
		if (input == except) {return "ok"}
	}

	runGame(loop)
	{
		console.log(loop);
		if(loop <= 20)
		{
			var op = "";
			// console.log(loop)
			rl.on('line', (input) => {
				  console.log(`Received: ${input}`);
				   op = input;
				   loop +=1;
				   // rl.close();
				 	console.log(">"+op);
				 	if (op == 'w'| op == 'W') 
					{
						let b1 = new Base("sys","move_up","move");
						b1.run();
					}
					if (op == 's'| op == 'S') 
					{
						let b3 = new Base("sys","move_down","move");
						b3.run();
					}
					if (op == 'a'| op == 'A') 
					{
						let b2 = new Base("sys","move_left","move");
						b2.run();
					}
					if (op == 'd'| op == 'D') 
					{
						let b4 = new Base("sys","move_right","move");
						b4.run();
					}
				  // this.runGame(loop);
				});
			 
		



			
			
		}
	}
}

var controller = new Controller();

console.log('----test-basic_move----')
/*
*地图编辑的接口见Map.js Controller
*/

console.log('----test-my_function----')

console.log('-----test-loop---')

controller.testInit();
controller.next();
controller.next();
controller.next();
controller.next();
controller.next();
controller.next();
controller.next();

// Base.bmap.load("level_0.txt");
// var t = new test()
// t.runGame(0);
console.log('-----test-check---')

// console.log('-----test-while---')

// console.log('-----test-AI---')

