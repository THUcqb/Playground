import {Snake} from './Snake';

import {Map} from './Map';

export class Base_state{
	constructor(cur)
	{
		this.cur = cur;
		this.loop_time = 0;
		this.state = "run";
	}
	clear()
	{
		this.loop_time = 0;
	}
	next()
	{

		if (this.cur.type == "user")
		{
			// this.clear();
			// console.log(this.cur.task.tasklist[0]);
			this.next_move();
			// console.log(this.check_move());
			// this.cur = this.cur.task.tasklist[0];
			// return this.cur.task.tasklist[0];
		}
		else
			if (this.cur.type == "sys") 
			{
				if (this.cur.name == "loop") 
				{
					this.next_move();
					console.log(this.check_move());
				}
				else 
				if (this.cur.name == "do_while")
				{

				}
				else 
				if (this.cur.name == "while_do") 
				{

				}
				else
				{
					this.cur = this.cur.next;
					this.next_move();
					// console.log(this.check_move());
					// return this.cur.next;
				}
			}
			else
			if (this.cur.type == "success") 
			{
				console.log("success");
			}
			else
			if (this.cur.type == "fail") 
			{
				console.log("fail");
			}
			else
			{
				console.log("err");
			}

		// console.log(this.cur.type+"/"+this.cur.name);
		this.cur.run();

	}

	check_move()
	{
		if (this.cur.name  == "loop") {return "movelist";}
		if (this.cur.name == "do_while") {return "movelist";}
		if (this.cur.name == "while_do") {return "movelist";}
		if (this.cur.type == "user") {return "movelist";}

		if (this.cur.name == "move_up") {return "move";}
		if (this.cur.name == "move_down") {return "move";}
		if (this.cur.name == "move_left") {return "move";}
		if (this.cur.name == "move_right") {return "move";}

		return "end";
	}

	next_move()
	{
		while (this.check_move() == "movelist")
		{
			// console.log(">")
			if (this.cur.time == 0) 
			{
				this.cur = this.cur.next
			}
			else if(this.cur.time > 0)
			{
				this.cur.time -= 1;
				this.cur = this.cur.task.tasklist[0];
			}else 
			{
				this.cur = this.cur.task.tasklist[0];
			}
		}
	}
}

export class Base_task{
	constructor(begin)
	{
		this.begin = begin;
		this.tasklist = new Array(Base)
		this.size = 0;
	}
	add(task)
	{
		this.tasklist[this.size] = task;

		if (this.size > 0) 
		{
			this.tasklist[this.size-1].link(this.tasklist[this.size]);
		}
		
		this.tasklist[this.size].link(this.begin);
		this.size+=1;

	}


}

export class Base {
	constructor(type,name,task,check) {
		this.type = type;
		this.name = name;
		this.task = task;
		this.time = 1;
		this.check = check;
	}

	link(next)
	{
		this.next = next;
	}
	set_task(task)
	{
		this.task = task;
	}
	set_time(time)
	{
		this.time = time;
	}

	check(str)
	{
		if (str == "check_move") 
		{
			return 'null'
		}
		else
		if (str == "check_move_up") 
		{
			var _x = Base.bsnake.x-1 ;
			var _y = Base.bsnake.y ;
			s = this.runable(_x,_y);
		}
		else
		if (str == "check_move_down") 
		{
			var _x = Base.bsnake.x+1;
			var _y = Base.bsnake.y ;
			s = this.runable(_x,_y);
		}
		else
		if (str == "check_move_left") 
		{
			var _x = Base.bsnake.x ;
			var _y = Base.bsnake.y-1 ;
			s = this.runable(_x,_y);
		}
		else
		if (str == "check_move_right") 
		{
			var _x = Base.bsnake.x ;
			var _y = Base.bsnake.y+1 ;
			s = this.runable(_x,_y);
		}
		else
		if (str == "check_aim") 
		{	var _x = Base.bsnake.x ;
			var _y = Base.bsnake.y+1 ;
			s = this.runable(_x,_y);
			if (s == 'candy') {return 'runable';}
			return 'null';
		}
		else
		if (str == "check_toaim") 
		{}
		else
		if (str == "check_vtoaim") 
		{}

		if (s == 'runable') {return s;}
		if (s == 'candy') {return 'runable';}
		return 'null';

	}

	do_while()
	{
	try
		{
			do
			{
				for (var variable in this.task.tasklist)
				{ 
					this.task.tasklist[variable].run()
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
			while (self.check(check))
			{
				for (var variable in this.task.tasklist)
				{ 
				this.task.tasklist[variable].run()
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
			for (var variable in this.task.tasklist)
			{ 
				this.task.tasklist[variable].run()
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
		{}
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
			for (var variable in this.task.tasklist)
			{ 
				this.task.tasklist[variable].run()
			}
		}
		else
		if (this.type == "check") 
		{
		
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


