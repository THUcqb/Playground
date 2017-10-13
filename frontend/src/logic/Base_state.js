import {Base,Base_task} from './Base';
export class Base_state{
	constructor(cur)
	{
		this.cur = cur;
		this.loop_time = 0;
		this.state = "runnable";
		this.move_state = "null";
	}
	clear()
	{
		this.loop_time = 0;
	}
	next()
	{
		console.log("in")
		if (this.cur.type === "user")
		{

			this.next_move();
		}
		else
			if (this.cur.type === "sys") 
			{
				console.log("sys - type"+this.cur.name)
				if (this.cur.name === "loop") 
				{
					this.next_move();
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
				this.cur.state = "success";
				this.state = "success";
			}
			else
			if (this.cur.type === "fail") 
			{
				this.cur.state = "fail";
				this.state = "fail";
			}
			else
			{
				this.cur.state = "err";
				this.state = "err";
			}
			console.log(">:")
			console.log(this.cur)
			this.tr_run();
			
	}
	tr_run()
	{
		console.log("> tr_run :" + this.move_state)
		console.log("> name :" + this.cur.name)

		if (this.cur.name === "trun_right")
		{
			if (this.move_state === "null" || this.move_state === "move_up")
			{
				this.move_state = "move_right";
				let a = new Base("sys","move_right");
				a.run();
			}else
			if (this.move_state === "move_right")
			{
				this.move_state = "move_down";
				let a = new Base("sys","move_down");
				a.run();
			}else
			if (this.move_state === "move_down")
			{
				this.move_state = "move_left";
				let a = new Base("sys","move_left");
				a.run();
			}else
			if (this.move_state === "move_left")
			{
				this.move_state = "move_up";
				let a = new Base("sys","move_up");
				a.run();
			}
			

		}
		else
		if (this.cur.name === "trun_left")
		{
			if (this.move_state === "null" || this.move_state === "move_up")
			{
				this.move_state = "move_left";
				let a = new Base("sys","move_left");
				a.run();
			}else
			if (this.move_state === "move_left")
			{
				this.move_state = "move_down";
				let a = new Base("sys","move_down");
				a.run();
			}else
			if (this.move_state === "move_down")
			{
				this.move_state = "move_right";
				let a = new Base("sys","move_right");
				a.run();
			}else
			if (this.move_state === "move_right")
			{
				this.move_state = "move_up";
				let a = new Base("sys","move_up");
				a.run();
			}
		}	
		else
		if (this.cur.name === "move") 
		{
			if (this.move_state === "null" || this.move_state === "move_up")
			{
				this.move_state = "move_up";
				let a = new Base("sys","move_up");
				a.run();
			}
			else
			if (this.move_state === "move_left")
			{
				this.move_state = "move_left";
				let a = new Base("sys","move_left");
				a.run();
			}else
			if (this.move_state === "move_down")
			{
				this.move_state = "move_down";
				let a = new Base("sys","move_down");
				a.run();
			}else
			if (this.move_state === "move_right")
			{
				this.move_state = "move_right";
				let a = new Base("sys","move_right");
				a.run();
			}

		}
		else
		{
			this.cur.run();
		}
					
	}

	check_move()
	{
		if (this.cur.name === "loop") {return "movelist";}
		if (this.cur.name === "do_while") {return "movelist";}
		if (this.cur.name === "while_do") {return "movelist";}
		if (this.cur.name === "judge") {return "movelist";}
		if (this.cur.type === "user") {return "movelist";}

		if (this.cur.name === "move_up") { this.move_state = "move_up";return "move";}
		if (this.cur.name === "move_down") { this.move_state = "move_down";return "move";}
		if (this.cur.name === "move_left") {this.move_state = "move_left";return "move";}
		if (this.cur.name === "move_right") {this.move_state = " move_right";return "move";}
		if (this.cur.name === "trun_left") {return "move";}
		if (this.cur.name === "trun_right") {return "move";}
		if (this.cur.name === "move") {return "move";}

		return "end";
	}

	tr_check()
	{
		console.log("check :>>"+this.cur.check)
		if (this.cur.check === "move") 
		{
			if (this.move_state === "move_up"||this.move_state === "null") {return "check_move_up"}
			if (this.move_state === "move_down") {return "check_move_down"}
			if (this.move_state === "move_left") {return "check_move_left"}
			if (this.move_state === "move_right") {return "check_move_right"}
		}

		return this.cur.check;
	}

	next_move()
	{
		while (this.check_move() === "movelist")
		{
			if (Number(this.cur.time) === 0) 
			{
				// console.log("----->")
				// console.log(this.cur)
				this.cur = this.cur.next

			}
			else if (this.cur.time > 0)
			{
				// console.log("----->")
				// console.log(this.cur)
				this.cur.time -= 1;
				
				if (this.cur.name === "loop" || this.cur.type === "user" ) 
				{
					// console.log("------------------------list_loop_user")
					this.cur = this.cur.task.tasklist[0];
					this.cur.time = this.cur.cur_time;
				}
				else
				if (this.cur.name === "judge")
				{
					// console.log("-------------------------list_judge")
					console.log(this.tr_check())
					console.log(this.cur.Check(this.tr_check()))
					if (this.cur.Check(this.tr_check()) === "runnable") 
					{
						this.cur = this.cur.task.tasklist[0];
						this.cur.time = this.cur.cur_time;	
					}
					else
					{
						this.cur = this.cur.else_task.tasklist[0];
						this.cur.time = this.cur.cur_time;	
					}
				}
				
			}else 
			{
				this.cur = this.cur.task.tasklist[0];
				this.cur.time = this.cur.cur_time;
			}
		}
	}
}
