import { startPos, delta } from "../Constant";
import EaselJS from "masteryodaeaseljs";
import TweenJS from "masteryodatweenjs";

class Part extends EaselJS.Shape
{
    move(x, y) {}
    updatePos(x, y) {}
    drawPic() {}
}

class Head extends Part
{
    constructor(nowX, nowY, width)
    {
        super();
        this.name = "head";
        this.nowX = nowX;
        this.nowY = nowY;
        this.width = width;
        this.time = 495;
        this.drawPic();
    }

    drawPic()
    {
        this.x = 0;
        this.y = 0;
        let x = startPos + this.nowX * delta + (delta - this.width) / 2;
        let y = startPos + this.nowY * delta + (delta - this.width) / 2;
        this.graphics.beginFill("#4518ff").drawRect(y, x, this.width, this.width);
    }

    move(x, y)
    {
        this.graphics.clear();
        this.drawPic();
        if (x === this.nowX + 1)
            TweenJS.Tween.get(this, null, true).to({ y: delta }, this.time).call(this.updatePos, [x, y]);
        else if (x === this.nowX - 1)
            TweenJS.Tween.get(this, null, true).to({ y: -delta }, this.time).call(this.updatePos, [x, y]);
        else if (y === this.nowY + 1)
            TweenJS.Tween.get(this, null, true).to({ x: delta }, this.time).call(this.updatePos, [x, y]);
        else if (y === this.nowY - 1)
            TweenJS.Tween.get(this, null, true).to({ x: -delta }, this.time).call(this.updatePos, [x, y]);
    }

    updatePos(x, y)
    {
        this.nowX = x;
        this.nowY = y;
    }
}

class Segment extends Part
{
    constructor(nowX, nowY, lastX, lastY, width)
    {
        super();
        this.name = "segment";
        this.x = 0;
        this.y = 0;
        this.nowX = nowX;
        this.nowY = nowY;
        this.lastX = lastX;
        this.lastY = lastY;
        this.width = width;
        this.time = 495;
        this.drawPic(this.nowX, this.nowY, this.lastX, this.lastY);
    }

    drawPic(nowX, nowY, lastX, lastY)
    {
        this.x = 0;
        this.y = 0;
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
        this.graphics.beginFill("#FF5722").drawRect(y, x, width_y, width_x);
    }

    moveForward()
    {
        this.drawPic(this.nowX, this.nowY, this.lastX, this.lastY);
        if (this.nowX === this.lastX + 1)
            TweenJS.Tween.get(this).to({ y: delta }, this.time);
        else if (this.nowX === this.lastX - 1)
            TweenJS.Tween.get(this).to({ y: -delta }, this.time);
        else if (this.nowY === this.lastY + 1)
            TweenJS.Tween.get(this).to({ x: delta }, this.time);
        else if (this.nowY === this.lastY - 1)
            TweenJS.Tween.get(this).to({ x: -delta }, this.time);
    }

    updatePos(x, y)
    {
        if (x === this.nowX && y === this.nowY) return;
        console.log("update", x, y, this.nowX, this.nowY, this.lastX, this.lastY);
        this.lastX = this.nowX;
        this.lastY = this.nowY;
        this.nowX = x;
        this.nowY = y;
    }

    move(x, y)
    {
        console.log("Segment move", this.nowX, this.nowY, x, y);
        this.graphics.clear();
        this.x = 0;
        this.y = 0;
        if (x === this.nowX && y === this.nowY)
            this.drawPic(this.nowX, this.nowY, this.lastX, this.lastY);
        else if (x === this.nowX && x === this.lastX)
            this.moveForward();
        else if (y === this.nowY && y === this.lastY)
            this.moveForward();
        else
        {
            // TODO: rotate in the corner
            // this.updatePos(x, y);
            // this.drawPic();
        }
        this.updatePos(x, y);
    }
}

/**
 * The class in charge of painting the snake
 */
class SnakePainter
{
    constructor(stage)
    {
        this.stage = stage;
        this.width = delta / 3;
        this.snake = null;
    }

    reset()
    {
        this.snake = null;
    }

    /**
     * Update the snake's position and redraw
     * @param snake
     */
    update(snake)
    {
        if (this.snake === null)
        {
            this.snake = [];
            let head = new Head(snake.body[snake.size - 1].x, snake.body[snake.size - 1].y, this.width);
            this.stage.addChild(head);
            this.snake.push(head);
            for (let i = snake.size - 2; i >= 0; i--)
            {
                let nowX = snake.body[i + 1].x;
                let nowY = snake.body[i + 1].y;
                let lastX = snake.body[i].x;
                let lastY = snake.body[i].y;

                let shape = new Segment(nowX, nowY, lastX, lastY, this.width);
                this.stage.addChild(shape);
                this.snake.push(shape);
            }
        }
        else
        {
            let tmp = snake.size - this.snake.length;
            this.snake[0].move(snake.body[snake.size - 1].x, snake.body[snake.size - 1].y);
            for (let i = this.snake.length - 2; i >= 0; i--)
            {
                this.snake[this.snake.length - 1 - i].move(snake.body[i + 1 + tmp].x, snake.body[i + 1 + tmp].y);
            }
            if (tmp === 1)
            {
                let shape = new Segment(snake.body[1].x, snake.body[1].y, snake.body[0].x, snake.body[0].y, this.width);
                this.stage.addChild(shape);
                this.snake.push(shape);
            }
        }
    }
}

export default SnakePainter;
