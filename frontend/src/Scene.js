import React, {Component} from 'react';
import Toolbar from 'material-ui/Toolbar';
import EaselJS from 'masteryodaeaseljs';
import Element from './painter/Element';
import Background from './painter/Background';
import Role from './painter/Role';
import MapEditorButton from './mapeditor/MapEditorButton';
import LevelDialog from './gameflow/LevelDialog';
import OverDialog from './gameflow/OverDialog';
import Button from 'material-ui/Button';
import {withStyles} from 'material-ui/styles';
import {Controller} from './logic/Controller';
import Trajectory from "./painter/Trajectory";
import MessageBar from './utils/MessageBar';
import {loadToolbox} from "./utils/LoadBlockly";
import {shareGetContext} from "./utils/SharedLinks";
import {loadLevelsInfo, loadLevelSolution, saveLevelInfo} from "./utils/LevelInfo";
import {loadDIYMaps} from "./utils/LevelMap";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
});

/**
 * The app's scene part
 */
export class Scene extends Component
{
    canvasScene;
    CanvasDiv;

    static singleton = null;

    constructor()
    {
        super();
        Scene.singleton = this;
        this.handleResize = this.handleResize.bind(this);
        this.state = {
            overDialogOpen: false,
            levelDialogOpen: false,
            nowLevel: 1,
            dialogTitle: "Game Over",
        };
        this.levelsInfo = {
            '1': {unlock: true, stars: '0'},
            '2': {unlock: false, stars: '0'},
            '3': {unlock: false, stars: '0'},
            '4': {unlock: false, stars: '0'},
            '5': {unlock: false, stars: '0'},
        };
        this.DIYMapsInfo = [];
        this.DIYMaps = {};
    }

    reset()
    {
        this.background.reset();
        this.element.reset();
        this.trajectory.reset();
        this.role.reset();
        this.background.update(Controller.getMap());
        this.trajectory.update(Controller.getSnake());
        this.element.update(Controller.getMap());
        this.role.update(Controller.getSnake());
    }

    isNextLevelAvailable()
    {
        return (this.state.nowLevel < 5 && !this.isFail);
    }

    /**
     * Change the game level and update the scene
     * @param levelNum number representation of a game level
     */
    handleChooseLevel(levelNum)
    {
        this.setState({nowLevel: levelNum});
        this.stage.removeAllChildren();
        Controller.controller.switchLevel(levelNum);
        this.reset();

        loadToolbox(levelNum);
        loadLevelSolution(levelNum);
    }

    /**
     *
     * @param {String} id
     */
    handleChooseDIYLevel(id)
    {
        this.stage.removeAllChildren();
        Controller.controller.switchDIYLevel(this.DIYMaps[id]);
        this.reset();
    }

    handleChooseSharedLevel(string)
    {
        this.stage.removeAllChildren();
        Controller.controller.switchStringLevel(string);
        this.reset();
    }

    /**
     * Refresh the scene and reset the controller when the user click submit
     */
    static handleRestart()
    {
        Scene.singleton.stage.removeAllChildren();
        Controller.controller.switchLevel(Scene.singleton.state.nowLevel);
        Scene.singleton.reset();
    }

    handleOpenLevelDialog()
    {
        loadLevelsInfo()
            .then((response) => {
                if (response.OK)
                {
                    this.levelsInfo = response.levelsInfo;
                    this.setState({levelDialogOpen: true});
                }
            });
        loadDIYMaps()
            .then((response) =>
            {
                this.DIYMapsInfo = [];
                this.DIYMaps = {};
                if (response.OK)
                {
                    for (let key = 0; key < response.map.length; key++)
                    {
                        let map = {
                            id: key,
                            name: response.map[key].mapname,
                            info: response.map[key].mapinfo,
                        };
                        this.DIYMapsInfo.push(map);
                        this.DIYMaps[map.id] = map;
                    }
                }
            });
    }

    handleGameOver()
    {
        saveLevelInfo(this.state.nowLevel);
        this.isOver = true;
        this.setState({
            overDialogOpen: true,
            dialogTitle: "Game Over"
        });
    }

    handleSuccess()
    {
        saveLevelInfo(this.state.nowLevel);
        this.isOver = true;
        this.setState({
            overDialogOpen: true,
            dialogTitle: "Success!"
        });
    }

    handleNextLevel()
    {
        if (this.state.nowLevel < 5)
        {
            this.handleChooseLevel(this.state.nowLevel + 1);
        }
        else
        {
            this.handleChooseLevel(this.state.nowLevel);
        }
        this.setState({overDialogOpen: false});
    }

    /**
     * Render function
     * @returns {XML} consists of a canvas which
     * draws the game interface
     */
    render()
    {
        const {classes} = this.props;
        return (
            <div className="CanvasDiv" ref="CanvasDiv" style={{width: "100%"}}>
                <div ref="ToolbarDiv">
                <Toolbar color="primary" ref="Toolbar" style={{padding: 0}}>
                    <Button raised
                            className={classes.button}
                            color="primary"
                            onClick={() => this.handleOpenLevelDialog()}>
                        Levels
                    </Button>
                    <LevelDialog
                        open={this.state.levelDialogOpen}
                        levelsInfo={this.levelsInfo}
                        DIYMapsInfo={this.DIYMapsInfo}
                        onRequestClose={() => this.setState({levelDialogOpen: false})}
                        onChooseLevel={(levelNum) =>
                        {
                            this.handleChooseLevel(levelNum);
                            this.setState({
                                overDialogOpen: false,
                                levelDialogOpen: false
                                });
                        }}
                        onChooseDIYMap={(id) =>
                        {
                            this.handleChooseDIYLevel(id);
                            this.setState({
                                overDialogOpen: false,
                                levelDialogOpen: false
                            });
                        }}
                    />
                    <MapEditorButton color="primary"/>
                </Toolbar>
                </div>
                <canvas id="canvasScene" ref="canvasScene" width="600" height="600"/>
                <OverDialog
                    open={this.state.overDialogOpen}
                    dialogTitle={this.state.dialogTitle}
                    nextAvail={this.isNextLevelAvailable()}
                    onNext={() => this.handleNextLevel()}
                    onLevels={() => this.handleOpenLevelDialog()}
                    onReplay={() =>
                    {
                        this.setState({overDialogOpen: false});
                        this.handleChooseLevel(this.state.nowLevel);
                    }}
                />
                <MessageBar/>
            </div>
        );
    }

    tick()
    {
        if (this.count === 0)
        {
            const controller = Controller.controller;
            const status = controller.currentState();
            if (status === "runnable")
            {
                this.background.update(Controller.getMap());
                this.trajectory.update(Controller.getSnake());
                this.element.update(Controller.getMap());
                this.role.update(Controller.getSnake());
                this.isOver = false;
                this.isFail = true;
            }
            else if (status === "edit")
            {
                this.reset();
                Controller.controller.setState("runnable");
            }
            else if (status === "fail")
            {
                this.isFail = true;
                if (!this.isOver)
                {
                    this.handleGameOver();
                }
            }
            else if (status === "success")
            {
                this.background.update(Controller.getMap());
                this.trajectory.update(Controller.getSnake());
                this.element.update(Controller.getMap());
                this.role.update(Controller.getSnake());
                this.isFail = false;
                if (!this.isOver)
                {
                    this.handleSuccess();
                }
            }
        }
        this.count = (this.count + 1) % 30;
        this.stage.update();
    }

    /**
     * Handle resizing event
     * @param event
     */
    handleResize(event)
    {
        let fatherDiv = this.refs.CanvasDiv;
        let stage = this.refs.canvasScene;
        let toolbar = this.refs.ToolbarDiv;

        let width = fatherDiv.offsetWidth;
        let height = fatherDiv.offsetHeight - toolbar.offsetHeight;

        // let minSize = width;
        // if (height < width)
            // minSize = height;
        width = Math.min(width, height * 1.3);
        height = Math.min(height, width * 1.3);
        stage.style.width = width.toString() + 'px';
        stage.style.height = height.toString() + 'px';
    }

    loadSharedContext()
    {
        let sharedCode = this.props.location.pathname.substring(1);
        shareGetContext(sharedCode)
            .then((sharedContext) => {
                if (sharedContext.OK) {
                    MessageBar.show(
                        `Successfully opened map shared by ${sharedContext.owner}!`
                    );
                }
                else {
                    MessageBar.show('Oops! Link invalid!');
                    this.handleChooseLevel(1);
                }
            })
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
        this.background = new Background(this.stage, 600, 10);
        this.trajectory = new Trajectory(this.stage, 600, 10);
        this.element = new Element(this.stage, 600, 10, true);
        this.role = new Role(this.stage, 600, 10, true);
        this.count = 0;
        EaselJS.Ticker.addEventListener("tick", () => this.tick());
        EaselJS.Ticker.framerate = 60;
        EaselJS.Ticker.timingMode = EaselJS.Ticker.RAF;
        if (this.props.location.pathname === '/')
        {
            this.handleChooseLevel(1);
        }
        else
        {
            this.loadSharedContext();
        }
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