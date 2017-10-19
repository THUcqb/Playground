import React, { Component } from 'react';
import createjs from 'masteryodaeaseljs';
import GrassPainter from './painter/GrassPainter';
import SnakePainter from './painter/SnakePainter';
import { Controller } from './logic/Controller';
import { Base } from './logic/Base';

/**
 * The app's scene part
 */
class Scene extends Component
{
    constructor()
    {
        super();
        this.controller = Controller.controller;

        this.controller.init();
        this.handleResize = this.handleResize.bind(this);
    }

    /**
     * Render function
     * @returns {XML} consists of a canvas which
     * draws the game interface
     */
    render()
    {
        return (
            <div className="CanvasDiv" ref="CanvasDiv">
                <canvas id="canvas" ref="canvas" width="600" height="600" />
            </div>
        );
    }

    /**
     * Tick function
     * @param event
     * @param data consist of essential information
     */
    static tick(event, data)
    {
        let status = data.controller.current_state();
        console.log(status);
        if (status === "runnable")
        {
            //TODO: Theses objects need to be cloned!!
            data.grassPainter.update(data.controller.getMap());
            data.snakePainter.update(data.controller.getSnake());
        }
        data.stage.update();
    }

    /**
     * Handle resizing event
     * @param event
     */
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

    /**
     * This function executes when the component mounts
     */
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
        createjs.Ticker.on("tick", Scene.tick, null, false, data);
        createjs.Ticker.framerate = 24;
    }

    /**
     * This function executes when the component is going to unmount
     */
    componentWillUnmount()
    {
        window.removeEventListener("resize", this.handleResize);
    }
}

export default Scene;
