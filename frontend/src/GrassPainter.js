import createjs from "easeljs";
import {N, startPos, delta} from "./Constant";

class GrassPainter extends createjs.Shape
{
    constructor()
    {
        super();
        this.graphics.beginFill("DeepSkyBlue");
        this.graphics.drawRect(startPos, startPos, N * delta, N * delta);
        for (let i = 1; i < N; i++)
        {
        }
    }
}

export default GrassPainter;
