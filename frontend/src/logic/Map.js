import {Block} from './Block';
import axios from 'axios';
import {URL,SAVEMAP,LOADMAP}from '../config/Api';
import {level0,level1,level2,level3,level4} from './Maplevel';
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
	}
	/**
	 * init map info and set the birth place of snake
	 * @param  {[int]} x 
	 * @param  {[int]} y 
	 * 
	 */
	testinit(x,y) {
		let block_list = [];
		for (let i = 0; i < this.SIZE_X; i++) {
			block_list[i] = [];
			for (let n = 0; n < this.SIZE_Y; n++) {
				block_list[i][n] = new Block(i,n);
			}
		}
		this.block_list = block_list;
		this.loacalmap = [];
		this.loacalmap[0] = (level0);
		this.loacalmap[1] = (level1);
		this.loacalmap[2] = (level2);
		this.loacalmap[3] = (level3);
		this.loacalmap[4] = (level4);
		console.log(this.loacalmap);
		this.set_head(x,y);
	}

	/**
	 * set point(x,y) state empty 
	 */
	set_empty(x,y)
	{
		this.block_list[x][y].info = 0;//空地
	}
	/**
	 * set point(x,y) state block
	 */
	set_block(x,y)
	{
		this.block_list[x][y].info = 1;//占据
	}
	/**
	 * set point(x,y) state candy 
	 */
	set_candy(x,y)
	{
		this.block_list[x][y].info = 2;//表示积分
	}

	/**
	 * set the head of snake
	 */
	set_head(x,y)
	{
		this.block_list[x][y].info = 3;//头
	}
	/**
	 * set the boday of snake
	 */
	set_body(x,y)
	{
		this.block_list[x][y].info = 4;//身体
	}
	/**
	 * set the tail of snake
	 */
	set_tail(x,y)
	{
		this.block_list[x][y].info = 5;//尾巴
	}

	
	/**
	 * save map
	 * (int)level the level of map 
	 * (String) maps : map info 
	 */
	save(level,maps)
	{
		return axios.post(URL + SAVEMAP,
		{
			level,
			maps,
		})
		.then(function (response) {
			return response.data;
		})
		.catch(function (error){
			throw error;
		});

	}
	/**
	 * load map by level 
	 * (int)level the level of map
	 */

	load(level) 
	{
		let str = this.loacalmap[level];
		for (let i = 0; i < this.SIZE_X; i++) {
				for (let n = 0; n < this.SIZE_Y; n++) {
					let info = Number(str[i*this.SIZE_X+n]);

					this.block_list[i][n].info = info;
					if (info == 2) 
					{
						this.candy+=1;
					}
				}
			}


		// return axios.post(URL + LOADMAP,
		// {
		// 	level,
		// })
		// .then(function (response) {

		// 	let str = response.data;
		// 	this.candy = 0;
		// 	for (let i = 0; i < this.SIZE_X; i++) {
		// 		for (let n = 0; n < this.SIZE_Y; n++) {
		// 			let info = Number(str[i*this.SIZE_X+n]);

		// 				this.block_list[i][n].info = info;
		// 				if (info == 2) 
		// 				{
		// 					this.candy+=1;
		// 				}
		// 		}
		// 	}
		// 	return response.data
		// })
		// .catch(function (error){
		// 	throw error;
		// });
	}
	/**
	 * used for test
	 */
	tsetload(filename)
	{
	
		
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
		
	}
	/**
	 * used for test
	 */
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
	/**
	 * (string list)return map info with snake
	 */
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
	/**
	 * (string list)return map info without snake
	 */
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
	/**
	 * return map Basic info
	 */
	Data()
	{
		return this.block_list;
	}
}

export default Map;

Map.show_info();


