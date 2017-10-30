import Snake from './Snake';
import {Base_state} from './Base_state';
import Map from './Map';

export class Base_task{
	constructor(begin){
		this.begin = begin;
		this.tasklist = [];
		this.size = 0;
	}
	/**
	 * add a task in tasklist
	 * @param {[Base]}  
	 */
	add(task){
		this.tasklist[this.size] = task;

		if (this.size > 0) {
			this.tasklist[this.size-1].link(this.tasklist[this.size]);
		}
		this.tasklist[this.size].link(this.begin);
		this.size+=1;
	}
}

export class Base {
	constructor(type,name,check) {
		this.type = type;
		this.name = name;
		this.time = 1;
		this.cur_time = 1;
		this.check = check;
	}

	/**
	 * link current task to next task
	 * @param  {Function} next : naxt task
	 */
	link(next){
		this.next = next;
	}
	/**
	 * add tasklist for Base unit
	 * @param {[Base_task]} tasklist 
	 */
	set_task(tasklist){
		this.task = tasklist;
	}
	/**
	 * set run time for tasklist
	 * @param {[int]} time 
	 */
	set_time(time){
		this.time = time;
		this.cur_time = time;
	}
	/**
	 * set else branch for Base unit 
	 * "if...else do else_tasklist "
	 * @param {[Base_task]} else_tasklist [description]
	 */
	set_else(else_tasklist){
		this.else_task = else_tasklist;
	}
	/**
	 * set check info "move" "check_move_up" ...
	 * see also the function Check()
	 * @param {[String]} check
	 */
	set_check(check){
		this.check = check;
	}
	/**
	 * chek point(x,y) if "runnable" or have "candy"
	 */
	runnable(x,y){	
		if (x<0 || x>=10) {return'err';}
		if (y<0 || y>=10) {return'err';}
		if (Number(Base.bmap.block_list[x][y].info) === 2) {return'candy';}
		if (Number(Base.bmap.block_list[x][y].info) === 0) {return'runnable';}
		return 'err';
	}
	/**
	 * Based on the check info check current state if right or not
	 * runnable : the check info is right
	 * null: current state is missing or wrong
	 */
	Check(str){
		let s = "";
		if (str === "true") {
			return 'runnable'
		}
		else
		if (str === "false") {
		return 'null'
		}
		else
		if (str === "check_move_up") {
			let _x = Base.bsnake.x-1 ;
			let _y = Base.bsnake.y ;
			s = this.runnable(_x,_y);
		}
		else
		if (str === "check_move_down") {
			let _x = Base.bsnake.x+1;
			let _y = Base.bsnake.y ;
			s = this.runnable(_x,_y);
		}
		else
		if (str === "check_move_left") {
			let _x = Base.bsnake.x ;
			let _y = Base.bsnake.y-1 ;
			s = this.runnable(_x,_y);
		}
		else
		if (str === "check_move_right") {
			let _x = Base.bsnake.x ;
			let _y = Base.bsnake.y+1 ;
			s = this.runnable(_x,_y);
		}
		else
		if (str === "check_aim") {	
			let _x = Base.bsnake.x ;
			let _y = Base.bsnake.y ;
			s = this.runnable(_x,_y);
			if (s === 'candy') {return 'runnable';}
			return 'null';
		}
		else
		if (str === "check_toaim") {}
		else
		if (str === "check_vtoaim") {}

		if (s === 'runnable') {return s;}
		if (s === 'candy') {return 'runnable';}
		return 'null';

	}
	/**
	 * run the Base unit tasklist base on do while
	 */
	do_while(){
		try{
			do{
				for (let variable in this.task.tasklist){ 
					if (this.task.tasklist.hasOwnProperty(variable))
						this.task.tasklist[variable].run()
				}
			}
			while (Base.Check(check) === "runnable")
		}
		catch(err){
			console.log(err)
		}
	}
	/**
	 * run the Base unit tasklist base on while do 
	 */
	while_do(){
		try{
			while (Base.Check(check)){
				for (let variable in this.task.tasklist){ 
					if (this.task.tasklist.hasOwnProperty(variable))
						this.task.tasklist[variable].run()
				}
			}
		
		}
		catch(err){
			console.log(err)
		}
	}
	/**
	 * run the Base unit tasklist base on for loop
	 */
	loop(){
		for (let i = 0; i < this.time; i++){
			for (let variable in this.task.tasklist){ 

				if (this.task.tasklist.hasOwnProperty(variable))
					this.task.tasklist[variable].run()
			}
		}
	}

	/**
	 * base_move change snake and map info by task
	 */

	base_move(_x,_y){
		if (this.runnable(_x,_y) === 'candy') {
			
			Base.bmap.set_body(Base.bsnake.x,Base.bsnake.y);
			let __x = Base.bsnake.body[0].x;
			let __y = Base.bsnake.body[0].y;
			Base.bmap.set_tail(__x,__y);
			Base.bsnake.add_head(_x,_y);
			if (Base.bmap.state = "down")
				Base.bmap.set_slot(_x,_y);
			Base.bmap.set_head(_x,_y);
		}
		else
			if (this.runnable(_x,_y) === 'runnable') {
				Base.bmap.set_body(Base.bsnake.x,Base.bsnake.y);
				let __x = Base.bsnake.body[0].x;
				let __y = Base.bsnake.body[0].y;
				Base.bmap.set_empty(__x,__y);
				Base.bsnake.add_head(_x,_y);
				Base.bsnake.del_tail();
				__x = Base.bsnake.body[0].x;
				__y = Base.bsnake.body[0].y;
				Base.bmap.set_tail(__x,__y);
				if (Base.bmap.state = "down")
					Base.bmap.set_slot(_x,_y);
				Base.bmap.set_head(_x,_y);
			}
	}
	/**
	 *  snake move up one step
	 */

	move_up(){
		let _x = Base.bsnake.x-1 ;
		let _y = Base.bsnake.y ;
		this.base_move(_x,_y);
	}
	/**
	 *  snake move down one step
	 */

	move_down(){
		let _x = Base.bsnake.x+1;
		let _y = Base.bsnake.y ;
		this.base_move(_x,_y);
	}
	/**
	 *  snake move left one step
	 */

	move_left(){
		let _x = Base.bsnake.x ;
		let _y = Base.bsnake.y-1 ;
		this.base_move(_x,_y);
	}
	/**
	 *  snake move right one step
	 */

	move_right(){
		let _x = Base.bsnake.x ;
		let _y = Base.bsnake.y+1;
		this.base_move(_x,_y);
	}
	/**
	 * Base unit will run it's tasklist automatically untill finshed 
	 * Woring: if you want to move one step you'd better use next() in Base__state
	 */
	run(){
		// console.log("run: > "+this.name)
		if (this.type === "sys") {
		if (this.name === "move_up"){
			this.move_up();
		}
		else 
		if (this.name === "move_down"){
			this.move_down();
		} 
		else
		if (this.name === "move_left"){
			this.move_left();
		} 
		else
		if (this.name === "move_right"){
			this.move_right();
		} 
		// else
		// if (this.name === "vmove_up"){} 
		// else
		// if (this.name === "vmove_down"){} 
		// else
		// if (this.name === "vmove_left"){}
		// else 
		// if (this.name === "vmove_right"){}
		else
		if (this.name === "loop"){
			this.loop();
		}
		else
		if (this.name === "do_while"){
			this.do_while();
		}
		else
		if (this.name === "while_do"){
			this.while_do();
		}
		else
		if (this.name === "judge") {
			if (Base.Check(this.check) === "runnable") {
				for (let variable in this.task.tasklist){ 
					if (this.task.tasklist.hasOwnProperty(variable))
					this.task.tasklist[variable].run()
				}
			}
			else{
				for (let variable in this.else_task.tasklist){ 
					if (this.task.tasklist.hasOwnProperty(variable))
					this.task.tasklist[variable].run()
				}
			}
		}  
			
		} else 
		if (this.type === "user") {
			for (let variable in this.task.tasklist){ 
				this.task.tasklist[variable].run()
			}
		}
		
		// Base.bmap.print();
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
Base.game = 'run';//游戏状态初始化正常

