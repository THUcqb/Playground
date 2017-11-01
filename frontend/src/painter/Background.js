import createjs from "masteryodaeaseljs";
import { startPos, delta } from "../Constant";
import { preloader } from "../index";

class Background
{
    constructor(stage)
    {
        this.square = preloader.getResult("square");
        this.stage = stage;
        this.reset()
    }

    reset()
    {
        this.container = null;
    }

    init(map)
    {
        this.container = new createjs.Container();
        this.stage.addChild(this.container);

        const size_x = map.SIZE_X;
        const size_y = map.SIZE_Y;
        for (let i = 0; i < size_x; i++)
        {
            const screen_y = startPos + delta * i;
            for (let j = 0; j < size_y; j++)
            {
                const screen_x = startPos + delta * j;
                this.paintGround(screen_x, screen_y);
            }
        }
    }

    update(map)
    {
        if (this.container === null)
        {
            this.init(map);
        }
    }

    paintGround(screen_x, screen_y)
    {
        const ground = new createjs.Shape();
        const m = new createjs.Matrix2D();
        m.scale(delta / this.square.width, delta / this.square.height);
        ground.graphics.beginBitmapFill(this.square, "no-repeat", m);

        ground.graphics.drawRect(0, 0, delta, delta);
        ground.x = screen_x;
        ground.y = screen_y;
        ground.cache(0, 0, delta, delta);
        this.container.addChild(ground);
    }
}

export default Background;
