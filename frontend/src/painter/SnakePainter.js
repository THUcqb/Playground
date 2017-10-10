import createjs from "easeljs";
import {N, startPos, delta} from "../Constant";
import {Snake} from "../logic/Snake";

class SnakePainter extends createjs.Shape
{
    constructor()
    {
        super();
        this.snake = null;
    }

    update(snake)
    {
        this.graphics.clear();
        for (let i = 0; i < snake.size; i++)
        {
            let x = startPos + snake.body[i].x * delta;
            let y = startPos + snake.body[i].y * delta;
            this.graphics.beginFill("#000000").drawRect(x, y, delta, delta);
        }
        this.snake = snake;
    }
}

export default SnakePainter;
