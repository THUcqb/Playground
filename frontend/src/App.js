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
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: 64,
        height: "100%",
    },
    container: {
        margin: 0,
        height: "90%",
        display: "flex",
    },
    item: {
        display: "flex",
    },
    paper: {
        display: "flex",
        width: "100%",
    },
    landingPaper: {
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
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        if (this.props.cookies.get('token')) {
            this.state = {
                welcome: false,
            }
        }
        else {
            this.state = {
                welcome: true,
            }
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
                            <Paper className={classes.landingPaper}>
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
                <div style={{height: "100%"}}>
                    <Navigation className={classes.appbar}/>
                    <Grid container className={classes.container}>
                        <Grid item xs={12} sm={6} className={classes.item}>
                            <Paper className={classes.paper}>
                                <Scene/>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6} className={classes.item}>
                            <Paper className={classes.paper}>
                                <Gamepad/>
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

export default withCookies(withStyles(styles)(App));
