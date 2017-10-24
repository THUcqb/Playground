import {Base,Base_task} from './Base';
import {Base_state} from './Base_state';

export class Controller{
	constructor()
	{
		this.begin = Base.begin;
		this.state = "runnable";
		Base.bmap.load("level_0.txt");
	}

    init()
    {
        let usertask = new Base_task(this.begin)//将任务列表指向初始节点

        this.begin.task=usertask;
    }

    testInit()
	{
		let usertask = new Base_task(this.begin)//将任务列表指向初始节点
		let judge = new Base("sys","judge","move");
			let true_task = new Base_task(judge);
			let false_task = new Base_task(judge);

			true_task.add(new Base("sys","move"));
			false_task.add(new Base("sys","tuun_left"));

			judge.set_task(true_task);
			judge.set_else(false_task);

		let while_do = new Base("sys","while_do","true");
			let while_do_task = new Base_task(while_do);
			while_do_task.add(judge);
			while_do.set_task(while_do_task);

		usertask.add(while_do);//向任务列表添加函数
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

	step()
	{
		Base.run_state.next();
	}

	current_state()
	{
		return Base.run_state.state; 
	}
}

Controller.controller = new Controller();
