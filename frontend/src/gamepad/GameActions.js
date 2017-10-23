import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import Menu, { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';
import { move } from './LogicApi';

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
            moveOpen: false,
            anchorEl: null,
            anchorOriginVertical: 'bottom',
        }
    }

    handleReset() {
        this.props.reset();
    };

    handleView() {
        this.props.view();
    };

    handleSubmit() {
        this.props.submit();
    };

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
     */
    handleMoveClose() {
        this.setState({moveOpen: false});
    }

    render() {
        const { classes } = this.props;

        return (
            <Toolbar color="primary">
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

                    <MenuItem onClick={() => move('left')}>Left</MenuItem>
                    <MenuItem onClick={() => move('right')}>Right</MenuItem>
                    <MenuItem onClick={() => move('up')}>Up</MenuItem>
                    <MenuItem onClick={() => move('down')}>Down</MenuItem>

                </Menu>
                <Button raised className={classes.button}
                        onClick={() => this.handleReset()}>
                    Reset
                </Button>
                <Button raised className={classes.button}
                        onClick={() => this.handleView()}>
                    View Code
                </Button>
                <Button raised className={classes.button}
                        onClick={() => this.handleSubmit()}>
                    Submit Code
                </Button>
            </Toolbar>
        )
    }
}

export default withStyles(styles)(GameActions);
