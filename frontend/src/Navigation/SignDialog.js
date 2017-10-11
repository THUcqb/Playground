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

class SignDialog extends React.Component {

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
            <TextField
              id="username"
              label="Username"
              margin="dense"
              fullWidth
              autoFocus
            />
            <TextField
              id="password"
              label="Password"
              margin="dense"
              fullWidth
              type="password"
              autoComplete="current-password"
            />
        </form>
        </DialogContent>
        <DialogActions className={classes.actions}>
          <Button raised onClick={this.props.onRequestSignUp} color="primary">
            Sign up
          </Button>
          <Button onClick={this.props.onRequestClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.props.onRequestSignIn} color="primary">
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
