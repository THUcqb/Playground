import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import SignButton from './Sign';
import Avatar from 'material-ui/Avatar';
import deepOrange from 'material-ui/colors/deepOrange';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import HomeIcon from 'material-ui-icons/Home'
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import CookieAlertBar from './CookieAlert';
import { CookiesProvider } from 'react-cookie';

const styles = theme => ({
  appBar: {
    position: 'absolute',
    textAlign: 'center',
  },
  flex: {
    flex: 1,
  },
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: 240,
  },
  drawerHeader: {
    'text-align': 'center',
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
  },
  avatar: {
    backgroundColor: deepOrange[300],
  }

});

/**
 * The app's navigation bar.
 */
class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            loggedIn: false,
            username: '',
            cookieAlertOpen: false,
        }
    }

    /**
     * Change the drawer state to open.
     */
    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    /**
     * Change the drawer state to closed.
     */
    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    /**
     * When the user has logged in successfully.
     */
    handleLoggedIn(username, justSet) {
        this.setState({
            loggedIn: true,
            username
        });
        if (justSet) {
            this.setState({
                cookieAlertOpen: true
            });
        }
    }

    /**
     * Render function
     * @returns {XML} Navigation - consists of a AppBar which have
     * a title and a button, and a Drawer.
     */
  render() {
    const { classes, theme } = this.props;

    let userInfo = null;

    if (!this.state.loggedIn)
        userInfo = (
            <CookiesProvider>
                <SignButton loggedIn={(username) => this.handleLoggedIn(username)}/>
            </CookiesProvider>
        );
    else
        userInfo = (<Avatar className={classes.avatar}>{this.state.username}</Avatar>);

    const appbar = (
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="contrast"
            aria-label="open drawer"
            onClick={this.handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography type="title" color="inherit" className={classes.flex}>
            Snake
          </Typography>
          {userInfo}
          <CookieAlertBar open={this.state.cookieAlertOpen}/>
        </Toolbar>
      </AppBar>
    );

    const drawer = (
      <Drawer
        style={{width:0}}
        type="temporary"
        classes={{
          paper: classes.drawerPaper,
        }}
        open={this.state.open}
        onRequestClose={this.handleDrawerClose}
      >
        <div className={classes.drawerInner}>
          <div className={classes.drawerHeader}>
            <HomeIcon/>
            <Typography type="title" color="inherit" className={classes.flex}>
              Home
            </Typography>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
        </div>
      </Drawer>
    );

    return (
        <div>
          {appbar}
          {drawer}
        </div>
    );
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Navigation);

