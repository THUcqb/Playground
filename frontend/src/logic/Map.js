import {Block} from './Block';
import {numberOfLevels, level} from './Maplevel';
import {Base} from './Base';
import {BaseMapInfo, SlotMapInfo} from './ConstInfo';

export class Map
{
    constructor(SIZE_X, SIZE_Y)
    {
        this.SIZE_X = SIZE_X;
        this.SIZE_Y = SIZE_Y;
        this.candy = 0;
        this.allcandy = 0;
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
    copyBlockList(map)
    {
        this.candy = 0;
        let str = map.stringData();
        for (let i = 0; i < this.SIZE_X; i++)
        {
            for (let n = 0; n < this.SIZE_Y; n++)
            {
                let info = Number(str[i * this.SIZE_X + n]);

                this.block_list[i][n].info = info;
                if (info === BaseMapInfo.getElementsByTagName('gold') || info === BaseMapInfo.getElementsByTagName("end"))
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
        this.allcandy = this.candy;
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
                if (this.block_list[i][n].info === BaseMapInfo.getElementsByTagName('gold') || this.block_list[i][n].info === BaseMapInfo.getElementsByTagName('end'))
                {
                    this.candy += 1;
                }
                slot_map[i][n] = 0;
            }
        }

        this.allcandy = this.candy;
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
                if (info === BaseMapInfo.getElementsByTagName('gold') || info === BaseMapInfo.getElementsByTagName('end'))
                {
                    this.candy += 1;
                }
                if (info === BaseMapInfo.getElementsByTagName('birthplace'))
                {
                    Base.bsnake.init(i, n);
                    this.setHead(i, n);
                }
            }
        }
        this.allcandy = this.candy;
    }

    /**
     * load map by level
     * (int)level the level of map
     */
    load(level)
    {
        let str = Map.localMap[level];
        this.loadFromString(str);
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
                let out;
                if (test === BaseMapInfo.getElementsByTagName('gold'))
                {
                    out = "@";
                }
                else if (test === BaseMapInfo.getElementsByTagName('head'))
                {
                    out = "X";
                }
                else if (test === BaseMapInfo.getElementsByTagName('body'))
                {
                    out = "*";
                }
                else if (test === BaseMapInfo.getElementsByTagName('tail'))
                {
                    out = ".";
                }
                else if (test === BaseMapInfo.getElementsByTagName('block'))
                {
                    out = "#"
                }
                else if (test === BaseMapInfo.getElementsByTagName('end'))
                {
                    out = "E"
                }
                else if (test === BaseMapInfo.getElementsByTagName('birthplace'))
                {
                    out = "s"
                }
                else out = " ";
                str += out;
            }
            str += "\n";
        }
        // console.log(str);
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
}

Map.localMap = [];
for (let i = 0; i < numberOfLevels; i++)
{
    Map.localMap[i] = level[i];
}

export default Map;
