import React, { Component } from 'react';
import Toolbar from 'material-ui/Toolbar';
import EaselJS from 'masteryodaeaseljs';
import LevelButton from './LevelChoose';
import Element from './painter/Element';
import Background from './painter/Background';
import Role from './painter/Role';
import MapEditorButton from './mapeditor/MapEditorButton';
import { Controller } from './logic/Controller';
import { loadToolbox } from "./utils/LoadBlockly";
import Trajectory from "./painter/Trajectory";

/**
 * The app's scene part
 */
class Scene extends Component
{
    canvasScene;
    CanvasDiv;

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
        loadToolbox(levelNum);
        this.background.reset();
        this.element.reset();
        this.trajectory.reset();
        this.role.reset();
        this.background.update(this.controller.getMap());
        this.trajectory.update(this.controller.getSnake());
        this.element.update(this.controller.getMap());
        this.role.update(this.controller.getSnake());
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
                <div className="levelOptions">
                    <Toolbar color="primary">
                        <LevelButton
                            onChooseLevel={(levelNum) => this.handleChooseLevel(levelNum)}
                        />&nbsp;&nbsp;
                        <MapEditorButton color="primary" />
                    </Toolbar>
                </div>
                <div className="CanvasDiv" ref="CanvasDiv">
                    <canvas id="canvasScene" ref="canvasScene" width="600" height="600" />
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
            let status = data.controller.currentState();
            // if (status === "runnable")
            // {
                data.background.update(data.controller.getMap());
                data.trajectory.update(data.controller.getSnake());
                data.element.update(data.controller.getMap());
                data.role.update(data.controller.getSnake());
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
        let stage = this.refs.canvasScene;
        
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
        const element = this.refs.canvasScene;
        window.addEventListener("resize", this.handleResize, false);
        this.handleResize();
        this.stage = new EaselJS.Stage(element);
        this.stage.enableMouseOver(10);
        this.background = new Background(this.stage, element.height, 10);
        this.trajectory = new Trajectory(this.stage, element.height, 10);
        this.element = new Element(this.stage, element.height, 10, true);
        this.role = new Role(this.stage, element.height, 10);
        let count = 0;
        let data = {
            background: this.background,
            trajectory: this.trajectory,
            element: this.element,
            role: this.role,
            stage: this.stage,
            controller: this.controller,
            count: count,
        };
        EaselJS.Ticker.on("tick", Scene.tick, null, false, data);
        EaselJS.Ticker.framerate = 60;
        EaselJS.Ticker.timingMode = EaselJS.Ticker.RAF;
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
