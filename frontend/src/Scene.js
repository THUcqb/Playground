import React, { Component } from 'react';
import createjs from 'easeljs';
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
    }

    render()
    {
        return (
            <div>
                <canvas id="canvas" width="1000" height="700" />
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

    componentDidMount()
    {
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
        createjs.Ticker.setFPS(4);
    }
}

export default Scene;
