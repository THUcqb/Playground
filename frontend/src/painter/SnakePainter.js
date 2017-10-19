import createjs from "masteryodaeaseljs";
import {N, startPos, delta} from "../Constant";
import {Snake} from "../logic/Snake";

class SnakePainter extends createjs.Shape
{
    constructor()
    {
        super();
        this.width = delta / 3;
        this.snake = null;
    }

    update(snake)
    {
        this.graphics.clear();
        for (let i = snake.size - 1; i >= 0; i--)
        {
            if (i < snake.size - 1)
            {
                let now_x = snake.body[i].x;
                let now_y = snake.body[i].y;
                let last_x = snake.body[i + 1].x;
                let last_y = snake.body[i + 1].y;
                let x = 0;
                let y = 0;
                let width_x = 0;
                let width_y = 0;
                if (now_x === last_x + 1)
                {
                    x = startPos + last_x * delta + (delta + this.width) / 2;
                    y = startPos + last_y * delta + (delta - this.width) / 2;
                    width_x = delta;
                    width_y = this.width;
                }
                if (now_x === last_x - 1)
                {
                    x = startPos + now_x * delta + (delta - this.width) / 2;
                    y = startPos + now_y * delta + (delta - this.width) / 2;
                    width_x = delta;
                    width_y = this.width;
                }
                if (now_y === last_y + 1)
                {
                    x = startPos + last_x * delta + (delta - this.width) / 2;
                    y = startPos + last_y * delta + (delta + this.width) / 2;
                    width_x = this.width;
                    width_y = delta;
                }
                if (now_y === last_y - 1)
                {
                    x = startPos + now_x * delta + (delta - this.width) / 2;
                    y = startPos + now_y * delta + (delta - this.width) / 2;
                    width_x = this.width;
                    width_y = delta;
                }
                this.graphics.beginFill("#FF5722").drawRect(y, x, width_y, width_x);
            }
            else
            {
                let x = startPos + snake.body[i].x * delta + (delta - this.width) / 2;
                let y = startPos + snake.body[i].y * delta + (delta - this.width) / 2;
                this.graphics.beginFill("#FF5722").drawRect(y, x, this.width, this.width);
            }
        }
        this.snake = snake;
    }
}

export default SnakePainter;
