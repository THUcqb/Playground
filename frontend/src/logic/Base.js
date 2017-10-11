import Snake from './Snake';

import Map from './Map';

export class Base_state{
	constructor(cur)
	{
		this.cur = cur;
		this.loop_time = 0;
		this.state = "runnable";
	}
	clear()
	{
		this.loop_time = 0;
	}
	next()
	{
		if (this.cur.type === "user")
		{
			this.next_move();
		}
		else
			if (this.cur.type === "sys") 
			{
				if (this.cur.name === "loop") 
				{
					this.next_move();
					// console.log(this.check_move());
				}
				else 
				if (this.cur.name === "do_while")
				{

				}
				else 
				if (this.cur.name === "while_do") 
				{

				}
				else
				{
					this.cur = this.cur.next;
					this.next_move();
				}
			}
			else
			if (this.cur.type === "success") 
			{
				// console.log("success");
				this.cur.state = "success";
				this.state = "success";
			}
			else
			if (this.cur.type === "fail") 
			{
				// console.log("fail");
				this.cur.state = "fail";
				this.state = "fail";
			}
			else
			{
				// console.log("err");
				this.cur.state = "err";
				this.state = "err";
			}
		this.cur.run();
	}

	check_move()
	{
		if (this.cur.name === "loop") {return "movelist";}
		if (this.cur.name === "do_while") {return "movelist";}
		if (this.cur.name === "while_do") {return "movelist";}
		if (this.cur.type === "user") {return "movelist";}

		if (this.cur.name === "move_up") {return "move";}
		if (this.cur.name === "move_down") {return "move";}
		if (this.cur.name === "move_left") {return "move";}
		if (this.cur.name === "move_right") {return "move";}

		return "end";
	}

	next_move()
	{
		while (this.check_move() === "movelist")
		{
			// console.log(">")
			if (Number(this.cur.time) === 0) 
			{
				this.cur = this.cur.next
			}
			else if (this.cur.time > 0)
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
		let s = "";
		if (str === "check_move") 
		{
			return 'null'
		}
		else
		if (str === "check_move_up") 
		{
			let _x = Base.bsnake.x-1 ;
			let _y = Base.bsnake.y ;
			s = this.runnable(_x,_y);
		}
		else
		if (str === "check_move_down") 
		{
			let _x = Base.bsnake.x+1;
			let _y = Base.bsnake.y ;
			s = this.runnable(_x,_y);
		}
		else
		if (str === "check_move_left") 
		{
			let _x = Base.bsnake.x ;
			let _y = Base.bsnake.y-1 ;
			s = this.runnable(_x,_y);
		}
		else
		if (str === "check_move_right") 
		{
			let _x = Base.bsnake.x ;
			let _y = Base.bsnake.y+1 ;
			s = this.runnable(_x,_y);
		}
		else
		if (str === "check_aim") 
		{	let _x = Base.bsnake.x ;
			let _y = Base.bsnake.y+1 ;
			s = this.runnable(_x,_y);
			if (s === 'candy') {return 'runnable';}
			return 'null';
		}
		else
		if (str === "check_toaim") 
		{}
		else
		if (str === "check_vtoaim") 
		{}

		if (s === 'runnable') {return s;}
		if (s === 'candy') {return 'runnable';}
		return 'null';

	}

	do_while()
	{
		try
		{
			do
			{
				for (let variable in this.task.tasklist)
				{ 
					this.task.tasklist[variable].run()
				}
			}
			while (check.state === "runnable")
		}
		catch(err)
		{
			// console.log(err)
		}
	}

	while_do()
	{
		try
		{
			while (this.self.check(check))
			{
				for (let variable in this.task.tasklist)
				{ 
				this.task.tasklist[variable].run()
				}
			}
		
		}
		catch(err)
		{
			// console.log(err)
		}
	}

	loop()
	{
		for (let i = 0; i < this.time; i++)
		{
			for (let variable in this.task.tasklist)
			{ 
				this.task.tasklist[variable].run()
			}
		}
	}

	runnable(x,y)
	{	
		if (x<0 || x>=10) {return'err';}
		if (y<0 || y>=10) {return'err';}
		if (Number(Base.bmap.block_list[x][y].info) === 2) {return'candy';}
		if (Number(Base.bmap.block_list[x][y].info) === 0) {return'runnable';}
		return 'err';
	}

	base_move(_x,_y)
	{
		if (this.runnable(_x,_y) === 'candy') 
		{
			
			Base.bmap.set_body(Base.bsnake.x,Base.bsnake.y);
			let __x = Base.bsnake.body[0].x;
			let __y = Base.bsnake.body[0].y;
			Base.bmap.set_tail(__x,__y);
			Base.bsnake.add_head(_x,_y);
			Base.bmap.set_head(_x,_y);
		}
		else
			if (this.runnable(_x,_y) === 'runnable') 
			{
				// console.log(Base.bsnake.size)
				Base.bmap.set_body(Base.bsnake.x,Base.bsnake.y);
				let __x = Base.bsnake.body[0].x;
				let __y = Base.bsnake.body[0].y;
				// console.log(__x,__y);
				
				Base.bmap.set_empty(__x,__y);

				Base.bsnake.add_head(_x,_y);
				// console.log(Base.bsnake.size)
				Base.bsnake.del_tail();
				__x = Base.bsnake.body[0].x;
				__y = Base.bsnake.body[0].y;
				Base.bmap.set_tail(__x,__y);

				Base.bmap.set_head(_x,_y);
			
				// console.log(Base.bsnake.size)
				
			}
		// Base.bmap.print();
	}

	move_up()
	{
		let _x = Base.bsnake.x-1 ;
		let _y = Base.bsnake.y ;
		this.base_move(_x,_y);
		
	}
	
	move_down()
	{
		let _x = Base.bsnake.x+1;
		let _y = Base.bsnake.y ;
		this.base_move(_x,_y);

	}
	move_left()
	{
		let _x = Base.bsnake.x ;
		let _y = Base.bsnake.y-1 ;
		this.base_move(_x,_y);

	}
	move_right()
	{
		let _x = Base.bsnake.x ;
		let _y = Base.bsnake.y+1;
		this.base_move(_x,_y);

	}
	run()
	{
	// console.log(this.type+"/"+this.name)

	if (this.type === "sys") {
		if (this.name === "move_up")
		{
			this.move_up();
		}
		else 
		if (this.name === "move_down")
		{
			this.move_down();
		} 
		else
		if (this.name === "move_left")
		{
			this.move_left();
		} 
		else
		if (this.name === "move_right")
		{
			this.move_right();
		} 
		else
		if (this.name === "vmove_up")
		{} 
		else
		if (this.name === "vmove_down")
		{} 
		else
		if (this.name === "vmove_left")
		{}
		else 
		if (this.name === "vmove_right")
		{}
		else
		if (this.name === "loop")
		{
			this.loop();
		}
		else
		if (this.name === "do_while")
		{
			this.do_while();
		}
		else
		if (this.name === "while_do")
		{
			this.while_do();
		} 
			
		} else 
		if (this.type === "user") 
		{
			for (let variable in this.task.tasklist)
			{ 
				this.task.tasklist[variable].run()
			}
		}
		else
		if (this.type === "check") 
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
		for (let variable in this.userBase)
		{ 
			if (this.userBase[variable].name === name) {
				return this.userBase[variable];
			}
		}
		return this.base;
	}

}

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

