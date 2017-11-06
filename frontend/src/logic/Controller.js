import {Base,Base_task} from './Base';
import {Base_state} from './Base_state';
import Map from './Map';
import Snake from './Snake';


export class Controller{
    
    constructor()
    {
        this.begin = Base.begin;
        this.state = "runnable";
        Base.bmap.load(0);
        let usertask = new Base_task(this.begin)//将任务列表指向初始节点
        this.begin.task=usertask;
        this.emap = new Map(10,10);
        this.snake = Base.bsnake;
    }
    /**
     * usertask is main function 
     * task is based on user's blockly
     */
    init(task)
    {
        let usertask = new Base_task(this.begin);
        usertask.add(task)
        this.begin.task=usertask;
    }
    setSnakeState(state)
    {
        this.snake = Base.bsnake.state = state;
    }
    getslotMap()
    {
        return Base.bmap.SlotData();
    }
    switch_level(level)
    {
        this.begin = Base.begin;
        this.begin.type = "user";
        this.state = "runnable";
        Base.bmap.load(level);
        let usertask = new Base_task(this.begin)//将任务列表指向初始节点
        this.begin.task=usertask;
        this.snake = Base.bsnake;
        Base.run_state.state = "runnable";
    }
    /**
     * return map info
     */
    getMap()
    {
        return Base.bmap;
    }
    /**
     * return Snak info
     */
    getSnake()
    {
        return Base.bsnake;
    }

    EditNewMap()
    {
        return this.emap;
    }

    step()
    {
        Base.run_state.next();
    }

    current_state()
    {
        return Base.run_state.state; 
    }
}

Controller.controller = new Controller();
