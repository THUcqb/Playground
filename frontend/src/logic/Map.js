import {Block} from './Block';
import axios from 'axios';
import {URL, SAVEMAP, LOADMAP} from '../config/api';
import {level0, level1, level2, level3, level4, level5} from './Maplevel';
import {Base} from './Base';
import {BaseMapInfo,SlotMapInfo} from './ConstInfo';

class MapInfo
{
    constructor(level, maps)
    {
        this.level = level;
        this.maps = maps;
        this.candy = 0;
    }
}

class Map
{
    constructor(SIZE_X, SIZE_Y)
    {
        this.SIZE_X = SIZE_X;
        this.SIZE_Y = SIZE_Y;
        this.candy = 0;
    }

    /**
     * init map with empty block_list
     */
    editInit()
    {
        let block_list = [];
        let slot_map = [];
        for (let i = 0; i < this.SIZE_X; i++)
        {
            block_list[i] = [];
            slot_map[i] = [];
            for (let n = 0; n < this.SIZE_Y; n++)
            {
                block_list[i][n] = new Block(i, n);
                slot_map[i][n] = 0;
            }
        }
        this.block_list = block_list;
    }

    /**
     * init map info and set the birth place of snake
     * @param  {Number} x
     * @param  {Number} y
     */
    testInit(x, y)
    {
        let block_list = [];
        let slot_map = [];
        for (let i = 0; i < this.SIZE_X; i++)
        {
            block_list[i] = [];
            slot_map[i] = [];
            for (let n = 0; n < this.SIZE_Y; n++)
            {
                block_list[i][n] = new Block(i, n);
                slot_map[i][n] = 0;
            }
        }
        this.block_list = block_list;
        this.loacalmap = [];
        this.loacalmap[0] = (level0);
        this.loacalmap[1] = (level1);
        this.loacalmap[2] = (level2);
        this.loacalmap[3] = (level3);
        this.loacalmap[4] = (level4);
        this.loacalmap[5] = (level5);
        this.setHead(x, y);
    }

    /**
     * set point(x,y) state empty
     */
    setEmpty(x, y)
    {
        this.block_list[x][y].info = BaseMapInfo.getElementsByTagName('empty');//空地
    }

    /**
     * set point(x,y) state block
     */
    setBlock(x, y)
    {
        this.block_list[x][y].info = BaseMapInfo.getElementsByTagName('block');//占据
    }

    /**
     * set point(x,y) state candy
     */
    setCandy(x, y)
    {
        this.block_list[x][y].info = BaseMapInfo.getElementsByTagName('gold');;//表示积分
    }

    /**
     * set the head of snake
     */
    setHead(x, y)
    {
        this.block_list[x][y].info = BaseMapInfo.getElementsByTagName('head');//头
    }

    /**
     * set the body of snake
     */
    setBody(x, y)
    {
        this.block_list[x][y].info = BaseMapInfo.getElementsByTagName('body');//身体
    }

    /**
     * set the tail of snake
     */
    setTail(x, y)
    {
        this.block_list[x][y].info = BaseMapInfo.getElementsByTagName('tail');//尾巴
    }

    /**
     * draw slot of snake head
     */
    setSlot(x, y)
    {
        this.slot_map[x][y].info = SlotMapInfo.getElementsByTagName('block');
    }

    /**
     * save map
     * (String)name the name of map
     * (String) maps : map info
     */
    static save(name, maps)
    {
        return axios.post(URL + SAVEMAP,
            {
                name,
                maps,
            })
            .then(function (response)
            {
                return response.data;
            })
            .catch(function (error)
            {
                throw error;
            });
    }

    static editSave(name, maps)
    {

        Map.save(name, maps.sData);
    }

    /**
     * load map after
     */

    reloadEditorMap(map)
    {
        this.block_list = map.block_list;
        this.SIZE_X = map.SIZE_X;
        this.SIZE_Y = map.SIZE_Y;
        this.candy = 0;

        let slot_map = [];
        for (let i = 0; i < this.SIZE_X; i++)
        {
            slot_map[i] = [];
            for (let n = 0; n < this.SIZE_Y; n++)
            {
                if (this.block_list[i][n].info === BaseMapInfo.getElementsByTagName('birthplace'))
                {
                    Base.bsnake.init(i, n);
                    this.setHead(i, n);
                }
                if (this.block_list[i][n].info === BaseMapInfo.getElementsByTagName('gold'))
                {
                    this.candy += 1;
                }
                slot_map[i][n] = 0;
            }
        }

        this.slot_map = slot_map;
    }


    /**
     * load map by level
     * (int)level the level of map
     */

    load(level)
    {
        this.candy = 0;
        let str = this.loacalmap[level];
        for (let i = 0; i < this.SIZE_X; i++)
        {
            for (let n = 0; n < this.SIZE_Y; n++)
            {
                let info = Number(str[i * this.SIZE_X + n]);

                this.block_list[i][n].info = info;
                if (info === 2)
                {
                    this.candy += 1;
                }
                if (info === 9)
                {
                    Base.bsnake.init(i, n);
                    this.setHead(i, n);
                }
            }
        }


        // return axios.post(URL + LOADMAP,
        // {
        //     level,
        // })
        // .then(function (response) {

        //     let str = response.data;
        //     this.candy = 0;
        //     for (let i = 0; i < this.SIZE_X; i++) {
        //         for (let n = 0; n < this.SIZE_Y; n++) {
        //             let info = Number(str[i*this.SIZE_X+n]);

        //                 this.block_list[i][n].info = info;
        //                 if (info == 2)
        //                 {
        //                     this.candy+=1;
        //                 }
        //         }
        //     }
        //     return response.data
        // })
        // .catch(function (error){
        //     throw error;
        // });

    }

    /**
     * used for test
     */
    testLoad(filename)
    {


        let str = "1111000000"
            + "1000020000"
            + "1001000021"
            + "1000020001"
            + "0000000001"
            + "1020000000"
            + "0000000200"
            + "0200100000"
            + "0000200101"
            + "0000000021";

        for (let i = 0; i < this.SIZE_X; i++)
        {
            for (let n = 0; n < this.SIZE_Y; n++)
            {
                this.block_list[i][n].info = Number(str[i * this.SIZE_X + n]);
            }
        }

    }

    /**
     * used for test
     */
    print()
    {
        let a = this.dData();
        console.log(this.SIZE_X + " " + this.SIZE_Y);
        let str = "";
        for (let i = 0; i < this.SIZE_X; i++)
        {
            for (let n = 0; n < this.SIZE_Y; n++)
            {
                let test = (a[i][n]);
                let out = "";
                if (test === 2)
                {
                    out = "@";
                }
                else if (test === 3)
                {
                    out = "X";
                }
                else if (test === 4)
                {
                    out = "*";
                }
                else if (test === 5)
                {
                    out = ".";
                }
                else if (test === 1)
                {
                    out = "#"
                }
                else if (test === 9)
                {
                    out = "s"
                }
                else out = " ";
                str += out;
            }
            str += "\n";
        }
        console.log(str);
    }

    /**
     * (string list)return map info with snake
     */
    dData()
    {
        let block_list = [];
        for (let i = 0; i < this.SIZE_X; i++)
        {
            block_list[i] = [];
            for (let n = 0; n < this.SIZE_Y; n++)
            {
                block_list[i][n] = this.block_list[i][n].info;

            }
        }

        return block_list;
    }

    sData()
    {
        let block_list = "";
        for (let i = 0; i < this.SIZE_X; i++)
        {
            for (let n = 0; n < this.SIZE_Y; n++)
            {
                block_list += this.block_list[i][n].info.toString();

            }
        }

        return block_list;
    }

    /**
     * (string list)return map info without snake
     */
    eData()
    {
        let block_list = [];
        for (let i = 0; i < this.SIZE_X; i++)
        {
            block_list[i] = [];
            for (let n = 0; n < this.SIZE_Y; n++)
            {
                block_list[i][n] = this.block_list[i][n].info;
                if (block_list[i][n] >= 3 && block_list[i][n] <= 5)
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
    data()
    {
        return this.block_list;
    }

    slotData()
    {
        return this.slot_map;
    }


}

export default Map;



