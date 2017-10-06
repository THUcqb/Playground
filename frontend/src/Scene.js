import React, { Component } from 'react';
import createjs from 'easeljs';
import GrassPainter from './GrassPainter';
import SnakePainter from './SnakePainter';

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
        stage.update();
    }
}

export default Scene;
