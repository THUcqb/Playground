import {Block} from './Block';
import axios from 'axios';
import {URL, SAVEMAP, LOADMAP} from '../config/api';
import {level0, level1, level2, level3, level4, level5} from './Maplevel';
import {Base} from './Base';
import {BaseMapInfo, SlotMapInfo} from './ConstInfo';

class MapInfo
{
    constructor(level, maps)
    {
        this.level = level;
        this.maps = maps;
        this.candy = 0;
    }
}

export class Map
{
    constructor(SIZE_X, SIZE_Y)
    {
        this.SIZE_X = SIZE_X;
        this.SIZE_Y = SIZE_Y;
        this.candy = 0;
        this.id = "null";
        this.solution = "";
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
        this.localMap = [];
        this.localMap[0] = (level0);
        this.localMap[1] = (level1);
        this.localMap[2] = (level2);
        this.localMap[3] = (level3);
        this.localMap[4] = (level4);
        this.localMap[5] = (level5);
        this.setHead(x, y);
    }

    /**
     * set point(x,y) state empty
     */
    setEmpty(x, y)
    {
        this.block_list[x][y].info = BaseMapInfo.getElementsByTagName('empty');
    }

    /**
     * set point(x,y) state block
     */
    setBlock(x, y)
    {
        this.block_list[x][y].info = BaseMapInfo.getElementsByTagName('block');
    }

    /**
     * set point(x,y) state candy
     */
    setCandy(x, y)
    {
        this.block_list[x][y].info = BaseMapInfo.getElementsByTagName('gold');
    }

    /**
     * set the head of snake
     */
    setHead(x, y)
    {
        this.block_list[x][y].info = BaseMapInfo.getElementsByTagName('head');
    }

    /**
     * set the body of snake
     */
    setBody(x, y)
    {
        this.block_list[x][y].info = BaseMapInfo.getElementsByTagName('body');
    }

    /**
     * set the tail of snake
     */
    setTail(x, y)
    {
        this.block_list[x][y].info = BaseMapInfo.getElementsByTagName('tail');
    }

    /**
     * draw slot of snake head
     */
    setSlot(x, y)
    {
        this.slot_map[x][y].info = SlotMapInfo.getElementsByTagName('block');
    }


    /**
     * load map after
     */
    copyBlocklist(map)
    {
        this.candy = 0;
        let str = map.stringData();
        for (let i = 0; i < this.SIZE_X; i++)
        {
            for (let n = 0; n < this.SIZE_Y; n++)
            {
                let info = Number(str[i * this.SIZE_X + n]);

                this.block_list[i][n].info = info;
                if (info === BaseMapInfo.getElementsByTagName('gold'))
                {
                    this.candy += 1;
                }
                if (info === BaseMapInfo.getElementsByTagName('head'))
                {
                    Base.bsnake.init(i, n);
                    this.setHead(i, n);
                }
            }
        }
    }

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


    loadFromString(string)
    {
        this.candy = 0;
        for (let i = 0; i < this.SIZE_X; i++)
        {
            for (let n = 0; n < this.SIZE_Y; n++)
            {
                let info = Number(string[i * this.SIZE_X + n]);

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
    }

    /**
     * load map by level
     * (int)level the level of map
     */
    load(level)
    {
        let str = this.localMap[level];
        this.loadFromString(str);
    }

    /**
     * used for test
     */
    testLoad(filename)
    {


        let str = 
            "1111000000"
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
        let a = this.detailData();
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
    detailData()
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

    stringData()
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

    slotData()
    {
        return this.slot_map;
    }


}

export default Map;



