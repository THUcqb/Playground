console.log("Hello World!");

var user_function_dic = {}

function block(x,y,state,Snake_state)
{
	this.x = x,
	this.y = y,
	this.state = state,
	this.Snake_state = Snake_state;
}


function map(x,y){
	this.size_x = x,
	this.size_y = y,

	this.begin_x = 0,
	this.begin_y = 0,

	this.set_begin_point = function set_begin_point(_x,_y)
	{
		this.begin_x = _x;
		this.begin_y = _y;
	}

	this.init = function init()
	{

	}

	this.build = function build(argument)
	{
		// body...
	}
}


function Base(type,name,state,task,time,check) {
this.type = type,
this.name = name,
this.state = state,
this.task = task,
this.time = time,
this.check = check,

this.run = function run()
    {
        console.log(this.type+"/"+this.name)

        if (type == "sys") {
        	if (name == "move_up")
        	{}
        	else 
        	if (name == "move_down")
        	{} 
        	else
      		if (name == "move_left")
        	{} 
        	else
        	if (name == "move_right")
        	{} 
        	else
        	if (name == "vmove_up")
        	{} 
        	else
        	if (name == "vmove_down")
        	{} 
        	else
      		if (name == "vmove_left")
        	{}
        	else 
        	if (name == "vmove_right")
        	{}
        	else
        	if (name == "loop")
        	{
        		for (var i = 0; i < this.time; i++)
        		{
        			for (variable in task)
					{ 
					    task[variable].run()
					}
        		}
        	}
        	else
        	if (name == "do_while")
        	{
        		try
	        		{
	        			do
		        		{
		        			for (variable in task)
							{ 
							    task[variable].run()
							}
		        		}
		        		while (check.state == "runable")
		        	}
		        catch(err)
		        {
		        	console.log(err)
		        }
        	}
        	else
        	if (name == "while_do")
        	{
        		try
	        		{
	        			while (check.state == "runable")
		        		{
		        			for (variable in task)
							{ 
							    task[variable].run()
							}
		        		}
		        		
		        	}
		        catch(err)
		        {
		        	console.log(err)
		        }
        	} 
        	
        } else 
        if (type == "user") 
        {
        	for (variable in task)
			{ 
			    task[variable].run()
			}
        }
        else
        if (type == "check") 
        {
			if (name == "check_move") {}
			else
			if (name == "check_move_up") 
			{
				if () {}
			}
			else
			if (name == "check_move_down") {}
			else
			if (name == "check_move_left") {}
			else
			if (name == "check_move_right") {}
			else
			if (name == "check_list") {}
			else
			if (name == "check_aim") {}
			else
			if (name == "check_toaim") {}
			else
			if (name == "check_vtoaim") {}
        }
       
    }
}

myMap = new map(10,10)

var Snack = {
	x : myMap.begin_x,
	y : myMap.begin_y,
	body : Array,
}
console.log('----test-move----')

myBase = new Base("sys","move_up","move")
myBase1 = new Base("sys","move_left","move")
myBase2 = new Base("sys","move_up","move")
myBase3 = new Base("sys","move_right","move")

console.log('----test-my_function----')

mytask =  new Array(Base)
mytask[0] = myBase1
mytask[1] = myBase2
mytask[2] = myBase3
myBase4 = new Base("user","my_function","function",mytask)
myBase4.run()

console.log('-----test-loop---')

mytask1 =  new Array(Base)
mytask1[0] = myBase1
mytask1[1] = myBase2
mytask1[2] = myBase3
mytask1[3] = myBase4
myBase5 = new Base("sys","loop","function",mytask1,2)
myBase5.run()


