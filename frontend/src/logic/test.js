import {Base,Base_state,Base_task} from './Base';
import {Controller} from './Controller';

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


controller.next();console.log('expect -- up');/*执行初始节点的单条命令*/
controller.next();console.log('except -- left');
controller.next();console.log('except -- up');
controller.next();console.log('except -- left');
controller.next();console.log('expect -- end');
controller.next();console.log('expect -- err');
controller.next();console.log('except -- err');

console.log('-----test-check---')

console.log('-----test-while---')

console.log('-----test-AI---')

