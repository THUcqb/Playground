import {Base,Base_task} from './Base';
import {Base_state} from './Base_state';

export class Controller{
	constructor()
	{
		this.begin = Base.begin;
		this.state = "runnable";
		Base.bmap.load(0);

        let usertask = new Base_task(this.begin)//将任务列表指向初始节点
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
