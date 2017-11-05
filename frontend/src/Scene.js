import React, { Component } from 'react';
import Toolbar from 'material-ui/Toolbar';
import EaselJS from 'masteryodaeaseljs';
import Element from './painter/Element';
import Background from './painter/Background';
import Role from './painter/Role';
import MapEditorButton from './mapeditor/MapEditorButton';
import LevelButton from './gameflow/LevelChoose';
import OverDialog from './gameflow/OverDialog';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import { Controller } from './logic/Controller';
import { loadToolbox } from "./utils/LoadBlockly";
import Trajectory from "./painter/Trajectory";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
});

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
        this.state = {
            open: false,
            nowLevel: 1,
            dialogTitle: "Game Over",
        };
    }
    
    /**
     * Change the game level and update the scene
     * @param levelNum number representation of a game level
     */
    handleChooseLevel(levelNum)
    {
        this.setState({nowLevel: levelNum});
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

    handleGameOver() {
        this.setState({
            open: true,
            dialogTitle: "Game Over"
        });
    }

    handleSuccess() {
        this.setState({
            open: true,
            dialogTitle: "Success!"
        });
    }

    handleRequestClose() {
        this.setState({open: false});
    }

    handleNextLevel() {
        if (this.state.nowLevel < 4) {
            this.handleChooseLevel(this.state.nowLevel + 1);
        }
        this.handleRequestClose();
    }

    /**
     * Render function
     * @returns {XML} consists of a canvas which
     * draws the game interface
     */
    render()
    {
        const { classes } = this.props;
        return (
            //<div>
            //     <div className="levelsDiv">

                // </div>
                <div className="CanvasDiv" ref="CanvasDiv">
                    <Toolbar color="primary">
                        <LevelButton className={classes.button}
                            ref="levelButton"
                            onChooseLevel={(levelNum) => this.handleChooseLevel(levelNum)}
                        />
                        <Button raised className={classes.button}
                                color="primary"
                                onClick={() => this.handleGameOver()}
                        >
                            Test Game Over
                        </Button>
                    </Toolbar>
                    <MapEditorButton/>
                    <canvas id="canvas" ref="canvas" width="600" height="600" />
                    <OverDialog
                        open={this.state.open}
                        //onRequestClose={() => this.handleRequestClose()}
                        dialogTitle={this.state.dialogTitle}
                        onNext={() => this.handleNextLevel()}
                        onLevels={() => {
                            this.handleRequestClose();
                            this.refs.levelButton.handleClickOpen();
                        }}
                        onReplay={() => {
                            this.handleRequestClose();
                            this.handleChooseLevel(this.state.nowLevel);
                        }}
                    />

                </div>
            // </div>
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
            if (status === "runnable")
            {
                data.background.update(data.controller.getMap());
                data.trajectory.update(data.controller.getSnake());
                data.element.update(data.controller.getMap());
                data.role.update(data.controller.getSnake());
            }
            else if (status === "fail")
            {
                data.handleGameOver();
            }
            else if (status === "success")
            {
                data.handleSuccess();
            }
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
        this.stage.enableMouseOver(10);
        this.background = new Background(this.stage);
        this.trajectory = new Trajectory(this.stage);
        this.element = new Element(this.stage);
        this.role = new Role(this.stage);
        let count = 0;
        let data = {
            background: this.background,
            trajectory: this.trajectory,
            element: this.element,
            role: this.role,
            stage: this.stage,
            controller: this.controller,
            count: count,
            handleGameOver: () => this.handleGameOver(),
            handleSuccess: () => this.handleSuccess(),
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

export default withStyles(styles, {withTheme: true})(Scene);
