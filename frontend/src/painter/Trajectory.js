import EaselJS from "masteryodaeaseljs";
import { N, startPos, delta } from "../Constant";
import { preloader } from "../index";

class Trajectory
{
    constructor(stage)
    {
        this.width = delta / 3;
        this.time = 480;
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
        let blurFilter = new EaselJS.BlurFilter(6, 6, 3);
        this.blur.filters = [blurFilter, new EaselJS.ColorMatrixFilter(new EaselJS.ColorMatrix(60, 0, 0, 0))];
        this.blur.setTransform(startPos, startPos, delta * N / this.picWidth, delta * N / this.picHeight);
        this.blur.cache(0, 0, this.picWidth, this.picHeight);

        this.drawingCanvas = new EaselJS.Shape();
        this.drawingCanvas.cache(0, 0, this.picWidth, this.picHeight);
        this.drawingCanvas.setTransform(startPos, startPos, delta * N / this.picWidth, delta * N / this.picHeight);

        this.bitmap = new EaselJS.Bitmap(img);
        let maskFilter = new EaselJS.AlphaMaskFilter(this.drawingCanvas.cacheCanvas);
        this.bitmap.setTransform(startPos, startPos, delta * N / this.picWidth, delta * N / this.picHeight);
        this.bitmap.filters = [maskFilter];
        this.bitmap.cache(0, 0, this.picWidth, this.picHeight);
        this.nowX = x;
        this.nowY = y;

        this.deltaWidth = this.picWidth / N;
        this.deltaHeight = this.picHeight / N;
        this.edgeWidth = (delta - this.width) / 2 * this.picWidth / delta / N;
        this.edgeHeight = (delta - this.width) / 2 * this.picHeight / delta / N;
        this.widthW = this.width * this.picWidth / delta / N;
        this.widthH = this.width * this.picHeight / delta / N;

        this.container.addChild(this.blur, this.bitmap);

        this.drawingCanvas.graphics.clear().beginFill("#000000");
        this.drawingCanvas.graphics.alpha = 0.3;
        this.drawingCanvas.graphics.drawRect(y * this.deltaWidth + this.edgeWidth, x * this.deltaHeight + this.edgeHeight, this.widthW, this.widthH);

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
        this.drawingCanvas.graphics.clear().beginFill("rgba(0, 0, 0, 1)");
        if (nowX === this.nowX + 1)
        {
            this.drawingCanvas.graphics.drawRect(this.nowY * this.deltaWidth + this.edgeWidth, this.nowX * this.deltaHeight + this.edgeHeight + this.widthH, this.widthW, this.deltaHeight);
        }
        if (nowX === this.nowX - 1)
        {
            this.drawingCanvas.graphics.drawRect(this.nowY * this.deltaWidth + this.edgeWidth, this.nowX * this.deltaHeight + this.edgeHeight, this.widthW, -this.deltaHeight);
        }
        if (nowY === this.nowY + 1)
        {
            this.drawingCanvas.graphics.drawRect(this.nowY * this.deltaWidth + this.edgeWidth + this.widthW, this.nowX * this.deltaHeight + this.edgeHeight, this.deltaWidth, this.widthH);
        }
        if (nowY === this.nowY - 1)
        {
            this.drawingCanvas.graphics.drawRect(this.nowY * this.deltaWidth + this.edgeWidth, this.nowX * this.deltaHeight + this.edgeHeight, -this.deltaWidth, this.widthH);
        }

        this.drawingCanvas.updateCache("source-over");
        this.bitmap.updateCache();
        this.nowX = nowX;
        this.nowY = nowY;
    }
}

export default Trajectory;
