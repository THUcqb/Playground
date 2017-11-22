import {Base, Base_task} from './Base';
import {Map} from './Map';

export class Controller
{
    constructor()
    {
        this.lastType = "";
        this.begin = Base.begin;
        this.switchLevelTime = 0;
        this.state = "runnable";
        Base.bmap.load(0);
        Base.run_state.state = "runnable";
        Base.run_state.move_state = "null";
        //将任务列表指向初始节点
        this.begin.task = new Base_task(this.begin);
    }

    static getLevelTime()
    {
        return Controller.controller.switchLevelTime;
    }

    switchLevel(level)
    {
        this.lastType = "common";
        this.begin = Base.begin;
        this.switchLevelTime++;
        Base.begin.time = 1;
        this.begin.type = "user";
        this.state = "runnable";
        Base.bmap.load(level);
        //将任务列表指向初始节点
        this.begin.task = new Base_task(this.begin);
        Base.run_state.state = "runnable";
        Base.run_state.move_state = "null";
        Base.run_state.cur = Base.begin;
        Base.lastMap = Controller.copyMap(Base.bmap);
    }

    switchDIYLevel(map)
    {
        this.lastType = "diy";
        this.begin = Base.begin;
        this.switchLevelTime++;
        Base.begin.time = 1;
        this.begin.type = "user";
        this.state = "runnable";
        Base.bmap.loadFromString(map.info);
        Base.bmap.name = map.name;
        Base.bmap.id = map.id;
        this.begin.task = new Base_task(this.begin);
        Base.run_state.state = "runnable";
        Base.run_state.cur = Base.begin;
        Base.run_state.move_state = "null";
        Base.lastMap = Controller.copyMap(Base.bmap);
    }

    switchStringLevel(string)
    {
        this.lastType = "diy";
        this.begin = Base.begin;
        this.switchLevelTime++;
        Base.begin.time = 1;
        this.begin.type = "user";
        this.state = "runnable";
        Base.bmap.loadFromString(string);
        this.begin.task = new Base_task(this.begin);
        Base.run_state.state = "runnable";
        Base.run_state.move_state = "null";
        Base.run_state.cur = Base.begin;
    }

    static getLastType()
    {
        return Controller.controller.lastType;
    }

    static getMap()
    {
        return Base.bmap;
    }

    static getSnake()
    {
        return Base.bsnake;
    }
    
    static copyMap(map)
    {
        const tempMap = new Map(map.SIZE_X, map.SIZE_Y);
        tempMap.editInit();
        tempMap.copyBlockList(map);
        return tempMap;
    }

    editNewMap(map)
    {
        this.begin = Base.begin;
        Base.begin.time = 1;
        this.begin.type = "user";
        this.state = "edit";
        Base.bmap.reloadEditorMap(map);
        //将任务列表指向初始节点
        this.begin.task = new Base_task(this.begin);
        Base.run_state.state = "runnable";
        Base.run_state.move_state = "null";
        Base.run_state.cur = Base.begin;
        Base.lastMap = Controller.copyMap(Base.bmap);
    }

    static step()
    {
        if (Controller.controller.currentState() === "runnable")
            Base.run_state.next();
    }

    currentState()
    {
        if (this.state === "runnable")
        {
            return Base.run_state.state;
        }
        else
        {
            return this.state;
        }
    }

    setState(state)
    {
        this.state = state;
    }

    restart()
    {
        this.begin = Base.begin;
        this.switchLevelTime++;
        Base.begin.time = 1;
        this.begin.type = "user";
        this.state = "runnable";
        this.begin.task = new Base_task(this.begin);
        Base.run_state.state = "runnable";
        Base.run_state.move_state = "null";
        Base.run_state.cur = Base.begin;
        Base.bmap = Controller.copyMap(Base.lastMap);
    }
}

Controller.controller = new Controller();
