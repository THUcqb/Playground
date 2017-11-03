import EaselJS from "masteryodaeaseljs";
import TweenJS from "masteryodatweenjs";
import { startPos, delta } from "../Constant";

class Trajectory
{
    constructor(stage)
    {
        this.width = delta / 3;
        this.time = 480;
        this.stage = stage;
        this.nowX = 0;
        this.nowY = 0;
        this.reset();
    }
    
    reset()
    {
        this.container = null;
    }
    
    init(x, y)
    {
        this.container = new EaselJS.Container();
        this.stage.addChild(this.container);
        this.nowX = x;
        this.nowY = y;
    }

    update(snake)
    {
        let l = snake.size;
        let x = snake.body[l - 1].x;
        let y = snake.body[l - 1].y;
        if (this.container === null)
        {
            this.init(x, y);
        }
        else if (this.nowX !== x || this.nowY !== y)
        {
            this.newTrajectory(x, y);
        }
    }

    newTrajectory(nowX, nowY)
    {
        let lastX = this.nowX;
        let lastY = this.nowY;
        this.nowX = nowX;
        this.nowY = nowY;
        let part = new EaselJS.Shape();
        let x = 0;
        let y = 0;
        let width_x = 0;
        let width_y = 0;
        if (nowX === lastX + 1)
        {
            x = startPos + lastX * delta + (delta - this.width) / 2;
            y = startPos + lastY * delta + (delta - this.width) / 2;
            width_x = delta;
            width_y = this.width;
        }
        if (nowX === lastX - 1)
        {
            x = startPos + nowX * delta + (delta + this.width) / 2;
            y = startPos + nowY * delta + (delta - this.width) / 2;
            width_x = delta;
            width_y = this.width;
        }
        if (nowY === lastY + 1)
        {
            x = startPos + lastX * delta + (delta - this.width) / 2;
            y = startPos + lastY * delta + (delta - this.width) / 2;
            width_x = this.width;
            width_y = delta;
        }
        if (nowY === lastY - 1)
        {
            x = startPos + nowX * delta + (delta - this.width) / 2;
            y = startPos + nowY * delta + (delta + this.width) / 2;
            width_x = this.width;
            width_y = delta;
        }
        part.alpha = 0;
        part.graphics.beginFill("#FF5722").drawRect(y - part.x, x - part.y, width_y, width_x);
        this.container.addChild(part);
        TweenJS.Tween.get(part).to({ alpha: 1 }, this.time);
    }
}

export default Trajectory;
