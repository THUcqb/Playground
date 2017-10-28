import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navigation from './navigation/Navigation'
import Gamepad from './gamepad/Gamepad';
import Scene from './Scene';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styles = theme => ({
    root: {
        flexGrow: 1,
        overflow: "hidden",
        marginTop: 64,
    },
    container: {
    },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    welcomepaper: {
        textAlign: 'center',
        padding: theme.spacing.unit * 20,
        margin: theme.spacing.unit * 10,
        marginTop: 0,
        backgroundColor: theme.palette.background.contentFrame,
    },
    flex: {
        color: theme.palette.text.secondary,
        flex: 1,
    }
});

/**
 * The app which consists of a AppBar(top), a Scene(left) and a Gamepad(right).
 */
class App extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            welcome: true,
        }
    }

    handleWelcome() {
        this.setState({welcome: false});
    }

    render() {
        const { classes } = this.props;

        let body = null;
        if (this.state.welcome === true)
            body = (
                <div>
                    <Grid container className={classes.container}>
                        <Grid item xs={12} sm={12}>
                            <Paper className={classes.welcomepaper}>
                                <Typography className={classes.flex} type="title">
                                    FootMark is a boring game
                                    <br/>
                                    which helps you learn basic programming ideas!
                                    <br/>
                                    <br/>
                                    Have a nice trip!
                                    <br/>
                                    <br/>
                                </Typography>
                                <Button raised color="primary" onClick={() => this.handleWelcome()}
                                >
                                    Have a try!
                                </Button>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            );
        else
            body = (
                <div>
                    <Navigation className={classes.appbar}/>
                    <Grid container className={classes.container}>
                        <Grid item xs={12} sm={6}>
                            <Paper className={classes.paper}>
                                <Scene/>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Paper className={classes.paper}>
                                <Gamepad />
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            );

        return (
            <div className={classes.root}>
                {body}
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
