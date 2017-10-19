import createjs from "masteryodaeaseljs";
import {N, startPos, delta} from "../Constant";

class GrassPainter extends createjs.Shape
{
    constructor()
    {
        super();
    }

    update(map)
    {
        this.graphics.clear();
        const info_arr = map.Edata();
        const size_x = map.SIZE_X;
        const size_y = map.SIZE_Y;
        
        for (let i = 0; i < size_x; i++)
        {
            const screen_y = startPos + delta * i;
            for (let j = 0; j < size_y; j++)
            {
                console.log(info_arr[i][j]);
                const screen_x = startPos + delta * j;
                console.log(info_arr[i][j]);
                if (info_arr[i][j] === 0)
                    this.paintGround(screen_x, screen_y);
                else if (info_arr[i][j] === 1)
                    this.paintWall(screen_x, screen_y);
                else if (info_arr[i][j] === 2)
                    this.paintCoin(screen_x, screen_y);
            }
        }
    }

    paintGround(screen_x, screen_y)
    {
        this.graphics.beginFill("#8BC34A");
        this.graphics.drawRect(screen_x, screen_y, delta, delta);
    }

    paintWall(screen_x, screen_y)
    {
        this.graphics.beginFill("#5D4037");
        this.graphics.drawRect(screen_x, screen_y, delta, delta);
    }

    paintCoin(screen_x, screen_y)
    {
        this.paintGround(screen_x, screen_y);
        this.graphics.beginFill("#FFC107");
        this.graphics.drawCircle(screen_x + delta / 2, screen_y + delta / 2, delta / 4);
    }
}

export default GrassPainter;
