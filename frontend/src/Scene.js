import React, { Component } from 'react';
import createjs from 'easeljs';
import GrassPainter from './painter/GrassPainter';
import SnakePainter from './painter/SnakePainter';
import Snake from './logic/Snake';
// import { Base } from './logic/Base';

class Scene extends Component
{
//    constructor()
//    {
//        super();
//        this.base = new Base();
//    }

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
        let isFinished = false;
        if (data.round === -1) isFinished = true;
        else
        {
            data.snake.add_head(data.round, 5);
            data.round--;
        }
        if (!isFinished)
        {
            //TODO: Theses objects need to be cloned!!
            data.grassPainter.update();
            data.snakePainter.update(data.snake);
        }
        data.stage.update();
    }

    componentDidMount()
    {
        let stage = new createjs.Stage("canvas");
        let grassPainter = new GrassPainter();
        let snakePainter = new SnakePainter();
        let snake = new Snake(9, 5);
        let round = Number(8);
        let s = new Snake(3, 3);
        snakePainter.update(s);
        stage.addChild(grassPainter);
        stage.addChild(snakePainter);
        let data = {
            grassPainter: grassPainter,
            snakePainter: snakePainter,
            snake: snake,
            stage: stage,
            round: round,
        };
        createjs.Ticker.on("tick", this.tick, null, false, data);
        createjs.Ticker.setFPS(1);
    }
}

export default Scene;
