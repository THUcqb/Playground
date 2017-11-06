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
        value: '10',
        label: 'S (10 * 10)',
    },
    {
        value: '15',
        label: 'M (15 * 15)',
    },
    {
        value: '20',
        label: 'L (20 * 20)',
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
        this.stage = null;
        this.state = {};
    }

    initialize()
    {
        this.stage = new EaselJS.Stage(this.refs.canvasMapEditor);
        this.background = new Background(this.stage, this.canvasSize, this.state.mapSize);
        this.element = new Element(this.stage, this.canvasSize, this.state.mapSize, false);
    }

    handleChange(name, event)
    {
        this.setState({
            [name]: event.target.value,
        }, () => this.updateState(name));
    };

    updateState(name)
    {
        if (name === "mapSize")
        {
            this.map = new Map(this.state.mapSize, this.state.mapSize);
            this.map.editInit();
            this.background.reset();
            this.background.updateN(this.state.mapSize);
            this.element.reset();
            this.element.updateN(this.state.mapSize);
            this.background.update(this.map);
            this.element.update(this.map);
        }
        if (name === "map")
        {
            this.background.reset();
            this.element.reset();
            this.background.update(this.map);
            this.element.update(this.map);
        }
        this.stage.update();
    }

    onEnter()
    {
        this.initialize();
        this.updateState("mapSize");
    }

    handleFinishEditing()
    {
        //TODO: to something including save the map and close the dialog.

        alert(this.state.mapSize);
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
        let b_x = Math.floor(Number(x / c_max_x * block_size));
        let b_y = Math.floor(Number(y / c_max_y * block_size));

        this.map.block_list[b_y][b_x].info = (1 + this.map.block_list[b_y][b_x].info) % 3;
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
                                ref = "select"
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
                    <Button onClick = {() => this.handleFinishEditing()} color = "primary">
                        Start
                    </Button>
                    <Button onClick = {() => this.handleFinishEditing()} color = "primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    componentDidMount()
    {
        this.setState({"mapSize": 10});
        this.map = new Map(10, 10);
        this.map.editInit();
    }
}


MapEditor.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(MapEditor);

