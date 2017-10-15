import React, { Component } from 'react';
import createjs from 'masteryodaeaseljs';
import GrassPainter from './painter/GrassPainter';
import SnakePainter from './painter/SnakePainter';
import Snake from './logic/Snake';
import { Controller } from './logic/Controller';

class Scene extends Component
{
    constructor()
    {
        super();
        this.controller = new Controller();
        this.controller.testInit();
        this.handleResize = this.handleResize.bind(this);
    }

    render()
    {
        return (
            <div className="CanvasDiv" ref="CanvasDiv">
                <canvas id="canvas" ref="canvas" width="600" height="600" />
            </div>
        );
    }

    tick(event, data)
    {
        let status = data.controller.next();
        console.log(status);
        if (status === "runnable")
        {
            //TODO: Theses objects need to be cloned!!
            data.grassPainter.update(data.controller.getMap());
            data.snakePainter.update(data.controller.getSnake());
        }
        data.stage.update();
    }
    
    handleResize(event)
    {
        let fatherDiv = this.refs.CanvasDiv;
        let stage = this.refs.canvas;
        
        let width = fatherDiv.offsetWidth;
        let height = fatherDiv.offsetHeight;
        
        let minSize = width;
        if (height < width)
            minSize = height;
        stage.style.width = minSize.toString() + 'px';
        stage.style.height = minSize.toString() + 'px';
    }

    componentDidMount()
    {
        window.addEventListener("resize", this.handleResize, false);
        this.handleResize();
        let stage = new createjs.Stage("canvas");
        
        let grassPainter = new GrassPainter();
        let snakePainter = new SnakePainter();
        stage.addChild(grassPainter);
        stage.addChild(snakePainter);
        let data = {
            grassPainter: grassPainter,
            snakePainter: snakePainter,
            stage: stage,
            controller: this.controller,
        };
        createjs.Ticker.on("tick", this.tick, null, false, data);
        createjs.Ticker.framerate = 24;
    }
    
    componentWillUnmount()
    {
        window.removeEventListener("resize", this.handleResize);
    }
}

export default Scene;
