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
		var base_loop_circle_up = new Base('sys','loop'); //设置循环函数
			base_loop_circle_up.set_time(2);//设置循环次数
			var task_loop0 = new Base_task(base_loop_circle_up) //Base_task 需要指定父节点
				task_loop0.add(new Base("sys","move_up","move"));
				task_loop0.add(new Base("sys","move_left","move"));
				task_loop0.add(new Base("sys","move_up","move"));
				task_loop0.add(new Base("sys","move_right","move"));
		base_loop_circle_up.task = task_loop0;//向父节点添加执行列表

		var base_loop_r = new Base('sys','loop'); //设置循环函数
			base_loop_r.set_time(2);//设置循环次数
			var task_loop1 = new Base_task(base_loop_r) //Base_task 需要指定父节点
				task_loop1.add(new Base("sys","move_right","move"));
		base_loop_r.task = task_loop1;//向父节点添加执行列表


		var base_loop_circle_down = new Base('sys','loop'); //设置循环函数
			base_loop_circle_down.set_time(2);//设置循环次数
			var task_loop2 = new Base_task(base_loop_circle_down) //Base_task 需要指定父节点
				task_loop2.add(new Base("sys","move_down","move"));
				task_loop2.add(new Base("sys","move_right","move"));
				task_loop2.add(new Base("sys","move_down","move"));
				task_loop2.add(new Base("sys","move_left","move"));
		base_loop_circle_down.task = task_loop2;//向父节点添加执行列表

		var base_loop_circle_right = new Base('sys','loop'); //设置循环函数
			base_loop_circle_right.set_time(3);//设置循环次数
			var task_loop3 = new Base_task(base_loop_circle_right) //Base_task 需要指定父节点
				task_loop3.add(new Base("sys","move_down","move"));
				task_loop3.add(new Base("sys","move_left","move"));
				task_loop3.add(new Base("sys","move_up","move"));
				task_loop3.add(new Base("sys","move_left","move"));
		base_loop_circle_right.task = task_loop3;//向父节点添加执行列表

		var base_loop_d = new Base('sys','loop'); //设置循环函数
			base_loop_d.set_time(4);//设置循环次数
			var task_loop4 = new Base_task(base_loop_d) //Base_task 需要指定父节点
				task_loop4.add(new Base("sys","move_down","move"));
		base_loop_d.task = task_loop4;//向父节点添加执行列表

		var base_loop_l7 = new Base('sys','loop'); //设置循环函数
			base_loop_l7.set_time(7);//设置循环次数
			var task_loop5 = new Base_task(base_loop_l7) //Base_task 需要指定父节点
				task_loop5.add(new Base("sys","move_right","move"));
		base_loop_l7.task = task_loop5;//向父节点添加执行列表

		var base_loop_circle = new Base('sys','loop'); //设置循环函数
			base_loop_circle.set_time(10);//设置循环次数
			var task_loop6 = new Base_task(base_loop_circle) //Base_task 需要指定父节点
			task_loop6.add(new Base("sys","move_up","move"));
			task_loop6.add(new Base("sys","move_up","move"));
			task_loop6.add(new Base("sys","move_up","move"));
			task_loop6.add(new Base("sys","move_up","move"));
			task_loop6.add(new Base("sys","move_up","move"));
			task_loop6.add(new Base("sys","move_up","move"));
			task_loop6.add(new Base("sys","move_up","move"));
			task_loop6.add(new Base("sys","move_left","move"));
			task_loop6.add(new Base("sys","move_left","move"));
			task_loop6.add(new Base("sys","move_left","move"));
			task_loop6.add(new Base("sys","move_left","move"));
			task_loop6.add(new Base("sys","move_down","move"));
			task_loop6.add(new Base("sys","move_left","move"));
			task_loop6.add(new Base("sys","move_left","move"));
			task_loop6.add(new Base("sys","move_left","move"));
			task_loop6.add(new Base("sys","move_down","move"));
			task_loop6.add(new Base("sys","move_down","move"));
			task_loop6.add(new Base("sys","move_down","move"));
			task_loop6.add(new Base("sys","move_down","move"));
			task_loop6.add(new Base("sys","move_down","move"));
			task_loop6.add(new Base("sys","move_down","move"));
			task_loop6.add(new Base("sys","move_right","move"));
			task_loop6.add(new Base("sys","move_right","move"));
			task_loop6.add(new Base("sys","move_right","move"));
			task_loop6.add(new Base("sys","move_right","move"));
			task_loop6.add(new Base("sys","move_right","move"));
			task_loop6.add(new Base("sys","move_right","move"));
			task_loop6.add(new Base("sys","move_right","move"));
		base_loop_circle.task = task_loop6;//向父节点添加执行列表

		var usertask = new Base_task(this.begin)//将任务列表指向初始节点
		usertask.add(base_loop_circle_up);//向任务列表添加函数
		usertask.add(base_loop_r);
		usertask.add(base_loop_circle_down);
		usertask.add(base_loop_circle_right);
		usertask.add(base_loop_d);
		usertask.add(base_loop_l7);
		usertask.add(base_loop_circle);

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
		// console.log(Base.run_state.cur)
		return Base.run_state.state; // 返回String: runnable, success, fail, err; 
	}
	check_now_state()
	{
		return Base.run_state.state; 
	}

}
