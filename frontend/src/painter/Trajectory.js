import EaselJS from "masteryodaeaseljs";
import TweenJS from "masteryodatweenjs";
import { preloader } from "../index";

class Trajectory
{
    constructor(stage, size, n)
    {
        this.size = size / n;
        this.n = n;
        this.width = this.size / 5 * 4;
        this.time = 480;
        this.totalLength = 10;
        this.stage = stage;
        this.nowX = 0;
        this.nowY = 0;
        this.reset();
    }
    
    reset()
    {
        this.container = null;
    }
    
    init(x, y)
    {
        this.container = new EaselJS.Container();
        this.stage.addChild(this.container);

        let img = preloader.getResult("square");

        this.blur = new EaselJS.Bitmap(img);
        this.picWidth = img.width;
        this.picHeight = img.height;
        let blurFilter = new EaselJS.BlurFilter(24, 24, 2);
        this.blur.filters = [blurFilter, new EaselJS.ColorMatrixFilter(new EaselJS.ColorMatrix(60, 0, 0, 0))];
        this.blur.setTransform(0, 0, this.size * this.n / this.picWidth, this.size * this.n / this.picHeight);
        this.blur.cache(0, 0, this.picWidth, this.picHeight);

        this.drawingCanvas = new EaselJS.Shape();
        this.drawingCanvas.cache(0, 0, this.picWidth, this.picHeight);
        this.drawingCanvas.setTransform(0, 0, this.size * this.n / this.picWidth, this.size * this.n / this.picHeight);

        this.bitmap = new EaselJS.Bitmap(img);
        let maskFilter = new EaselJS.AlphaMaskFilter(this.drawingCanvas.cacheCanvas);
        this.bitmap.setTransform(0, 0, this.size * this.n / this.picWidth, this.size * this.n / this.picHeight);
        this.bitmap.filters = [maskFilter];
        this.bitmap.cache(0, 0, this.picWidth, this.picHeight);
        this.nowX = x;
        this.nowY = y;

        this.deltaWidth = this.picWidth / this.n;
        this.deltaHeight = this.picHeight / this.n;
        this.edgeWidth = (this.size - this.width) / 2 * this.picWidth / this.size / this.n;
        this.edgeHeight = (this.size - this.width) / 2 * this.picHeight / this.size / this.n;
        this.widthW = this.width * this.picWidth / this.size / this.n;
        this.widthH = this.width * this.picHeight / this.size / this.n;

        this.container.addChild(this.blur, this.bitmap);

        this.drawingCanvas.graphics.clear().beginFill("#000000");
        this.drawingCanvas.graphics.alpha = 0.3;
        this.drawingCanvas.graphics.drawRect(y * this.deltaWidth + this.edgeWidth, x * this.deltaHeight + this.edgeHeight, this.widthW, this.widthH);
        console.log(this.widthW, this.widthH);

        this.drawingCanvas.updateCache("source-over");
        this.bitmap.updateCache();
    }

    update(snake)
    {
        let l = snake.size;
        let x = snake.body[l - 1].x;
        let y = snake.body[l - 1].y;
        if (this.container === null)
        {
            this.init(x, y);
        }
        else if (this.nowX !== x || this.nowY !== y)
        {
            this.newTrajectory(x, y);
        }
    }

    newTrajectory(nowX, nowY)
    {
        this.drawingCanvas.alpha = 0;
        let tween = TweenJS.Tween.get(this.drawingCanvas).to({ alpha: 1 }, this.time).call(() => this.complete(nowX, nowY));
        this.length = 0;
        tween.addEventListener("change", () => this.change(nowX, nowY));
    }

    complete(nowX, nowY)
    {
        this.change(nowX, nowY);
        this.nowX = nowX;
        this.nowY = nowY;
    }

    change(nowX, nowY)
    {
        let alpha = this.drawingCanvas.alpha;
        // let alpha = this.length / (this.totalLength - 1);
        this.length++;
        this.drawingCanvas.graphics.clear().beginFill("rgba(0, 0, 0, 1)");
        if (nowX === this.nowX + 1)
        {
            this.drawingCanvas.graphics.drawRect(this.nowY * this.deltaWidth + this.edgeWidth, this.nowX * this.deltaHeight + this.edgeHeight + this.widthH, this.widthW, this.deltaHeight * alpha);
        }
        if (nowX === this.nowX - 1)
        {
            this.drawingCanvas.graphics.drawRect(this.nowY * this.deltaWidth + this.edgeWidth, this.nowX * this.deltaHeight + this.edgeHeight, this.widthW, -this.deltaHeight * alpha);
        }
        if (nowY === this.nowY + 1)
        {
            this.drawingCanvas.graphics.drawRect(this.nowY * this.deltaWidth + this.edgeWidth + this.widthW, this.nowX * this.deltaHeight + this.edgeHeight, this.deltaWidth * alpha, this.widthH);
        }
        if (nowY === this.nowY - 1)
        {
            this.drawingCanvas.graphics.drawRect(this.nowY * this.deltaWidth + this.edgeWidth, this.nowX * this.deltaHeight + this.edgeHeight, -this.deltaWidth * alpha, this.widthH);
        }
        console.log("in updating", this.widthW, this.widthH);
        this.drawingCanvas.updateCache("source-over");
        this.bitmap.updateCache();
    }
}

export default Trajectory;
