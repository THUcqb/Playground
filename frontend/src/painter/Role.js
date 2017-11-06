import EaselJS from "masteryodaeaseljs";
import TweenJS from "masteryodatweenjs";

class Role
{
    constructor(stage, size, n)
    {
        this.size = size / n;
        this.n = n;
        this.stage = stage;
        this.width = this.size / 3;
        this.time = 480;
        this.nowX = -1;
        this.container = null;
    }

    init(nowX, nowY)
    {
        this.container = new EaselJS.Container();
        this.stage.addChild(this.container);
        this.x = 0;
        this.y = 0;
        this.nowX = nowX;
        this.nowY = nowY;
        this.role = new EaselJS.Shape();
        this.container.addChild(this.role);
        this.drawPic();
    }

    drawPic()
    {
        let x = this.nowX * this.size + (this.size - this.width) / 2;
        let y = this.nowY * this.size + (this.size - this.width) / 2;
        this.role.graphics.beginFill("#4518ff").drawRect(y - this.role.x, x - this.role.y, this.width, this.width);
    }

    move(x, y)
    {
        TweenJS.Tween.removeTweens(this);
        this.role.graphics.clear();
        this.drawPic();
        if (x === this.nowX + 1)
        {
            TweenJS.Tween.get(this.role, { override: true }).to({ y: this.role.y + this.size }, this.time);
        }
        else if (x === this.nowX - 1)
        {
            TweenJS.Tween.get(this.role, { override: true }).to({ y: this.role.y - this.size }, this.time);
        }
        else if (y === this.nowY + 1)
        {
            TweenJS.Tween.get(this.role, { override: true }).to({ x: this.role.x + this.size }, this.time);
        }
        else if (y === this.nowY - 1)
        {
            TweenJS.Tween.get(this.role, { override: true }).to({ x: this.role.x - this.size }, this.time);
        }
        this.updatePos(x, y);
    }

    updatePos(x, y)
    {
        this.nowX = x;
        this.nowY = y;
    }

    reset()
    {
        this.container = null;
    }

    /**
     * Update the snake's position and redraw
     * @param snake
     */
    update(snake)
    {
        let l = snake.size;
        let x = snake.body[l - 1].x;
        let y = snake.body[l - 1].y;
        if (this.container === null)
        {
            this.init(x, y);
        }
        else
        {
            this.move(x, y);
        }
    }
}

export default Role;
