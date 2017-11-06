import {Base,Base_task} from './Base';
export class Base_state{

	/**
	 * move_state return runstate
	 * snake_state 
	 *      up:    draw
	 *      down:
	 */
	constructor(cur)
	{
		this.cur = cur;
		this.pre = null;
		this.loop_time = 0;
		this.state = "runnable";
		this.move_state = "null";
		this.snake_state = "up";
	}
	/**
	 * return pre state
	 */
	get_pre()
	{
		return this.pre;
	}
	/**
	 * return current state
	 */
	get_cur()
	{
		return this.cur;
	}
	/**
	 * run current task 
	 */
	next()
	{
		this.pre = this.cur;
		if (this.cur.type === "user")
		{
			this.next_move();
		}
		else
			if (this.cur.type === "sys") 
			{
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
			this.tr_run();

			if (Base.bmap.candy === 0)
			{
				this.state = "success";
			}

			console.log(this.cur.name);
			console.log(this.cur.type);
			if (this.cur.type == "fail") 
				{this.state = "fail";}
			console.log(Base.bmap.candy)
			console.log(this.state);

	}

	tr_run()
	{

		if (this.cur.name === "turn_right")
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
		if (this.cur.name === "turn_left")
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
		if (this.cur.name === "turn_left") {return "move";}
		if (this.cur.name === "turn_right") {return "move";}
		if (this.cur.name === "move") {return "move";}

		return "end";
	}

	tr_check()
	{
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
				this.cur = this.cur.next
			}
			else if (this.cur.time > 0)
			{
				this.cur.time -= 1;
				
				if (this.cur.name === "loop" || this.cur.type === "user" ) 
				{
					this.cur = this.cur.task.tasklist[0];
					this.cur.time = this.cur.cur_time;
				}
				else
				if (this.cur.name === "judge")
				{
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
				else
				if (this.cur.name === "while_do") 
				{
					if (this.cur.Check(this.tr_check()) === "runnable")
					{
						this.cur.time = 1;
						this.cur = this.cur.task.tasklist[0];
						this.cur.time = this.cur.cur_time;
					}
					else
					{
						this.cur.time = 0;
						this.cur = this.cur.next
					}
				}
				else
					if (this.cur.name === "do_while")
					{
						this.cur.name = "while_do"
						this.cur.time = 1;
						this.cur = this.cur.task.tasklist[0];
					}
				
			}else 
			{
				this.cur = this.cur.task.tasklist[0];
				this.cur.time = this.cur.cur_time;
			}
		}
	}
}
