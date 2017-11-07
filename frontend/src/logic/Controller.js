import {Base, Base_task} from './Base';
import {Base_state} from './Base_state';
import Map from './Map';
import Snake from './Snake';


export class Controller {
    constructor()
    {
        this.begin = Base.begin;
        this.state = "runnable";
        Base.bmap.load(0);
        //将任务列表指向初始节点
        this.begin.task = new Base_task(this.begin);
        this.emap = new Map(10, 10);
        this.snake = Base.bsnake;
    }

    /**
     * usertask is main function
     * task is based on user's blockly
     */
    init(task)
    {
        let user_task = new Base_task(this.begin);
        user_task.add(task);
        this.begin.task = user_task;
    }

    setSnakeState(state)
    {
        this.snake = Base.bsnake.state = state;
    }

    getSlotMap()
    {
        return Base.bmap.slotData();
    }

    switch_level(level)
    {
        console.log("fuck you!!");
        this.begin = Base.begin;
        Base.begin.time = 1;
        this.begin.type = "user";
        this.state = "runnable";
        Base.bmap.load(level);
        //将任务列表指向初始节点
        this.begin.task = new Base_task(this.begin);
        this.snake = Base.bsnake;
        Base.run_state.state = "runnable";
        Base.run_state.cur = Base.begin;
    }

    /**
     * return map info
     */
    getMap()
    {
        return Base.bmap;
    }

    /**
     * return Snake info
     */
    getSnake()
    {
        return Base.bsnake;
    }

    editNewMap()
    {
        return this.emap;
    }

    step()
    {
        Base.run_state.next();
    }

    currentState()
    {
        return Base.run_state.state;
    }
}

Controller.controller = new Controller();
