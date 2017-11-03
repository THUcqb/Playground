import createjs from "masteryodaeaseljs";
import { N, startPos, delta } from "../Constant";
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

        this.paintGround();
    }

    update(map)
    {
        if (this.container === null)
        {
            this.init(map);
        }
    }

    paintGround()
    {
        const ground = new createjs.Shape();
        const m = new createjs.Matrix2D();
        m.scale(delta * N / this.square.width, delta * N / this.square.height);
        ground.graphics.beginBitmapFill(this.square, "no-repeat", m);

        ground.graphics.drawRect(0, 0, delta * N, delta * N);
        ground.x = startPos;
        ground.y = startPos;
        ground.cache(0, 0, delta * N, delta * N);
        this.container.addChild(ground);
    }
}

export default Background;
