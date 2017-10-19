import React from 'react';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

/**
 * The sign in/up pop up dialog.
 */
class SignDialog extends React.Component {
  state = {
    username: '',
    password: '',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleEnterKeyPress = (ev) => {
    if (ev.key === 'Enter') {
      this.props.onRequestSignIn(this.state.username, this.state.password)
      ev.preventDefault();
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <Dialog
        open={this.props.open}
        onRequestClose={this.props.onRequestClose}
      >
        <DialogTitle>Sign in</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please type in your username and password.
          </DialogContentText>
          <form className={classes.container} autoComplete="off">
            <TextField className={classes.username}
              ref="usernameField"
              id="username"
              label="Username"
              margin="dense"
              fullWidth
              autoFocus
              value={this.state.username}
              onChange={this.handleChange('username')}
              disabled={this.props.textStatus.disabled}
              error={this.props.textStatus.usernameError}
              onKeyPress={this.handleEnterKeyPress}
            />
            <TextField className={classes.password}
              ref="passwordField"
              id="password"
              label="Password"
              margin="dense"
              fullWidth
              type="password"
              autoComplete="current-password"
              value={this.state.password}
              onChange={this.handleChange('password')}
              disabled={this.props.textStatus.disabled}
              error={this.props.textStatus.passwordError}
              onKeyPress={this.handleEnterKeyPress}
            />
        </form>
        </DialogContent>
        <DialogActions className={classes.actions}>
          <Button raised onClick={this.props.onRequestSignUp} color="primary">
            Sign up
          </Button>
          <Button onClick={() => this.props.onRequestSignIn(this.state.username, this.state.password)} color="primary">
            Sign in
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

SignDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(SignDialog);
