import React from 'react';
import Map from '../logic/Map';
import EaselJS from "masteryodaeaseljs";
import Background from "../painter/Background";
import Element from "../painter/Element";
import Role from "../painter/Role";
import TextField from 'material-ui/TextField';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from 'material-ui/Dialog';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import MessageBar from '../utils/MessageBar';
import { hints as configMsgHints } from '../config/msg';
import {Controller} from '../logic/Controller';
import {BaseMapInfo} from '../logic/ConstInfo';
import {getCookie} from "../utils/Auth";
import {saveDIYMap} from "../utils/LevelMap";
const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },


});

const currencies = [
    {
        value: 8,
        label: 'S (8 * 8)',
    },
    {
        value: 10,
        label: 'M (10 * 10)',
    },
    {
        value: 12,
        label: 'L (12 * 12)',
    },
];

const elements = [
    {
        value: 0,
        label: 'Background',
    },
    {
        value: 1,
        label: 'Wall',
    },
    {
        value: 2,
        label: 'Coin',
    },
    {
        value: 8,
        label: "treasure",
    },
    {
        value: 9,
        label: 'Role',
    },
];

/**
 * The MapEditor
 */
class MapEditor extends React.Component
{
    canvasMapEditor;

    /**
     * Constructor
     */
    constructor(props)
    {
        super(props);
        this.canvasSize = 420;
        this.lastX = 0;
        this.lastY = 0;
        this.lastTreasureX = 0;
        this.lastTreasureY = 1;
        this.stage = null;
        this.state = {
            "mapSize": 10,
            "element": 0
        };

        if (this.map === null)
        {
            this.map = new Map(10, 10);
            this.map.editInit();
            this.map.block_list[0][0].info = BaseMapInfo.getElementsByTagName('birthplace');
        }
       
    }

    initialize()
    {
        this.stage = new EaselJS.Stage(this.refs.canvasMapEditor);
        this.background = new Background(this.stage, this.canvasSize, this.state.mapSize);
        this.element = new Element(this.stage, this.canvasSize, this.state.mapSize, false);
        this.role = new Role(this.stage, this.canvasSize, this.state.mapSize, false);
    }

    handleChange(name, event)
    {
        this.setState({
            [name]: event.target.value,
        }, () => this.updateState(name));
    };

    reset()
    {
        this.map = new Map(this.state.mapSize, this.state.mapSize);
        this.map.editInit();
        this.map.block_list[0][0].info = BaseMapInfo.getElementsByTagName('birthplace');
        this.map.block_list[0][1].info = BaseMapInfo.getElementsByTagName('end');
        this.lastX = 0;
        this.lastY = 0;
        this.lastTreasureX = 0;
        this.lastTreasureY = 1;
        this.background.reset();
        this.element.reset();
        this.role.reset();
    }

    updateState(name)
    {
        if (name === "init")
        {
            this.background.updateN(this.state.mapSize);
            this.element.updateN(this.state.mapSize);
            this.role.updateN(this.state.mapSize);
            this.map.print();
            for (let i = 0; i < this.state.mapSize; i++)
                for (let j = 0; j < this.state.mapSize; j++)
                {
                    if (this.map.block_list[i][j].info === BaseMapInfo.getElementsByTagName('head')  || this.map.block_list[i][j].info === BaseMapInfo.getElementsByTagName('birthplace') )
                    {
                        this.lastX = i;
                        this.lastY = j;
                    }
                    if (this.map.block_list[i][j].info === BaseMapInfo.getElementsByTagName('end'))
                    {
                        this.lastTreasureX = i;
                        this.lastTreasureY = j;
                    }
                }
            this.background.init(this.map);
            this.element.init(this.map);
            this.role.init(this.lastX, this.lastY);
        }
        if (name === "mapSize")
        {
            this.reset();
            this.background.updateN(this.state.mapSize);
            this.element.updateN(this.state.mapSize);
            this.role.updateN(this.state.mapSize);
            this.background.init(this.map);
            this.element.init(this.map);
            this.role.init(this.lastX, this.lastY);
        }
        if (name === "map")
        {
            this.background.reset();
            this.element.reset();
            this.role.reset();
            this.background.init(this.map);
            this.element.init(this.map);
            this.role.init(this.lastX, this.lastY);
        }
        if (name === "reset")
        {
            this.reset();
            this.background.init(this.map);
            this.element.init(this.map);
            this.role.init(this.lastX, this.lastY);
        }
        this.stage.update();
    }

    onEnter()
    {
        this.initialize();
        this.map = Controller.copyBaseMap();
        this.setState({ mapSize: this.map.SIZE_X }, () => this.updateState("init"));
    }

    handleFinishEditing(op)
    {
        if (op === "start")
        {
            Controller.controller.editNewMap(this.map);
            this.props.onRequestClose();
        }
        if (op === "save")
        {
            let name = prompt("Map name", "My Map");
            if (name !== null && name !== "")
            {
                saveDIYMap(name, this.map).then((response) =>
                {
                    if (response.OK)
                    {
                        alert("Save successfully!");
                    }
                    else
                    {
                        alert("Fail to save!")
                    }
                })
            }
            else
            {
                alert("Please add name!");
            }
        }
    }

    handleClick(e)
    {
        const element = this.refs.canvasMapEditor;
        let rect = element.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        let c_max_x = element.width;
        let c_max_y = element.height;

        let block_size = this.state.mapSize;

        if (block_size === null)
        {
            block_size = 10;
        }
        let b_y = Math.floor(Number(x / c_max_x * block_size));
        let b_x = Math.floor(Number(y / c_max_y * block_size));

        let current = Number(this.state.element);
        if (this.map.block_list[b_x][b_y].info === BaseMapInfo.getElementsByTagName('birthplace') || this.map.block_list[b_x][b_y].info === BaseMapInfo.getElementsByTagName('head'))
        {
            MessageBar.show(configMsgHints.removeRole);
        }
        else if (this.map.block_list[b_x][b_y].info === BaseMapInfo.getElementsByTagName('end'))
        {
            MessageBar.show(configMsgHints.removeTreasure);
        }
        else
        {
            this.map.block_list[b_x][b_y].info = current;
            if (current === BaseMapInfo.getElementsByTagName('birthplace'))
            {
                if (this.lastX !== -1) this.map.block_list[this.lastX][this.lastY].info = BaseMapInfo.getElementsByTagName('empty');
                this.lastX = b_x;
                this.lastY = b_y;
            }
            if (current === BaseMapInfo.getElementsByTagName('end'))
            {
                if (this.lastTreasureX !== -1) this.map.block_list[this.lastTreasureX][this.lastTreasureY].info = BaseMapInfo.getElementsByTagName('empty');
                this.lastTreasureX = b_x;
                this.lastTreasureY = b_y;
            }
        }
        this.map.print();
        this.updateState("map");
    }

    render()
    {
        const {classes} = this.props;
        return (
            <Dialog
                open = {this.props.open}
                onRequestClose = {this.props.onRequestClose}
                onEnter = {() => this.onEnter()}
            >
                <DialogTitle>Map Editor</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Explore and create your own map !
                    </DialogContentText>
                    <div>

                        <TextField
                            id = "select-size"
                            select
                            label = "Size select"
                            className = {classes.textField}
                            ref = "selectSize"
                            value = {this.state.mapSize}
                            onChange = {(e) => this.handleChange('mapSize', e)}
                            SelectProps = {{
                                native: true,
                                MenuProps: {
                                    className: classes.menu,
                                },
                            }}
                            helperText = "Please select your map's size"
                            margin = "normal"
                        >
                            {currencies.map(option => (
                                <option key = {option.value} value = {option.value}>
                                    {option.label}
                                </option>
                            ))}

                        </TextField>

                        <TextField
                            id = "select-element"
                            select
                            label = "Element select"
                            className = {classes.textField}
                            ref = "selectElement"
                            value = {this.state.element}
                            onChange = {(e) => this.handleChange('element', e)}
                            SelectProps = {{
                                native: true,
                                MenuProps: {
                                    className: classes.menu,
                                },
                            }}
                            helperText = "Please select one element to insert into the map"
                            margin = "normal"
                        >
                            {elements.map(option => (
                                <option key = {option.value} value = {option.value}>
                                    {option.label}
                                </option>
                            ))}

                        </TextField>

                        <div>
                            <canvas
                                id = "canvasMapEditor"
                                ref = "canvasMapEditor"
                                width = {this.canvasSize}
                                height = {this.canvasSize}
                                onClick = {(e) => this.handleClick(e)}
                            />
                        </div>
                    </div>
                </DialogContent>
                <DialogActions className = {classes.actions}>
                    <Button onClick = {() => this.updateState("reset")} color = "primary">
                        Clear
                    </Button>
                    <Button onClick = {() => this.handleFinishEditing("start")} color = "primary">
                        Start
                    </Button>
                    <Button onClick = {() => this.handleFinishEditing("save")} color = "primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}


MapEditor.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(MapEditor);

