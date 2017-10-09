import createjs from "easeljs";
import {N, startPos, delta} from "./Constant";

class SnakePainter extends createjs.Shape
{
    constructor()
    {
        super();
        let x = startPos + N / 2 * delta + delta / 2 - delta / 6;
        let y = startPos + delta / 2 - delta / 6;
        let deltaX = delta / 3;
        let deltaY = 3 * delta - delta / 3;
        this.graphics.beginFill("#000000").drawRect(x, y, deltaX, deltaY);
    }
}

export default SnakePainter;
