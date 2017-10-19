import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navigation from './navigation/Navigation'
import Gamepad from './gamepad/Gamepad';
import Scene from './Scene';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

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
});

/**
 * The app which consists of a AppBar(top), a Scene(left) and a Gamepad(right).
 */
class App extends Component
{
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
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
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
