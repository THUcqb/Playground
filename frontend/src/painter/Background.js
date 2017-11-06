import EaselJS from "masteryodaeaseljs";
import { preloader } from "../index";

class Background
{
    constructor(stage, size, n)
    {
        this.size = size / n;
        this.n = n;
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
        this.container = new EaselJS.Container();
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

    updateN(n)
    {
        this.size = this.size * this.n;
        this.n = n;
        this.size = this.size / n;
    }

    paintGround()
    {
        const ground = new EaselJS.Shape();
        const m = new EaselJS.Matrix2D();
        m.scale(this.size * this.n / this.square.width, this.size * this.n / this.square.height);
        ground.graphics.beginBitmapFill(this.square, "no-repeat", m);

        ground.graphics.drawRect(0, 0, this.size * this.n, this.size * this.n);
        ground.cache(0, 0, this.size * this.n, this.size * this.n);
        this.container.addChild(ground);
    }
}

export default Background;
