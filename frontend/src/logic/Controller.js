import {Base,Base_state,Base_task} from './Base';

export class Controller{
	constructor()
	{
		this.begin = Base.begin;
		this.state = "runable";
		Base.bmap.load("level_0.txt");
	}
	testInit()
	{
		var base_loop = new Base('sys','loop'); //设置循环函数
		base_loop.set_time(2);//设置循环次数

		var task_loop = new Base_task(base_loop) //Base_task 需要指定父节点
		task_loop.add(new Base("sys","move_up","move"));
		task_loop.add(new Base("sys","move_left","move"));
		base_loop.task = task_loop;//向父节点添加执行列表


		var usertask = new Base_task(this.begin)//将任务列表指向初始节点
		usertask.add(base_loop);//向任务列表添加函数
		usertask.add(new Base("sys","move_down","move"));

		this.begin.task=usertask;
	}

	getMap()
	{
		return Base.bmap;
	}

	getSnake()
	{
		return Base.bsnake;
	}

	next()
	{
		Base.run_state.next();
		return Base.run_state.state; // 返回String: runable, success, fail, err; 
	}
	check_now_state()
	{
		return Base.run_state.state; 
	}

}
