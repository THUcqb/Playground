import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Send from 'material-ui-icons/Send';
import Delete from 'material-ui-icons/Delete';
import Build from 'material-ui-icons/Build';
import NavigateNext from 'material-ui-icons/NavigateNext';
import Replay from 'material-ui-icons/Replay';

const styles = theme => ({
    clearButton: {
        margin: theme.spacing.unit,
        color: 'white',
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    },
    submitButton: {
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
    restartDebugButton: {
        margin: theme.spacing.unit,
        color: 'white',
        background: 'linear-gradient(45deg, #3F51B5 30%, #000000 90%)',
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
            debugging: false,
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

    handleChangeDebug() {
        if (!this.state.debugging) {
            this.handleStartDebug();
        }
        else {
            this.handleStopDebug();
        }
        this.setState(prevState => ({debugging: !prevState.debugging}));
    }

    handleStartDebug() {
        this.props.debug(true);
    }

    handleStopDebug() {
        this.props.debug(false);
    }

    render() {
        const { classes } = this.props;

        let debugText = this.state.debugging ? "Stop" : "Debug";

        const clearButton = (
            <Button raised className={classes.clearButton}
                    onClick={() => this.handleClear()}
                    disabled={this.state.debugging}
            >
                <Delete className={classes.leftIcon}/>
                Clear
            </Button>
        );

        const submitButton= (
            <Button raised className={classes.submitButton}
                    onClick={() => this.handleSubmit()}
                    disabled={this.state.debugging}
            >
                <Send className={classes.leftIcon}/>
                Submit
            </Button>
        );

        const debugButton = (
            <Button raised className={classes.debugButton}
                    onClick={() => this.handleChangeDebug()}>
                <Build className={classes.leftIcon}/>
                {debugText}
            </Button>
        );

        const stepButton = (
            <Button raised className={classes.stepButton}
                    onClick={() => this.handleStep()}
                    disabled={!this.state.debugging}
            >
                <NavigateNext className={classes.leftIcon}/>
                Step
            </Button>
        );

        const restartDebugButton = (
            <Button raised className={classes.restartDebugButton}
                    onClick={() => this.handleStartDebug()}
                    disabled={!this.state.debugging}
            >
                <Replay className={classes.leftIcon}/>
                Restart
            </Button>
        );

        if (!this.state.debugging) {
            return (
                <Toolbar color="primary">
                    {clearButton}
                    {submitButton}
                    {debugButton}
                </Toolbar>
            )
        }
        else {
            return (
                <Toolbar color="primary">
                    {debugButton}
                    {stepButton}
                    {restartDebugButton}
                </Toolbar>
            )
        }
    }
}

GameActions.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GameActions);
