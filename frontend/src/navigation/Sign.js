import React from 'react';
import Button from 'material-ui/Button';
import SignDialog from './SignDialog';
import { login } from '../utils/Auth'

class SignButton extends React.Component {
  /**
   * @constructor
   * @param props
   * @state open - If the dialog is open
   * @state textStatus - If the textField in the dialog is currently busy or not.
   */
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      textStatus: {
        disabled: false,
        usernameError: false,
        passwordError: false,
      }
    };
  }

  handleClickOpen() {
    this.setState({open: true});
  }

  handleRequestClose() {
    this.setState({open: false});
  }

  /**
   * The sign in function.
   * @param username
   * @param password
   */
  handleRequestSignIn(username, password) {
    this.setState({textStatus: {disabled: true}});
    login(username, password).then(responseData => {
      if (responseData.status === 'successful')
        this.setState({open: false});
      if (responseData.status === 'failed')
        this.setState({textStatus: {disabled: false, usernameError: true, passwordError: true}});
    });
  }

  /**
   * The sign up function.
   */
  handleRequestSignUp() {
    alert('sign up');
  }

  render() {
    return (
      <div>
        <Button raised color="primary" onClick={() => this.handleClickOpen()}>Sign in</Button>
        <SignDialog
          open={this.state.open}
          textStatus={this.state.textStatus}
          onRequestClose={() => this.handleRequestClose()}
          onRequestSignIn={(username, password) => this.handleRequestSignIn(username, password)}
          onRequestSignUp={() => this.handleRequestSignUp()}
        />
      </div>
    )
  }
}

export default SignButton;
