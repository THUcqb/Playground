import {Base,Base_state,Base_task} from './Base';

export class Controller{
	constructor()
	{
		this.begin = Base.begin;
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
	}

}