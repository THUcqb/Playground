import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import Menu, { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';
import { Controller }from '../logic/Controller';
import { Base } from "../logic/Base";

const styles = ({
    button: {
        flex: 1,
        margin: 10,
    }
});

/**
 * The user actions above the blockly div.
 */
class GameActions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            languageSelectionOpen: false,
            moveOpen: false,
            anchorEl: null,
            anchorOriginVertical: 'bottom',
        }
    }

    handleReset() {
        this.props.reset();
    };

    handleSubmit() {
        this.props.submit();
    };

    /**
     * Handle the language selection menu open request
     * @param {Event} ev
     */
    handleLanguageSelectionOpen(ev) {
        this.setState({
            languageSelectionOpen: true,
            anchorEl: ev.currentTarget,
        });
    }

    /**
     * Handle the language selection menu close request
     */
    handleLanguageSelectionClose() {
        this.setState({languageSelectionOpen: false});
    }

    /**
     * Open the move menu to show operations
     * @param ev
     */
    handleMoveOpen(ev) {
        this.setState({
            moveOpen: true,
            anchorEl: ev.currentTarget,
        });
    }

    /**
     * close the move menu.
     * @param op
     */
    handleMoveClose() {
        this.setState({moveOpen: false});
    }

    /**
     * handle move operation
     * @returns {XML}
     */
    handleMoveOp(op) {
        Controller.controller.begin.task.add(new Base('sys', op));
        Controller.controller.step();
    }

    render() {
        const { classes } = this.props;

        return (
            <Toolbar color="primary">
                <Button raised className={classes.button}
                    onClick={(ev) => this.handleLanguageSelectionOpen(ev)}
                >
                    Language
                </Button>
                <Menu
                    open={this.state.languageSelectionOpen}
                    onRequestClose={() => this.handleLanguageSelectionClose()}
                    anchorEl={this.state.anchorEl}
                >

                    <MenuItem onClick={() => this.handleLanguageSelectionClose()}>Javascript</MenuItem>
                    <MenuItem onClick={() => this.handleLanguageSelectionClose()}>Python</MenuItem>
                    <MenuItem onClick={() => this.handleLanguageSelectionClose()}>PHP</MenuItem>
                    <MenuItem onClick={() => this.handleLanguageSelectionClose()}>Lua</MenuItem>
                    <MenuItem onClick={() => this.handleLanguageSelectionClose()}>Dart</MenuItem>

                </Menu>
                <Button raised className={classes.button}
                        onClick={() => this.handleReset()}>
                    Reset
                </Button>
                <Button raised className={classes.button}
                        onClick={() => this.handleSubmit()}>
                    Submit Code
                </Button>
                <Button raised className={classes.button}
                        onClick={(ev) => this.handleMoveOpen(ev)}
                >
                    Move
                </Button>
                <Menu
                    open={this.state.moveOpen}
                    onRequestClose={() => this.handleMoveClose()}
                    anchorEl={this.state.anchorEl}
                >

                    <MenuItem onClick={() => this.handleMoveOp('move_left')}>Left</MenuItem>
                    <MenuItem onClick={() => this.handleMoveOp('move_right')}>Right</MenuItem>
                    <MenuItem onClick={() => this.handleMoveOp('move_up')}>Up</MenuItem>
                    <MenuItem onClick={() => this.handleMoveOp('move_down')}>Down</MenuItem>

                </Menu>
            </Toolbar>
        )
    }
}

export default withStyles(styles)(GameActions);
