import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Send from 'material-ui-icons/Send';
import Delete from 'material-ui-icons/Delete';
import Build from 'material-ui-icons/Build';
import NavigateNext from 'material-ui-icons/NavigateNext';

const styles = theme => ({
    clearButton: {
        margin: theme.spacing.unit,
        color: 'white',
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    },
    sendButton: {
        margin: theme.spacing.unit,
        color: 'white',
        background: 'linear-gradient(45deg, #FF8E53 30%, #8BC34A 90%)',
    },
    debugButton: {
        margin: theme.spacing.unit,
        color: 'white',
        background: 'linear-gradient(45deg, #8BC34A 30%, #03A9F4 90%)',
    },
    stepButton: {
        margin: theme.spacing.unit,
        color: 'white',
        background: 'linear-gradient(45deg, #03A9F4 30%, #3F51B5 90%)',
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
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

    handleSubmit() {
        this.props.submit();
    };

    handleStep() {
        this.props.step();
    }

    handleStartDebug() {
        this.props.debug();
    }

    render() {
        const { classes } = this.props;

        return (
            <Toolbar color="primary">
                <Button raised className={classes.clearButton}
                        onClick={() => this.handleClear()}>
                    <Delete className={classes.leftIcon}/>
                    Clear
                </Button>
                <Button raised className={classes.sendButton}
                        onClick={() => this.handleSubmit()}>
                    <Send className={classes.leftIcon}/>
                    Submit
                </Button>
                <Button raised className={classes.debugButton}
                        onClick={() => this.handleStartDebug()}>
                    <Build className={classes.leftIcon}/>
                    Debug
                </Button>
                <Button raised className={classes.stepButton}
                        onClick={() => this.handleStep()}>
                    <NavigateNext className={classes.leftIcon}/>
                    Step
                </Button>
            </Toolbar>
        )
    }
}

GameActions.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GameActions);
