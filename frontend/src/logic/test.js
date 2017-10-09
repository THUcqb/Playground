import {Block} from './Block';
import {Map} from './Map';
import {Base} from './Base';
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


Base.bmap = new Map(10,10); //初始化地图 每个地块的信息 Base.bmap.block_list[x][y].info 参考map.js
Base.bsnake = new Snake(5,5); //初始化蛇
Base.bmap.testinit(5,5);//设置出生点 为了测试方便全地图初始化为2 即积分地块
// Base.bmap.load('level_0.txt');//关卡0
Base.game = 'run';//游戏状态初始化正常
console.log('----test-basic_move----')
/*
*地图编辑的接口见Map.js
*/

var myBase = new Base("sys","move_up","move")//添加移动操作
var myBase1 = new Base("sys","move_left","move")
var myBase2 = new Base("sys","move_up","move")
var myBase3 = new Base("sys","move_right","move")

Base.bmap.print();
myBase.run()//执行指令
console.log('----test-my_function----')


var mytask =  new Array(Base)//自定义函数任务集
mytask[0] = myBase1//定义函数内部第一条指令
mytask[1] = myBase2
// mytask[2] = myBase3
var myBase4 = new Base("user","my_function","function",mytask)//自定义函数
myBase4.run()

console.log('-----test-loop---')

var mytask1 =  new Array(Base)//自定义函数任务集
mytask1[0] = myBase1
mytask1[1] = myBase2
// mytask1[2] = myBase3
// mytask1[3] = myBase4

var myBase5 = new Base("sys","loop","function",mytask1,2)//循环执行任务集
myBase5.run()

console.log('-----test-check---')

console.log('-----test-while---')

console.log('-----test-AI---')

