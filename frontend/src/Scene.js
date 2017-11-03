import React, { Component } from 'react';
import Toolbar from 'material-ui/Toolbar';
import EaselJS from 'masteryodaeaseljs';
import GrassPainter from './painter/GrassPainter';
import SnakePainter from './painter/SnakePainter';
import LevelButton from './LevelChoose';
import { Controller } from './logic/Controller';
import { loadToolbox } from "./utils/LoadBlockly";

/**
 * The app's scene part
 */
class Scene extends Component
{
    constructor()
    {
        super();
        this.controller = Controller.controller;

        this.handleResize = this.handleResize.bind(this);
    }
    
    /**
     * Change the game level and update the scene
     * @param levelNum number representation of a game level
     */
    handleChooseLevel(levelNum)
    {
        this.stage.removeAllChildren();
        this.controller.getSnake().init(5, 5);
        this.controller.getMap().load(levelNum);
        this.grassPainter.init(this.controller.getMap());
        this.snakePainter.reset();
        loadToolbox(levelNum);
    }

    /**
     * Render function
     * @returns {XML} consists of a canvas which
     * draws the game interface
     */
    render()
    {
        return (
            <div>
            <div className="levelsDiv">
                <Toolbar color="primary">
                    <LevelButton
                        onChooseLevel={(levelNum) => this.handleChooseLevel(levelNum)}
                    />
                </Toolbar>
            </div>
            <div className="CanvasDiv" ref="CanvasDiv">
                <canvas id="canvas" ref="canvas" width="600" height="600" />
            </div>
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
        if (data.count === 0)
        {
            let status = data.controller.current_state();
            // if (status === "runnable")
            // {
                data.grassPainter.update(data.controller.getMap());
                data.snakePainter.update(data.controller.getSnake());
            // }
        }
        data.count = (data.count + 1) % 30;
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
        this.stage = new EaselJS.Stage("canvas");
        
        this.grassPainter = new GrassPainter(this.stage);
        this.snakePainter = new SnakePainter(this.stage);
        
        let count = 0;
        let data = {
            grassPainter: this.grassPainter,
            snakePainter: this.snakePainter,
            stage: this.stage,
            controller: this.controller,
            count: count,
        };
        EaselJS.Ticker.on("tick", Scene.tick, null, false, data);
        EaselJS.Ticker.framerate = 60;

        this.handleChooseLevel(1);
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
