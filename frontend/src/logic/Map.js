import {Block} from './Block';

class MapInfo{
	constructor(level,maps)
	{
		this.level = level;
		this.maps = maps;
	}
}

class Map {
	constructor(SIZE_X, SIZE_Y) {
		this.SIZE_X = SIZE_X;
		this.SIZE_Y = SIZE_Y;
		this.base_address = '/Map/'
	}
	init(file) {
		this.file = file;
	}
	testinit(x,y) {
		let block_list = [];
		for (let i = 0; i < this.SIZE_X; i++) {
			block_list[i] = [];
			for (let n = 0; n < this.SIZE_Y; n++) {
				block_list[i][n] = new Block(i,n);
			}
		}
		this.block_list = block_list;
		this.set_head(x,y);
	}

	//地图地表物体编辑
	set_empty(x,y)
	{
		this.block_list[x][y].info = 0;//空地
	}
	set_block(x,y)
	{
		this.block_list[x][y].info = 1;//占据
	}
	set_candy(x,y)
	{
		this.block_list[x][y].info = 2;//表示积分
	}

	//蛇的贴图分类
	set_head(x,y)
	{
		this.block_list[x][y].info = 3;//头
	}
	set_body(x,y)
	{
		this.block_list[x][y].info = 4;//身体
	}
	set_tail(x,y)
	{
		this.block_list[x][y].info = 5;//尾巴
	}

	//保存编辑的地图

	save() // 不知道API
	{
		let mi = new MapInfo('1','1111000000100002000010010000211000020001000000000110200000000000000200020010000000002001010000000021');
		let acm = JSON.stringify(mi);
		var fetchUrl = require("fetch").fetchUrl
		fetchUrl("http://127.0.0.1:8000/save",{
		    method:"post",
		    headers:{
		        "Content-type":"application:/x-www-form-urlencoded:charset=UTF-8"
		    },
		    body:"save="+acm
		},(function(data){
		    console.log("请求成功，JSON解析后的响应数据为:",data);
		}))
	}

	get() // 不知道API+1
	{
		var fetchUrl = require("fetch").fetchUrl
		fetchUrl("http://127.0.0.1:8000/get",{
		    method:"post",
		    headers:{
		        "Content-type":"application:/x-www-form-urlencoded:charset=UTF-8"
		    },
		    body:"get=MapInfo&MapID='1'"
		},(function(data){
		    console.log("请求成功，JSON解析后的响应数据为:",data);
		}))
	}
	//读取地图
	load(filename)
	{
	
		// let str ="1000000000"{"level":level,"map":str}
		// 		+"0002000100"
		// 		+"1000001102"
		// 		+"1020000211"
		// 		+"1000000000"
		// 		+"0000000002"
		// 		+"2010200011"
		// 		+"0110000000"
		// 		+"0000011010"
		// 		+"2000001000";
		let str = "1111000000"      
				+"1000020000"
				+"1001000021"
				+"1000020001"
				+"0000000001"
				+"1020000000"
				+"0000000200"
				+"0200100000"
				+"0000200101"
				+"0000000021";

		for (let i = 0; i < this.SIZE_X; i++) {
			for (let n = 0; n < this.SIZE_Y; n++) {
				this.block_list[i][n].info = Number(str[i*this.SIZE_X+n]);
			}
		}
		// console.log(str);
	}

	static show_info()
	{
		let mi = new MapInfo('1','1111000000100002000010010000211000020001000000000110200000000000000200020010000000002001010000000021');
		let a = JSON.stringify(mi); 
		console.log(a);
	}
	//控制台输出地图信息
	print()
	{
		let a = this.Ddata();
		console.log(this.SIZE_X + " " + this.SIZE_Y);
		let str = "";
		for (let i = 0; i < this.SIZE_X; i++) {
			for (let n = 0; n < this.SIZE_Y; n++) {
				let test = (a[i][n]);
				let out = "";
				if (test === 2) {out = "@";}
				else
				if (test === 3) {out = "X";}
				else
				if (test === 4) {out = "*";}
				else
				if (test === 5) {out = ".";}
				else
				if (test === 1) {out = "#"}
				else out = " "
				str += out;
			}
			str +="\n";
		}
		console.log(str);
	}
	//返回地图的二维数组，
	Ddata()
	{
		let block_list = [];
		for (let i = 0; i < this.SIZE_X; i++) {
			block_list[i] = [];
			for (let n = 0; n < this.SIZE_Y; n++) {
				block_list[i][n] = this.block_list[i][n].info;

			}
		}

		return block_list;
	}
	//返回消除蛇的地图 //蛇经过的一定是空地。。感觉没有必要加这个
	Edata()
	{
		let block_list = [];
		for (let i = 0; i < this.SIZE_X; i++) {
			block_list[i] = [];
			for (let n = 0; n < this.SIZE_Y; n++) {
				block_list[i][n] = this.block_list[i][n].info;
				if (block_list[i][n] >= 3 && block_list[i][n] <= 5 ) 
				{
					block_list[i][n] = 0;
				}
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

// Map.show_info();


