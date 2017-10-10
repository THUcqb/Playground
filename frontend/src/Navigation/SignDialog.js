import React from 'react';
import Button from 'material-ui/Button';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});

class SignDialog extends React.Component {
  state = {
    username: '',
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes, open, onRequestClose } = this.props;

    return (
      <Dialog open={this.props.open} onRequestClose={this.props.onRequestClose} >
        <DialogTitle>Sign in</DialogTitle>
        <form className={classes.container} noValid ate autoComplete="off">
          <TextField
            className={classes.textField}
            id="username"
            label="Username"
            value={this.state.username}
            onChange={this.handleChange('username')}
            margin="normal"
          />
          <TextField
            className={classes.textField}
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            margin="normal"
          />
        </form>
      </Dialog>
    );
  }
}

SignDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignDialog);
