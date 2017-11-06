import EaselJS from "masteryodaeaseljs";
import TweenJS from "masteryodatweenjs";
import {preloader} from "../index";

class Element
{
    constructor(stage, size, n, animation)
    {
        this.size = size / n;
        this.n = n;
        this.wall = preloader.getResult("wall");
        this.coin = preloader.getResult("coin");
        this.animation = animation;
        this.stage = stage;
        this.reset()
    }

    reset()
    {
        this.container = null;
    }

    /**
     * draw ground and walls and cache them to improve performance
     * @param map generated by Controller.getMap()
     */
    init(map)
    {
        this.container = new EaselJS.Container();
        this.stage.addChild(this.container);

        this.coins = new EaselJS.Shape();
        const info_arr = map.eData();
        const size_x = map.SIZE_X;
        const size_y = map.SIZE_Y;
        for (let i = 0; i < size_x; i++)
        {
            const screen_y = this.size * i;
            for (let j = 0; j < size_y; j++)
            {
                const screen_x = this.size * j;
                if (info_arr[i][j] === 1)
                {
                    this.paintWall(screen_x, screen_y);
                }
                if (info_arr[i][j] === 2)
                {
                    this.paintCoin(screen_x, screen_y);
                }
            }
        }
        this.coins.cursor = "pointer";
        if (this.animation)
        {
            this.coins.on("mousedown", (ev) => {alert("I'm a coin.");});
        }
        this.container.addChild(this.coins);
    }

    /**
     * updates the coins on the background
     * @param map generated by Controller.getMap()
     */
    update(map)
    {
        if (this.container === null)
        {
            this.init(map);
        }

        this.coins.graphics.clear();
        const info_arr = map.eData();
        const size_x = map.SIZE_X;
        const size_y = map.SIZE_Y;

        for (let i = 0; i < size_x; i++)
        {
            const screen_y = this.size * i;
            for (let j = 0; j < size_y; j++)
            {
                const screen_x = this.size * j;
                if (info_arr[i][j] === 1)
                {
                    this.paintWall(screen_x, screen_y);
                }
                if (info_arr[i][j] === 2)
                {
                    this.paintCoin(screen_x, screen_y);
                }
            }
        }
    }

    updateN(n)
    {
        this.size = this.size * this.n;
        this.n = n;
        this.size = this.size / n;
    }

    /**
     * paint a block of wall given its upper-left point
     * @param screen_x horizontal ordinate of the upper-left point
     * @param screen_y vertical ordinate of the upper-left point
     */
    paintWall(screen_x, screen_y)
    {
        let wall = new EaselJS.Shape();
        wall.cursor = "pointer";
        if (this.animation)
        {
            wall.on("mousedown", (ev) => {
                let clickedWall = ev.target;
                clickedWall.alpha = 0.1;
                TweenJS.Tween.get(clickedWall).to({ alpha: 1 }, 1000);

            });
        }

        //wall.graphics.beginFill("#5D4037");

        const m = new EaselJS.Matrix2D();
        m.scale(this.size / this.wall.width, this.size / this.wall.height);
        wall.graphics.beginBitmapFill(this.wall, "no-repeat", m);

        wall.graphics.drawRect(0, 0, this.size, this.size);
        wall.x = screen_x;
        wall.y = screen_y;
        wall.cache(0, 0, this.size, this.size);
        this.container.addChild(wall);
    }

    /**
     * paint a coin given its center
     * @param screen_x horizontal ordinate of the center
     * @param screen_y vertical ordinate of the center
     */
    paintCoin(screen_x, screen_y)
    {
        //this.coins.graphics.beginFill("#FFC107");

        const m = new EaselJS.Matrix2D();
        m.translate(screen_x, screen_y);
        m.scale(this.size / this.coin.width, this.size / this.coin.height);
        this.coins.graphics.beginBitmapFill(this.coin, "no-repeat", m);
        this.coins.graphics.drawCircle(screen_x + this.size / 2, screen_y + this.size / 2, this.size / 4);
    }
}

export default Element;
