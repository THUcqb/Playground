import {Base, Base_task} from './Base';

export class Controller
{
    constructor()
    {
        this.begin = Base.begin;
        this.state = "runnable";
        Base.bmap.load(0);
        //将任务列表指向初始节点
        this.begin.task = new Base_task(this.begin);
    }

    /**
     * user_task is main function
     * task is based on user's blockly
     */
    init(task)
    {
        let user_task = new Base_task(this.begin);
        user_task.add(task);
        this.begin.task = user_task;
    }

    switchLevel(level)
    {
        this.begin = Base.begin;
        Base.begin.time = 1;
        this.begin.type = "user";
        this.state = "runnable";
        Base.bmap.load(level);
        //将任务列表指向初始节点
        this.begin.task = new Base_task(this.begin);
        Base.run_state.state = "runnable";
        Base.run_state.cur = Base.begin;
    }

    /**
     * return map info
     */
    static getMap()
    {
        return Base.bmap;
    }

    /**
     * return Snake info
     */
    static getSnake()
    {
        return Base.bsnake;
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

    save(map)
    {

    }

    static step()
    {
        if (Controller.controller.currentState() == "runnable")
            Base.run_state.next();
    }

    currentState()
    {
        if (this.state === "runnable")
        {
            console.log("current state : " + Base.run_state.state);
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
