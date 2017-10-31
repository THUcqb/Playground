import {Block} from './Block';
class Snake {
	constructor(x,y)
	{
		this.x = x;
		this.y = y;
		this.info = 0;
		this.body = new Array(Block);
		this.body[0] = new Block(x,y);
		this.size = 1;
		// this.add_head(x - 1,y)
		this.state = "up";
	}
	/**
	 * add new head for snake
	 */
	add_head(x,y)
	{
		this.x = x;
		this.y = y;
		this.body[this.size] = new Block(x,y);
		this.size +=1;
	}
	/**
	 * delete current tail for snake
	 */
	del_tail()
	{
		var cur = new Array(Block);
		for (var i = 1; i < this.body.length; i++) {
			cur[i-1] = this.body[i];
		}
		this.body = cur;
		this.size -= 1;
	}
	/**
	 * init snake and set birth point(x,y)
	 */
	init(x,y)
	{
		this.x = x;
		this.y = y;
		var cur = new Array(Block);
		cur[0] = new Block(x,y);
		this.body = cur;
	}
}

export default Snake;
