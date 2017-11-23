import Snake from './Snake';
import {Base_state} from './Base_state';
import Map from './Map';

export class Base_task {
    constructor(begin)
    {
        this.begin = begin;
        this.tasklist = [];
        this.size = 0;
    }

    add(task)
    {
        this.tasklist[this.size] = task;

        if (this.size > 0)
        {
            this.tasklist[this.size - 1].link(this.tasklist[this.size]);
        }
        this.tasklist[this.size].link(this.begin);
        this.size += 1;
    }
}

export class Base {
    constructor(type, name, check)
    {
        this.type = type;
        this.name = name;
        this.time = 1;
        this.cur_time = 1;
        this.checkinfo = check;
    }

    /**
     * link current task to next task
     * @param  {Base} next
     */
    link(next)
    {
        this.next = next;
    }


    /**
     * check point(x,y) if "runnable" or have "candy"
     */
    static runnable(x, y)
    {
        if (x < 0 || x >= 10)
        {
            return 'err';
        }
        if (y < 0 || y >= 10)
        {
            return 'err';
        }
        if (Number(Base.bmap.block_list[x][y].info) === 2)
        {
            return 'candy';
        }
        if (Number(Base.bmap.block_list[x][y].info) === 0)
        {
            return 'runnable';
        }
        if (Number(Base.bmap.block_list[x][y].info) === 8)
        {
            return 'end';
        }
        return 'err';
    }

    /**
     * Based on the check info check current state if right or not
     * runnable : the check info is right
     * null: current state is missing or wrong
     */
    static check(str)
    {
        let s = "";
        if (str === "true")
        {
            return 'runnable'
        }
        else if (str === "false")
        {
            return 'null'
        }
        else if (str === "check_move_up")
        {
            const _x = Base.bsnake.x - 1;
            const _y = Base.bsnake.y;
            s = Base.runnable(_x, _y);
        }
        else if (str === "check_move_down")
        {
            const _x = Base.bsnake.x + 1;
            const _y = Base.bsnake.y;
            s = Base.runnable(_x, _y);
        }
        else if (str === "check_move_left")
        {
            const _x = Base.bsnake.x;
            const _y = Base.bsnake.y - 1;
            s = Base.runnable(_x, _y);
        }
        else if (str === "check_move_right")
        {
            const _x = Base.bsnake.x;
            const _y = Base.bsnake.y + 1;
            s = Base.runnable(_x, _y);
        }
        else if (str === "check_aim")
        {
            const _x = Base.bsnake.x;
            const _y = Base.bsnake.y;
            s = Base.runnable(_x, _y);
            if (s === 'candy')
            {
                return 'runnable';
            }
            return 'null';
        }
        else if (str === "check_end")
        {
            const _x = Base.bsnake.x;
            const _y = Base.bsnake.y;
            s = Base.runnable(_x, _y);
            if (s === 'end')
            {
                return 'runnable';
            }
            return 'null';
        }

        if (s === 'runnable')
        {
            return s;
        }
        if (s === 'candy')
        {
            return 'runnable';
        }
        return 'null';

    }

    /**
     *  snake move up one step
     */
    move_up()
    {
        const _x = Base.bsnake.x - 1;
        const _y = Base.bsnake.y;
        this.base_move(_x, _y);
    }

    /**
     *  snake move down one step
     */
    move_down()
    {
        const _x = Base.bsnake.x + 1;
        const _y = Base.bsnake.y;
        this.base_move(_x, _y);
    }

    move_left()
    {
        const _x = Base.bsnake.x;
        const _y = Base.bsnake.y - 1;
        this.base_move(_x, _y);
    }

    /**
     *  snake move right one step
     */
    move_right()
    {
        const _x = Base.bsnake.x;
        const _y = Base.bsnake.y + 1;
        this.base_move(_x, _y);
    }

    /**
     * base_move change snake and map info by task
     */
    base_move(_x, _y) {
        const runnable = Base.runnable(_x, _y);
        if (runnable === 'candy' || runnable === 'runnable' || runnable === 'end') {
            Base.bmap.setBody(Base.bsnake.x, Base.bsnake.y);
            let __x = Base.bsnake.body[0].x;
            let __y = Base.bsnake.body[0].y;
            Base.bmap.setEmpty(__x, __y);
            Base.bsnake.add_head(_x, _y);
            Base.bsnake.del_tail();
            __x = Base.bsnake.body[0].x;
            __y = Base.bsnake.body[0].y;
            Base.bmap.setTail(__x, __y);
            if (Base.bmap.state === "down")
                Base.bmap.setSlot(_x, _y);
            Base.bmap.setHead(_x, _y);
            if (runnable === 'candy') {
                Base.bmap.candy--;
            }
            else if (runnable === 'end') {
                Base.bmap.candy--;
                this.type = "success";
            }
        }
        else
            this.type = "fail";
    }

    /**
     * Base unit will run its task list automatically until finished
     * Warning: if you want to move one step you'd better use next() in Base_state
     */
    run()
    {
        if (this.type === "sys")
        {
            if (this.name === "move_up")
            {
                this.move_up();
            }
            else if (this.name === "move_down")
            {
                this.move_down();
            }
            else if (this.name === "move_left")
            {
                this.move_left();
            }
            else if (this.name === "move_right")
            {
                this.move_right();
            }
        }
    }
}

Base.bmap = new Map(10, 10); //初始化地图 每个地块的信息 Base.bmap.block_list[x][y].info 参考map.js
Base.bsnake = new Snake(5, 5); //初始化蛇
Base.bmap.testInit(5, 5);//设置出生点 为了测试方便全地图初始化为2 即积分地块
Base.lastMap = new Map(10, 10); //初始化地图 每个地块的信息 Base.bmap.block_list[x][y].info 参考map.js
Base.lastMap.testInit(5, 5);//设置出生点 为了测试方便全地图初始化为2 即积分地块
Base.begin = new Base("user", "begin");
Base.begin.time = 1;
Base.success = new Base("success", "end");//初始化success状态
Base.fail = new Base("fail", "end");//初始化fail状态
Base.err = new Base("err", "end");//初始化err状态，一切非法操作都会返回err
Base.null = new Base("null", "end");//游戏结束后如果还在输入指令会执行null操作
Base.begin.link(Base.null);//游戏结束后跳转到null状态
Base.run_state = new Base_state(Base.begin);//状态管理，会逐条执行指令，注意base.run()会一口气将结果执行完
Base.game = 'run';//游戏状态初始化正常

