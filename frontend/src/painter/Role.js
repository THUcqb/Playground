import EaselJS from "masteryodaeaseljs";
import TweenJS from "masteryodatweenjs";
import MessageBar from '../utils/MessageBar';
import { hints as configMsgHints } from '../config/msg';
import { preloader } from "../index";

class Role
{
    constructor(stage, size, n, animation)
    {
        this.animation = animation;
        this.size = size / n;
        this.n = n;
        this.stage = stage;
        this.width = this.size * 0.8;
        this.time = 480;
        this.nowX = -1;
        this.container = null;
        this.color = ['#754dff', '#fcff46', '#ff5797'];
        this.colorNum = 0;
        this.scaleX = this.width / 21;
        this.scaleY = this.width / 27;
    }

    updateN(n)
    {
        this.size = this.size * this.n;
        this.n = n;
        this.size = this.size / this.n;
    }

    init(nowX, nowY)
    {
        this.container = new EaselJS.Container();
        this.stage.addChild(this.container);
        this.x = 0;
        this.y = 0;
        this.nowX = nowX;
        this.nowY = nowY;

        const spriteData = {
            images: [preloader.getResult("role")],
            frames: {width:21, height:27, regX: 0, regY: 0},
            animations: {
                stand:1,
                walkDown: {
                    frames: [0, 1, 2, 1],
                    next: "walkDown",
                    speed: 0.1
                },
                walkLeft: {
                    frames: [3, 4, 5, 4],
                    next: "walkLeft",
                    speed: 0.1
                },
                walkUp: {
                    frames: [6, 7, 8, 7],
                    next: "walkUp",
                    speed: 0.1
                },
                walkRight: {
                    frames: [9, 10, 11, 10],
                    next: "walkRight",
                    speed: 0.1
                },
            }
        };
        const spriteSheet = new EaselJS.SpriteSheet(spriteData);
        this.role = new EaselJS.Sprite(spriteSheet,"stand");

        // this.role = new EaselJS.Shape();
        this.role.shadow = new EaselJS.Shadow(this.color[this.colorNum], 2, 2, 12);
        this.role.cursor = "pointer";

        TweenJS.Tween.get(this.role, {loop: true})
            .to({
                alpha: 0.5,
            }, 1000)
            .to({
                alpha: 1
            }, 300);

        if (this.animation)
        {
            this.role.on("mousedown", (ev) => {
                MessageBar.show(configMsgHints.clickRole);
                this.colorNum = (this.colorNum + 1) % this.color.length;
                this.drawPic();
            });
        }

        this.container.addChild(this.role);

        this.role.filters = [new EaselJS.ColorFilter(1,1,0,1)];

        this.drawPic();
    }

    drawPic()
    {
        let x = this.nowX * this.size + (this.size - this.width) / 2;
        let y = this.nowY * this.size + (this.size - this.width) / 2;
        this.role.setTransform(y, x, this.scaleX, this.scaleY);
        // this.role.x = y;
        // this.role.y = x;
        //this.role.graphics.beginFill(this.color[this.colorNum]).drawRect(y - this.role.x, x - this.role.y, this.width, this.width);
        this.role.shadow = new EaselJS.Shadow(this.color[this.colorNum], 2, 2, 12);
    }

    move(x, y)
    {
        TweenJS.Tween.removeTweens(this);
        // this.role.graphics.clear();
        this.drawPic();
        if (x === this.nowX + 1)
        {
            this.role.gotoAndPlay("walkDown");
            TweenJS.Tween.get(this.role).to({ y: this.role.y + this.size }, this.time);
        }
        else if (x === this.nowX - 1)
        {
            this.role.gotoAndPlay("walkUp");
            TweenJS.Tween.get(this.role).to({ y: this.role.y - this.size }, this.time);
        }
        else if (y === this.nowY + 1)
        {
            this.role.gotoAndPlay("walkRight");
            TweenJS.Tween.get(this.role).to({ x: this.role.x + this.size }, this.time);
        }
        else if (y === this.nowY - 1)
        {
            this.role.gotoAndPlay("walkLeft");
            TweenJS.Tween.get(this.role).to({ x: this.role.x - this.size }, this.time);
        }
        else
        {
            this.role.stop();
        }
        this.updatePos(x, y);
    }

    updatePos(x, y)
    {
        this.nowX = x;
        this.nowY = y;
    }

    reset()
    {
        this.container = null;
    }

    /**
     * Update the snake's position and redraw
     * @param snake
     */
    update(snake)
    {
        let l = snake.size;
        let x = snake.body[l - 1].x;
        let y = snake.body[l - 1].y;
        if (this.container === null)
        {
            this.init(x, y);
        }
        else
        {
            this.move(x, y);
        }
    }
}

export default Role;
