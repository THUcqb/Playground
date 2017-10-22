import { startPos, delta } from "../Constant";
import easelJS from "masteryodaeaseljs";
import tweenJS from "masteryodatweenjs";

/**
 * The class in charge of painting the snake
 */
class SnakePainter extends easelJS.Shape
{
    constructor()
    {
        super();
        this.width = delta / 3;
        this.snake = null;
    }

    /**
     * Update the snake's position and redraw
     * @param snake
     */
    update(snake)
    {
        this.graphics.clear();
        let position = { x: 100, y: 0 };
        let tween = new tweenJS.Tween(position);
        tween.to({ x: 200 }, 1000);
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
