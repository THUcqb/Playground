import {Base, Base_task} from './Base';
import {Map} from './Map';

export class Controller
{
    constructor()
    {
        this.begin = Base.begin;
        this.switchLevelTime = 0;
        this.state = "runnable";
        Base.bmap.load(0);
        //将任务列表指向初始节点
        this.begin.task = new Base_task(this.begin);
    }

    init(task)
    {
        let user_task = new Base_task(this.begin);
        user_task.add(task);
        this.begin.task = user_task;
    }

    static getLevelTime() {
        return Controller.controller.switchLevelTime;
    }

    switchLevel(level)
    {
        this.begin = Base.begin;
        this.switchLevelTime++;
        Base.begin.time = 1;
        this.begin.type = "user";
        this.state = "runnable";
        Base.bmap.load(level);
        //将任务列表指向初始节点
        this.begin.task = new Base_task(this.begin);
        Base.run_state.state = "runnable";
        Base.run_state.cur = Base.begin;
    }

    static getMap()
    {
        return Base.bmap;
    }

    static getSnake()
    {
        return Base.bsnake;
    }
    
    static copyBaseMap()
    {
        let tempMap = new Map(Base.bmap.SIZE_X,Base.bmap.SIZE_Y);
        tempMap.editInit();
        tempMap.copyBlocklist(Base.bmap);
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
        Base.run_state.cur = Base.begin;

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
}

Controller.controller = new Controller();
