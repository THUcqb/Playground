import {Base,Base_task} from './Base';
import {Base_state} from "./Base_state";
import {Controller} from './Controller';

const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

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
				 	if (op === 'w'|| op === 'W') 
					{
						let b1 = new Base("sys","move_up","move");
						b1.run();
					}
					if (op === 's'|| op === 'S') 
					{
						let b3 = new Base("sys","move_down","move");
						b3.run();
					}
					if (op === 'a'|| op === 'A') 
					{
						let b2 = new Base("sys","move_left","move");
						b2.run();
					}
					if (op === 'd'|| op === 'D') 
					{
						let b4 = new Base("sys","move_right","move");
						b4.run();
					}
				  // this.runGame(loop);
				});
		}
	}
	testcontroller()
	{
		let op = ""
		rl.on('line', (input) => {
		console.log(`Received: ${input}`);
		op = input;
		console.log(">"+op);
		controller.next();

		// this.runGame(loop);
		});
	}
}

var controller = new Controller();

console.log('----test-basic_move----')
/*
*地图编辑的接口见Map.js Controller
*/

console.log('----test-my_function----')

console.log('-----test-loop---')

// controller.testInit();
let usertask = new Base_task(controller.begin)//将任务列表指向初始节点
	let judge = new Base("sys","judge","move");
		let true_task = new Base_task(judge);
		true_task.add(new Base("sys","move"));
		let false_task = new Base_task(judge);
		false_task.add(new Base("sys","trun_left"));
		judge.set_task(true_task);
		judge.set_else(false_task);
	let loop = new Base("sys","loop");
		loop.set_time(100);
		let loop_task = new Base_task(loop);
		loop_task.add(judge);
		loop.set_task(loop_task);

usertask.add(loop);//向任务列表添加函数
		

		controller.begin.task=usertask;
let t = new test()
t.testcontroller();
console.log('-----test-check---')
// var usertask = new Base_task(this.begin)//将任务列表指向初始节点
// usertask.add(base_loop_circle_up);//向任务列表添加函数
// this.begin.task=usertask;
// console.log('-----test-while---')

// console.log('-----test-AI---')

