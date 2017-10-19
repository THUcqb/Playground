import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import SignButton from './Sign';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import HomeIcon from 'material-ui-icons/Home'
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';

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
});

class Navigation extends React.Component {
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, theme } = this.props;

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
          <SignButton/>
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

