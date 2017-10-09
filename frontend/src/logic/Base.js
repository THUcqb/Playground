import {Snake} from './Snake';

import {Map} from './Map';

export class Base {
	constructor(type,name,state,task,time,check) {
		this.type = type;
		this.name = name;
		this.state = state;
		this.task = task;
		this.time = time;
		this.check = check;
	}
	do_while()
	{
	try
		{
			do
			{
				for (variable in this.task)
				{ 
					this.task[variable].run()
				}
			}
			while (check.state == "runable")
		}
		catch(err)
		{
			console.log(err)
		}
	}

	while_do()
	{
		try
		{
			while (check.state == "runable")
			{
				for (variable in this.task)
				{ 
				this.task[variable].run()
				}
			}
		
			}
			catch(err)
			{
			console.log(err)
		}
	}

	loop()
	{
		for (var i = 0; i < this.time; i++)
		{
			for (var variable in this.task)
			{ 
				this.task[variable].run()
			}
		}
	}

	runable(x,y)
	{	
		if (x<0 || x>=10) {return'err';}
		if (y<0 || y>=10) {return'err';}
		if (Base.bmap.block_list[x][y].info == 2) {return'candy';}
		if (Base.bmap.block_list[x][y].info == 0) {return'runable';}
		return 'err';
	}

	base_move(_x,_y)
	{
		if (this.runable(_x,_y) == 'candy') 
		{
			
			Base.bmap.set_body(Base.bsnake.x,Base.bsnake.y);
			var __x = Base.bsnake.body[0].x;
			var __y = Base.bsnake.body[0].y;
			Base.bmap.set_tail(__x,__y);
			Base.bsnake.add_head(_x,_y);
			Base.bmap.set_head(_x,_y);
		}
		else
			if (this.runable(_x,_y) == 'runable') 
			{

				Base.bmap.set_body(Base.bsnake.x,Base.bsnake.y);
				var __x = Base.bsnake.body[0].x;
				var __y = Base.bsnake.body[0].y;
				Base.bmap.set_tail(__x,__y);
				Base.bsnake.add_head(_x,_y);
				Base.bmap.set_head(_x,_y);
				console.log(__x,__y);
				Base.bmap.set_empty(__x,__y);
				Base.bsnake.del_tail();
			}
		Base.bmap.print();
	}

	move_up()
	{
		var _x = Base.bsnake.x-1 ;
		var _y = Base.bsnake.y ;
		this.base_move(_x,_y);
		
	}
	
	move_down()
	{
		var _x = Base.bsnake.x+1;
		var _y = Base.bsnake.y ;
		this.base_move(_x,_y);

	}
	move_left()
	{
		var _x = Base.bsnake.x ;
		var _y = Base.bsnake.y-1 ;
		this.base_move(_x,_y);

	}
	move_right()
	{
		var _x = Base.bsnake.x ;
		var _y = Base.bsnake.y+1;
		this.base_move(_x,_y);

	}
	run()
	{
	console.log(this.type+"/"+this.name)

	if (this.type == "sys") {
		if (this.name == "move_up")
		{
			this.move_up();
		}
		else 
		if (this.name == "move_down")
		{
			this.move_down();
		} 
		else
		if (this.name == "move_left")
		{
			this.move_left();
		} 
		else
		if (this.name == "move_right")
		{
			this.move_right();
		} 
		else
		if (this.name == "vmove_up")
		{} 
		else
		if (this.name == "vmove_down")
		{} 
		else
		if (this.name == "vmove_left")
		{}
		else 
		if (this.name == "vmove_right")
		{}
		else
		if (this.name == "loop")
		{	this.loop();	}
		else
		if (this.name == "do_while")
		{

		}
		else
		if (this.name == "while_do")
		{

		} 
			
		} else 
		if (this.type == "user") 
		{
			for (var variable in this.task)
			{ 
				this.task[variable].run()
			}
		}
		else
		if (this.type == "check") 
		{
		if (this.name == "check_move") {}
		else
		if (this.name == "check_move_up") 
		{}
		else
		if (this.name == "check_move_down") {}
		else
		if (this.name == "check_move_left") {}
		else
		if (this.name == "check_move_right") {}
		else
		if (this.name == "check_list") {}
		else
		if (this.name == "check_aim") {}
		else
		if (this.name == "check_toaim") {}
		else
		if (this.name == "check_vtoaim") {}
		}  
	}
}



class UserBaseManager{
	constructor(){
		this.userBase = new Array(Base);
		this.counter = 0;
		this.base = 'null';
	}

	add_base(a){
		this.userBase[this.counter] = a;
	}

	find_base_by_name(name)
	{
		for (variable in this.userBase)
		{ 
			if (this.userBase[variable].name == name) {
				return this.userBase[variable];
			}
		}
		return this.base;
	}

}


