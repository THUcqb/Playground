import { startPos, delta } from "../Constant";
import EaselJS from "masteryodaeaseljs";
import TweenJS from "masteryodatweenjs";

class Segment extends EaselJS.Shape
{
    constructor(now_x, now_y, last_x, last_y, width)
    {
        super();
        this.x = 0;
        this.y = 0;
        this.now_x = now_x;
        this.now_y = now_y;
        this.last_x = last_x;
        this.last_y = last_y;
        this.width = width;
        this.time = 500;
        this.drawPic();
    }

    drawPic()
    {
        this.x = 0;
        this.y = 0;
        let x = 0;
        let y = 0;
        let width_x = 0;
        let width_y = 0;
        if (this.now_x === this.last_x + 1)
        {
            x = startPos + this.last_x * delta + (delta + this.width) / 2;
            y = startPos + this.last_y * delta + (delta - this.width) / 2;
            width_x = delta;
            width_y = this.width;
        }
        if (this.now_x === this.last_x - 1)
        {
            x = startPos + this.now_x * delta + (delta - this.width) / 2;
            y = startPos + this.now_y * delta + (delta - this.width) / 2;
            width_x = delta;
            width_y = this.width;
        }
        if (this.now_y === this.last_y + 1)
        {
            x = startPos + this.last_x * delta + (delta - this.width) / 2;
            y = startPos + this.last_y * delta + (delta + this.width) / 2;
            width_x = this.width;
            width_y = delta;
        }
        if (this.now_y === this.last_y - 1)
        {
            x = startPos + this.now_x * delta + (delta - this.width) / 2;
            y = startPos + this.now_y * delta + (delta - this.width) / 2;
            width_x = this.width;
            width_y = delta;
        }
        this.graphics.beginFill("#FF5722").drawRect(y, x, width_y, width_x);
    }

    moveForward()
    {
        this.drawPic();
        if (this.now_x === this.last_x + 1) TweenJS.Tween.get(this).to({ y: delta }, this.time);
        if (this.now_x === this.last_x - 1) TweenJS.Tween.get(this).to({ y: -delta }, this.time);
        if (this.now_y === this.last_y + 1) TweenJS.Tween.get(this).to({ x: delta }, this.time);
        if (this.now_y === this.last_y - 1) TweenJS.Tween.get(this).to({ x: -delta }, this.time);
    }

    updatePos(x, y)
    {
        this.last_x = this.now_x;
        this.last_y = this.now_y;
        this.now_x = x;
        this.now_y = y;
    }

    move(x, y)
    {
        this.graphics.clear();
        this.x = 0;
        this.y = 0;
        if (x === this.now_x && y === this.now_y)
            this.drawPic();
        else if (x === this.now_x && x === this.last_x)
        {
            this.moveForward();
            this.updatePos(x, y);
        }
        else if (y === this.now_y && y === this.last_y)
        {
            this.moveForward();
            this.updatePos(x, y);
        }
        else
        {
            this.updatePos(x, y);
            //this.drawPic();
        }
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
        this.snake = [];
    }

    /**
     * Update the snake's position and redraw
     * @param snake
     */
    update(snake)
    {
        // TODO: Use Tween.to() || Tween.rotate() function to implement contiguous movement of a snake
        if (this.snake === null)
        {
            this.snake = new Array(Segment);
            for (let i = snake.size - 2; i >= 0; i--)
            {
                let now_x = snake.body[i + 1].x;
                let now_y = snake.body[i + 1].y;
                let last_x = snake.body[i].x;
                let last_y = snake.body[i].y;

                let shape = new Segment(now_x, now_y, last_x, last_y, this.width);
                this.stage.addChild(shape);
                this.snake.push(shape);
            }
        }
        else
        {
            let tmp = snake.size - this.snake.length - 1;
            for (let i = this.snake.length - 1; i >= 0; i--)
            {
                this.snake[this.snake.length - 1 - i].move(snake.body[i + tmp + 1].x, snake.body[i + tmp + 1].y);
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
