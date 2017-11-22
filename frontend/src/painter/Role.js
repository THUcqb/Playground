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

        const FramePos = {
            downward1: 0, downward2: 1, downward3: 2,
            leftward1: 3, leftward2: 4, leftward3: 5,
            upward1: 6, upward2: 7, upward3: 8,
            rightward1: 9, rightward2: 10, rightward3: 11,
        };
        const frameWidth = 21;
        const frameHeight = 27;

        const spriteData = {
            images: [preloader.getResult("role")],
            frames: {width: frameWidth, height: frameHeight, regX: 0, regY: 0},
            animations: {
                standDownward: FramePos.downward2,
                standUpward: FramePos.upward2,
                standLeftward: FramePos.leftward2,
                standRightward: FramePos.rightward2,
                walkDown: {
                    frames: [FramePos.downward1, FramePos.downward2, FramePos.downward3, FramePos.downward2],
                    next: "walkDown",
                    speed: 0.1
                },
                walkLeft: {
                    frames: [FramePos.leftward1, FramePos.leftward2, FramePos.leftward3, FramePos.leftward2],
                    next: "walkLeft",
                    speed: 0.1
                },
                walkUp: {
                    frames: [FramePos.upward1, FramePos.upward2, FramePos.upward3, FramePos.upward2],
                    next: "walkUp",
                    speed: 0.1
                },
                walkRight: {
                    frames: [FramePos.rightward1, FramePos.rightward2, FramePos.rightward3, FramePos.rightward2],
                    next: "walkRight",
                    speed: 0.1
                },
            }
        };
        const spriteSheet = new EaselJS.SpriteSheet(spriteData);
        this.facing = "up";
        this.role = new EaselJS.Sprite(spriteSheet,"standUpward");

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
                ev = null;
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
        this.role.shadow = new EaselJS.Shadow(this.color[this.colorNum], 2, 2, 12);
    }

    move(x, y)
    {
        TweenJS.Tween.removeTweens(this);
        // this.role.graphics.clear();
        this.drawPic();
        if (x === this.nowX + 1)
        {
            this.facing = "down";
            this.role.gotoAndPlay("walkDown");
            TweenJS.Tween.get(this.role).to({ y: this.role.y + this.size }, this.time);
        }
        else if (x === this.nowX - 1)
        {
            this.facing = "up";
            this.role.gotoAndPlay("walkUp");
            TweenJS.Tween.get(this.role).to({ y: this.role.y - this.size }, this.time);
        }
        else if (y === this.nowY + 1)
        {
            this.facing = "right";
            this.role.gotoAndPlay("walkRight");
            TweenJS.Tween.get(this.role).to({ x: this.role.x + this.size }, this.time);
        }
        else if (y === this.nowY - 1)
        {
            this.facing = "left";
            this.role.gotoAndPlay("walkLeft");
            TweenJS.Tween.get(this.role).to({ x: this.role.x - this.size }, this.time);
        }
        else
        {
            if (this.facing === "up")
            {
                this.role.gotoAndStop("standUpward");
            }
            else if (this.facing === "down")
            {
                this.role.gotoAndStop("standDownward");
            }
            else if (this.facing === "left")
            {
                this.role.gotoAndStop("standLeftward");
            }
            else if (this.facing === "right")
            {
                this.role.gotoAndStop("standRightward");
            }
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
