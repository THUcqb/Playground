import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import Menu, { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';

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

    handleClear() {
        this.props.clear();
    };

    handleView() {
        this.props.view();
    };

    handleSubmit() {
        this.props.submit();
    };

    render() {
        const { classes } = this.props;

        return (
            <Toolbar color="primary">
                <Button raised className={classes.button}
                        onClick={() => this.handleClear()}>
                    Clear
                </Button>
                <Button raised className={classes.button}
                        onClick={() => this.handleView()}>
                    View
                </Button>
                <Button raised className={classes.button}
                        onClick={() => this.handleSubmit()}>
                    Submit
                </Button>
            </Toolbar>
        )
    }
}

export default withStyles(styles)(GameActions);
