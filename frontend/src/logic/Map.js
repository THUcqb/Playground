import {Block} from './Block';

class Map {
	constructor(SIZE_X, SIZE_Y) {
		this.SIZE_X = SIZE_X;
		this.SIZE_Y = SIZE_Y;
	}
	init(file) {
		this.file = file;
	}
	testinit(x,y) {
		var block_list = [];
		for (var i = 0; i < this.SIZE_X; i++) {
			block_list[i] = new Array(Block);
			for (var n = 0; n < this.SIZE_Y; n++) {
				block_list[i][n] = new Block(i,n);
			}
		}
		this.block_list = block_list;
		this.set_head(x,y);
		// this.set_empty(x,y)
	}

	//地图编辑
	set_empty(x,y)
	{
		this.block_list[x][y].info = 0;
	}
	set_block(x,y)
	{
		this.block_list[x][y].info = 1;
	}
	set_candy(x,y)
	{
		this.block_list[x][y].info = 2;
	}

	//蛇的贴图分类
	set_head(x,y)
	{
		this.block_list[x][y].info = 3;
	}
	set_body(x,y)
	{
		this.block_list[x][y].info = 4;
	}
	set_tail(x,y)
	{
		this.block_list[x][y].info = 5;
	}

	//保存编辑的地图
	save(filename)
	{

	}
	//读取地图
	load(filename)
	{

	}
	//控制台输出地图信息
	print()
	{
		var str = "";
		for (var i = 0; i < this.SIZE_X; i++) {
			for (var n = 0; n < this.SIZE_Y; n++) {
				var test = this.block_list[i][n].info;
				if (test === 2) {test = " ";}
				if (test === 3) {test = "X";}
				if (test === 4) {test = "*";}
				if (test === 5) {test = ".";}

				str +=test;
			}
			str +="\n";
		}
		console.log(str);
	}
	//返回地图的二维数组，
	Ddata()
	{
		var block_list = [];
		for (var i = 0; i < this.SIZE_X; i++) {
			block_list[i] = [];
			for (var n = 0; n < this.SIZE_Y; n++) {
				block_list[i][n] = this.block_list[i][n].info;
			}
		}

		return block_list;
	}
	Data()
	{
		return this.block_list;
	}
}

export default Map;
