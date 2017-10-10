import {Base,Base_state,Base_task} from './Base';

export class Controller{
	constructor()
	{
		this.begin = Base.begin;
		this.state = "runable";
	}

	getMap()
	{
		return Base.map;
	}

	getSnake()
	{
		return Base.Snake;
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