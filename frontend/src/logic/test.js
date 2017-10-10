import {Block} from './Block';
import {Map} from './Map';
import {Base,Base_state,Base_task} from './Base';
import {Snake} from './Snake';

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

/*
下面的代码为初始化直接粘到对应的位置即可
*/

Base.bmap = new Map(10,10); //初始化地图 每个地块的信息 Base.bmap.block_list[x][y].info 参考map.js
Base.bsnake = new Snake(5,5); //初始化蛇
Base.bmap.testinit(5,5);//设置出生点 为了测试方便全地图初始化为2 即积分地块
Base.begin = new Base("user","begin");
Base.begin.time = 1;
Base.success = new Base("success","end");//初始化success状态
Base.fail = new Base("fail","end");//初始化fail状态
Base.err = new Base("err","end");//初始化err状态，一切非法操作都会返回err
Base.null = new Base("null","end");//游戏结束后如果还在输入指令会执行null操作
Base.begin.link(Base.null);//游戏结束后跳转到null状态
Base.run_state = new Base_state(Base.begin);//状态管理，会逐条执行指令，注意base.run()会一口气将结果执行完
// Base.bmap.load('level_0.txt');//关卡0
Base.game = 'run';//游戏状态初始化正常

/*
初始化设置结束
*/

console.log('----test-basic_move----')
/*
*地图编辑的接口见Map.js
*/

let b1 = new Base("sys","move_up","move")//添加移动操作
let b2 = new Base("sys","move_left","move")
let b3 = new Base("sys","move_down","move")
let b4 = new Base("sys","move_right","move")
let b5 = new Base("sys","move_up","move")

// Base.bmap.print();
// myBase.run()//执行指令
console.log('----test-my_function----')




// var mytask = new Base_task(Base.begin)
// mytask.add(b1);
// mytask.add(b2);
// mytask.add(b5);
// Base.begin.task=mytask;

// Base.run_state.next();
// // console.log (mytask.tasklist[0].next);

// Base.run_state.next();
// Base.run_state.next();
// Base.run_state.next();



console.log('-----test-loop---')
// var myBase5 = new Base("sys","loop","function",mytask1,2)//循环执行任务集
// Base.begin.run()
var b6 = new Base('sys','loop'); 
	b6.set_time(2);

	var mytask1 = new Base_task(b6)
		mytask1.add(b1);
		mytask1.add(b2);
b6.task = mytask1;


var mytask = new Base_task(Base.begin)
mytask.add(b6);
Base.begin.task=mytask;

Base.run_state.next();

console.log('expect -- up');
Base.run_state.next();
console.log('except -- left');
Base.run_state.next();
console.log('except -- up');
Base.run_state.next();
console.log('except -- left');
Base.run_state.next();
console.log('expect -- end');
Base.run_state.next();
console.log('expect -- err');
Base.run_state.next();
console.log('except -- err');


console.log('-----test-check---')

console.log('-----test-while---')

console.log('-----test-AI---')

