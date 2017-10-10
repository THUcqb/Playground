import {Base,Base_state,Base_task} from './Base';
import {Controller} from './Controller';

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
 rl.setMaxListeners(0);

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

let b1 = new Base("sys","move_up","move")//添加移动操作 注意这是引用！所以不要复用！
let b2 = new Base("sys","move_left","move")
let b3 = new Base("sys","move_down","move")
let b4 = new Base("sys","move_right","move")
let b5 = new Base("sys","move_up","move")

console.log('----test-my_function----')

console.log('-----test-loop---')

var b6 = new Base('sys','loop'); //设置循环函数
	b6.set_time(2);//设置循环次数

	var mytask1 = new Base_task(b6) //Base_task 需要指定父节点
		mytask1.add(b1);
		mytask1.add(b2);
b6.task = mytask1;//向父节点添加执行列表


var mytask = new Base_task(controller.begin)//将任务列表指向初始节点
mytask.add(b6);//向任务列表添加函数

controller.begin.task=mytask;//初始节点添加执行列表


// controller.next();console.log('expect -- up');/*执行初始节点的单条命令*/
// controller.next();console.log('except -- left');
// controller.next();console.log('except -- up');
// controller.next();console.log('except -- left');
// controller.next();console.log('expect -- end');
// controller.next();console.log('expect -- err');
// controller.next();console.log('except -- err');

Base.bmap.load("level_0.txt");
var t = new test()
t.runGame(0);
// console.log('-----test-check---')

// console.log('-----test-while---')

// console.log('-----test-AI---')

