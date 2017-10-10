import React, { Component } from 'react';
import createjs from 'easeljs';
import GrassPainter from './painter/GrassPainter';
import SnakePainter from './painter/SnakePainter';

class Scene extends Component
{
    render()
    {
        return (
            <div>
                <canvas id="canvas" width="1000" height="700" />
            </div>
        );
    }

    componentDidMount()
    {
        let stage = new createjs.Stage("canvas");
        let grassPainter = new GrassPainter();
        let snakePainter = new SnakePainter();
        stage.addChild(grassPainter);
        stage.addChild(snakePainter);
        let tick = function(event) {
            let isFinished = false;
            grassPainter.update();
            snakePainter.update();
            stage.update();
        }
        createjs.Ticker.on("tick", tick);
        createjs.Ticker.setFPS(60);
    }
}

export default Scene;
